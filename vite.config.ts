import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/test-smooth-tables/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and React DOM into a separate vendor chunk
          'vendor-react': ['react', 'react-dom'],
          // Redux and related libraries
          'vendor-redux': ['react-redux', '@reduxjs/toolkit'],
          // UI libraries
          'vendor-ui': [
            'tailwindcss',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-slot',
            'class-variance-authority',
            'clsx',
            'lucide-react',
            'tailwind-merge',
          ],
        },
        // Optimize chunk distribution
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Improve chunk size reporting
    reportCompressedSize: true,
    // Set a larger chunk size limit
    chunkSizeWarningLimit: 1000,
  },
});
