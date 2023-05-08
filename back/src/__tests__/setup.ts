import { beforeAll, afterAll } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'
import supertest from 'supertest'
import { app } from '../server'
import { pathRoot } from '../routes/routes'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>
// eslint-disable-next-line import/no-mutable-exports
export let authToken: string

beforeAll(async () => {
  server = app.listen()
  const response = await supertest(server).post(`${pathRoot.v1.auth}/login`).send({
    dni: '23456789B',
    password: 'password2',
  })
  // eslint-disable-next-line prefer-destructuring
  authToken = response.header['set-cookie'][0].split(';')[0]
})

afterAll(() => {
  server.close()
})
