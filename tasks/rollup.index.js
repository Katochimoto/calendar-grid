import RollupPluginBabel from 'rollup-plugin-babel'
import RollupPluginBuble from 'rollup-plugin-buble'
import RollupPluginCommonJS from 'rollup-plugin-commonjs'
import RollupPluginInject from 'rollup-plugin-inject'
import RollupPluginJSON from 'rollup-plugin-json'
import RollupPluginLess2 from 'rollup-plugin-less2'
import RollupPluginNodeResolve from 'rollup-plugin-node-resolve'
import RollupPluginReplace from 'rollup-plugin-replace'
import RollupPluginPreprocess from 'rollup-plugin-preprocess'

import {
  options as getLessOptions
} from './less.index.js'

export default function (options) {
  const external = {
    'classnames': 'vendor._classnames',
    'preact-compat': 'vendor._preact_compat',
    'preact': 'vendor._preact',
    'prop-types': 'vendor._prop_types'
  }

  const lessOptions = getLessOptions(options)
  const env = options.env
  const isDev = options.isDev
  const moduleName = options.moduleName
  const src = options.src
  const babelPlugins = [
    'external-helpers',
    'syntax-async-functions',
    'transform-flow-strip-types',
    'transform-decorators-legacy',
    'transform-do-expressions',
    'transform-object-rest-spread',
    'transform-function-bind',
    [ 'transform-react-jsx', { pragma: 'h' } ]
  ]

  if (isDev) {
    babelPlugins.push(
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
    )
  } else {
    external.react = 'vendor._react' // fake
  }

  const rollupOptions = {
    input: `${src}/${moduleName}.js`,
    format: 'es',
    strict: true,
    sourcemap: false,
    context: 'window',
    external: Object.keys(external),
    plugins: [
      RollupPluginJSON(),

      RollupPluginLess2(lessOptions),

      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),

      RollupPluginBabel({
        babelrc: false,
        presets: [],
        plugins: babelPlugins
      }),

      (isDev ? RollupPluginInject({
        modules: {
          'h': [ 'preact', 'h' ],
          'React.createElement': [ 'preact', 'h' ]
        }
      }) : null),

      RollupPluginBuble({
        exclude: 'node_modules/**',
        transforms: {
          dangerousTaggedTemplateString: true,
          generator: false
        }
      }),

      RollupPluginNodeResolve({
        externals: Object.keys(external)
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
    ].filter(item => item !== null)
  }

  if (isDev) {
    rollupOptions.name = 'Calendar'
    rollupOptions.globals = external
    rollupOptions.format = 'umd'
  }

  return rollupOptions
}
