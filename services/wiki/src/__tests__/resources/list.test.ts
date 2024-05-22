import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import {
  Prisma,
  Category,
  RESOURCE_TYPE,
  Resource,
  User,
  ViewedResource,
} from '@prisma/client'
import qs from 'qs'
import { z } from 'zod'
import { server, testCategoryData, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema, topicSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'
import { checkInvalidToken } from '../helpers/checkInvalidToken'
import { authToken } from '../mocks/ssoHandlers/authToken'

type ResourceVotes = {
  [key: string]: number
}
const votesForResources: ResourceVotes = {
  'test-resource-1-blog': -1,
  'test-resource-2-video': 0,
  'test-resource-3-tutorial': 1,
  'test-resource-4-blog': 1,
}
let createdResources: Resource[] = []
let viewedResource: ViewedResource
let user: User | null
let adminUser: User | null
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
    category: { connect: { id: testCategory.id } },
  }
  testResources.push(testResourceDataWithNoName)
  // createMany does not allow nested create on many-to-many relationships as per prisma docs. Therefore individual creates are made.
  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
  createdResources = await prisma.resource.findMany({})

  viewedResource = await prisma.viewedResource.create({
    data: {
      user: { connect: { id: adminUser?.id } },
      resource: {
        connect: { id: createdResources[0].id },
      },
    },
  })
  await prisma.$transaction(
    createdResources.map((resource) =>
      prisma.vote.create({
        data: {
          user: {
            connect: { id: adminUser?.id },
          },
          resource: {
            connect: { id: resource.id },
          },
          vote: votesForResources[resource.slug],
        },
      })
    )
  )
})

afterAll(async () => {
  await prisma.viewedResource.deleteMany({})
  await prisma.vote.deleteMany({})
  await prisma.topicsOnResources.deleteMany({
    where: { topic: { slug: 'testing' } },
  })
  await prisma.favorites.deleteMany({})
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
  await prisma.resource.deleteMany({
    where: { user: { id: userWithNoName?.id } },
  })
})
// resourceTypes as array from prisma types for the it.each tests.
const resourceTypes = Object.keys(RESOURCE_TYPE)
type ResourceGetSchema = z.infer<typeof resourceGetSchema>
type TopicSchema = z.infer<typeof topicSchema>

