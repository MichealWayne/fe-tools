"use strict";
/* eslint-disable @typescript-eslint/no-empty-function */
/**
 * @module HTTP
 * @description HTTP utilities for Node.js
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-16 11:28:39
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveStatic = exports.uploadFile = exports.createSimpleProxy = exports.createHTTPServer = exports.createSimpleServer = exports.postJSON = exports.getJSON = exports.downloadFile = exports.parseHeaders = void 0;
var http = __importStar(require("http"));
var https = __importStar(require("https"));
var url = __importStar(require("url"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var DEFAULT_MAX_REDIRECTS = 5;
var safeDecode = function (value) {
    try {
        return decodeURIComponent(value);
    }
    catch (_a) {
        return value;
    }
};
var isRedirectStatus = function (statusCode) {
    return statusCode === 301 ||
        statusCode === 302 ||
        statusCode === 303 ||
        statusCode === 307 ||
        statusCode === 308;
};
/**
 * @function parseHeaders
 * @description 解析HTTP请求头。Parses HTTP headers
 * @param {object} headers - 请求头对象。Headers object
 * @returns {object} 解析后的请求头。Parsed headers
 * @example
 * const headers = parseHeaders(req.headers);
 */
function parseHeaders(headers) {
    var result = {};
    Object.keys(headers).forEach(function (key) {
        var value = headers[key];
        if (value === undefined) {
            return;
        }
        result[key] = Array.isArray(value) ? value.join(', ') : String(value);
    });
    return result;
}
exports.parseHeaders = parseHeaders;
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
function downloadFile(fileUrl, dest, options) {
    var _this = this;
    var _a;
    var maxRedirects = (_a = options === null || options === void 0 ? void 0 : options.maxRedirects) !== null && _a !== void 0 ? _a : DEFAULT_MAX_REDIRECTS;
    var attempt = function (currentUrl, redirectsLeft) {
        return new Promise(function (resolve, reject) {
            var protocol = currentUrl.startsWith('https') ? https : http;
            protocol
                .get(currentUrl, function (response) { return __awaiter(_this, void 0, void 0, function () {
                var statusCode, location, nextUrl, destDir, err_1, file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            statusCode = response.statusCode || 0;
                            location = response.headers.location;
                            if (isRedirectStatus(statusCode) && location) {
                                response.resume();
                                if (redirectsLeft <= 0) {
                                    reject(new Error("Too many redirects while downloading: ".concat(currentUrl)));
                                    return [2 /*return*/];
                                }
                                nextUrl = new url.URL(location, currentUrl).toString();
                                attempt(nextUrl, redirectsLeft - 1).then(resolve).catch(reject);
                                return [2 /*return*/];
                            }
                            if (statusCode < 200 || statusCode >= 300) {
                                response.resume();
                                reject(new Error("Failed to download file: ".concat(statusCode)));
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            destDir = path.dirname(dest);
                            return [4 /*yield*/, fs.promises.mkdir(destDir, { recursive: true })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            response.resume();
                            reject(err_1);
                            return [2 /*return*/];
                        case 4:
                            file = fs.createWriteStream(dest);
                            response.pipe(file);
                            file.on('finish', function () {
                                file.close();
                                resolve(dest);
                            });
                            file.on('error', function (err) {
                                fs.unlink(dest, function () { });
                                reject(err);
                            });
                            return [2 /*return*/];
                    }
                });
            }); })
                .on('error', function (err) {
                fs.unlink(dest, function () { });
                reject(err);
            });
        });
    };
    return attempt(fileUrl, maxRedirects);
}
exports.downloadFile = downloadFile;
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
function getJSON(requestUrl) {
    return new Promise(function (resolve, reject) {
        var protocol = requestUrl.startsWith('https') ? https : http;
        protocol
            .get(requestUrl, function (res) {
            var data = '';
            var statusCode = res.statusCode || 0;
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                if (statusCode < 200 || statusCode >= 300) {
                    reject(new Error("Request failed with status ".concat(statusCode)));
                    return;
                }
                try {
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    reject(new Error('Failed to parse JSON response'));
                }
            });
        })
            .on('error', reject);
    });
}
exports.getJSON = getJSON;
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
function postJSON(requestUrl, data) {
    return new Promise(function (resolve, reject) {
        var parsedUrl = new url.URL(requestUrl);
        var protocol = requestUrl.startsWith('https') ? https : http;
        var postData = JSON.stringify(data);
        var options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
            },
        };
        var req = protocol.request(options, function (res) {
            var responseData = '';
            var statusCode = res.statusCode || 0;
            res.on('data', function (chunk) {
                responseData += chunk;
            });
            res.on('end', function () {
                if (statusCode < 200 || statusCode >= 300) {
                    reject(new Error("Request failed with status ".concat(statusCode)));
                    return;
                }
                try {
                    resolve(JSON.parse(responseData));
                }
                catch (e) {
                    resolve(responseData);
                }
            });
        });
        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}
