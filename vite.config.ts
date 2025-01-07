import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import path from 'node:path';
import fs from 'node:fs';
import pageData from './pages-data';

export default defineConfig({
    plugins: [
        handlebars({
            context(pagePath) {
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
        rollupOptions: {
            output: {
                dir: path.resolve(__dirname, 'dist'),
            },
            input: [
                'chat-popups.html',
                'chat-search.html',
                'chat.html',
                'chats.html',
                'index.html',
                'login.html',
                'modal.html',
                'not-found.html',
                'profile-change-data.html',
                'profile-new-password.html',
                'profile.html',
                'register.html',
                'server-error.html'
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
