import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use '/' for standard Netlify roots, or './' if you ever use GitHub Pages
  base: '/', 
})