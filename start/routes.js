'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { success: true, message: 'Hello world from Phibi' }
})

Route.post('auth/login', 'UserController.login').middleware('guest')

Route.get('countries', 'CountryController.search').middleware([
    'auth',
    'rateLimit'
])

Route.any('*', ({ response }) =>
    response.badRequest({ success: false, message: 'Route does not exist' })
)
