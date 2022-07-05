const glob = require('glob');
const path = require('path'),
    join = path.join;
const CONFIGS = require('./configs'),
    projectRoot = glob.sync(CONFIGS.root)[0];
let _cache = null;

// 获取页面
exports.useMPA =  function (callback) {
    if (!_cache) {
        const chunkNames = [],
              files = {},
              _files = glob.sync(join(projectRoot, '/src/pages/*/index.js'));
        for (let i = 0; i < _files.length; i++) {
            let path = _files[i];
            let _path = path.replace(projectRoot, '');
            let chunkName = _path.slice('/src/pages/'.length, -'/index.js'.length);
            chunkNames.push(chunkName);
            files[chunkName] = path;
        }
        _cache = {files, chunkNames};
    }
    callback(_cache)
};
