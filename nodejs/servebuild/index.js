/*
* easy local server
* need http-proxy
* @author: Micheal Wang
* @update time: 2018.04.18
*/

'use strict';

const FILE_TYPES = require('./fileConfig');

const $ = {
    http: require('http'),
    fs: require('fs'),
    path: require('path'),
    url: require('url'),
    httpProxy: require('http-proxy')
};
const Tip = require($.path.join(__dirname, '../base/lib/util/tip'));


// 新建一个代理 Proxy Server 对象
let proxy
let startProxy = target => {
	if (!target) return false;
	
	Tip.safe('代理：' + target);
	proxy = $.httpProxy.createProxyServer({
		target: target,
		toProxy: true,
		changeOrigin: true
	});

	// 捕获异常
	proxy.on('error', function (err, req, res) {
		res.writeHead(500, {
			'Content-Type': 'text/plain'
		});
		res.end('Something went wrong. And we are reporting a custom error message.');
	});
};

/*
* server function
* @param {String} path: server path;
* @param {Number} port: listening port
* @param {Function} callback: Server started callback;
* @param {Object} proxyConfig: proxy interface config
*/
let startServer = (dpath, port, callback, proxyConfig) => {
    if (proxyConfig) console.log('proxy:', proxyConfig);
    let Folder = dpath || $.path.join(__dirname, '../'),
        dport = port || 8443;
    let config = {
        port: dport,
        url: 'http://localhost:' + dport
    };

    $.http.createServer((req, res) => {
        let host = req.headers.host;
        let url = req.url;
        if (url.charAt(url.length - 1) === '/') url += 'index.html';
        if (~url.indexOf('?')) url = url.split('?')[0];

        url = url.replace('/ifundapp_app', '').replace('/scym_scsy', '');
		
		if (proxyConfig && proxyConfig.target) {	// 代理
			startProxy(proxyConfig.target);
			let proxyArr = proxyConfig.urls;
			if (proxyArr && proxyArr.length) {	// 配置代理路径
				for (let i in proxyArr) {
					let item = proxyArr[i];
					if (!item) continue;
					if (~url.indexOf(item) &&
						url.indexOf(item) < 2) {
						Tip.safe(`${url}代理至` + item);

						delete req.headers.host;
						proxy.web(req, res, {
							target: proxyConfig.target,
							toProxy: true,
							changeOrigin: true
						});
						return
					}
				}
			}
		}

        let pathname = $.url.parse(url).pathname;

        // extension
        let ext = $.path.extname(pathname);
        ext = ext ? ext : 'unknow';
        Tip.log(url);

        let filePath = $.path.join(Folder, url);

        $.fs.readFile(filePath, (err, data) => {
            if (err) {

                Tip.error(err);
                res.writeHead(404, {
                    'content-type': 'text/html;charset="utf-8"'
                });
                res.write('<h1>404 not find</h1>');
                res.end();
                return false;
            }

            res.writeHead(200, {
                'content-type': FILE_TYPES[ext] || 'text/plain' + ';charset="utf-8"'
            });
            res.write(data);
            res.end();
        });
    }).listen(config.port);

    Tip.safe(`Server start!listen: ${config.port}(${config.url})`);
    if (callback) callback(config.url);
};

startServer(null, '3000');
module.exports = startServer;