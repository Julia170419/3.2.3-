import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  base: '/3.2.3-/',
  build: {
    outDir: 'docs'
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
