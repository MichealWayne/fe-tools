'use strict';

const path = require('path');
const Tip = require('./base/lib/util/tip');
const { fsExistsSync } = require('./base/lib/fs/fsFuncs');
const dirname = process.cwd();

module.exports = {
  // server start
  server: (port, _dir, proxy) => {
    const dir = dir || dirname;
    let config;
    const configFile = path.join(dir, 'proxy.config.js');
    if (fsExistsSync(configFile)) {
      // 存在本地配置
      config = require(configFile);
    } else if (proxy) {
      config = {
        target: proxy,
        urls: ['/interface'],
      };
    }
    const startServer = require('./servebuild/index.js');
    startServer(dir, port, null, config);
  },

  // image build
  imginit: (config, base64, type, webp, pc) => {
    // get webp
    if (webp) {
      const { toWebpImg } = require('./imgbuild/index');
      toWebpImg(path.join(dirname, webp));
      return false;
    }

    // console base64
    if (base64) {
      const { consoleBase64 } = require('./imgbuild/index');
      consoleBase64(path.join(dirname, base64), type || base64.split('.')[1]);
      return false;
    }

    // build images
    const Imginit = require('./imgbuild/index').handleMobileImg;
    const configFile = config ? path.join(dirname, config) : path.join(dirname, 'img.config.js');

    if (fsExistsSync(configFile)) {
      // 存在本地配置
      const config = require(configFile);

      if (!config) {
        Tip.error(
          `Error! 图片配置文件不规范.The configuration file is not standard(not find export).`
        );
        return false;
      }
      config.dirname = dirname;
      config.pc = pc;
      Imginit(config);
    } else
      Imginit({
        dirname,
        pc,
      });
  },

  // typical task init
  typicalinit: (name, type) => {
    if (!type) {
      Tip.error('Error! 缺少配置类型.Missing configuration type.');
      return false;
    }

    const Typicalinit = require('./typicalbuild/index');
    Typicalinit.init({
      name,
      type,
      dirname,
    });
  },
};
