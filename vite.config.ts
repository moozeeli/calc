import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'calc',  // 配置静态资源的存放位置
  build: {
    outDir: 'docs',
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
