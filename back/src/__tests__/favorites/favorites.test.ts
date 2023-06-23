import supertest from 'supertest'
import { User } from '@prisma/client'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { resourceTestData } from '../mocks/resources'

let testUser: User

beforeAll(async () => {
  testUser = (await prisma.user.findUnique({
    where: { dni: testUserData.admin.dni },
  })) as User

  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { dni: testUserData.user.dni } },
    topics: {
      create: [{ topic: { connect: { slug: 'testing' } } }],
    },
    favorites: {
      create: [{ user: { connect: { dni: testUserData.admin.dni } } }],
    },
  }))
  // createMany does not allow nested create on many-to-many relationships as per prisma docs. Therefore individual creates are made.
  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { topic: { slug: 'testing' } },
  })
  await prisma.favorites.deleteMany({
    where: { user: { dni: testUserData.admin.dni } },
  })
  await prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
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

    test('Should return favorites as an array of unested objects.', async () => {
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
        ])
      )
    })
  })
})
