import supertest from 'supertest'
import { expect, test, describe, beforeAll } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

describe('Testing resources endpoint', () => {
  let authToken: string
  let existingTopicId: string | undefined
  let existingUserId: string | undefined

  beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '12345678a',
      password: 'password1'
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0].split(';')[0]

    existingTopicId = (await prisma.topic.findFirst())?.id
    existingUserId = (await prisma.user.findFirst())?.id
  })

  test('should create a new resource', async () => {
    const newResource = {
      title: 'New Resource 3',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'BLOG',
      topics: {
        connect: [{ id: existingTopicId }]
      },
      userId: existingUserId
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send(newResource)

    expect(response.status).toBe(204)
  })

  test('should fail with invalid resource type', async () => {
    const invalidResource = {
      title: 'Invalid Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'INVALID-RESOURCE',
      topics: {
        connect: [{ id: existingTopicId }]
      },
      userId: existingUserId
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send(invalidResource)

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: [
        {
          code: 'invalid_enum_value',
          message:
            "Invalid enum value. Expected 'BLOG' | 'VIDEO' | 'TUTORIAL', received 'INVALID-RESOURCE'",
          options: ['BLOG', 'VIDEO', 'TUTORIAL'],
          path: ['body', 'resource_type'],
          received: 'INVALID-RESOURCE'
        }
      ]
    })
  })
})
