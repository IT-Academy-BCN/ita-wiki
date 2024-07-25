import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll, afterEach } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { tokenSchema } from '../../schemas/tokens/tokenSchema'
import db from '../../db/knexClient'
import { generateId } from '../../utils/cuidGenerator'
import { hashPassword } from '../../utils/passwordHash'
import { UserStatus } from '../../schemas/users/userSchema'

const route = `${pathRoot.v1.auth}/login`
const userId = generateId()
const dni = '73768200R'
const itineraryId = generateId()
beforeAll(async () => {
  await db.migrate.latest()
  await db('itinerary').insert({
    id: itineraryId,
    name: 'example itinerary',
    slug: 'example-itinerary',
  })
  await db('user').insert({
    id: userId,
    dni,
    email: 'testUserData@admin.email',
    name: testUserData.admin.name,
    password: await hashPassword(testUserData.admin.password),
    role: testUserData.admin.role,
    status: testUserData.admin.status,
    user_meta: testUserData.admin.user_meta,
    itinerary_id: itineraryId,
  })
})

afterEach(async () => {
  await db('user')
    .update({ status: testUserData.admin.status, deleted_at: null })
    .where('id', userId)
})
afterAll(async () => {
  await db('user').where('id', userId).del()
  await db('itinerary').where('id', itineraryId).del()
})

describe('Testing authentication endpoint', () => {
  it('should succeed with correct credentials', async () => {
    const response = await supertest(server).post(route).send({
      dni,
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and uppercase DNI', async () => {
    const response = await supertest(server).post(route).send({
      dni: dni.toUpperCase(),
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should succeed with correct credentials and lowercase DNI', async () => {
    const response = await supertest(server).post(route).send({
      dni: dni.toLowerCase(),
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(200)
    expect(tokenSchema.safeParse(response.body).success).toBeTruthy()
  })

  it('should fail with incorrect password', async () => {
    const response = await supertest(server).post(route).send({
      dni,
      password: 'wrong password',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail with user not found', async () => {
    const response = await supertest(server).post(route).send({
      dni: '92149467J',
      password: 'password1',
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })

  it('should fail if user not active', async () => {
    await db('user').update({ status: UserStatus.PENDING }).where('id', userId)
    const response = await supertest(server).post(route).send({
      dni,
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Only active users can login')
  })

  it('should fail if user is blocked', async () => {
    await db('user').update({ status: UserStatus.BLOCKED }).where('id', userId)
    const response = await supertest(server).post(route).send({
      dni,
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(403)
    expect(response.body.message).toBe('The user is Blocked')
  })

  it('should fail if user is deleted', async () => {
    await db('user').update({ deleted_at: db.fn.now() }).where('id', userId)
    const response = await supertest(server).post(route).send({
      dni,
      password: testUserData.admin.password,
    })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid Credentials')
  })
})
