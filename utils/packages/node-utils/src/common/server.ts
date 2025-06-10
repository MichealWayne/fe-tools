/**
 * @module server
 * @description easy local server
 * @dependenies http-proxy
 * @author Wayne
 * @Date 2018-04-18 14:16:36
 * @LastEditTime 2025-06-09 19:18:33
 */
import fs from 'fs';
import path from 'path';
import http, { IncomingMessage, ServerResponse } from 'http';
import Tip from '../logging/tip';

const EXT_MAP: Record<string, string> = {
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

const DEFAULT_PORT = 8080;

function getContentType(ext: string): string {
  return EXT_MAP[ext] || 'application/octet-stream';
}

/**
 * @function startServer
 * @description 启动本地静态资源服务器
 * @param {string} serverPath 静态资源根目录
 * @param {number} port 监听端口
 * @param {(url: string, server: http.Server) => void} [callback] 启动回调
 */
const startServer = (
  serverPath: string,
  port = DEFAULT_PORT,
  callback?: (url: string, server: http.Server) => void
) => {
  const folderPath = serverPath || path.join(__dirname, '../');
  const listenPort = port;
  const url = `http://localhost:${listenPort}`;

  const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    let reqUrl = req.url || '/';
    if (reqUrl.endsWith('/')) reqUrl += 'index.html';
    if (reqUrl.includes('?')) reqUrl = reqUrl.split('?')[0];

    let pathname: string;
    try {
      pathname = new URL(reqUrl, url).pathname;
    } catch {
      pathname = reqUrl;
    }

    // 静态资源路径
    const ext = path.extname(pathname).slice(1).toLowerCase();
    const filePath = path.join(folderPath, pathname);

    Tip.log(`Request: ${reqUrl} -> ${filePath}`);

    if (req.method === 'HEAD') {
      res.writeHead(HTTP_RES_CODES.SUCCESS, {
        'content-type': getContentType(ext),
      });
      res.end();
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        Tip.error(`File not found: ${filePath} (${err})`);
        res.writeHead(HTTP_RES_CODES.NOT_FOUND, {
          'content-type': 'text/html; charset=utf-8',
        });
        res.end(`<h1>${HTTP_RES_CODES.NOT_FOUND} Not Found</h1>`);
        return;
      }

      res.writeHead(HTTP_RES_CODES.SUCCESS, {
        'content-type': getContentType(ext) + '; charset=utf-8',
      });
      res.end(data);
    });
  });

  server.listen(listenPort, () => {
    Tip.safe(`Server started! Listening: ${listenPort} (${url})`);
    if (callback) callback(url, server);
  });
};

export default startServer;
