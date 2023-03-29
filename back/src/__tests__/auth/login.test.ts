import supertest from 'supertest'
import { expect, test, describe } from 'vitest'
import { server } from '../setup'

describe('Testing authentication endpoint', () => {
  test('should succeed with correct credentials', async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '45632452a',
      password: 'password',
    })
    expect(response.status).toBe(204)

    const cookie = response.header['set-cookie'] as string[]
    expect(cookie[0]).toMatch(/token/)
  })

  test('should fail with incorrect password', async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '45632452a',
      password: 'wrong password',
    })
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Invalid password')
  })

  test('should fail with user not found', async () => {
    const response = await supertest(server).post('/api/v1/auth/login').send({
      dni: '11111111a',
      password: 'password',
    })
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('User not found')
  })
})
