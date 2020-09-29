/**
 * @module webpack.dll
 * @author whw
 */

const path = require('path');
const webpack = require('webpack');
const CONFIGS = require('./configs');

// top banner
const MY_BANNER = `
${CONFIGS.name} library
@packer: ${CONFIGS.author}
@version: ${CONFIGS.version}
`;

module.exports = (options = {}) => {
    return {
        context: CONFIGS.root,

        resolve: {
            extensions: ['.js', '.jsx', '.json', '.less', '.css'],
            modules: [__dirname, 'node_modules']
        },

        entry: {
            corejs: [
                'core-js/es/set',
                'core-js/es/map',
                'react',
                'react-dom',
                'redux',
                'react-router',
                'react-redux',
                'fundcharts'
            ]
        },
        
        output: {
            filename: '[name].set_map.js',
            path: path.join(CONFIGS.root, 'lib'),
            library: '[name]'
        },
        
        plugins: [
            new webpack.BannerPlugin(MY_BANNER),
            new webpack.DllPlugin({
                name: '[name]',
                path: path.join(CONFIGS.root, 'lib/[name].json')
            })
        ]
    }
};

