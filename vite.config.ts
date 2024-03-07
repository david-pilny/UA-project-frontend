import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@core': fileURLToPath(new URL('./src/_core', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/_core/stores', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
})
