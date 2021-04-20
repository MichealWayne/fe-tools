/**
 * @module webpack.prod
 * @author whw
 */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const cssnano = require('cssnano');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const {useMPA} = require('./fn');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const IjijinPlugin = require('./plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base');
const CONFIGS = require('./configs');


let htmlWebpackExternalsPlugins = [];
let preloadWebpackPlugins = [];

useMPA(({chunkNames}) => {
    for (let i = 0, len = chunkNames.length; i < len; i++) {
        let chunkName = chunkNames[i];
        htmlWebpackExternalsPlugins.push(new HtmlWebpackExternalsPlugin({
            externals: [{
                module: 'react',
                entry: '//s.thsi.cn/ijijin/js/lib/react.16.8.6.production.min.js',
                global: 'React'
            },
                {
                    module: 'react-dom',
                    entry: '//s.thsi.cn/ijijin/js/lib/react-dom.16.8.6.production.min.js',
                    global: 'ReactDOM'
                },
                {
                    module: 'moo-css-base',
                    entry: {
                        path: '//s.thsi.cn/ijijin/appAssets/css/moo-css-base.min.css',
                        type: 'css'
                    }
                }
            ],
            files: [`${chunkName}.html`]
        }))
    }
    // todo 如果多页面打包每个html文件都会preload所有资源 所以单页面才使用
    if (chunkNames.length === 1) {
        preloadWebpackPlugins.push(new PreloadWebpackPlugin({
            rel: 'preload',
            as(entry) {
                if (/\.css$/.test(entry)) return 'style';
                if (/\.woff$/.test(entry)) return 'font';
                if (/\.png$/.test(entry)) return 'image';
                return 'script';
            },
            include: 'allChunks'
        }))
    }
});


/**
 * @function getTimeStr
 * @param {string} timestr
 */
function getTimeStr(timestr) {
    let setTime = (num) => {
        return num < 10 ? '0' + num : num;
    };
    let _date = timestr ? new Date(timestr) : new Date(),
        _month = setTime(_date.getMonth() + 1),
        _day = setTime(_date.getDate()),
        _hour = setTime(_date.getHours()),
        _minute = setTime(_date.getMinutes()),
        _second = setTime(_date.getSeconds());

    return _date.getFullYear() + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
}


// top banner
const MY_BANNER = `
  ${CONFIGS.name}
  @version: ${CONFIGS.version}
  @description: ${CONFIGS.description}
  @author: ${CONFIGS.author}
  @task: ${CONFIGS.task || ''}
  @build time: ${getTimeStr()}
`;
const prodConfig = options => ({
    mode: 'production',

    stats: 'errors-only',

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/mock\/*/),
        new webpack.BannerPlugin(MY_BANNER),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano
        }),
        ...htmlWebpackExternalsPlugins,
        ...preloadWebpackPlugins,
        new IjijinPlugin(options),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors &&
                    stats.compilation.errors.length &&
                    process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        }
    ],
    performance: {
        hints: 'warning'
    },
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    }
});

module.exports = (options = {}) => {
    return webpackMerge(baseConfig(options), prodConfig(options))
};
