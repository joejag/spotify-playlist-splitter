const slsw = require('serverless-webpack')
const webpack = require('webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  stats: 'minimal',
  mode: 'none',
  module: {
  },
  plugins: [
    new webpack.DefinePlugin({
      'global.GENTLY': false
    })
  ]
}
