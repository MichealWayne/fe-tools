/**
 * webpack config
 */

let glob = require('glob');
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let Ex = require('extract-text-webpack-plugin');

let getTimeStr = require('ijijin_builder/base/lib/util/util').getTimeStr;

let myBanner = `
  @build time: ${getTimeStr()}
`;

module.exports = (options = {}) => {
    const entries = glob.sync('./src/**/enter.js');
    const entryJSList = {};
    const entryHtmlList = [];

    for (const path of entries) {
        const chunkName = path.slice('./src/js/'.length, -'/enter.js'.length);
        entryJSList[chunkName] = path;

        entryHtmlList.push(new HtmlWebpackPlugin({
            template: './src/' + chunkName + '.html',
            filename: chunkName + '.html',
            chunks: ['manifest', 'vendor', chunkName, 'commons'],
            minify: {
                removeAttributeQuotes: false
            }
        }));
    }

    let plugins = [
        ...entryHtmlList,
        new webpack.BannerPlugin(myBanner),
        new Ex(`css/[name]${options.dev ? '' : 
            //'.[chunkhash]'
            ''
        }.css`),
        new webpack.optimize.CommonsChunkPlugin({
          names: "commons"
        })
    ];
    if (!options.dev) plugins.push(new webpack.IgnorePlugin(/mock\/*/));    // ignore mock

    return {
        entry: entryJSList,

        resolve: {
            extensions: ['.js', '.css', 'less'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
                'mock': path.resolve(__dirname, 'src/mock'),
                'lib': path.resolve(__dirname, 'src/js/lib'),
                'css': path.resolve(__dirname, 'src/css'),
                'tools': path.resolve(__dirname, 'node_modules/ijijin_builder/tools/')
            }
        },

        output: {
            //publicPath: '/assets/',
            path: path.resolve(__dirname, 'dist'),
            filename: options.dev ? '[name].js' :
                'js/[name].js',
                //'js/[name].[chunkhash].js',
            chunkFilename: '[id].js?[chunkhash]'
        },

        module: {
            rules: [
                // js
                {
                    test: /\.js$/,
                    use: ['babel-loader'
                        ,'eslint-loader'
                    ]
                },

                // html
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            root: path.resolve(__dirname, 'src'),
                            attrs: ['img:src']
                        }
                    }
                },

                // css
                {
                    test: /\.css$/,
                    use: Ex.extract({
                        use: ['css-loader', 'postcss-loader'],
                        publicPath:'../'
                    })
                    //'style-loader', 'css-loader', 'postcss-loader')
                },

                // less
                {
                    test: /\.less$/,
                    use: Ex.extract({
                        fallback:"style-loader",
                        use: ['css-loader', 'less-loader', 'postcss-loader'],
                        publicPath:'../'
                    })
                },

                // image or font
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 5000,
                            name: 'images/[hash].[ext]'
                        }
                    }]
                }
            ]
        },

        plugins: plugins,

        devServer: {
            port: 3000,
            hot: true,
            contentBase: path.join(__dirname, 'src'),
            overlay: true,
            historyApiFallback: {
                index: '/assets/',
                disableDotRule: true
            },
            inline: true,
            //host: "192.168.27.183", // 本机的局域网ip
            //open: true
        },

        performance: {
            hints: options.dev ? false : 'warning'
        }
    }
};