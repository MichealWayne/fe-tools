/**
 * @module webpack.base
 * @author Wayne
 */

const glob = require('glob');
const path = require('path'),
  join = path.join;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
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
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules',
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name]${options.dev || options.prod ? '' : '.[contenthash:8]'}.css`,
      chunkFilename: `[id].css`,
    }),
  ];
  return {
    entry: entryJSList,
    output: {
      path: join(projectRoot, CONFIGS.dist),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: '[id].[contenthash:8].js',
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
            {
              loader: 'ts-loader',
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
                modules: {
                  localIdentName: '[local]_[hash:base64:8]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
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

        // image or font - using Asset Modules (webpack 5)
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10240, // 10kb
            },
          },
          generator: {
            filename: 'images/[contenthash:8][ext]',
          },
        },
      ],
    },
  };
};
