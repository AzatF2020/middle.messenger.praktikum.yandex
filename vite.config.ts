import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import path from 'node:path';
import fs from 'node:fs';
import pageData from './pages-data';


const inputHTMLFiles = fs.readdirSync(__dirname)
    .filter((item) => item.includes('.html'))
    .map((file) => path.resolve(__dirname, `/${file}`))

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
            input: inputHTMLFiles
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