import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// App version is sourced from package.json (single source of truth) and exposed
// to the app as the build-time constant __APP_VERSION__ (rendered in Settings).
const pkg = JSON.parse(
  readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8')
)

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
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
    // mis-grouped shared CJS modules (React's jsx-runtime landed in `motion`),
    // which forced framer-motion (~39 KB gzip) onto /login despite the lazy
    // routes. Explicit groups with priorities keep React in react-vendor and
    // motion out of the login page.
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
