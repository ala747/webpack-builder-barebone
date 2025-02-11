require('./check-versions')()
const ora = require('ora').default
const { rimraf } = require('rimraf')
const path = require('node:path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora(chalk.cyan('Building for production...'))
spinner.start()

rimraf(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
  .then(() => {
    webpack(webpackConfig, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(
        chalk.yellow(
          `  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work.
`
        )
      )
    })
  })
  .catch(error => {
    throw error
  })
