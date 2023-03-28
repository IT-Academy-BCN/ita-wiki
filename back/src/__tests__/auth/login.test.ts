/* eslint-disable no-promise-executor-return */
import supertest from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../setup'

test('debería pasar con credenciales correctas. Chequea status 204 y si existe cookie llamada token', async () => {
  const response = await supertest(server).post('/api/v1/auth/login').send({
    dni: '45632452a',
    password: 'password'
  })
  expect(response.status).toBe(204)

  const cookie = response.header['set-cookie'] as string[]
  expect(cookie[0]).toMatch(/token/)
})

test('debe fallar con credenciales incorrectas y devolver 400', async () => {
  const response = await supertest(server).post('/api/v1/auth/login').send({
    dni: '45632452a',
    password: 'wrong password'
  })
  expect(response.status).toBe(400)
})
