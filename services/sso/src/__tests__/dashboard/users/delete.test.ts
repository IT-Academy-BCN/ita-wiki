import supertest from 'supertest'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { UserRole } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'
import db from '../../../db/knexClient'

const route = `${pathRoot.v1.dashboard.users}`
let authAdminToken = ''
const { id } = testUserData.userToDelete

beforeEach(async () => {
  authAdminToken = await dashboardLoginAndGetToken(
    testUserData.admin.dni,
    testUserData.admin.password
  )
  await db('user').update('deleted_at', null).where('id', id)
})

describe('Testing dashboard delete endpoint', () => {
  it('should succeed deleting a user with a logged-in admin user', async () => {
    let deletedAt = await db('user').select('deleted_at').where('id', id)

    expect(deletedAt[0].deleted_at).toBe(null)
    const response = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(204)

    deletedAt = await db('user').select('deleted_at').where('id', id)

    expect(deletedAt[0].deleted_at).toContain(Date)
  })
  it('should fail with no cookies', async () => {
    const response = await supertest(server).delete(`${route}/${id}`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('should fail with invalid token', async () => {
    authAdminToken = 'invalidToken'
    const response = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail with a user already deleted', async () => {
    let deletedAt = await db('user')
      .select('deleted_at')
      .where('id', testUserData.userToDelete.id)

    expect(deletedAt[0].deleted_at).toBe(null)

    const response1 = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])

    expect(response1.status).toBe(204)

    deletedAt = await db('user')
      .select('deleted_at')
      .where('id', testUserData.userToDelete.id)

    expect(deletedAt[0].deleted_at).toContain(Date)

    const response2 = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])

    deletedAt = await db('user')
      .select('deleted_at')
      .where('id', testUserData.userToDelete.id)

    expect(response2.status).toBe(410)
    expect(response2.body.message).toBe('User already deleted')
    expect(deletedAt.length).toBe(1)
    expect(deletedAt[0].deleted_at).toBeInstanceOf(Date)
  })

  it('Should return error if id does not exist', async () => {
    const falseId = 'falseid'

    const response = await supertest(server)
      .delete(`${route}/${falseId}`)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not found')
  })

  it('Should return error if no id is provided', async () => {
    const response = await supertest(server)
      .delete(`${route}/${undefined}`)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(404)
    expect(response.body.message).toBe('User not found')
  })
})

describe('Authentication test', () => {
  afterEach(async () => {
    await db('user')
      .update({
        status: UserStatus.ACTIVE,
        role: UserRole.ADMIN,
      })
      .where('id', testUserData.admin.id)
  })

  it('should fail to return a collection of users with a blocked logged-in admin', async () => {
    await db('user')
      .update({
        status: UserStatus.BLOCKED,
      })
      .where('id', testUserData.admin.id)

    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(403)
  })

  it('should fail when the logged-in admin loses "active" status', async () => {
    await db('user')
      .update({
        status: UserStatus.PENDING,
      })
      .where('id', testUserData.admin.id)

    const response = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can proceed')
  })

  it('Should fail if user level is not ADMIN', async () => {
    await db('user')
      .update({ role: UserRole.MENTOR })
      .where('dni', testUserData.admin.dni)

    const response = await supertest(server)
      .delete(`${route}/${id}`)
      .set('Cookie', [authAdminToken])

    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )
  })
})
