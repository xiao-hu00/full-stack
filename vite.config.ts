import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
// 获取__dirname
function getCurrnetDir () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname;
}

const dir = getCurrnetDir()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(dir, "/src"),
    },
  },
})
