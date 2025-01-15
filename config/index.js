// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
const { globSync } = require('glob')
const chalk = require('chalk')
const { exit } = require('process')
let loadedEnv
let env = process.argv[2] || 'local'

if (env === 'server') {
  env = 'local'
}
if (env === 'build') {
  env = 'prod'
}
if (env === 'local') {
  require('@dotenvx/dotenvx').config({ path: ['./.env.local', './.env'], strict: false, ignore: ['MISSING_ENV_FILE'] })
} else {
  require('@dotenvx/dotenvx').config({ path: ['./.env'], strict: false, ignore: ['MISSING_ENV_FILE'] })
}
if (process.env.NODE_ENV) {
  loadedEnv = process.env
  console.log(chalk.cyan('Using .env'))
} else {
  try {
    loadedEnv = require(`./${env}.env`)
    loadedEnv = { ...process.env, ...loadedEnv }
    console.log(chalk.cyan(`Using config/${env}.env.js`))
  } catch (error) {
    console.log(chalk.red(`FATAL ERROR: no ENV file found (looked for './.env.local', './.env' and './config/${env}.env.js')`))
    exit(1)
  }
}

// get the Themes' entry points
const entryPoints = globSync('./src/assets/scss/themes/**.scss', { dotRelative: true }).reduce(function (obj, el) {
  obj[path.parse(el).name] = el
  return obj
}, {})

// set the Themes' names and JS types for SuppressEntryChunksPlugin
const themes = Object.keys({ ...entryPoints }).map(x => {
  return { name: x, match: /\.js$/ }
})

// add the App entry point
entryPoints.app = './src/main.js'

module.exports = {
  build: {
    timestamp: Date.now(),
    entryPoints,
    themes,
    env: loadedEnv,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: loadedEnv,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
