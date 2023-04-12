import supertest from 'supertest'
import { expect, test, describe, beforeAll } from 'vitest'
import { server } from '../setup'

describe('Testing resources endpoint', () => {
  let authToken: string

  beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '45632452a',
      password: 'password1'
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0]
    console.log(`authToken: ${authToken}`)
  })

  test('should create a new resource', async () => {
    const newResource = {
      title: 'New Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'BLOG',
      topicId: 'clgg7b9ud0002lbd1rivgox0c',
      userId: 'clgg7b9tt0000lbd1j54jdjc9',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send({ body: newResource })

    expect(response.status).toBe(204)
  })

  test('should fail with invalid resource type', async () => {
    const invalidResource = {
      title: 'Invalid Resource',
      description: 'This is a new resource',
      url: 'https://example.com/resource',
      resource_type: 'INVALIDE-RESOURCE',
      topicId: 'clgg7b9ud0002lbd1rivgox0c',
      userId: 'clgg7b9tt0000lbd1j54jdjc9',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const response = await supertest(server)
      .post('/api/v1/resources/create')
      .set('Cookie', authToken)
      .send({ body: invalidResource })

    expect(response.status).toBe(422)
    expect(response.body.error).toBe('Invalid resource type')
  })
})
