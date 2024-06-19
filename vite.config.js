import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_CLIENT_ID: JSON.stringify(process.env.VITE_CLIENT_ID),
      VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY),
    },
  },
})
