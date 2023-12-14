import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Category, User } from '@prisma/client'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoServer'

let user: User | null
beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category
  user = await prisma.user.findFirst({
    where: { name: testUserData.user.name },
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

  const testResource = await prisma.resource.findUnique({
    where: { slug: resourceTestData[0].slug },
  })

  await prisma.favorites.create({
    data: {
      resourceId: testResource!.id,
      userId: user!.id,
    },
  })

  await prisma.vote.upsert({
    where: {
      userId_resourceId: {
        userId: user!.id,
        resourceId: testResource!.id,
      },
    },
    update: {
      vote: 1,
    },
    create: {
      userId: user!.id,
      resourceId: testResource!.id,
      vote: 1,
    },
  })
})

afterAll(async () => {
  await prisma.favorites.deleteMany({
    where: { user: { id: user?.id } },
  })
  await prisma.vote.deleteMany({})
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
})

describe('Testing resources/me endpoint', () => {
  it('Should return error if no token is provided', async () => {
    const response = await supertest(server).get(`${pathRoot.v1.resources}/me`)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })

  checkInvalidToken(`${pathRoot.v1.resources}/me`, 'get')

  it('User with no resources posted returns empty array.', async () => {
    // User admin has no posted resources
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBe(0)
  })

  it('Should return resources from user', async () => {
    // Normal user has a resource created for this test.
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('Given a valid category slug, should return resources related to that category', async () => {
    const testCategorySlug = 'testing'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])
      .query({ testCategorySlug })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('If the user voted and favorited one of its own created resources, it should be reflected on the response object', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}/me`)
      .set('Cookie', [`authToken=${authToken.user}`])
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          voteCount: expect.objectContaining({
            upvote: 1,
            downvote: 0,
            total: 1,
            userVote: 1,
          }),
          isFavorite: true,
          userId: user!.id,
        }),
      ])
    )
  })
})
