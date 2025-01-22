import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://restapitaskexpress-production.up.railway.app/api/tasks',  // La URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Opcional: reescribe la URL si es necesario
      },
    },
  },
});
