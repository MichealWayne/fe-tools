import http from 'http';
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
declare const startServer: (serverPath: string, port?: number, callback?: ((url: string, server: http.Server) => void) | undefined) => void;
export default startServer;
