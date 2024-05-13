import supertest from 'supertest'
import { expect, it, describe, beforeEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'
import { UserRole } from '../../../schemas'
import { UserStatus } from '../../../schemas/users/userSchema'

const route = `${pathRoot.v1.dashboard.users}`
let authAdminToken = ''
const id = await client.query('SELECT id FROM "user" WHERE dni = $1', [
  testUserData.userToDelete.dni,
])
const userToDeleteId = id.rows[0].id

beforeEach(async () => {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const responseAdmin = await supertest(server).post(loginRoute).send({
    dni: testUserData.admin.dni,
    password: testUserData.admin.password,
  })
  ;[authAdminToken] = responseAdmin.header['set-cookie'][0].split(';')
  await client.query('UPDATE "user" SET deleted_at = null WHERE dni = $1', [
    testUserData.userToDelete.dni,
  ])
})
describe('Testing dashboard delete endpoint', () => {
  it('should succeed deleting a user with a logged-in admin user', async () => {
    let deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    expect(deletedAt.rows[0].deleted_at).toBe(null)
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(204)

    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    expect(deletedAt.rows[0].deleted_at).toContain(Date)
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
    let deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    expect(deletedAt.rows[0].deleted_at).toBe(null)
    const response1 = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response1.status).toBe(204)

    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    expect(deletedAt.rows[0].deleted_at).toContain(Date)

    const response2 = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])

    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE dni = $1',
      [testUserData.userToDelete.dni]
    )
    expect(response2.status).toBe(410)
    expect(response2.body.message).toBe('User already deleted')
    expect(deletedAt.rows[0].deleted_at).toContain(Date)
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
  it('Should fail if user level is not ADMIN', async () => {
    await client.query('UPDATE "user" SET role = $1 WHERE dni = $2', [
      UserRole.MENTOR,
      testUserData.admin.dni,
    ])
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
    expect(response.body.message).toBe(
      "Access denied. You don't have permissions"
    )

    await client.query('UPDATE "user" SET role = $1 WHERE dni = $2', [
      UserRole.ADMIN,
      testUserData.admin.dni,
    ])
  })
  it('should fail when the logged-in admin loses "active" status', async () => {
    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.PENDING,
      testUserData.admin.dni,
    ])
    const response = await supertest(server)
      .delete(`${route}/${userToDeleteId}`)
      .set('Cookie', [authAdminToken])
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can proceed')

    await client.query('UPDATE "user" SET status = $1 WHERE dni = $2', [
      UserStatus.ACTIVE,
      testUserData.admin.dni,
    ])
  })
})
