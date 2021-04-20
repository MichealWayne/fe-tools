/**
 * server
 * @author whw
 */
if (typeof window === 'undefined') {
	global.window = {};
}

const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('./dist/index-server.js');
const CONFIGS = require('../config/configs');

const server = port => {
	const app = express();
	app.use(express.static(CONFIGS.dist));
	app.get('/', (req, res) => res.status(200).send(renderMarkip(renderToString(SSR))));
	
	app.listen(port, () => console.log('Server is running on port: ' + port));
}

const renderMarkip = str => {
	`<html>
	${str}
	</html>`
}

server(CONFIGS.port);