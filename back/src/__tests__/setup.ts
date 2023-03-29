import { beforeAll, afterAll } from 'vitest'
import { IncomingMessage, Server, ServerResponse } from 'http'

import { app } from '../server'

// eslint-disable-next-line import/no-mutable-exports
export let server: Server<typeof IncomingMessage, typeof ServerResponse>

beforeAll(() => {
  server = app.listen()
})

afterAll(() => {
  server.close()
})
