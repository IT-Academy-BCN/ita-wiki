// import { IncomingMessage, Server, ServerResponse } from 'http'
import supertest from 'supertest'
import { expect, test } from 'vitest'
import { parse } from 'node-html-parser'
import { server } from '../setup'
import { swaggeruiUrl } from '../../openapi/config'

test(`GET ${swaggeruiUrl}`, async () => {
  const response = await supertest(server).get(swaggeruiUrl).send()
  expect(response.status).toBe(200)
  expect(response.type).toBe('text/html')
  const root = parse(response.text)
  expect(root.querySelector('title')?.innerText).toBe('Swagger UI')
})
