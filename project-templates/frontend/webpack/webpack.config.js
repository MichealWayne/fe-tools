/**
 * @config webpack.config
 * @author Wayne
 * @update 2022-01-16
 */

const glob = require('glob');
const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const LessFunc = require('less-plugin-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CONFIG = require('./package.json');

// top banner
const MY_BANNER = `
  ${CONFIG.name}
  @version: ${CONFIG.version}
  @description: ${CONFIG.description}
  @author: ${CONFIG.author}
  @task: ${CONFIG.task || ''}
  @build time: ${new Date()}
`;

const IMAGE_LIMIT = 5000; // base64 limit

// document https://webpack.js.org/concepts/
module.exports = (options = {}) => {
  const entries = glob.sync('./src/**/enter.js');
  const entryJSList = {};
  const entryHtmlList = [];

  for (const _path of entries) {
    const chunkName = _path.slice('./src/js/'.length, -'/enter.js'.length);
    entryJSList[chunkName] = _path;

    entryHtmlList.push(
      new HtmlWebpackPlugin({
        template: './src/' + chunkName + '.html',
        filename: chunkName + '.html',
        chunks: ['manifest', 'vendor', chunkName, 'commons'],
        minify: {
          removeAttributeQuotes: false,
        },
      })
    );
  }

  const plugins = [
    ...entryHtmlList,

    // 临时注释掉ESLint插件
    // new ESLintPlugin({
    //   extensions: ['js'],
    //   exclude: 'node_modules',
    // }),

    new MiniCssExtractPlugin({
      filename: `css/[name]${options.dev ? '' : '.[chunkhash:8]'}.css`,
      chunkFilename: `[id].css`,
    }),
    new webpack.optimize.SplitChunksPlugin({
      names: 'commons',
    }),
  ];
  if (!options.dev) plugins.push(new webpack.IgnorePlugin(/mock\/*/)); // ignore mock
  if (options.prod) {
    // add banner description
    plugins.push(new webpack.BannerPlugin(MY_BANNER));
  }

  return {
    stats: options.dev ? 'minimal' : 'normal',

    entry: entryJSList,

    resolve: {
      extensions: ['.js', '.css', 'less'],
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src'),
        mock: resolve(__dirname, 'src/mock'),
        lib: resolve(__dirname, 'src/js/lib'),
        css: resolve(__dirname, 'src/css'),
        less: resolve(__dirname, 'src/less'),
      },
    },

    output: {
      path: resolve(__dirname, 'dist'),
      filename: options.dev
        ? '[name].js'
        : //'js/[name].js',
          'js/[name].[chunkhash:8].js',
      chunkFilename: '[id].js?[chunkhash:8]',
    },

    devtool: (options.dev && 'cheap-module-source-map') || (options.prod ? false : 'source-map'),

    module: {
      rules: [
        // js
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', { targets: 'defaults' }]],
              },
            },
          ],
        },

        // html
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                ],
              },
            },
          },
        },

        // css
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')()],
                },
              },
            },
          ],
        },

        // less
        {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')()],
                },
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  strictMath: true,
                  plugins: [new LessFunc()],
                },
              },
            },
          ],
        },

        // image or font
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: IMAGE_LIMIT,
            },
          },
          generator: {
            filename: 'images/[contenthash:8][ext]',
          },
        },
      ],
    },

    plugins: plugins,

    devServer: {
      port: 3000,
      hot: true,
      static: {
        directory: join(__dirname, 'src'),
      },
      historyApiFallback: {
        index: '/assets/',
        disableDotRule: true,
      },
    },

    performance: {
      hints: options.dev ? false : 'warning',
    },
  };
};
