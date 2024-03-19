import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// let filename = 'dist'
// filename = import.meta.env.VUE_APP_API_VERSION || 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base:'/vue-table/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  transpileDependencies: true,
  // publicPath: import.meta.env.VUE_APP_BASE_URL,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api4': {
        target: 'https://evse.msi.com/api4',
        pathRewrite: { '^/api4': '' },
        changeOrigin: true,
        ws: true,
      },
      '/api3': {
        target: 'https://evse.msi.com/api3/',
        pathRewrite: { '^/api3': '' },
        changeOrigin: true,
        ws: true,
      },
      '/api2': {
        target: 'https://evse.msi.com/api2/',
        pathRewrite: { '^/api2': '' },
        changeOrigin: true,
        ws: true,
      },
      '/api1': {
        target: 'https://evse.msi.com/api1/',
        pathRewrite: { '^/api1': '' },
        changeOrigin: true,
        ws: true,
      },
      '/api': {
        target: 'https://evse.msi.com/api/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
