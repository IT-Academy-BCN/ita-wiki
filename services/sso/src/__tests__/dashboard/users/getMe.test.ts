import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { userSchema } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'
import db from '../../../db/knexClient'

const route = `${pathRoot.v1.dashboard.users}/me`
let adminAuthToken = ''
let mentorAuthToken = ''

beforeAll(async () => {
  adminAuthToken = await dashboardLoginAndGetToken(
    testUserData.admin.dni,
    testUserData.admin.password
  )

  mentorAuthToken = await dashboardLoginAndGetToken(
    testUserData.mentor.dni,
    testUserData.mentor.password
  )
})

afterAll(async () => {
  const userDni = testUserData.userToBeBlocked.dni
  const newStatus = UserStatus.ACTIVE
  await db('user').update({ status: newStatus }).where({ dni: userDni })
})

describe('Testing get users/me endpoint', () => {
  it('should succeed with an admin valid token', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [adminAuthToken])
    expect(response.status).toBe(200)
    expect(response.body.dni).toBeTypeOf('string')
    expect(
      userSchema
        .pick({ dni: true, email: true, name: true, role: true })
        .safeParse(response.body).success
    ).toBeTruthy()
  })

  it('should succeed with a mentor valid token', async () => {
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [mentorAuthToken])
    expect(response.status).toBe(200)
    expect(response.body.dni).toBeTypeOf('string')
    expect(
      userSchema
        .pick({ dni: true, email: true, name: true, role: true })
        .safeParse(response.body).success
    ).toBeTruthy()
  })
})

describe('User Status Handling in Get users/me Endpoint', () => {
  afterEach(async () => {
    await db('user').update({ status: UserStatus.ACTIVE }).where({
      dni: testUserData.admin.dni,
    })
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

    await db('user').update({ status: UserStatus.PENDING }).where({
      dni: testUserData.admin.dni,
    })

    await agent
      .get(route)
      .expect(403)
      .expect((res) => {
        const { body } = res
        expect(body.message).toBe('Only active users can proceed')
      })
  })
})
