import { RESOURCE_TYPE, Topic, User } from '@prisma/client'
import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server, testUserData } from '../globalSetup'
import { pathRoot } from '../../routes/routes'
import { prisma } from '../../prisma/client'

let testUser: User
let testTopic: Topic

beforeAll(async () => {
  testUser = (await prisma.user.findUnique({
    where: { dni: testUserData.user.dni },
  })) as User
  const resourceData = [
    {
      title: 'test-resource-1-blog',
      slug: 'test-resource-1-blog',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'BLOG' as RESOURCE_TYPE,
    },
    {
      title: 'test-resource-2-video',
      slug: 'test-resource-2-video',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'VIDEO' as RESOURCE_TYPE,
    },
    {
      title: 'test-resource-3-tutorial',
      slug: 'test-resource-3-tutorial',
      url: 'https://sample.com',
      userId: testUser.id,
      resourceType: 'TUTORIAL' as RESOURCE_TYPE,
    },
  ]
  // Alternative to create many AND get the created objects as return to use their id
  const resources = await prisma.$transaction(
    resourceData.map((resource) => prisma.resource.create({ data: resource }))
  )

  testTopic = (await prisma.topic.findUnique({
    where: { slug: 'testing' },
  })) as Topic

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

describe('Testing resources get endpoint', () => {
  test('should get all resources by resourceType ', async () => {
    const response = await supertest(server)
      .get(`${pathRoot.v1.resources}`)
      .query({ type: 'BLOG' })

    expect(response.status).toBe(200)
    expect(response.body.resources.length).toBeGreaterThanOrEqual(1)
    response.body.resources.map((resource: any) =>
      expect(resource.resourceType).toBe('BLOG')
    )
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
      expect(['BLOG', 'VIDEO', 'TUTORIAL']).toContain(resource.resourceType)
    })
  })
})
