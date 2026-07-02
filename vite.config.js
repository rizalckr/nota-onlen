import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/projects/nota_onlen',
  server: {
    host: '0.0.0.0', // This makes the server accessible externally
  },
})
