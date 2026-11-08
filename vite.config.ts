import react from '@vitejs/plugin-react'
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
