import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import path from 'node:path';
import pageData from './pages-data';

export default defineConfig({
    plugins: [
        handlebars({
            context(pagePath: string | number) {
                return pageData[pagePath];
            },
            partialDirectory: path.resolve(__dirname, `src/modules`),
        })
    ],
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
