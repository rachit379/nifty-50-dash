import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/nifty-50-dash/',
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
