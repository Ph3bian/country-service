'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Redis = use('Redis')
const Format = use('date-fns/format')
const DiffInSecs = use('date-fns/differenceInSeconds')
class RateLimit {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ request, response }, next) {
        const token = request.headers().authorization.split(' ')[1]

        let tokenData = await Redis.get(token)
        tokenData = JSON.parse(tokenData)
        let { first_used, used_count } = tokenData
        const diffInSecs = DiffInSecs(new Date(), new Date(first_used))

        if (diffInSecs > 60) {
            await Redis.set(
                token,
                JSON.stringify({
                    first_used: Format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    used_count: 1
                })
            )

            await next()

            return
        }

        if (used_count > 30) {
            return response.badRequest(
                `Too many requests. Please try again in ${60 -
                    diffInSeconds} seconds.`
            )
        }

        await Redis.set(
            token,
            JSON.stringify({
                first_used: first_used,
                used_count: used_count + 1
            })
        )
        // call next to advance the request
        await next()
    }
}

module.exports = RateLimit
