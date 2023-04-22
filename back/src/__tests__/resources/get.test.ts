import supertest from 'supertest'
import { expect, test, describe, beforeAll } from 'vitest'
import { server } from '../setup'

describe('Testing resources get endpoint', () => {
  let authToken: string

  beforeAll(async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '23456789B',
      password: 'password2',
    })
    // eslint-disable-next-line prefer-destructuring
    authToken = response.header['set-cookie'][0].split(';')[0]
  })

  test('should get all resources by type ', async () => {
    const response = await supertest(server)
      .get('/api/v1/resources')
      .set('Cookie', authToken)
      .query({ type: 'BLOG' })
      
      expect(response.status).toBe(200)
      expect(response.body.resources.length).toBe(2)
      expect(response.body.resources[0].type).toBe('BLOG')
  })

  // test('should get all resources by category ', async () => {})

  // test('should get all resources by topic ', async () => {})

  // test('should get all resources by type and category ', async () => {})

  // test('should get all resources by type and topic ', async () => {})

  // test('should fail with category and topic ', async () => {})

})
