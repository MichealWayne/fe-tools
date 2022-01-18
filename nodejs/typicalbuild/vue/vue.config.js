/**
 * vue config
 * @author Wayne
 * @update 2021-01-06
 */

const webpack = require('webpack');
const CONFIG = require('./package.json');

const vuePages = {
  index: {
    entry: `src/main.js`,
    template: `src/index.html`,
    filename: `index.html`,
  },
};

const useSourceMap = !process.env.PROD;

// top banner
const MY_BANNER = `
  ${CONFIG.name}
  @version: ${CONFIG.version}
  @description: ${CONFIG.description}
  @author: ${CONFIG.author}
  @task: ${CONFIG.task || ''}
  @build time: ${new Date()}
`;

// document https://cli.vuejs.org/zh/config/
module.exports = {
  publicPath: './',

  productionSourceMap: useSourceMap,
  css: {
    sourceMap: useSourceMap,
  },

  devServer: {
    port: '3000',
    // proxy config
    proxy: false,
  },

  configureWebpack: () => {
    let plugins = [];

    if (process.env.NODE_ENV === 'production') plugins.push(new webpack.IgnorePlugin(/mock\/*/));
    if (process.env.PROD) plugins.push(new webpack.BannerPlugin(MY_BANNER));

    return {
      plugins,

      externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
      },
    };
  },

  pages: {
    ...vuePages,
  },
};
