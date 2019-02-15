/**
 * vue config
 */
 
const webpack = require('webpack');
const getTimeStr = require('ijijin_builder/base/lib/util/util').getTimeStr;
const CONFIG = require('./package.json');

let vuePages = {
    index:{
        entry: `src/main.js`,
        template: `src/index.html`,
        filename: `index.html`
    }
};

const useSourceMap = !process.env.PROD && true;
// top banner
const MY_BANNER = `
  ${CONFIG.name}
  @version: ${CONFIG.version}
  @description: ${CONFIG.description}
  @author: ${CONFIG.author}
  @task: ${CONFIG.task || ''}
  @build time: ${ getTimeStr() }
`;

module.exports = {
    publicPath: './',
    
	productionSourceMap: useSourceMap,
	css: {
		sourceMap: useSourceMap
	},
	
    devServer: {
        port: '3000',
        proxy: false	// proxy config
    },

    configureWebpack: config => {
		let _plugins = [];
		
		if (process.env.NODE_ENV === 'production') _plugins.push(new webpack.IgnorePlugin(/mock\/*/));
		if (process.env.PROD) _plugins.push(new webpack.BannerPlugin(MY_BANNER));
		
        return {
			plugins: _plugins,
			
            externals: {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios'
            }
        }
    },
	
	chainWebpack: config => {
        config.module
            .rule('ijijin')
            .test(/\.js$/)
            .include
            .add(/ijijin-view/)
            .end()
            .use('babel')
            .loader('babel-loader')
            .options({
                presets: [
                    ['@babel/preset-env', { modules: false }]
                ]
            });
    },

    pages: {
        ...vuePages
    }
};