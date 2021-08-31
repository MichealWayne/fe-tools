/*
 * easy local server
 * need http-proxy
 * @author: Micheal Wang
 * @update time: 2018.04.18
 */

'use strict';

const extObj = {
  css: 'text/css',
  html: 'text/html',
  js: 'text/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  txt: 'text/plain',
  xml: 'text/xml',

  gif: 'image/gif',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  png: 'image/png',
  svg: 'image/svg+xml',
  tiff: 'image/tiff',

  swf: 'application/x-shockwave-flash',
  wav: 'audio/x-wav',
  wma: 'audio/x-ms-wma',
  wmv: 'audio/x-ms-wmv',
};

const $ = {
  http: require('http'),
  fs: require('fs'),
  path: require('path'),
  url: require('url'),
};
const Tip = require($.path.join(__dirname, '../util/tip'));

/*
 * server function
 * @param {String} path: server path;
 * @param {Number} port: listening port
 * @param {Function} callback: Server started callback;
 */
const startServer = (dpath, port, callback) => {
  const Folder = dpath || $.path.join(__dirname, '../');
  const dport = port || 8443;
  const config = {
    port: dport,
    url: `http://localhost: ${dport}`,
  };

  const serve = $.http
    .createServer((req, res) => {
      let { url } = req;

      if (url.charAt(url.length - 1) === '/') url += 'index.html';
      if (url.includes('?')) {
        [url] = url.split('?');
      }

      const { pathname } = $.url.parse(url);

      // extension
      let ext = $.path.extname(pathname);
      ext = ext ? ext.slice(1) : 'unknow';
      Tip.log(url);

      const filePath = $.path.join(Folder, url);

      $.fs.readFile(filePath, (err, data) => {
        if (err) {
          Tip.error(err);
          res.writeHead(404, {
            'content-type': 'text/html;charset="utf-8"',
          });
          res.write('<h1>404 not find</h1>');
          res.end();
          return false;
        }

        res.writeHead(200, {
          'content-type': extObj[ext] || 'text/plain' + ';charset="utf-8"',
        });
        res.write(data);
        res.end();
        return true;
      });
    })
    .listen(config.port);

  Tip.safe(`Server start!listen: ${config.port}(${config.url})`);
  if (callback) callback(config.url, serve);
};

module.exports = startServer;
