import { beforeAll, afterAll } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'

import { app } from '../server'

export let server : Server<typeof IncomingMessage, typeof ServerResponse>

beforeAll(() => {
  server = app.listen()
})

afterAll(() => {
  server.close()
})
