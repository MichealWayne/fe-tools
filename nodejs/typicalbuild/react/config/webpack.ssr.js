/**
 * @module webpack.ssr
 * @author whw
 */
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const CONFIGS = require('./configs');


module.exports = options => (webpackMerge(baseConfig, {
    target: 'node',
    entry: {
      app: path.join(CONFIGS.root, 'server')
    },
    output: {
      filename: 'server-entry.js',
      libraryTarget: 'commonjs2'
    },
    externals: Object.keys(require(path.join(CONFIGS.root, 'package.json')).dependencies),
    plugins: [
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify(options.dev ? 'development' : 'production')
        },
      })
    ]
}));
