import supertest from 'supertest'
import { RESOURCE_TYPE, User } from '@prisma/client'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'

beforeAll(async () => {
  const testUser = await prisma.user.findUnique({
    where: { dni: testUserData.admin.dni },
  }) as User

  const resourceData = [
    {
      title: 'test-resource-1-favorites',
      slug: 'test-resource-1-favorites',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'BLOG' as RESOURCE_TYPE
    },
    {
      title: 'test-resource-2-favorites',
      slug: 'test-resource-2-favorites',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'VIDEO' as RESOURCE_TYPE
    },
  ]

  const resources = await prisma.$transaction(
    resourceData.map((resource) => prisma.resource.create({ data: resource }))
  )

  const favoritesData = resources.map((resource) => ({
    userId: resource.userId,
    resourceId: resource.id,
  }))

  await prisma.favorites.createMany({
    data: favoritesData,
  })
})

afterAll(async () => {
  await prisma.favorites.deleteMany({
    where: {},
  })
  await prisma.resource.delete({
    where: {},
  })
})

describe('Testing /favorites/ endpoint', () => {
  describe('Testing GET /by-user/:userId', () => {
    test('Should respond OK status and return favorites as an array.', async () => {
      const userId = 'placeholder'
      const response = await supertest(server).get(
        `/api/v1/favorites/by-user/${userId}`
      )

      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ])
      )
    })
  })
})