import { defineConfig } from 'vite'
import path from 'node:path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    server: {
        port: 3000,
        host: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            output: {
                dir: path.resolve(__dirname, 'dist'),
            },
            input: [
                './index.html',
                './src/pages/chat-popups.html',
                './src/pages/chat-search.html',
                './src/pages/chat.html',
                './src/pages/chats.html',
                './src/pages/login.html',
                './src/pages/modal.html',
                './src/pages/not-found.html',
                './src/pages/profile-change-data.html',
                './src/pages/profile-new-password.html',
                './src/pages/profile.html',
                './src/pages/register.html',
                './src/pages/server-error.html'
            ]
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    }
})
