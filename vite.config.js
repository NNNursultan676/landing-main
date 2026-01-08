import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import path from 'path';

// Для GitHub Pages: если репозиторий называется 'landing-main', 
// то base должен быть '/landing-main/'
// Если репозиторий называется 'username.github.io', то base должен быть '/'
// Можно задать через переменную окружения: VITE_BASE_PATH=/your-repo-name/
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  base: base,
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.callback.sdf.cmp.pkz.icdc.io',
        changeOrigin: true,
        secure: false, // Use 'false' if self-signed certificates are used
        pathRewrite: { '^/api': '' },
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix when forwarding
      },
      '/token': {
        target: 'https://dev.callback.sdf.cmp.pkz.icdc.io',
        changeOrigin: true,
        secure: false, // Use 'false' if self-signed certificates are used
        pathRewrite: { '^/token': '' },
        rewrite: (path) => path.replace(/^\/token/, ''), // Remove '/api' prefix when forwarding
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      actions: path.resolve(__dirname, 'src/actions'),
      utils: path.resolve(__dirname, 'src/utils'),
      images: path.resolve(__dirname, 'src/assets/images'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
});
