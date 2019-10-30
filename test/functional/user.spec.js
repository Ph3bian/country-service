'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')

test('User does not exist', async ({ client }) => {
    const response = await client
        .post('/auth/login')
        .send({
            email: 'phebianchukwurah@gmail.com1',
            password: 'password1'
        })
        .end()

    response.assertStatus(401)
    response.assertJSONSubset([
        {
            field: 'email',
            message: 'Cannot find user with provided email'
        }
    ])
})

test('can login failed', async ({ client }) => {
    const response = await client
        .post('/auth/login')
        .send({
            email: 'phebianchukwurah@gmail.com'
        })
        .end()

    response.assertStatus(401)
    response.assertJSONSubset([
        {
            field: 'password',
            message: 'Invalid user password'
        }
    ])
})

test('can login successfully', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/auth/login')
        .send({
            email: user.email,
            password: 'password123'
        })
        .end()

    response.assertStatus(200)
    assert.equal(response.body.message, 'Logged in successfully')
    assert.equal(response.body.success, true)
    assert.typeOf(response.body.token, 'string')
})
