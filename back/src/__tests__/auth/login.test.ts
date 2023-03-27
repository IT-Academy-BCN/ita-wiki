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

test('/api/v1/auth/login', async () => {
  const response = await supertest(server).post('api/v1/auth/login').send({
    dni: '45632452a',
    pwd: 'password'
  })
  expect(response.status).toBe(200)
})
