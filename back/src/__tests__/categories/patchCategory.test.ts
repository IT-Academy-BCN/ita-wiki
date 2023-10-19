import supertest from 'supertest'
import { expect, it, describe, afterAll, beforeAll } from 'vitest'
import { Category } from '@prisma/client'
import { prisma } from '../../prisma/client'
import { server } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'

let testCategory: Category | null
describe('Testing category PATCH method', () => {
  beforeAll(async () => {
    await prisma.category.create({
      data: { name: 'Debugging', slug: 'debugging' },
    })
    testCategory = await prisma.category.findUnique({
      where: { name: 'Debugging' },
    })
  })

  afterAll(async () => {
    await prisma.category.deleteMany({
      where: { id: testCategory!.id },
    })
  })

  const baseURL = `${pathRoot.v1.categories}/id`

  it('Should respond 204 status when patching a category', async () => {
    const response = await supertest(server)
      .patch(`${baseURL}/${testCategory!.id}`)
      .set('Cookie', authToken.admin)
      .send({ name: 'Test Debugging' })

    expect(response.status).toBe(204)
  })
  it('Should not be able to patch a category if no admin user', async () => {
    const response = await supertest(server)
      .patch(`${baseURL}/${testCategory!.id}`)

      .set('Cookie', authToken.user)
      .send({ id: testCategory!.id, name: 'Test Debugging' })

    expect(response.status).toBe(403)
  })
  it('Should respond 409 if attempting to patch a category with an already existing name', async () => {
    const response = await supertest(server)
      .patch(`${baseURL}/${testCategory!.id}`)
      .set('Cookie', authToken.admin)
      .send({ id: testCategory!.id, name: 'Testing' })

    expect(response.status).toBe(409)
  })
})
