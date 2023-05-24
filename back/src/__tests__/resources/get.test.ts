import supertest from 'supertest'
import { expect, test, it, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'

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
})

afterAll(async () => {
  const delTopics = prisma.topicsOnResources.deleteMany({
    where: { topic: { slug: 'testing' } },
  })
  const delResources = prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
  })
  await prisma.$transaction([delTopics, delResources])
})

describe('Testing resources GET endpoint', () => {
  describe('Testing all resourceType', () => {
    const resourceType = ['BLOG', 'VIDEO', 'TUTORIAL']
    resourceType.forEach((type) => {
      it(`should get all resources by resourceType ${type}`, async () => {
        const response = await supertest(server)
          .get(`${pathRoot.v1.resources}`)
          .query({ type })
        expect(response.status).toBe(200)
        expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
        response.body.resources.forEach((resource: any) => {
          expect(() => resourceGetSchema.parse(resource)).not.toThrow()
          expect(resource.resourceType).toBe(`${type}`)
        })
      })
    })
  })
  test('should fail with wrong resourceType', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ type: 'WRONG TYPE' })

    expect(response.status).toBe(500)
  })
  test('should get all resources by topic ', async () => {
    const topicName = 'Testing'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })

    expect(response.status).toBe(200)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(resource.topics.map((t: any) => t.topic.name)).toContain(topicName)
    })
  })
  test('should fail without a valid topic', async () => {
    const topicName = 'This topic does not exist'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })

    expect(response.status).toBe(200)
    expect(response.body.resources.length).toBe(0)
  })
  test('should get all resources by type and topic ', async () => {
    const topicName = 'Testing'

    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ topic: topicName })

    expect(response.status).toBe(200)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(resource.topics.map((t: any) => t.topic.name)).toContain(topicName)
      expect(['BLOG', 'VIDEO', 'TUTORIAL']).toContain(resource.resourceType)
    })
  })
  test('should get all resources', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({})

    expect(response.status).toBe(200)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(['BLOG', 'VIDEO', 'TUTORIAL']).toContain(resource.resourceType)
    })
  })
})