exports.postJSON = postJSON;
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
function createSimpleServer(port, handler) {
    var server = http.createServer(handler);
    server.listen(port, function () {
        console.log("Server running at http://localhost:".concat(port, "/"));
    });
    return server;
}
exports.createSimpleServer = createSimpleServer;
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
function createHTTPServer(port, handler) {
    return createSimpleServer(port, handler);
}
exports.createHTTPServer = createHTTPServer;
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
function createSimpleProxy(target, port) {
    var targetUrl = new url.URL(target);
    var protocol = targetUrl.protocol === 'https:' ? https : http;
    var server = http.createServer(function (req, res) {
        var proxyReq = protocol.request({
            hostname: targetUrl.hostname,
            port: targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80),
            path: req.url,
            method: req.method,
            headers: __assign(__assign({}, req.headers), { host: targetUrl.host }),
        }, function (proxyRes) {
            res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
            proxyRes.pipe(res);
        });
        proxyReq.on('error', function (err) {
            res.writeHead(502, { 'Content-Type': 'text/plain' });
            res.end("Proxy error: ".concat(err.message));
        });
        req.pipe(proxyReq);
    });
    server.listen(port, function () {
        console.log("Proxy running at http://localhost:".concat(port, " -> ").concat(target));
    });
    return server;
}
exports.createSimpleProxy = createSimpleProxy;
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
function uploadFile(filePath, requestUrl, options) {
    var _this = this;
    var _a;
    var maxRedirects = (_a = options === null || options === void 0 ? void 0 : options.maxRedirects) !== null && _a !== void 0 ? _a : DEFAULT_MAX_REDIRECTS;
    var method = (options === null || options === void 0 ? void 0 : options.method) || 'POST';
    var attempt = function (currentUrl, redirectsLeft) {
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var stats, err_2, parsedUrl, protocol, headers, req, stream;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.stat(filePath)];
                    case 1:
                        stats = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        reject(err_2);
                        return [2 /*return*/];
                    case 3:
                        parsedUrl = new url.URL(currentUrl);
                        protocol = currentUrl.startsWith('https') ? https : http;
                        headers = __assign({ 'Content-Length': stats.size, 'Content-Type': 'application/octet-stream' }, options === null || options === void 0 ? void 0 : options.headers);
                        req = protocol.request({
                            hostname: parsedUrl.hostname,
                            port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                            path: parsedUrl.pathname + parsedUrl.search,
                            method: method,
                            headers: headers,
                        }, function (res) {
                            var statusCode = res.statusCode || 0;
                            var location = res.headers.location;
                            var responseData = '';
                            res.on('data', function (chunk) {
                                responseData += chunk;
                            });
                            res.on('end', function () {
                                if (isRedirectStatus(statusCode) && location) {
                                    if (redirectsLeft <= 0) {
                                        reject(new Error("Too many redirects while uploading: ".concat(currentUrl)));
                                        return;
                                    }
                                    var nextUrl = new url.URL(location, currentUrl).toString();
                                    resolve(attempt(nextUrl, redirectsLeft - 1));
                                    return;
                                }
                                if (statusCode < 200 || statusCode >= 300) {
                                    reject(new Error("Upload failed with status ".concat(statusCode)));
                                    return;
                                }
                                resolve(responseData);
                            });
                        });
                        req.on('error', reject);
                        stream = fs.createReadStream(filePath);
                        stream.on('error', reject);
                        stream.pipe(req);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return attempt(requestUrl, maxRedirects);
}
exports.uploadFile = uploadFile;
/**
 * @function serveStatic
 * @description 创建静态文件服务器。Creates static file server
 * @param {string} rootDir - 根目录。Root directory
 * @param {number} port - 端口号。Port number
 * @returns {http.Server} HTTP服务器实例。HTTP server instance
 * @example
 * const server = serveStatic('./public', 3000);
 */
function serveStatic(rootDir, port) {
    var mimeTypes = {
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
    var rootPath = path.resolve(rootDir);
    return createSimpleServer(port, function (req, res) {
        var parsedUrl = url.parse(req.url || '/');
        var pathname = parsedUrl.pathname || '/';
        // Default to index.html if pathname is a directory
        if (pathname === '/')
            pathname = '/index.html';
        var safePath = safeDecode(pathname).replace(/\\/g, '/');
        var relativePath = safePath.replace(/^\/+/, '');
        var filePath = path.resolve(rootPath, relativePath);
        var ext = path.extname(filePath);
        var contentType = mimeTypes[ext] || 'application/octet-stream';
        if (filePath !== rootPath && !filePath.startsWith(rootPath + path.sep)) {
            res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('403 Forbidden');
            return;
        }
        fs.readFile(filePath, function (err, data) {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                }
                else {
                    res.writeHead(500);
                    res.end("Server Error: ".concat(err.code));
                }
            }
            else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            }
        });
    });
}
exports.serveStatic = serveStatic;
