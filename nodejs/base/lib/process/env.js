// @document https://www.npmjs.com/package/minimist
const argv = require('minimist')(process.argv.slice(2));

module.exports = argv;
