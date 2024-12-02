import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url";

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'


import tailwind from 'tailwindcss'


// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['dropzone']
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://127.0.0.1:8000",
        changeOrigin: true,
        headers: {
          Accept: "application/json"
         
        },
      },
    },
  },
 
})
