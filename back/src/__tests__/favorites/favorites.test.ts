import supertest from 'supertest'
import { RESOURCE_TYPE, User, Topic } from '@prisma/client'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'

let testUser: User
let testTopic: Topic

beforeAll(async () => {
  testUser = (await prisma.user.findUnique({
    where: { dni: testUserData.admin.dni },
  })) as User

  const resourceData = [
    {
      title: 'test-resource-1-favorites',
      slug: 'test-resource-1-favorites',
      description: 'random description',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'BLOG' as RESOURCE_TYPE,
    },
    {
      title: 'test-resource-2-favorites',
      slug: 'test-resource-2-favorites',
      description: 'random description',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'VIDEO' as RESOURCE_TYPE,
    },
  ]

  const resources = await prisma.$transaction(
    resourceData.map((resource) => prisma.resource.create({ data: resource }))
  )

  const favoritesData = [
    {
      userId: testUser.id,
      resourceId: resources[0].id,
    },
  ]

  await prisma.favorites.createMany({
    data: favoritesData,
  })

  testTopic = (await prisma.topic.findUnique({
    where: { slug: 'testing' },
  })) as Topic

  const topicsOnResources = [
    {
      topicId: testTopic.id,
      resourceId: resources[0].id,
    },
  ]

  await prisma.topicsOnResources.createMany({
    data: topicsOnResources,
  })
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { topicId: testTopic.id },
  })

  await prisma.favorites.deleteMany({
    where: { userId: testUser.id },
  })

  await prisma.resource.deleteMany({
    where: { userId: testUser.id },
  })
})

describe('Testing /favorites/ endpoint', () => {
  describe('Testing GET /by-user/:userId?/:categorySlug?', () => {
    test('Should respond OK status', async () => {
      const userId = testUser.id
      const response = await supertest(server).get(
        `/api/v1/favorites/by-user/${userId}`
      )
      expect(response.status).toBe(200)
    })
    test('Should respond 400 status without userId', async () => {
      const response = await supertest(server).get(`/api/v1/favorites/by-user/`)
      expect(response.status).toBe(400)
    })
    test('Should respond 404 status without valid userId', async () => {
      const userId = 'invalidUserId'
      const response = await supertest(server).get(
        `/api/v1/favorites/by-user/${userId}/testing`
      )
      expect(response.status).toBe(404)
    })

    test('Should return favorites as an array of objects.', async () => {
      const userId = testUser.id
      const categorySlug = 'testing'
      const response = await supertest(server).get(
        `/api/v1/favorites/by-user/${userId}/${categorySlug}`
      )

      expect(response.body).toBeInstanceOf(Array)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            resource: expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              slug: expect.any(String),
              description: expect.any(String),
              url: expect.any(String),
              resourceType: expect.any(String),
              userId: expect.any(String),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            }),
          }),
        ])
      )
    })
  })
})
