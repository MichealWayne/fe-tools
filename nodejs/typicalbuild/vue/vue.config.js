let vuePages = {
    index:{
        entry: `src/main.js`,
        template: `src/index.html`,
        filename: `index.html`
    }
};

module.exports = {
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        port: '3000',
        proxy: false	// proxy config
    },

    configureWebpack: config => {
        return {
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