/* eslint-disable no-promise-executor-return */
import supertest from 'supertest'
import { expect, test } from 'vitest'
import { server } from '../setup'

test('/api/v1/auth/login', async () => {
  const response = await supertest(server).post('/api/v1/auth/login').send({
    dni: '45632452a',
    password: 'password'
  })
  expect(response.status).toBe(204)
})

test('/api/v1/auth/login', async () => {
  const response = await supertest(server).post('/api/v1/auth/login').send({
    dni: '45632452a',
    password: 'wrong password'
  })
  expect(response.status).toBe(400)
})
