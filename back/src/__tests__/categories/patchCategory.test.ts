import supertest from 'supertest'
import { expect, it, describe, afterAll } from 'vitest'
import { Category } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { server } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoServer'

describe('Testing category PATCH method', async () => {
  let newTestCategory: Category | null = null
  let baseURL: string | null = ''
  await prisma.category.create({
    data: { name: 'Debugging', slug: 'debugging' },
  })
  newTestCategory = await prisma.category.findUnique({
    where: { name: 'Debugging' },
  })
  baseURL = `${pathRoot.v1.categories}/id/${newTestCategory!.id}`

  afterAll(async () => {
    await prisma.category.deleteMany({
      where: { id: newTestCategory!.id },
    })
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
      .send({ name: 'Testing' })

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
