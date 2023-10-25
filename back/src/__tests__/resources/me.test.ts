import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { Category } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { authToken } from '../setup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category
  const user = await prisma.user.findUnique({
    where: { email: 'testingUser@user.cat' },
  })

  const testResourcesWithUser = resourceTestData.map((resource) => {
    return {
      ...resource,
      userId: user!.id,
      categoryId: testCategory.id,
    }
  })
  await prisma.resource.createMany({
    data: testResourcesWithUser,
  })
})

afterAll(async () => {
  await prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
  })
})

describe('Testing resources/me endpoint', () => {
  test('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  checkInvalidToken(`${pathRoot.v1.resources}/me`, 'get')

  test('User with no resources posted returns empty array.', async () => {
    // User admin has no posted resources
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.admin)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBe(0)
  })

  test('Should return resources from user', async () => {
    // Normal user has a resource created for this test.
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.user)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  test('Given a valid category slug, should return resources related to that category', async () => {
    const testCategorySlug = 'my-resource-in-react'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', authToken.user)
      .query({ testCategorySlug })
    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })
})
