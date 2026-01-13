"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var tip_1 = __importDefault(require("../logging/tip"));
var EXT_MAP = {
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
var HTTP_RES_CODES;
(function (HTTP_RES_CODES) {
    HTTP_RES_CODES[HTTP_RES_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
    HTTP_RES_CODES[HTTP_RES_CODES["SUCCESS"] = 200] = "SUCCESS";
})(HTTP_RES_CODES || (HTTP_RES_CODES = {}));
var DEFAULT_PORT = 8080;
var safeDecode = function (value) {
    try {
        return decodeURIComponent(value);
    }
    catch (_a) {
        return value;
    }
};
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
function getContentType(ext) {
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
var startServer = function (serverPath, port, callback) {
    if (port === void 0) { port = DEFAULT_PORT; }
    var folderPath = serverPath || path_1.default.join(__dirname, '../');
    var rootPath = path_1.default.resolve(folderPath);
    var listenPort = port;
    var url = "http://localhost:".concat(listenPort);
    var server = http_1.default.createServer(function (req, res) {
        var reqUrl = req.url || '/';
        if (reqUrl.endsWith('/'))
            reqUrl += 'index.html';
        if (reqUrl.includes('?'))
            reqUrl = reqUrl.split('?')[0];
        var pathname;
        try {
            pathname = new URL(reqUrl, url).pathname;
        }
        catch (_a) {
            pathname = reqUrl;
        }
        // 静态资源路径
        var safePath = safeDecode(pathname).replace(/\\/g, '/');
        var relativePath = safePath.replace(/^\/+/, '');
        var filePath = path_1.default.resolve(rootPath, relativePath);
        var ext = path_1.default.extname(filePath).slice(1).toLowerCase();
        if (filePath !== rootPath && !filePath.startsWith(rootPath + path_1.default.sep)) {
            tip_1.default.error("Path traversal blocked: ".concat(safePath));
            res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
            res.end('403 Forbidden');
            return;
        }
        tip_1.default.log("Request: ".concat(reqUrl, " -> ").concat(filePath));
        if (req.method === 'HEAD') {
            res.writeHead(HTTP_RES_CODES.SUCCESS, {
                'content-type': getContentType(ext),
            });
            res.end();
            return;
        }
        fs_1.default.readFile(filePath, function (err, data) {
            if (err) {
                tip_1.default.error("File not found: ".concat(filePath, " (").concat(err, ")"));
                res.writeHead(HTTP_RES_CODES.NOT_FOUND, {
                    'content-type': 'text/html; charset=utf-8',
                });
                res.end("<h1>".concat(HTTP_RES_CODES.NOT_FOUND, " Not Found</h1>"));
                return;
            }
            res.writeHead(HTTP_RES_CODES.SUCCESS, {
                'content-type': getContentType(ext) + '; charset=utf-8',
            });
            res.end(data);
        });
    });
    server.listen(listenPort, function () {
        tip_1.default.safe("Server started! Listening: ".concat(listenPort, " (").concat(url, ")"));
        if (callback)
            callback(url, server);
    });
};
exports.default = startServer;
