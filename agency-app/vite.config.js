import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

export default defineConfig({
  plugins: [react()],
  server: {
    
    port: 3000,
    open: true,
  },
  
});