import { beforeAll, afterEach, afterAll } from 'vitest'
import { mswServer } from './mocks/mswServer'

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
