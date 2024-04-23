import { defineConfig } from "rollup";
// 使用 alias plugin：pnpm i ../ -D 上层目录 alias 包
import { alias } from 'rollup-plugin-alias';

export default defineConfig({
    input: './index.js',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    plugins: [alias({
        entries: {
            '@': './utils'
        }
    })],
})