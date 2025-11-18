/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @module HTTP
 * @description HTTP utilities for Node.js
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-16 11:28:39
 */

import * as http from 'http';
import * as https from 'https';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

/**
 * @function parseHeaders
 * @description 解析HTTP请求头。Parses HTTP headers
 * @param {object} headers - 请求头对象。Headers object
 * @returns {object} 解析后的请求头。Parsed headers
 * @example
 * const headers = parseHeaders(req.headers);
 */
export function parseHeaders(headers: http.IncomingHttpHeaders): Record<string, string> {
  const result: Record<string, string> = {};
  Object.keys(headers).forEach(key => {
    const value = headers[key];
    result[key] = Array.isArray(value) ? value.join(', ') : (value as string);
  });
  return result;
}

/**
 * @function downloadFile
 * @description 下载文件。Downloads a file
 * @param {string} fileUrl - 文件URL。File URL
 * @param {string} dest - 目标路径。Destination path
 * @returns {Promise<string>} 下载的文件路径。Downloaded file path
 * @example
 * downloadFile('https://example.com/file.pdf', './downloads/file.pdf')
 *   .then(filePath => console.log(`Downloaded to ${filePath}`))
 *   .catch(err => console.error(err));
 */
export function downloadFile(fileUrl: string, dest: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const protocol = fileUrl.startsWith('https') ? https : http;

    protocol
      .get(fileUrl, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download file: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve(dest);
        });
      })
      .on('error', err => {
        fs.unlink(dest, () => {}); // Delete the file on error
        reject(err);
      });

    file.on('error', err => {
      fs.unlink(dest, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

/**
 * @function getJSON
 * @description 发送GET请求获取JSON数据。Sends GET request to get JSON data
 * @param {string} requestUrl - 请求URL。Request URL
 * @returns {Promise<any>} JSON响应数据。JSON response data
 * @example
 * getJSON('https://api.example.com/data')
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 */
export function getJSON(requestUrl: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const protocol = requestUrl.startsWith('https') ? https : http;

    protocol
      .get(requestUrl, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        });
      })
      .on('error', reject);
  });
}

/**
 * @function postJSON
 * @description 发送POST请求。Sends POST request with JSON data
 * @param {string} requestUrl - 请求URL。Request URL
 * @param {object} data - 要发送的数据。Data to send
 * @returns {Promise<any>} 响应数据。Response data
 * @example
 * postJSON('https://api.example.com/users', { name: 'John', email: 'john@example.com' })
 *   .then(response => console.log(response))
 *   .catch(err => console.error(err));
 */
export function postJSON(requestUrl: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new url.URL(requestUrl);
    const protocol = requestUrl.startsWith('https') ? https : http;
    const postData = JSON.stringify(data);

    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = protocol.request(options, res => {
      let responseData = '';

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve(responseData);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * @function createSimpleServer
 * @description 创建简单的HTTP服务器。Creates a simple HTTP server
 * @param {number} port - 端口号。Port number
 * @param {Function} handler - 请求处理函数。Request handler function
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const server = createSimpleServer(3000, (req, res) => {
 *   res.writeHead(200, { 'Content-Type': 'text/plain' });
 *   res.end('Hello World');
 * });
 */
export function createSimpleServer(
  port: number,
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
): http.Server {
  const server = http.createServer(handler);
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  return server;
}

/**
 * @function serveStatic
 * @description 创建静态文件服务器。Creates static file server
 * @param {string} rootDir - 根目录。Root directory
 * @param {number} port - 端口号。Port number
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const server = serveStatic('./public', 3000);
 */
export function serveStatic(rootDir: string, port: number): http.Server {
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
  };

  return createSimpleServer(port, (req, res) => {
    const parsedUrl = url.parse(req.url || '/');
    let pathname = parsedUrl.pathname || '/';

    // Default to index.html if pathname is a directory
    if (pathname === '/') pathname = '/index.html';

    const filePath = path.join(rootDir, pathname);
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });
}
