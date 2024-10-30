import supertest from 'supertest'
import { expect, it, describe, afterAll } from 'vitest'
import slugify from 'slugify'
import cuid from 'cuid'
import db from '../../db/knex'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

describe('Testing category PATCH method', async () => {
  const mockCategory = {
    id: cuid(),
    name: 'Debugging',
    slug: slugify('Debugging', { lower: true }),
    created_at: new Date(),
    updated_at: new Date(),
  }
  let baseURL: string | null = ''
  await db('category').insert(mockCategory)
  const newTestCategory = await db('category')
    .where({ name: 'Debugging' })
    .first()
  baseURL = `${pathRoot.v1.categories}/id/${newTestCategory!.id}`

  afterAll(async () => {
    await db('category').where({ id: newTestCategory!.id }).del()
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
})
