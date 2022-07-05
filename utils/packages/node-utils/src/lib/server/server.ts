/**
 * @module server
 * @description easy local server
 * @dependenies http-proxy
 * @author Wayne
 * @Date 2018-04-18 14:16:36
 * @LastEditTime 2022-07-05 10:07:31
 */

import fs from 'fs';
import path from 'path';
import http from 'http';

import Tip from '../util/tip';

const EXT_MAP = {
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

enum HTTP_RES_CODES {
  NOT_FOUND = 404,
  SUCCESS = 200,
}

/**
 * @function startServer
 * @description server function
 * @param {String} path server path
 * @param {Number} port listening port
 * @param {Function} callback Server started callback;
 */
const startServer = (serverPath: string, port = 8443, callback?: (...args: unknown[]) => void) => {
  const Folder = serverPath || path.join(__dirname, '../');
  const dport = port;
  const config = {
    port: dport,
    url: `http://localhost: ${dport}`,
  };

  const serve = http
    .createServer((req, res) => {
      let reqUrl = req.url!;

      if (reqUrl.charAt(reqUrl.length - 1) === '/') reqUrl += 'index.html';
      if (reqUrl.includes('?')) {
        [reqUrl] = reqUrl.split('?');
      }

      const { pathname } = new URL(reqUrl);

      // extension
      let ext = path.extname(pathname);
      ext = ext ? ext.slice(1) : 'unknow';
      Tip.log(reqUrl);

      const filePath = path.join(Folder, reqUrl);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          Tip.error(err);
          res.writeHead(HTTP_RES_CODES.NOT_FOUND, {
            'content-type': 'text/html;charset="utf-8"',
          });
          res.write(`<h1>${HTTP_RES_CODES.NOT_FOUND} not find</h1>`);
          res.end();
          return false;
        }

        res.writeHead(HTTP_RES_CODES.SUCCESS, {
          'content-type': `${EXT_MAP[ext as keyof typeof EXT_MAP]}text/plain;charset="utf-8"`,
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

export default startServer;
