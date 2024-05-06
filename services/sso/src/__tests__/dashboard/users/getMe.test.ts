import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { userSchema } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'

const route = `${pathRoot.v1.dashboard.users}/me`
let adminAuthToken = ''
beforeAll(async () => {
  const response = await supertest(server)
    .post(`${pathRoot.v1.dashboard.auth}/login`)
    .send({
      dni: testUserData.admin.dni,
      password: testUserData.admin.password,
    })
  ;[adminAuthToken] = response.header['set-cookie'][0].split(';')
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
  afterEach(async () => {
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.ACTIVE,
      testUserData.admin.dni,
    ])
  })
  it('should succeed with a valid token', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [adminAuthToken])
    expect(response.status).toBe(200)
    expect(response.body.dni).toBeTypeOf('string')
    expect(response.body.deletedAt).toBe('null')
    expect(
      userSchema
        .pick({ dni: true, email: true, name: true, deletedAt: true })
        .safeParse(response.body).success
    ).toBeTruthy()
  })
  it('should fail with 401 when cookies are not provided', async () => {
    const response = await supertest(server).get(route)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('should fail with 401 error for invalid token', async () => {
    adminAuthToken = 'invalid_token'
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [adminAuthToken])

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('should fail when the logged-in admin loses "active" status', async () => {
    const agent = supertest.agent(server)
    await agent
      .post(`${pathRoot.v1.dashboard.auth}/login`)
      .send({
        dni: testUserData.admin.dni,
        password: testUserData.admin.password,
      })
      .expect(204)

    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.PENDING,
      testUserData.admin.dni,
    ])
    await agent
      .get(route)
      .expect(403)
      .expect((res) => {
        const { body } = res
        expect(body.message).toBe('Only active users can proceed')
      })
  })
})
