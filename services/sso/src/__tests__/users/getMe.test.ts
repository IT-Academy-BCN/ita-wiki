import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { userSchema } from '../../schemas'
import { UserStatus } from '../../schemas/users/userSchema'
import db from '../../db/knexClient'

const route = `${pathRoot.v1.users}/me`
const userToBeBlockedDni = testUserData.userToBeBlocked.dni
const userToDeleteDni = testUserData.userToDelete.dni
let adminAuthToken = ''
let userToBlockAuthToken = ''
let userToDeleteAuthToken = ''

beforeAll(async () => {
  const responseAdmin = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  adminAuthToken = responseAdmin.body.authToken
  const responseUserToBlock = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.userToBeBlocked.dni,
      password: testUserData.userToBeBlocked.password,
    })
  userToBlockAuthToken = responseUserToBlock.body.authToken
  const responseUserToDelete = await supertest(server)
    .post(`${pathRoot.v1.auth}/login`)
    .send({
      dni: testUserData.userToDelete.dni,
      password: testUserData.userToDelete.password,
    })
  userToDeleteAuthToken = responseUserToDelete.body.authToken
})

afterAll(async () => {
  const newStatus = UserStatus.ACTIVE
  await db('user')
    .update({ status: newStatus })
    .where({ dni: userToBeBlockedDni })

  await db('user').update('deleted_at', null).where('dni', userToDeleteDni)
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

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Token is not valid')
  })
  it('should fail with ForbbidenError when blocking the user', async () => {
    const response1 = await supertest(server).post(route).send({
      authToken: userToBlockAuthToken,
    })
    expect(response1.status).toBe(200)
    const newStatus = UserStatus.BLOCKED

    await db('user')
      .update({ status: newStatus })
      .where({ dni: userToBeBlockedDni })

    const response2 = await supertest(server).post(route).send({
      authToken: userToBlockAuthToken,
    })
    expect(response2.status).toBe(403)
    expect(response2.body.message).toBe('The user is Blocked')

    const newNewStatus = UserStatus.ACTIVE

    await db('user')
      .update({ status: newNewStatus })
      .where({ dni: userToBeBlockedDni })
  })
  it('should fail if user is deleted', async () => {
    const response1 = await supertest(server).post(route).send({
      authToken: userToDeleteAuthToken,
    })
    expect(response1.status).toBe(200)

    await db('user')
      .update({ deleted_at: db.fn.now() })
      .where({ dni: userToDeleteDni })

    const response2 = await supertest(server).post(route).send({
      authToken: userToDeleteAuthToken,
    })
    expect(response2.status).toBe(401)
    expect(response2.body.message).toBe('Invalid Credentials')
  })
})
