import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import path from 'node:path'

const MAIN_DIRECTORY = 'src'

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: 
                path.resolve(__dirname, `${MAIN_DIRECTORY}/modules`)
        })
    ],
    root: path.resolve(__dirname, MAIN_DIRECTORY),
    server: {
        port: 3000,
        host: '0.0.0.0',
        hmr: {
            host: 'localhost'
        },
    },
    build: {
        rollupOptions: {
            output: {
                dir: path.resolve(__dirname, 'dist'),
            }
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