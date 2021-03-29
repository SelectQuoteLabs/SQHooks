import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/hooks/index.ts'),
      name: 'SQHooks',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
});
