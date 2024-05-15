import supertest from 'supertest'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../models/db'

const route = `${pathRoot.v1.dashboard.users}`
let authAdminToken = ''
const userToDeleteId = testUserData.userToDelete.id
const userToBeBlockedId = testUserData.userToBeBlocked.id

beforeEach(async () => {
  const loginRoute = `${pathRoot.v1.dashboard.auth}/login`
  const responseAdmin = await supertest(server).post(loginRoute).send({
    dni: testUserData.admin.dni,
    password: testUserData.admin.password,
  })
  ;[authAdminToken] = responseAdmin.header['set-cookie'][0].split(';')
})

afterEach(async () => {
  await client.query(
    'UPDATE "user" SET deleted_at = null WHERE id IN ( $1, $2 )',
    [userToDeleteId, userToBeBlockedId]
  )
})

describe('Testing dashboard delete endpoint', () => {
  it('should succeed deleting a user with a logged-in admin user', async () => {
    let deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt.rows[0].deleted_at).toBe(null)
    expect(deletedAt.rows[1].deleted_at).toBe(null)
    const ids = [userToDeleteId, userToBeBlockedId]
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(204)
    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt.rows[0].deleted_at).toContain(Date)
    expect(deletedAt.rows[1].deleted_at).toContain(Date)
  })
  it('should return 404 if no ids are provided', async () => {
    const ids = []
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('No user found')
  })
  it('should fail if the provided ids does not exist', async () => {
    const nonExistingId1 = 'ydmicpzwt2ss8zoo0o9oavax'
    const nonExistingId2 = 'q81ky22cpayhprqmn0a2slmn'
    const ids = [nonExistingId1, userToDeleteId, nonExistingId2]
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe(
      `${nonExistingId1},${nonExistingId2} not found`
    )
  })
  it('should retun 410 if the provided user is already deleted', async () => {
    let deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt.rows[0].deleted_at).toBe(null)
    expect(deletedAt.rows[1].deleted_at).toBe(null)
    const ids = [userToDeleteId, userToBeBlockedId]
    const response1 = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response1.status).toBe(204)
    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt.rows[0].deleted_at).toContain(Date)
    expect(deletedAt.rows[1].deleted_at).toContain(Date)
    const response2 = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response2.status).toBe(410)
    expect(response2.body.message).toBe(
      `${userToBeBlockedId},${userToDeleteId} already deleted`
    )
  })
})
