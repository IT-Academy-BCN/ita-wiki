import { beforeAll, afterEach, afterAll } from 'vitest'
import { ssoServer } from './mocks/ssoServer'

beforeAll(() => ssoServer.listen())
afterEach(() => ssoServer.resetHandlers())
afterAll(() => ssoServer.close())
