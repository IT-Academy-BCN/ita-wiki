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

  test('should fail with invalid dni', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: 'notRealDNI',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password1',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid')
  })

  test('should fail with invalid email', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452c',
        name: 'Example2',
        email: 'notAValidEmail',
        password: 'password1',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid email')
  })

  test('should fail with invalid password: too short', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452c',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'pswd1',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('String must contain at least 8 character(s)')
  })

  test('should fail with invalid password: no numbers', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452c',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid')
  })

  test('should fail with invalid password: contains non-alfanumeric', async () => {
    const response = await supertest(server)
      .post('/api/v1/auth/register')
      .send({
        dni: '45632452c',
        name: 'Example2',
        email: 'example2@example.com',
        password: 'password1?',
        specialization: 'backend'
      })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid')
  })
})
