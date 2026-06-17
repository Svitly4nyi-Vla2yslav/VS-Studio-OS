import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Цей файл налаштовує Vite для React + TypeScript застосунку VS Studio OS.
export default defineConfig({
  plugins: [react()],
});
