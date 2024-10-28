import supertest from 'supertest'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { UserStatus } from '../../../schemas/users/userSchema'
import db from '../../../db/knexClient'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'

const route = `${pathRoot.v1.dashboard.users}/status`

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

afterEach(async () => {
  const restorePromises = [
    testUserData.blockedUser,
    testUserData.mentor,
    testUserData.pendingUser,
    testUserData.user,
  ].map(async ({ id, status }) => {
    await db('user').update('status', status).where('id', id)
  })
  await Promise.all(restorePromises)
})

describe('Testing POST dashboard/users/status endpoint', () => {
  it('should return 204 when successfully updating multiple users to BLOCKED status', async () => {
    const reqBody = {
      ids: [testUserData.user.id, testUserData.mentor.id],
      status: UserStatus.BLOCKED,
    }
    const response = await supertest(server)
      .post(route)
      .set('Cookie', [adminAuthToken])
      .send(reqBody)
    expect(response.status).toBe(204)
    const promises = reqBody.ids.map(async (id) => {
      const result = await db('user').select('status').where({ id }).first()

      // 'SELECT status FROM "user" WHERE id = $1',[id]
      expect(result.status).toBe(UserStatus.BLOCKED)
    })

    await Promise.all(promises)
  })

  it('should return 204 when successfully updating multiple users to ACTIVE status', async () => {
    const reqBody = {
      ids: [testUserData.blockedUser.id, testUserData.pendingUser.id],
      status: UserStatus.ACTIVE,
    }
    const response = await supertest(server)
      .post(route)
      .set('Cookie', [adminAuthToken])
      .send(reqBody)
    expect(response.status).toBe(204)
    const promises = reqBody.ids.map(async (id) => {
      const result = await db('user').where({ id }).select('status').first()
      expect(result.status).toBe(UserStatus.ACTIVE)
    })
    await Promise.all(promises)
  })

  it('should return 404 when fail updating users that does not exist', async () => {
    const { id } = testUserData.userToBeBlocked
    const reqBody = {
      ids: ['nbwp5he40j70jmywqjevijc6', id, 'nbwp5he40j70jmywqjevijc4'],
      status: UserStatus.BLOCKED,
    }
    const response = await supertest(server)
      .post(route)
      .set('Cookie', [adminAuthToken])
      .send(reqBody)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe(
      'nbwp5he40j70jmywqjevijc6,nbwp5he40j70jmywqjevijc4 not found'
    )
    const result = await db('user').where({ id }).select('status').first()
    expect(result.status).toBe(UserStatus.ACTIVE)
  })

  it('should return 204 when successfully updating a user to ACTIVE status with a mentor token', async () => {
    const reqBody = {
      ids: [testUserData.blockedUser.id],
      status: UserStatus.ACTIVE,
    }
    const response = await supertest(server)
      .post(route)
      .set('Cookie', [mentorAuthToken])
      .send(reqBody)
    expect(response.status).toBe(204)
    const promises = reqBody.ids.map(async (id) => {
      const result = await db('user').where({ id }).select('status').first()
      expect(result.status).toBe(UserStatus.ACTIVE)
    })
    await Promise.all(promises)
  })
})
