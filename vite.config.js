import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Deployed to GitHub Pages under /Portfolio-Site/.
// If you switch to a custom domain or username.github.io root, set base to '/'.
export default defineConfig({
  base: '/Portfolio-Site/',
  plugins: [react(), tailwindcss()],
})
