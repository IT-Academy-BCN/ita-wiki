import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { userSchema } from '../../schemas'
import { client } from '../../models/db'
import { UserStatus } from '../../schemas/users/userSchema'

const route = `${pathRoot.v1.users}/me`
let adminAuthToken = ''
let userAuthToken = ''
beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  adminAuthToken = response.body.authToken

  const response2 = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.userToBeBlocked.dni,
      password: testUserData.userToBeBlocked.password,
    })
  userAuthToken = response2.body.authToken
})

afterAll(async () => {
  const userDni = testUserData.userToBeBlocked.dni
  const newStatus = UserStatus.ACTIVE
  await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
    newStatus,
    userDni,
  ])
})

describe('Testing get user endpoint', () => {
  it('should succeed with a valid token', async () => {
    const response = await supertest(server).post(route).send({
      authToken: adminAuthToken,
    })
    expect(response.status).toBe(200)
    expect(response.body.dni).toBeTypeOf('string')
    expect(
      userSchema
        .pick({ dni: true, email: true, name: true, role: true })
        .safeParse(response.body).success
    ).toBeTruthy()
  })
  it('should fail with Zod validation error for no token', async () => {
    const response = await supertest(server).post(route).send({ authToken: '' })
    expect(response.status).toBe(400)

    expect(response.body).toStrictEqual({
      message: [
        {
          code: 'too_small',
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['body', 'authToken'],
        },
      ],
    })
  })
  it('should fail with Zod validation error for invalid field', async () => {
    const response = await supertest(server).post(route).send({ token: '' })
    expect(response.status).toBe(400)
  })
  it('should fail with InvalidToken error for invalid token', async () => {
    const response = await supertest(server)
      .post(route)
      .send({ authToken: 'invalid_token' })

    expect(response.status).toBe(498)
    expect(response.body.message).toBe('Token is not valid')
  })
  it('should fail with ForbbidenError when blocking the user', async () => {
    const response1 = await supertest(server).post(route).send({
      authToken: userAuthToken,
    })
    expect(response1.status).toBe(200)
    const userDni = testUserData.userToBeBlocked.dni
    const newStatus = UserStatus.BLOCKED
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      newStatus,
      userDni,
    ])
    const response2 = await supertest(server).post(route).send({
      authToken: userAuthToken,
    })
    expect(response2.status).toBe(403)
    expect(response2.body.message).toBe('The user is Blocked')
  })
})
