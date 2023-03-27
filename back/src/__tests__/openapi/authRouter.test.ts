import { IncomingMessage, Server, ServerResponse } from 'http'
import supertest from 'supertest'
import { afterEach, beforeEach, expect, test } from 'vitest'
import { app } from '../../server'
import { swaggeruiUrl } from '../../openapi/config'
import { parse } from 'node-html-parser';

let server: Server<typeof IncomingMessage, typeof ServerResponse>

beforeEach(() => {
  server = app.listen()
})

afterEach(() => {
  server.close()
})

test(`GET ${swaggeruiUrl}`, async () => {
  const response = await supertest(server).get(swaggeruiUrl).send()
  expect(response.status).toBe(200)
  expect(response.type).toBe('text/html')
  const root = parse(response.text)
  expect(root.querySelector('title')?.innerText).toBe('Swagger UI')
})
