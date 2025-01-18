require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env = config.dev?.env || 'FAIL'
}

const ora = require('ora').default
const chalk = require('chalk')
const fs = require('node:fs')
const opn = require('opn')
const path = require('node:path')
const express = require('express')
const https = require('node:https')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')
let httpsOptions
let key
let cert
const localDomain = process.env.LOCAL_DOMAIN || config.dev.localDomain || 'localhost'
// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port || '3000'
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

webpackConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': Object.fromEntries(Object.entries(process.env).map(x => [x[0], JSON.stringify(x[1])]))
}))

// let's try to get local certs to use HTTPS
try {
  key = fs.readFileSync(path.resolve(`${localDomain}-key.pem`))
  cert = fs.readFileSync(path.resolve(`${localDomain}.pem`))
} catch {}

if (key && cert) {
  httpsOptions = {
    key,
    cert
  }
}

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

// proxy api requests
for (const context of Object.keys(proxyTable)) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory
)
app.use(staticPath, express.static('./static'))

const uri = `http${key && cert ? 's' : ''}://${localDomain}:${port}`

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})
const spinner = ora(chalk.cyan('Starting dev server...\n'))
spinner.start()

devMiddleware.waitUntilValid(() => {
  spinner.stop()
  console.log(chalk.green(`\n> Listening at ${uri}\n`))
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

const server = key && cert ? https.createServer(httpsOptions, app) : app

server.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
