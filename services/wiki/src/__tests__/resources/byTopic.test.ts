import { Category, Topic, User, Prisma } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'
import { resourceGetSchema } from '../../schemas'
import { resourceTestData } from '../mocks/resources'

let testTopic: Topic

let user: User | null
let userWithNoName: User | null

beforeAll(async () => {
  const testCategory = (await prisma.category.findUnique({
    where: { slug: 'testing' },
  })) as Category

  testTopic = (await prisma.topic.findUnique({
    where: { slug: 'testing' },
  })) as Topic
  user = await prisma.user.findFirst({
    where: { id: testUserData.user.id },
  })
  userWithNoName = await prisma.user.findFirst({
    where: { id: testUserData.userWithNoName.id },
  })
  const testResources = resourceTestData.map((testResource) => ({
    ...testResource,
    user: { connect: { id: user?.id } },
    topics: {
      create: [{ topic: { connect: { id: testTopic.id } } }],
    },
    category: { connect: { id: testCategory.id } },
  }))
  // createMany does not allow nested create on many-to-many relationships as per prisma docs. Therefore individual creates are made.

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
      create: [{ topic: { connect: { id: testTopic.id } } }],
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
    where: { topic: { id: testTopic.id } },
  })
  await prisma.resource.deleteMany({
    where: { user: { id: user?.id } },
  })
  await prisma.resource.deleteMany({
    where: { user: { id: userWithNoName?.id } },
  })
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
