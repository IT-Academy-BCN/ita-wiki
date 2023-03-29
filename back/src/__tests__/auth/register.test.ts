import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing registration endpoint', () => {
  test('should succeed with correct credentials', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452a',
        email: 'example@example.com',
        password: 'password'
      })
    expect(response.status).toBe(201)

    const cookie = response.header['set-cookie'] as string[]
    expect(cookie[0]).toMatch(/token/)
  })

  test('should fail with duplicate DNI', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452a',
        name: 'Example',
        email: 'anotherexample@example.com',
        password: 'password'
      })
    expect(response.status).toBe(409)
    expect(response.body.error).toBe('DNI already exists')
  })

  test('should fail with duplicate email', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '12345678z',
        name: 'Example',
        email: 'example@example.com',
        password: 'password'
      })
    expect(response.status).toBe(409)
    expect(response.body.error).toBe('Email already exists')
  })

  test('should fail with invalid DNI format', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: 'invalidDNI',
        name: 'Example',
        email: 'yetanotherexample@example.com',
        password: 'password'
      })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Invalid DNI format')
  })
})
