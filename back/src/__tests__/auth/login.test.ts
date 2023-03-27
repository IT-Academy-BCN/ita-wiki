import supertest from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../setup'

test('POST /auth/v1/login', async () => {
  const response = await supertest(server).post('/auth/v1/login').send({
    dni: '12345678',
    pwd: '12345678',
  })
  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    message: 'login url',
  })
})
