const { merge } = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  ENV_FLAG: 'development',
  DEBUG: true
})
