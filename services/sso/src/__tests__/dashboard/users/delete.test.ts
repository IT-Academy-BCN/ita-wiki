import supertest from 'supertest'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { UserRole } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'
import db from '../../../db/knexClient'
import { dashboardLoginAndGetToken } from '../../helpers/testHelpers'

const route = `${pathRoot.v1.dashboard.users}/`
let authAdminToken = ''
const user = await db('user')
  .select('id')
  .where('dni', testUserData.userToDelete.dni)
  .first()
const userToDeleteId = user.id

beforeEach(async () => {
  authAdminToken = await dashboardLoginAndGetToken(
    testUserData.admin.dni,
    testUserData.admin.password
  )
  await db('user')
    .where('dni', testUserData.userToDelete.dni)
    .update({ deleted_at: null })
})

describe('Testing dashboard delete endpoint', () => {
  it('should succeed deleting a user with a logged-in admin user', async () => {
    let deletedAt = await db('user')
      .select('deleted_at')
      .where('dni', testUserData.userToDelete.dni)
      .first()
    expect(deletedAt.deleted_at).toBe(null)
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(204)

    deletedAt = await db('user')
      .select('deleted_at')
      .where('dni', testUserData.userToDelete.dni)
      .first()
    expect(deletedAt.deleted_at).toContain(Date)
  })
  it('should fail with no cookies', async () => {
    const response = await supertest(server).delete(
      `${route}/${userToDeleteId}`
    )
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('should fail with invalid token', async () => {
    authAdminToken = 'invalidToken'
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
  it('should fail with a user already deleted', async () => {
    let deletedAt = await db('user')
      .select('deleted_at')
      .where('dni', testUserData.userToDelete.dni)
      .first()
    expect(deletedAt.deleted_at).toBe(null)

    const response1 = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response1.status).toBe(204)
    console.log('status-response1:', response1.status)

    deletedAt = await db('user')
      .select('deleted_at')
      .where('dni', testUserData.userToDelete.dni)
      .first()
    expect(new Date(deletedAt.deleted_at)).toContain(Date)
    console.log('date:', deletedAt)

    const response2 = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    console.log('cookie-auth:', authAdminToken)

    console.log('status-response2:', response2.status)
    expect(response2.status).toBe(410)
    expect(response2.body.message).toBe('User already deleted')

    deletedAt = await db('user')
      .select('deleted_at')
      .where('dni', testUserData.userToDelete.dni)
      .first()
    expect(new Date(deletedAt.deleted_at)).toContain(Date)
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
    await db('user').where('dni', testUserData.admin.dni).update({
      status: UserStatus.ACTIVE,
      role: UserRole.ADMIN,
    })
  })
  it('should fail to return a collection of users with a blocked logged-in admin', async () => {
    const adminDni = testUserData.admin.dni
    const newStatus = UserStatus.BLOCKED
    await db('user').where('dni', adminDni).update({ status: newStatus })
    const response = await supertest(server)
      .get(route)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
  })

  it('should fail when the logged-in admin loses "active" status', async () => {
    await db('user')
      .where('dni', testUserData.admin.dni)
      .update({ status: UserStatus.PENDING })
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can proceed')
  })
  it('Should fail if user level is not ADMIN', async () => {
    await db('user')
      .where('dni', testUserData.admin.dni)
      .update({ role: UserRole.MENTOR })
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )
  })
})
