import supertest from 'supertest'
import { expect, test, describe, beforeAll, afterAll } from 'vitest'
import { server } from '../globalSetup'
import { authToken } from '../setup'
import { prisma } from '../../prisma/client'
import { pathRoot } from '../../routes/routes'

let topicIds: string[] | undefined[]

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
  test('should create a new resource with topics', async () => {
    const newResource = {
      title: 'Test Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'BLOG',
      topics: topicIds,
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}/create`)
      .set('Cookie', authToken.admin)
      .send(newResource)

    expect(response.status).toBe(204)
  })

  test('should fail without topics', async () => {
    const newResource = {
      title: 'New Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'BLOG',
      topics: [],
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}/create`)
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
    }

    const response = await supertest(server)
      .post(`${pathRoot.v1.resources}/create`)
      .set('Cookie', authToken.admin)
      .send(invalidResource)

    expect(response.status).toBe(400)
    expect(response.body.message[0].received).toBe('INVALIDE-RESOURCE')
  })
})
