/**
 * @module webpack.dev
 * @author whw
 */

const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../lib/corejs')
        })
    ],

    devServer: {
        port: CONFIGS.port || 3000,
        hot: true,
        contentBase: path.join(CONFIGS.root, 'src'),
        overlay: true,
        historyApiFallback: {
            index: '/assets/',
            disableDotRule: true
        },
        inline: true,
        proxy: CONFIGS.proxy
    },

    performance: {
        hints: false
    }
});

module.exports = (options = {}) => webpackMerge(baseConfig(options), devConfig(options));
