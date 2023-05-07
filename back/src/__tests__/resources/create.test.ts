import supertest from 'supertest'
import { expect, test, describe, beforeAll } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

describe('Testing resource creation endpoint', () => {
  let authToken: string
  let existingUserEmail: string | undefined
  let topicIds: string[] | undefined[]

  beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '23456789B',
      password: 'password2',
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0].split(';')[0]

    existingUserEmail = (
      await prisma.user.findFirst({
        where: {
          role: 'REGISTERED',
        },
      })
    )?.email

    topicIds = (await prisma.topic.findMany()).map((topic) => topic.id)
  })

  test('should create a new resource with topics', async () => {
    const newResource = {
      title: 'New Resource',
      slug:'new-resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resourceType: 'BLOG',
      topics: topicIds,
      userEmail: existingUserEmail,
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
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
      userEmail: existingUserEmail,
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
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
      userEmail: existingUserEmail,
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send(invalidResource)

    expect(response.status).toBe(400)
    expect(response.body.message[0].received).toBe('INVALIDE-RESOURCE')
  })
})
