import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { QueryClient } from '@tanstack/react-query'
import matchers from '@testing-library/jest-dom/matchers'
import 'whatwg-fetch' // Import the fetch polyfill
import { server } from '../__mocks__/server'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Establish API mocking before all tests.
beforeAll(() => {
  server.listen()
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup()
  server.resetHandlers()
  queryClient.clear()
})
// Clean up after the tests are finished.
afterAll(() => server.close())

export { server as mswServer }
