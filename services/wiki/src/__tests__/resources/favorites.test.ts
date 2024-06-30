import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { Category, User, Prisma } from '@prisma/client'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { prisma } from '../../prisma/client'
import { resourceTestData } from '../mocks/resources'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

const url: string = `${pathRoot.v1.resources}/favorites`
const categorySlug = testCategoryData.slug
let adminUser: User | null
let user: User | null
let userWithNoName: User | null
beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: testCategoryData.slug },
  })) as Category
  user = await prisma.user.findFirst({
    where: { id: testUserData.user.id },
  })
  adminUser = await prisma.user.findFirst({
    where: { id: testUserData.admin.id },
  })

  userWithNoName = await prisma.user.findFirst({
    where: { id: testUserData.userWithNoName.id },
  })
  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { id: user?.id } },
    topics: {
      create: [{ topic: { connect: { slug: 'testing' } } }],
    },
    favorites: {
      create: [{ user: { connect: { id: adminUser?.id } } }],
    },
    category: { connect: { id: testCategory.id } },
  }))

  const resourceTest4: Omit<
    Prisma.ResourceCreateArgs['data'],
    'userId' | 'categoryId'
  > = {
    title: 'test-resource-4-blog',
    slug: 'test-resource-4-blog',
    description: 'Lorem ipsum blog',
    url: 'https://sample.com',
    resourceType: 'BLOG',
  }

  const testResourceDataWithNoName = {
    ...resourceTest4,
    user: { connect: { id: userWithNoName?.id } },
    topics: {
      create: [{ topic: { connect: { slug: 'testing' } } }],
    },
    favorites: {
      create: [{ user: { connect: { id: adminUser?.id } } }],
    },
    category: { connect: { id: testCategory.id } },
  }
  testResources.push(testResourceDataWithNoName)

  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { topic: { slug: 'testing' } },
  })
  await prisma.favorites.deleteMany({
    where: {
      user: { id: { in: [adminUser!.id, user!.id, userWithNoName!.id] } },
    },
  })
  await prisma.vote.deleteMany({})
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
  await prisma.resource.deleteMany({
    where: { user: { id: userWithNoName?.id } },
  })
})

describe('Testing GET resource/favorites/:categorySlug?', () => {
  it('Should respond 200 status with category param', async () => {
    const response = await supertest(server)
      .get(`${url}/:${categorySlug}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.status).toBe(200)
  })
  it('Should respond 200 status without category param', async () => {
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
    expect(response.status).toBe(200)
  })
  it('Should respond 401 status without token', async () => {
    const response = await supertest(server).get(`${url}/${categorySlug}`)
    expect(response.status).toBe(401)
  })

  checkInvalidToken(`${url}/${categorySlug}`, 'get')

  it('Should return favorites as an array of objects.', async () => {
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

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
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          user: expect.objectContaining({
            name: expect.any(String),
          }),
          isAuthor: expect.any(Boolean),
          voteCount: expect.objectContaining({
            upvote: expect.any(Number),
            downvote: expect.any(Number),
            total: expect.any(Number),
            userVote: expect.any(Number),
          }),
          topics: expect.arrayContaining([
            expect.objectContaining({
              topic: expect.objectContaining({
                id: expect.any(String),
                name: expect.any(String),
                slug: expect.any(String),
                categoryId: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
              }),
            }),
          ]),
        }),
      ])
    )
    response.body.forEach((resource: { voteCount: { userVote: any } }) => {
      expect([-1, 0, 1]).toContain(resource.voteCount.userVote)
    })
  })
  it('If the user voted a favorite resource, it should be reflected on the response object', async () => {
    const testFavoriteVoteResource = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
    })

    await prisma.vote.upsert({
      where: {
        userId_resourceId: {
          userId: adminUser!.id,
          resourceId: testFavoriteVoteResource!.id,
        },
      },
      update: {
        vote: 1,
      },
      create: {
        userId: adminUser!.id,
        resourceId: testFavoriteVoteResource!.id,
        vote: 1,
      },
    })
    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.admin}`])

    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          voteCount: expect.objectContaining({
            upvote: 1,
            downvote: 0,
            total: 1,
            userVote: 1,
          }),
        }),
      ])
    )
  })
  it('If a user favorited his own created resources, it should be reflected as author', async () => {
    const resourceToFavorite = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
    })
    await prisma.favorites.create({
      data: {
        userId: user!.id,
        resourceId: resourceToFavorite!.id,
      },
    })

    const response = await supertest(server)
      .get(`${url}`)
      .set('Cookie', [`authToken=${authToken.user}`])

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          isAuthor: true,
          user: expect.objectContaining({
            name: testUserData.user.name,
            id: testUserData.user.id,
          }),
        }),
      ])
    )
  })
})
