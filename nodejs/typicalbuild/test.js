const fs = require('fs');
const path = require('path');


const Typicalinit = require('./index');
Typicalinit.init({
  name: 'test',
  type: 'webpack',
  dirname: __dirname
});