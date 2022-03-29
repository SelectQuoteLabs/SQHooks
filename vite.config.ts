import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {peerDependencies} from './package.json'; // Also include dependencies if any become present

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/hooks/index.ts'),
      name: 'SQHooks',
      formats: ['es', 'cjs'],
      fileName: (format) => `sqhooks.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
  },
});
