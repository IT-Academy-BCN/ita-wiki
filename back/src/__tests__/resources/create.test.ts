import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'
import { checkInvalidToken } from '../helpers/checkInvalidToken'

let topicIds: string[] = []

beforeAll(async () => {
  topicIds = (await prisma.topic.findMany()).map((topic) => topic.id)
})

afterAll(async () => {
  await prisma.topicsOnResources.deleteMany({
    where: { resource: { slug: 'test-resource' } },
  })
  await prisma.resource.delete({
    where: { slug: 'test-resource' },
  })
})

describe('Testing resource creation endpoint', () => {
  const newResource = {
    title: 'Test Resource',
    description: 'This is a new resource',
    url: 'https://example.com/resource',
    resourceType: 'BLOG',
    topics: topicIds,
    status: 'NOT_SEEN',
  }
  test('should create a new resource with topics', async () => {
    newResource.topics = topicIds
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', authToken.admin)
      .send(newResource)

    expect(response.status).toBe(204)
  })

  test('should fail without topics', async () => {
    newResource.topics = []
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', authToken.admin)
      .send(newResource)

    expect(response.status).toBe(422)
  })

  test('should fail with wrong resource type', async () => {
    const invalidResource = {
      title: 'Invalid Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'INVALIDE-RESOURCE',
      topicId: topicIds,
      status: 'NOT_SEEN',
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .set('Cookie', authToken.admin)
      .send(invalidResource)

    expect(response.status).toBe(400)
    expect(response.body.message[0].received).toBe('INVALIDE-RESOURCE')
  })

  test('Should return error 401 if no token is provided', async () => {
    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}`)
      .send(newResource)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Missing token')
  })
  checkInvalidToken(`${pathRoot.v1.resources}`, 'post', newResource)
})
