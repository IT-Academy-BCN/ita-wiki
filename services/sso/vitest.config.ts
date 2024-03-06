/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    coverage: {
      provider: 'c8',
      reporter: ['lcov', 'text'],
    },
    //setupFiles: ['./src/__tests__/setup.ts'],
    globalSetup: ['./src/__tests__/globalSetup.ts'],
  },
})
