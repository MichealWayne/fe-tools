/*
 * easy local server
 * need http-proxy
 * @author: Micheal Wang
 * @update time: 2018.04.18
 */

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

const $ = {
  http: require('http'),
  fs: require('fs'),
  path: require('path'),
  url: require('url'),
};

/*
 * server function
 * @param {String} path: server path;
 * @param {Number} port: listening port
 * @param {Function} callback: Server started callback;
 */
const startServer = (serverPath: string, port = 8443, callback?: (...args: unknown[]) => void) => {
  const Folder = serverPath || $.path.join(__dirname, '../');
  const dport = port;
  const config = {
    port: dport,
    url: `http://localhost: ${dport}`,
  };

  // @todo remove any
  const serve = $.http
    .createServer((req: any, res: any) => {
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

      $.fs.readFile(filePath, (err: Error, data: string) => {
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
          'content-type': EXT_MAP[ext as keyof typeof EXT_MAP] || 'text/plain' + ';charset="utf-8"',
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
