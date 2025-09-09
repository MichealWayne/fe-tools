/**
 * @fileoverview Local HTTP server utilities for static file serving, providing easy development server setup with automatic MIME type detection and directory indexing.
 *
 * This module provides a simple HTTP server implementation for serving static files during development.
 * It includes automatic MIME type detection, directory indexing, and customizable port configuration.
 * The server supports common file types including HTML, CSS, JavaScript, images, and other web assets.
 *
 * @module Server
 * @author Wayne
 * @since 1.0.0
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

/**
 * @function getContentType
 * @description 根据文件扩展名获取MIME类型。Gets the appropriate MIME type for a file extension using the predefined extension mapping.
 * @param {string} ext - 文件扩展名（不包含点）。File extension without the dot (e.g., 'html', 'css', 'js')
 * @returns {string} 对应的MIME类型。The corresponding MIME type or 'application/octet-stream' as fallback
 * @example
 * // Get MIME types for common file extensions
 * console.log(getContentType('html')); // 'text/html'
 * console.log(getContentType('css'));  // 'text/css'
 * console.log(getContentType('png'));  // 'image/png'
 * console.log(getContentType('xyz'));  // 'application/octet-stream' (fallback)
 */
function getContentType(ext: string): string {
  return EXT_MAP[ext] || 'application/octet-stream';
}

/**
 * @function startServer
 * @description 启动本地静态文件服务器，支持自动MIME类型检测。Starts a local static file server with automatic MIME type detection and directory indexing for development purposes.
 * @param {string} serverPath - 提供静态文件的根目录。Root directory to serve static files from
 * @param {number} [port=8080] - 监听端口号。Port number to listen on (defaults to 8080)
 * @param {(url: string, server: http.Server) => void} [callback] - 服务器启动时执行的可选回调函数。Optional callback executed when server starts successfully
 * @example
 * // Basic static server
 * startServer('./public', 3000);
 * // Serves files from ./public on http://localhost:3000
 *
 * @example
 * // Server with callback for custom handling
 * startServer('./dist', 8080, (url, server) => {
 *   console.log(`Development server running at ${url}`);
 *   console.log('Press Ctrl+C to stop');
 *
 *   // Graceful shutdown handling
 *   process.on('SIGINT', () => {
 *     server.close(() => {
 *       console.log('Server stopped');
 *       process.exit(0);
 *     });
 *   });
 * });
 *
 * @example
 * // Serve build output for preview
 * import path from 'path';
 * const buildDir = path.join(__dirname, '../build');
 * startServer(buildDir, 4000, (url) => {
 *   console.log(`Build preview available at ${url}`);
 * });
 *
 * @example
 * // Development server with auto-index
 * startServer('./src', 5000);
 * // Automatically serves index.html for directory requests
 * // Supports: HTML, CSS, JS, JSON, images, fonts, and more
 *
 * @see {@link getContentType} - MIME type detection function
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
