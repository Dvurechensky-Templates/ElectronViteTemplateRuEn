import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { builtinModules } from 'module'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import esbuild from 'rollup-plugin-esbuild'
import obfuscator from 'rollup-plugin-obfuscator'
import { defineConfig } from 'rollup'
import { getConfig } from './utils'
const config = getConfig()

export default (env = 'production', type = 'main') => {
  return defineConfig({
    input:
      type === 'main'
        ? path.join(__dirname, '..', 'src', 'main', 'index.ts')
        : path.join(__dirname, '..', 'src', 'preload', 'index.ts'),
    output: {
      file: path.join(
        __dirname,
        '..',
        'dist',
        'electron',
        'main',
        `${type === 'main' ? type : 'preload'}.js`,
      ),
      format: 'cjs',
      name: type === 'main' ? 'MainProcess' : 'MainPreloadProcess',
      sourcemap: false,
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.userConfig': config ? JSON.stringify(config) : '{}',
      }),
      // Укажите путь и псевдоним чтения
      nodeResolve({
        preferBuiltins: true,
        browser: false,
        extensions: ['.mjs', '.ts', '.js', '.json', '.node'],
      }),
      commonjs({
        sourceMap: false,
      }),
      json(),
      esbuild({
        // Все опции являются необязательными
        include: /\.[jt]s?$/, // default, выведено из опции `loaders`
        exclude: /node_modules/, // default
        // watch: process.argv.includes('--watch'), // У накопительного пакета есть конфигурация
        sourceMap: false, // default
        minify: env === 'production',
        target: 'es2017', // default, или 'es20XX', 'esnext'
        // Нравиться @rollup/plugin-replace
        define: {
          __VERSION__: '"x.y.z"',
        },
        // Добавьте дополнительных загрузчиков
        loaders: {
          // Добавить поддержку файлов .json
          // require @rollup/plugin-commonjs
          '.json': 'json',
          // Включить JSX также в файлах .js
          '.js': 'jsx',
        },
      }),
      alias({
        entries: [
          {
            find: '@main',
            replacement: path.join(__dirname, '..', 'src', 'main'),
          },
          {
            find: '@config',
            replacement: path.join(__dirname, '..', 'config'),
          },
          {
            find: '@ipcManager',
            replacement: path.join(__dirname, '..', 'src', 'ipc'),
          },
        ],
      }),
      process.env.NODE_ENV == 'production' && obfuscator({}),
    ],
    external: [
      ...builtinModules,
      'electron',
      'express',
      'ffi-napi',
      'ref-napi',
      'ref-struct-napi',
      'semver',
      'glob',
    ],
  })
}
