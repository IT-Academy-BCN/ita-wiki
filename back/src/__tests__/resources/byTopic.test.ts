import { Topic } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'

let testTopic: Topic

beforeAll(async () => {
  testTopic = (await prisma.topic.findUnique({
    where: { slug: 'testing' },
  })) as Topic

  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { dni: testUserData.user.dni } },
    topics: {
      create: [{ topic: { connect: { id: testTopic.id } } }],
    },
  }))
  // createMany does not allow nested create on many-to-many relationships as per prisma docs. Therefore individual creates are made.
  await prisma.$transaction(
    testResources.map((resource) => prisma.resource.create({ data: resource }))
  )
})

afterAll(async () => {
  const delTopics = prisma.topicsOnResources.deleteMany({
    where: { topic: { id: testTopic.id } },
  })
  const delResources = prisma.resource.deleteMany({
    where: { user: { dni: testUserData.user.dni } },
  })
  await prisma.$transaction([delTopics, delResources])
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
