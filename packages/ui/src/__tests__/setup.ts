/* eslint-disable no-console */
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import '@testing-library/jest-dom'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  cleanup()
})
// Clean up after the tests are finished.
