import supertest from 'supertest'
import { expect, test, describe, beforeAll } from 'vitest'
import { server } from '../setup'
import { prisma } from '../../prisma/client'

describe('Testing resources endpoint', () => {
  let authToken: string
  let existingTopicId : string | undefined
  let existingUserId : string | undefined

  beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '12345678a',
      password: 'password1'
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0].split(";")[0]

    existingTopicId = (await prisma.topic.findFirst())?.id
    existingUserId = (await prisma.user.findFirst())?.id
  })

  test('should create a new resource', async () => {

    
    const newResource = {
      title: 'New Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'BLOG',
      topicId: existingTopicId,
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
      resource_type: 'INVALIDE-RESOURCE',
      topicId: existingTopicId,
      userId: existingUserId,
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send(invalidResource)

    expect(response.status).toBe(400)
    expect(response.body.message[0].received).toBe('INVALIDE-RESOURCE')
  })
})
