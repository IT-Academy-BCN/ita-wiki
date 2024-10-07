import supertest from 'supertest'
import { expect, it, describe, beforeEach, afterEach } from 'vitest'
import { pathRoot } from '../../../routes/routes'
import { server, testUserData } from '../../globalSetup'
import { client } from '../../../db/client'
import db from '../../../db/knexClient'

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
  await db('user')
    .update('deleted_at', null)
    .where('id', [userToDeleteId, userToBeBlockedId])
})
describe('Testing dashboard delete endpoint', () => {
  it('should succeed deleting a user with a logged-in admin user', async () => {
    let deletedAt = await db('user')
      .select('deleted_at')
      .whereIn('id', [userToDeleteId, userToBeBlockedId])
    expect(deletedAt).toBe(null)
    expect(deletedAt[0].deleted_at).toBe(null)
    expect(deletedAt[1].deleted_at).toBe(null)

    const ids = [userToDeleteId, userToBeBlockedId]
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(204)
    deletedAt = await db('user')
      .select('deleted_at')
      .whereIn('id', [userToDeleteId, userToBeBlockedId])

    expect(deletedAt[0]).toContain(Date)
    expect(deletedAt[1]).toContain(Date)
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
  it('should return 404 if the provided ids does not exist', async () => {
    const nonExistingId1 = 'ydmicpzwt2ss8zoo0o9oavax'
    const nonExistingId2 = 'q81ky22cpayhprqmn0a2slmn'
    const ids = [nonExistingId1, nonExistingId2]
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('No user found')
  })
  it('should succeed if the same data is provided twice but keeping the first deletedAt value', async () => {
    let deletedAt1 = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt1.rows[0].deleted_at).toBe(null)
    expect(deletedAt1.rows[1].deleted_at).toBe(null)
    const ids = [userToDeleteId, userToBeBlockedId]
    const response1 = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response1.status).toBe(204)
    deletedAt1 = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt1.rows[0].deleted_at).toContain(Date)
    expect(deletedAt1.rows[1].deleted_at).toContain(Date)
    const response2 = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response2.status).toBe(204)
    const deletedAt2 = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1, $2 )',
      [userToDeleteId, userToBeBlockedId]
    )
    expect(deletedAt1.rows[0].deleted_at).toEqual(deletedAt2.rows[0].deleted_at)
    expect(deletedAt1.rows[1].deleted_at).toEqual(deletedAt2.rows[1].deleted_at)
  })
  it('should succeed if one of the provided ids exist', async () => {
    let deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1 )',
      [userToDeleteId]
    )
    expect(deletedAt.rows[0].deleted_at).toBe(null)
    const nonExistingId1 = 'ydmicpzwt2ss8zoo0o9oavax'
    const nonExistingId2 = 'q81ky22cpayhprqmn0a2slmn'
    const ids = [userToDeleteId, nonExistingId1, nonExistingId2]
    const response = await supertest(server)
      .delete(`${route}/`)
      .set('Cookie', [authAdminToken])
      .send({ ids })
    expect(response.status).toBe(204)
    deletedAt = await client.query(
      'SELECT deleted_at FROM "user" WHERE id IN ( $1 )',
      [userToDeleteId]
    )
    expect(deletedAt.rows[0].deleted_at).toContain(Date)
  })
})
