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

const DEFAULT_MAX_REDIRECTS = 5;

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const isRedirectStatus = (statusCode?: number) =>
  statusCode === 301 ||
  statusCode === 302 ||
  statusCode === 303 ||
  statusCode === 307 ||
  statusCode === 308;

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
    if (value === undefined) {
      return;
    }
    result[key] = Array.isArray(value) ? value.join(', ') : String(value);
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
export function downloadFile(
  fileUrl: string,
  dest: string,
  options?: { maxRedirects?: number }
): Promise<string> {
  const maxRedirects = options?.maxRedirects ?? DEFAULT_MAX_REDIRECTS;

  const attempt = (currentUrl: string, redirectsLeft: number): Promise<string> =>
    new Promise((resolve, reject) => {
      const protocol = currentUrl.startsWith('https') ? https : http;

      protocol
        .get(currentUrl, async response => {
          const statusCode = response.statusCode || 0;
          const location = response.headers.location;

          if (isRedirectStatus(statusCode) && location) {
            response.resume();
            if (redirectsLeft <= 0) {
              reject(new Error(`Too many redirects while downloading: ${currentUrl}`));
              return;
            }
            const nextUrl = new url.URL(location, currentUrl).toString();
            attempt(nextUrl, redirectsLeft - 1).then(resolve).catch(reject);
            return;
          }

          if (statusCode < 200 || statusCode >= 300) {
            response.resume();
            reject(new Error(`Failed to download file: ${statusCode}`));
            return;
          }

          try {
            const destDir = path.dirname(dest);
            await fs.promises.mkdir(destDir, { recursive: true });
          } catch (err) {
            response.resume();
            reject(err);
            return;
          }
          const file = fs.createWriteStream(dest);

          response.pipe(file);

          file.on('finish', () => {
            file.close();
            resolve(dest);
          });

          file.on('error', err => {
            fs.unlink(dest, () => {});
            reject(err);
          });
        })
        .on('error', err => {
          fs.unlink(dest, () => {});
          reject(err);
        });
    });

  return attempt(fileUrl, maxRedirects);
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
        const statusCode = res.statusCode || 0;

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          if (statusCode < 200 || statusCode >= 300) {
            reject(new Error(`Request failed with status ${statusCode}`));
            return;
          }
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
      const statusCode = res.statusCode || 0;

      res.on('data', chunk => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error(`Request failed with status ${statusCode}`));
          return;
        }
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
 * @function createHTTPServer
 * @description 创建基础HTTP服务器。Creates a basic HTTP server
 * @param {number} port - 端口号。Port number
 * @param {Function} handler - 请求处理函数。Request handler function
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const server = createHTTPServer(3000, (req, res) => {
 *   res.writeHead(200, { 'Content-Type': 'text/plain' });
 *   res.end('Hello');
 * });
 *
 * @example
 * const server = createHTTPServer(8080, (req, res) => {
 *   res.end(JSON.stringify({ ok: true }));
 * });
 */
export function createHTTPServer(
  port: number,
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void
): http.Server {
  return createSimpleServer(port, handler);
}

/**
 * @function createSimpleProxy
 * @description 创建简单的HTTP代理服务器。Creates a simple HTTP proxy server
 * @param {string} target - 目标服务地址。Target server URL
 * @param {number} port - 代理监听端口。Proxy listen port
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const proxy = createSimpleProxy('http://localhost:4000', 3001);
 *
 * @example
 * // Proxy HTTPS target
 * const proxy = createSimpleProxy('https://example.com', 3002);
 */
export function createSimpleProxy(target: string, port: number): http.Server {
  const targetUrl = new url.URL(target);
  const protocol = targetUrl.protocol === 'https:' ? https : http;

  const server = http.createServer((req, res) => {
    const proxyReq = protocol.request(
      {
        hostname: targetUrl.hostname,
        port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
        path: req.url,
        method: req.method,
        headers: { ...req.headers, host: targetUrl.host },
      },
      proxyRes => {
        res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    proxyReq.on('error', err => {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end(`Proxy error: ${err.message}`);
    });

    req.pipe(proxyReq);
  });

  server.listen(port, () => {
    console.log(`Proxy running at http://localhost:${port} -> ${target}`);
  });

  return server;
}

/**
 * @function uploadFile
 * @description 上传文件到指定URL。Uploads a file to the specified URL
 * @param {string} filePath - 本地文件路径。Local file path
 * @param {string} requestUrl - 上传目标URL。Upload target URL
 * @param {object} [options] - 可选配置。Optional configuration
 * @param {string} [options.method='POST'] - 请求方法。HTTP method
 * @param {Record<string, string>} [options.headers] - 额外请求头。Additional headers
 * @param {number} [options.maxRedirects=5] - 最大重定向次数。Max redirects
 * @returns {Promise<string>} 响应内容。Response body
 * @example
 * await uploadFile('./file.txt', 'https://example.com/upload');
 *
 * @example
 * await uploadFile('./image.png', 'https://example.com/upload', {
 *   headers: { Authorization: 'Bearer token' }
 * });
 */
export function uploadFile(
  filePath: string,
  requestUrl: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    maxRedirects?: number;
  }
): Promise<string> {
  const maxRedirects = options?.maxRedirects ?? DEFAULT_MAX_REDIRECTS;
  const method = options?.method || 'POST';

  const attempt = (currentUrl: string, redirectsLeft: number): Promise<string> =>
    new Promise(async (resolve, reject) => {
      let stats: fs.Stats;
      try {
        stats = await fs.promises.stat(filePath);
      } catch (err) {
        reject(err);
        return;
      }
      const parsedUrl = new url.URL(currentUrl);
      const protocol = currentUrl.startsWith('https') ? https : http;

      const headers = {
        'Content-Length': stats.size,
        'Content-Type': 'application/octet-stream',
        ...options?.headers,
      };

      const req = protocol.request(
        {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
          path: parsedUrl.pathname + parsedUrl.search,
          method,
          headers,
        },
        res => {
          const statusCode = res.statusCode || 0;
          const location = res.headers.location;
          let responseData = '';

          res.on('data', chunk => {
            responseData += chunk;
          });

          res.on('end', () => {
            if (isRedirectStatus(statusCode) && location) {
              if (redirectsLeft <= 0) {
                reject(new Error(`Too many redirects while uploading: ${currentUrl}`));
                return;
              }
              const nextUrl = new url.URL(location, currentUrl).toString();
              resolve(attempt(nextUrl, redirectsLeft - 1));
              return;
            }

            if (statusCode < 200 || statusCode >= 300) {
              reject(new Error(`Upload failed with status ${statusCode}`));
              return;
            }

            resolve(responseData);
          });
        }
      );

      req.on('error', reject);

      const stream = fs.createReadStream(filePath);
      stream.on('error', reject);
      stream.pipe(req);
    });

  return attempt(requestUrl, maxRedirects);
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

  const rootPath = path.resolve(rootDir);

  return createSimpleServer(port, (req, res) => {
    const parsedUrl = url.parse(req.url || '/');
    let pathname = parsedUrl.pathname || '/';

    // Default to index.html if pathname is a directory
    if (pathname === '/') pathname = '/index.html';

    const safePath = safeDecode(pathname).replace(/\\/g, '/');
    const relativePath = safePath.replace(/^\/+/, '');
    const filePath = path.resolve(rootPath, relativePath);
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    if (filePath !== rootPath && !filePath.startsWith(rootPath + path.sep)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('403 Forbidden');
      return;
    }

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
