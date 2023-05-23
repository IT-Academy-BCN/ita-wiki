import { RESOURCE_TYPE, Topic, User } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'

let testUser: User
let testTopic: Topic

beforeAll(async () => {
  testTopic = (await prisma.topic.findUnique({
    where: { slug: 'testing' },
  })) as Topic

  testUser = (await prisma.user.findUnique({
    where: { dni: testUserData.user.dni },
  })) as User

  const resourceData = [
    {
      title: 'test-resource-1',
      slug: 'test-resource-1',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'BLOG' as RESOURCE_TYPE,
    },
    {
      title: 'test-resource-2',
      slug: 'test-resource-2',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'BLOG' as RESOURCE_TYPE,
    },
  ]

  const resources = await prisma.$transaction(
    resourceData.map((resource) =>
      prisma.resource.create({
        data: resource,
      })
    )
  )

  const topicsOnResourcesData = resources.map((resource) => ({
    topicId: testTopic.id,
    resourceId: resource.id,
  }))

  await prisma.topicsOnResources.createMany({ data: topicsOnResourcesData })
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { topicId: testTopic.id },
  })
  await prisma.resource.deleteMany({ where: { userId: testUser.id } })
})

describe('GET /resources/topic/:topicId', () => {
  const baseUrl = `${pathRoot.v1.resources}/topic`

  test('should respond with OK status if topic ID exists in database and return an array of resources associated with the topic ID  ', async () => {
    const response = await supertest(server).get(`${baseUrl}/${testTopic.id}`)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThan(0)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(
        resource.topics.some((topic: any) => topic.topic.id === testTopic.id)
      ).toBe(true)
    })
  })

  test('should fail if topic ID does not exist in database ', async () => {
    const response = await supertest(server).get(
      `${baseUrl}/this-topicId-does-not-exist`
    )

    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Topic not found')
  })
})

describe('GET /v1/resources/topic/slug/:slug', () => {
  const baseUrl = `${pathRoot.v1.resources}/topic/slug`

  test('should respond with OK status if topic slug exists in database and return an array of resources associated with the topic slug  ', async () => {
    const response = await supertest(server).get(`${baseUrl}/${testTopic.slug}`)

    expect(response.status).toBe(200)
    expect(response.body.resources).toBeInstanceOf(Array)
    expect(response.body.resources.length).toBeGreaterThan(0)
    response.body.resources.forEach((resource: any) => {
      expect(() => resourceGetSchema.parse(resource)).not.toThrow()
      expect(
        resource.topics.some(
          (topic: any) => topic.topic.slug === testTopic.slug
        )
      ).toBe(true)
    })
  })

  test('should fail if topic slug does not exist in database ', async () => {
    const response = await supertest(server).get(
      `${baseUrl}/this-topicSlug-does-not-exist`
    )

    expect(response.status).toBe(404)
    expect(response.body.message).toEqual('Topic not found')
  })
})
