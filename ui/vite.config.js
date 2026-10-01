import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite binds "localhost" to IPv6 only (::1) here, which the devcontainer port forward can't reach
    host: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
})
