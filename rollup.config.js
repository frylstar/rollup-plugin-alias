import { defineConfig } from "rollup";
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
    input: './src/index.ts',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    plugins: [
        // ⚠️：[plugin typescript] @rollup/plugin-typescript: Rollup requires that TypeScript produces ES Modules.
        // Unfortunately your configuration specifies a "module" other than "esnext". 
        // Unless you know what you're doing, please change "module" to "esnext" in the target tsconfig.json file or plugin options.
        typescript({ module: 'esnext' }),
    ]
})