import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //port: 3000,   // use a different port instead of 5173
    open: true,   // open the browser automatically on start
    // host: true, // also make it reachable from other devices on your network
    proxy: {
      // send /api requests to the accounts server (server/index.js)
      '/api': 'http://localhost:3001',
    },
  },
})

