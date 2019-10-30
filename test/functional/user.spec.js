'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory = use('Factory')

trait('Test/ApiClient')

test('User can not login with invalid email provided', async ({ client }) => {
    const response = await client
        .post('/auth/login')
        .send({
            email: 'phebz@gmail.com1',
            password: 'password'
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

test('User can not login with no password provided', async ({ client }) => {
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

test('User can login successfully with valid credentials', async ({
    assert,
    client
}) => {
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
