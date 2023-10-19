import supertest from 'supertest'
import { expect, it, describe, beforeAll, afterAll } from 'vitest'
import { RESOURCE_TYPE, Resource, ViewedResource } from '@prisma/client'
import qs from 'qs'
import { z } from 'zod'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema, topicSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'
import { authToken } from '../setup'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

type ResourceVotes = {
  [key: string]: number
}
const votesForResources: ResourceVotes = {
  'test-resource-1-blog': -1,
  'test-resource-2-video': 0,
  'test-resource-3-tutorial': 1,
}
let createdResources: Resource[] = []
let viewedResource: ViewedResource
beforeAll(async () => {
  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { dni: testUserData.user.dni } },
    topics: {
      create: [{ topic: { connect: { slug: 'testing' } } }],
    },
  }))
  // createMany does not allow nested create on many-to-many relationships as per prisma docs. Therefore individual creates are made.
  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
  createdResources = await prisma.resource.findMany({})

  viewedResource = await prisma.viewedResource.create({
    data: {
      user: { connect: { dni: testUserData.admin.dni } },
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
            connect: { dni: testUserData.admin.dni },
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
    where: { user: { dni: testUserData.user.dni } },
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
      .query({ topic: topicId })

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(
        resource.topics.map((t: { topic: TopicSchema }) => t.topic.id)
      ).toContain(topicId)
    })
  })

  it('should fail without a valid topic name', async () => {
    const topicName = 'This topic does not exist'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(0)
  })

  it('should get all resources by category slug', async () => {
    const categorySlug = 'testing'
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ category: categorySlug })

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
      const categorySlug = 'testing'
      const response = await supertest(server)
        .get(`${pathRoot.v1.resources}`)
        .query(
          qs.stringify({
            topic: topicId,
            resourceTypes: [resourceType],
            category: categorySlug,
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
  it('should get all resources without status when not logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ status: undefined })
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(createdResources.length)
    response.body.forEach((resource: ResourceGetSchema) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
    })
  })
  it('should retrieve resources viewed by the user with SEEN status when logged in', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', authToken.admin)
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
      .set('Cookie', authToken.admin)
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
    const countResources = await prisma.resource.count()
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
      .set('Cookie', authToken.admin)
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
      where: { dni: testUserData.admin.dni },
    })

    const testFavoriteResource = await prisma.favorites.create({
      data: {
        resourceId: existingResource!.id,
        userId: existingAdminUserId!.id,
      },
    })

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .set('Cookie', authToken.admin)
      .query({})
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    response.body.forEach((resource: ResourceGetSchema) => {
      if (resource.isFavorite === true) {
        expect(resource.id).toBe(testFavoriteResource!.resourceId)
      }
    })
  })

  checkInvalidToken(`${pathRoot.v1.resources}`, 'get')
})
