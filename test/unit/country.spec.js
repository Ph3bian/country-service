'use strict'
const Factory = use('Factory')
const { test, trait, before } = use('Test/Suite')('Country')

trait('Test/ApiClient')
trait('Auth/Client')

test('cannot search country if POST request', async ({ client, assert }) => {
    const response = await client
        .post('/countries')
        .send({})
        .end()

    response.assertStatus(400)
    response.assertJSON({
        success: false,
        message: 'Route does not exist'
    })
})

test('cannot search for country if invalid params', async ({
    client,
    auth
}) => {
    const user = await Factory.model('App/Models/User').create()
    const jwt = await auth.generate(user)
    const response = await client
        .get('/countries')
        .query({ search: '' })
        .loginVia(user, 'jwt')
        .end()
    response.assertStatus(400)
    response.assertJSON({
        success: false,
        message: 'Invalid search parameter'
    })
})
