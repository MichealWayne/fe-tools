/**
 * @module HTTP
 * @description HTTP utilities for Node.js
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-16 11:28:39
 */
/// <reference types="node" />
import * as http from 'http';
/**
 * @function parseHeaders
 * @description 解析HTTP请求头。Parses HTTP headers
 * @param {object} headers - 请求头对象。Headers object
 * @returns {object} 解析后的请求头。Parsed headers
 * @example
 * const headers = parseHeaders(req.headers);
 */
export declare function parseHeaders(headers: http.IncomingHttpHeaders): Record<string, string>;
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
export declare function downloadFile(fileUrl: string, dest: string, options?: {
    maxRedirects?: number;
}): Promise<string>;
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
export declare function getJSON(requestUrl: string): Promise<any>;
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
export declare function postJSON(requestUrl: string, data: any): Promise<any>;
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
export declare function createSimpleServer(port: number, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void): http.Server;
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
export declare function createHTTPServer(port: number, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void): http.Server;
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
export declare function createSimpleProxy(target: string, port: number): http.Server;
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
export declare function uploadFile(filePath: string, requestUrl: string, options?: {
    method?: string;
    headers?: Record<string, string>;
    maxRedirects?: number;
}): Promise<string>;
/**
 * @function serveStatic
 * @description 创建静态文件服务器。Creates static file server
 * @param {string} rootDir - 根目录。Root directory
 * @param {number} port - 端口号。Port number
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const server = serveStatic('./public', 3000);
 */
export declare function serveStatic(rootDir: string, port: number): http.Server;
