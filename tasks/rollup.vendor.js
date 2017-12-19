import RollupPluginBabel from 'rollup-plugin-babel'
import RollupPluginInject from 'rollup-plugin-inject'
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve'
import RollupPluginCommonJS from 'rollup-plugin-commonjs'
import RollupPluginReplace from 'rollup-plugin-replace'
import RollupPluginBuble from 'rollup-plugin-buble'
import RollupPluginLess2 from 'rollup-plugin-less2'
import RollupPluginPreprocess from 'rollup-plugin-preprocess'

import {
  options as getLessOptions
} from './less.vendor.js'

export default function (options) {
  const lessOptions = getLessOptions(options)
  const env = options.env
  const moduleName = options.moduleName
  const src = options.src

  return {
    input: `${src}/${moduleName}.js`,
    format: 'iife',
    exports: 'default',
    name: 'vendor',
    strict: true,

    sourcemap: false,
    context: 'window',
    plugins: [
      RollupPluginLess2(lessOptions),

      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),

      RollupPluginBabel({
        babelrc: false,
        presets: [],
        plugins: [
          [ 'transform-react-jsx', { pragma: 'h' } ],
          [
            'module-resolver',
            {
              root: [ '.' ],
              alias: {
                'react': 'preact-compat',
                'react-dom': 'preact-compat'
              }
            }
          ]
        ]
      }),

      RollupPluginInject({
        modules: {
          'h': [ 'preact', 'h' ],
          'React.createElement': [ 'preact', 'h' ]
        }
      }),

      RollupPluginBuble({
        transforms: {
          modules: false
        }
      }),

      RollupPluginNodeResolve({
        jsnext: false,
        module: false,
        main: true
      }),

      RollupPluginCommonJS({
        include: 'node_modules/**',
        exclude: '**/*.less'
      }),

      RollupPluginPreprocess({
        context: {
          NODE_ENV: env
        }
      })
    ]
  }
}
