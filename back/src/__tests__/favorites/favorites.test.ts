import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'

beforeAll(async () => {
  const userData = testUserData.admin.dni

  const testUser = await prisma.user.findUnique({
    where: { dni: userData },
  })

  const resourceData = [
    {
      title: 'test-resource-1-blog',
      slug: 'test-resource-1-blog',
      url: 'https://sample.com',
      userId: testUser?.id,
      resourceType: 'BLOG',
    },
    {
      title: 'test-resource-2-video',
      slug: 'test-resource-2-video',
      url: 'https://sample.com',
      userId: testUser?.id,
      resourceType: 'VIDEO',
    },
  ]

  const resources = await prisma.$transaction(
    resourceData.map((resource) => prisma.resource.create({ data: resource }))
  )

const favoritesData = resources.map(resource => ({
  userId: resources.userId,
  resourceId: resource.id
}))

  // create favorites for each user
  await prisma.favorites.createMany({
    data:favoritesData
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
      const user = await prisma.user.findUnique({
        where: {
          email: 'registered@registered.com',
        },
      })
      const userId = user?.id
      const response = await supertest(server).get(
        `/api/v1/favorites/by-user/${userId}`
      )

      expect(response.status).toBe(200)
      // expect(response.body).toBeInstanceOf(Array)
      // expect(response.body.length).toBeGreaterThan(0)
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
