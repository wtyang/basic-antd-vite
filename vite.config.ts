import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_APP_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    // API 代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // 构建产物带 contenthash，确保缓存更新
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          // 将大型依赖拆分为独立 chunk
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
          icons: ['@ant-design/icons'],
          'pro-components': ['@ant-design/pro-components'],
          router: ['react-router-dom'],
        },
      },
    },
    // 对大型中后台项目，提高警告阈值至 1600kB
    chunkSizeWarningLimit: 1600,
  },
});
