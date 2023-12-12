/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.api.itawiki.eurecatacademy.org/',
        //target: 'http://localhost:8999/',

        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/sso': {
        target: 'https://dev.sso.itawiki.eurecatacademy.org/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sso/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    coverage: {
      provider: 'c8',
      reporter: ['lcov', 'text'],
    },
  },
})
