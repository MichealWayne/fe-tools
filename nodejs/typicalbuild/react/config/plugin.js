// const Config = require('./configs');
// const fs = require('fs');

class IjijinPlugin {
    constructor(options) {
        this.options = options;
        this.JSON_DATA = "";
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('IjijinPlugin', compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
                'IjijinPlugin',
                (data, cb) => {
                    // if (this.options.prod) {
                    //     const prefix = `//s.thsi.cn/ijijin/${Config.author}/${Config.name}/${Config.version}`;
                    //
                    //     let jsList = data.assets.js || [], cssList = data.assets.css || [];
                    //     if (~Config.thsi.indexOf('js')) {
                    //         for (let i = 0; i < jsList.length; i++) {
                    //             let jsName = jsList[i];
                    //             if (/^js\//.test(jsName)) {
                    //                 jsList[i] = `${prefix}/${jsName.split('.')[0]}.js`
                    //             }
                    //         }
                    //     }
                    //
                    //     if (~Config.thsi.indexOf('css')) {
                    //         for (let i = 0; i < cssList.length; i++) {
                    //             let cssName = cssList[i];
                    //             if (/^css\//.test(cssName)) {
                    //                 cssList[i] = `${prefix}/${cssName.split('.')[0]}.css`
                    //             }
                    //         }
                    //     }
                    //     let obj = {
                    //         js: jsList,
                    //         css: cssList
                    //     }
                    //     this.JSON_DATA = JSON.stringify(obj);
                    // }
                    cb(null, data)
                }
            )
        });
        compiler.hooks.afterEmit.tap('IjijinPlugin', compilation => {
            // fs.writeFile('./dist/preload.json', this.JSON_DATA, 'utf-8', (err) => {
            //     if (err) {
            //         console.error(err);
            //     }
            // })
        });
    }
}

module.exports = IjijinPlugin;
