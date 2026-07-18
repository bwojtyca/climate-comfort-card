import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/climate-comfort-card.ts',
  output: {
    file: 'dist/climate-comfort-card.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({ tsconfig: './tsconfig.json' }),
    !dev && terser({ format: { comments: false } }),
  ],
};
