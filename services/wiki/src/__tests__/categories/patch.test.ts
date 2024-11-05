import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import db from '../../db/knex'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'
import { mockCategory, newMockCategory } from '../mocks/category'

describe('Testing category PATCH method', async () => {
  const baseURL = `${pathRoot.v1.categories}/id/${mockCategory.id}`

  beforeAll(async () => {
    await db('category').insert(mockCategory)
    await db('category').insert(newMockCategory)
  })
  afterAll(async () => {
    await db('category').where({ id: mockCategory.id }).del()
    await db('category').where({ id: newMockCategory.id }).del()
  })

  it('Should respond 204 status when patching a category', async () => {
    const response = await supertest(server)
      .patch(baseURL!)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(204)
  })
  it('Should not be able to patch a category if no admin user', async () => {
    const response = await supertest(server)
      .patch(baseURL!)
      .set('Cookie', [`authToken=${authToken.user}`])
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(403)
  })
  it('Should respond 409 if attempting to patch a category with a name that already exists in another category', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.categories}/id/${newMockCategory.id}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(409)
  })
  it('Should respond 409 if attempting to patch a category with an already existing name', async () => {
    const response = await supertest(server)
      .patch(baseURL!)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(409)
  })

  it('Should return 401 status if no token is provided', async () => {
    const response = await supertest(server)
      .patch(baseURL!)
      .send({ name: 'New Testing' })
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  checkInvalidToken(baseURL!, 'patch', { name: 'New Debugging' })

  it('Should respond 404 if category is not found', async () => {
    const response = await supertest(server)
      .patch(`${pathRoot.v1.categories}/id/d290f1ee6c544b01}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(404)
  })
})
