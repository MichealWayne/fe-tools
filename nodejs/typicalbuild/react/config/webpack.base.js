/**
 * @module webpack.base
 * @author Wayne
 */

const glob = require('glob');
const path = require('path'),
  join = path.join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const LessFunc = require('less-plugin-functions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CONFIGS = require('./configs'),
  projectRoot = glob.sync(CONFIGS.root)[0];
const { useMPA } = require('./fn');

let htmlWebpackPlugins = [];
let entryJSList = {};

useMPA(({ files, chunkNames }) => {
  for (let chunkName of chunkNames) {
    entryJSList[chunkName] = ['react-hot-loader/patch', files[chunkName]];
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: `${projectRoot}/src/pages/${chunkName}/index.html`,
        filename: `${chunkName}.html`,
        chunks: ['vendors', chunkName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  }
});

module.exports = options => {
  const isMobile = (CONFIGS.platform || '').toLowerCase() !== 'pc';
  let plugins = [
    ...htmlWebpackPlugins,
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `css/[name]${options.dev || options.prod ? '' : '.[contenthash:8]'}.css`,
      chunkFilename: `[id].css`,
    }),
  ];
  return {
    entry: entryJSList,
    output: {
      path: join(projectRoot, CONFIGS.dist),
      filename: 'js/[name].[hash:8].js',
      chunkFilename: '[id].js?[hash:8]',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(projectRoot, 'src'),
      },
    },
    plugins,
    module: {
      rules: [
        // js
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.(ts|tsx)$/,
          use: [
            'cache-loader',
            {
              loader: 'awesome-typescript-loader',
            },
          ],
        },

        // html
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              root: path.resolve(projectRoot, 'src'),
              attrs: ['img:src'],
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
                plugins: [require('autoprefixer')()],
              },
            },
          ],
        },

        // less
        {
          test: /\.less$/,
          use: [
            options.dev
              ? {
                  loader: 'style-loader',
                }
              : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  },
                },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:8]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')()].concat(
                  isMobile
                    ? [
                        require('postcss-px-to-viewport')({
                          unitToConvert: 'px',
                          viewportWidth: 750, // UI size
                          unitPrecision: 5,
                          propList: ['*'],
                          viewportUnit: 'vw',
                          fontViewportUnit: 'vw',
                          selectorBlackList: ['ig-'], // ignore
                          minPixelValue: 1,
                          mediaQuery: true,
                          replace: true,
                        }),
                      ]
                    : []
                ),
              },
            },
            {
              loader: 'less-loader',
              options: {
                strictMath: true,
                plugins: [new LessFunc()],
              },
            },
          ],
        },

        // image or font
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240,
                name: 'images/[hash:8].[ext]',
              },
            },
            {
              loader: 'image-webpack-loader', // 压缩图片
            },
          ],
        },
      ],
    },
  };
};