describe('Testing resources GET endpoint', () => {
  it('should fail with wrong resourceType', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ resourceType: 'WRONG TYPE' })

    expect(response.status).toBe(400)
  })

  it('should get all resources by topic id', async () => {
    const existingTopic = await prisma.topic.findUnique({
      where: { slug: 'testing' },
    })
    const topicId = existingTopic?.id

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query(qs.stringify({ topic: topicId }))

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(
        resource.topics.map((t: { topic: TopicSchema }) => t.topic.id)
      ).toContain(topicId)
    })
  })

  it('should not return any resource if non-valid topic id provided', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query(qs.stringify({ topic: 'notValidTopicId' }))

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(0)
  })

  it('should get all resources by category slug', async () => {
    const categorySlug = testCategoryData.slug
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ categorySlug })

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      // The returned resource has at least a topic related to the queried category
      expect(
        resource.topics.some(async (t: { topic: TopicSchema }) => {
          const categoryFromTopic = await prisma.topic.findUnique({
            where: { id: t.topic.id },
            include: { category: { select: { slug: true } } },
          })
          return categoryFromTopic?.category.slug === categorySlug
        })
      ).toBe(true)
    })
  })

  it.each(resourceTypes)(
    "should get all resources by type '%s', topic 'Testing' and category slug 'testing'.",
    async (resourceType) => {
      const existingTopic = await prisma.topic.findUnique({
        where: { slug: 'testing' },
      })
      const topicId = existingTopic?.id
      const categorySlug = testCategoryData.slug
      const response = await supertest(server)
        .get(`${pathRoot.v1.resources}`)
        .query(
          qs.stringify({
            topic: topicId,
            resourceTypes: [resourceType],
            categorySlug,
          })
        )

      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThanOrEqual(1)
      response.body.forEach((resource: ResourceGetSchema) => {
        expect(() => resourceGetSchema.parse(resource)).not.toThrow()
        expect(
          resource.topics.map((t: { topic: TopicSchema }) => t.topic.id)
        ).toContain(topicId)
        expect(resource.resourceType).toBe(resourceType)
        // The returned resource has at least a topic related to the queried category
        expect(
          resource.topics.some(async (t: { topic: TopicSchema }) => {
            const categoryFromTopic = await prisma.topic.findUnique({
              where: { id: t.topic.id },
              include: { category: { select: { slug: true } } },
            })
            return categoryFromTopic?.category.slug === categorySlug
          })
        ).toBe(true)
      })
    }
  )

  it('should respond with OK status if topic slug exists in database and return an array of resources associated with the topic slug  ', async () => {
    const topicSlug = 'testing'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query(qs.stringify({ topicSlug }))

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(3)
    expect(response.body).toBeInstanceOf(Array)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(
        resource.topics.some(
          (topic: { topic: TopicSchema }) => topic.topic.slug === topicSlug
        )
      ).toBe(true)
    })
  })

  it('should get all resources without status when not logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ status: undefined })
    expect(response.status).toBe(200)
    const filteredResources = createdResources.filter(
      (resource) => resource.userId !== testUserData.userWithNoName.id
    )
    expect(response.body.length).toBe(filteredResources.length)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('should retrieve resources viewed by the user with SEEN status when logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .query({ status: 'SEEN' })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(viewedResource.resourceId).toBe(createdResources[0].id)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('should retrieve resources not viewed by the user with NOT_SEEN status when logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .query({ status: 'NOT_SEEN' })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
    expect(viewedResource.resourceId).not.toContain(
      createdResources.map((r) => r.id)
    )
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('should retrieve all resources when both SEEN and NOT_SEEN statuses are provided while logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query(
        qs.stringify({
          status: ['SEEN', 'NOT_SEEN'],
        })
      )
    const filteredResources = createdResources.filter(
      (resource) => resource.userId !== testUserData.userWithNoName.id
    )
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(filteredResources.length)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })

  it('should get all resources when no filters applied', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({})

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
    // All existing resources are fetched
    const countResources = await prisma.resource.count({
      where: { userId: { not: testUserData.userWithNoName.id } },
    })
    expect(response.body.length).toBe(countResources)
  })

  it('should have userVote set to 0 when not logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({})

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(resource.voteCount.userVote).toBe(0)
    })
  })

  it('should display user votes when the user is logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .query({})
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      const expectedVote = votesForResources[resource.slug]
      expect(resource.voteCount.userVote).toBe(expectedVote)
    })
  })

  it('should display all resources and specify those favorited by the user.', async () => {
    const existingResource = await prisma.resource.findUnique({
      where: { slug: 'test-resource-1-blog' },
    })

    const existingAdminUserId = await prisma.user.findUnique({
      where: { id: adminUser?.id },
    })

    const testFavoriteResource = await prisma.favorites.create({
      data: {
        resourceId: existingResource!.id,
        userId: existingAdminUserId!.id,
      },
    })

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', [`authToken=${authToken.admin}`])
      .query({})
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      if (resource.isFavorite === true) {
        expect(resource.id).toBe(testFavoriteResource!.resourceId)
      }
    })
  })

  it('should display all resources containing a query search string in title or description', async () => {
    const search = 'blog'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ search })
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(resource.title.toLowerCase()).toContain(search)
      expect(resource.description!.toLowerCase()).toContain(search)
    })
  })

  it('should display all resources if a query search string is less than 2 chars long', async () => {
    const search = 'b'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ categorySlug: testCategoryData.slug, search })
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(3)
  })

  it('should not return any resources if the search query does not match any resource', async () => {
    const search = 'unlikelysearchterm12345'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ search })

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(0)
  })

  checkInvalidToken(`${pathRoot.v1.resources}`, 'get')
})
