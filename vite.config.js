import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from outside the container
    port: 5173, // Ensure this matches the port you'll expose in Docker
    watch: {
      usePolling: true, // Useful for file change detection in Docker
    },
  },
});

