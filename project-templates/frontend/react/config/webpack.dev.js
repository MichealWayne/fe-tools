/**
 * @module webpack.dev
 * @author whw
 */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CONFIGS = require('./configs');

/**
 * dev config
 */
const devConfig = options => ({
  devtool: 'cheap-module-source-map',

  mode: 'development',

  stats: 'minimal',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../lib/corejs'),
    }),
  ],

  devServer: {
    port: CONFIGS.port || 3000,
    hot: true,
    static: {
      directory: path.join(CONFIGS.root, 'src'),
    },
    historyApiFallback: {
      index: '/assets/',
      disableDotRule: true,
    },
    proxy: CONFIGS.proxy ? Object.entries(CONFIGS.proxy).map(([context, options]) => ({
      context: [context],
      ...options
    })) : [],
  },

  performance: {
    hints: false,
  },
});

module.exports = (options = {}) => merge(baseConfig(options), devConfig(options));
