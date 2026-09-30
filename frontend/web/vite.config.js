import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Vite 8 bundles with rolldown. The old rollup `manualChunks` function
    // mis-grouped shared CJS modules (React's jsx-runtime landed in `motion`,
    // React itself in `icons`), forcing framer-motion onto /login. Explicit
    // groups with priorities keep React in react-vendor and motion lazy.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|@remix-run)[\\/]/,
              priority: 30,
            },
            {
              name: 'motion',
              test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/,
              priority: 20,
            },
            {
              name: 'icons',
              test: /node_modules[\\/]lucide-react[\\/]/,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})
