const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// add hot-reload related code to entry chunks
for (const name of Object.keys(baseWebpackConfig.entry)) {
  baseWebpackConfig.entry[name] = ['./build/dev-client', baseWebpackConfig.entry[name]]
}

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // doc: https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-source-map', // review and keep or change to 'eval-cheap-module-source-map'
  infrastructureLogging: {
    level: 'warn'
  },
  plugins: [
    new StylelintPlugin({
      cache: true,
      context: 'src',
      syntax: 'scss',
      configFile: './stylelint.config.js',
      fix: true,
      extensions: ['css', 'scss', 'sass', 'vue'],
      formatter: 'verbose'
    }),
    new ESLintPlugin({
      cache: false,
      extensions: ['js', 'vue'],
      exclude: ['node_modules']
    }),
    new VueLoaderPlugin(),
    // moment.js locales
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|pt-br/),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      templateParameters: {
        timestamp: config.build.timestamp,
        themes: config.build.themes
      }
    }),
    new FriendlyErrorsPlugin()
  ]
})
