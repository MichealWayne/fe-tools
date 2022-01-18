/**
 * @module webpack.pwa
 * @author whw
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const baseConfig = require('./webpack.base');

const pwaConfig = options => ({
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: './',
    }),
  ],
});

module.exports = options => webpackMerge(baseConfig(options), pwaConfig(options));
