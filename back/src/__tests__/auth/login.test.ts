import { IncomingMessage, Server, ServerResponse } from 'http'
import supertest from 'supertest'
import { afterEach, beforeEach, expect, test } from 'vitest'
import { app } from '../../server'

let server: Server<typeof IncomingMessage, typeof ServerResponse>

beforeEach(() => {
  server = app.listen()
})

afterEach(() => {
  server.close()
})

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
