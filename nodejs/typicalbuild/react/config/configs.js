/**
 * @module option
 * @author whw
 */

const path = require('path');
const pkg = require(path.join(__dirname, '../package.json'));
const used_keys = [
	'name', 
	'version', 
	'platform', 
	'task', 
  'thsi',
	'author',
	'author',
	'description', 
	'main', 
	'port', 
	'proxy', 
	'autoprefixer'
];

let Options = {
	root: process.cwd(),
	dist: 'dist',
	lmageLimit: 5000
};
for (let key of used_keys) {
	Options[key] = pkg[key] || '';
}

module.exports = Options;