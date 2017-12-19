import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import mqpacker from 'css-mqpacker'

export function options (options) {
  const isDev = options.isDev
  const postcssProcessParams = {
    to: `${options.moduleName}.css`,
    map: isDev ? { inline: false } : false
  }

  return {
    output: `${options.dist}/${options.moduleName}.css`,
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
