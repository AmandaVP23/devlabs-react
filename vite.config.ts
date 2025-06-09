import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { APP_PORT } from './src/settings';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: APP_PORT,
    },
    plugins: [
        TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
        react(),
    ],
})
