import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@commands': path.resolve(__dirname, './src/commands'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@core': path.resolve(__dirname, './src/core'),
      '@views': path.resolve(__dirname, './src/views'),
      '@theaters': path.resolve(__dirname, './src/theaters'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@public': path.resolve(__dirname, './public'),
    }
  }
})
