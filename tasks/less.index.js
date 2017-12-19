import LessPluginCssModules from 'less-plugin-css-modules'
import LessPluginLists from 'less-plugin-lists'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import mqpacker from 'css-mqpacker'

export function options (options) {
  const isDev = options.isDev
  const postcssProcessParams = {
    to: `${options.moduleName}.css`,
    map: isDev ? { inline: false } : false
  }

  const cssModulesParams = {
    mode: 'local',
    hashPrefix: 'calendar-grid',
    generateScopedName: '[local]___[hash:base64:5]' // '[hash:base64:8]'
  }

  return {
    output: `${options.dist}/${options.moduleName}.css`,
    cssModules: true,
    options: {
      globalVars: {
        'base-path': JSON.stringify(options.src)
      },
      plugins: [
        new LessPluginCssModules(cssModulesParams),
        new LessPluginLists()
      ]
    },
    onWriteBefore: function (css, map) {
      return runPostcss(css, map, postcssProcessParams)
    }
  }
}

function runPostcss (css, map, processParams) {
  return postcss([
    autoprefixer({ remove: false }),
    mqpacker()
  ]).process(css, processParams).then(function (result) {
    return {
      css: result.css,
      map: result.map && JSON.parse(result.map)
    }
  })
}
