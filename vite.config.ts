import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "shared", replacement: "/src/shared" },
      { find: "entities", replacement: "/src/entities" },
      { find: "features", replacement: "/src/features" },
      { find: "widgets", replacement: "/src/widgets" },
      { find: "pages", replacement: "/src/pages" },
      { find: "app", replacement: "/src/app" },
    ]
  }
})
