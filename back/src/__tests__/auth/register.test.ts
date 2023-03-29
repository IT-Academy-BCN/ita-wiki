import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing registration endpoint', () => {
  test('should succeed with correct credentials', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452b',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password1',
        specialization: 'backend'
      })
    expect(response.status).toBe(204)

    const cookie = response.header['set-cookie'] as string[]
    expect(cookie[0]).toMatch(/token/)
  })

  test('should fail with duplicate DNI', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452b',
        name: 'Example2',
        email: 'anotherexample@example.com',
        password: 'password1',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('DNI already exists')
  })

  test('should fail with duplicate email', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452c',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password1',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email already exists')
  })
})
