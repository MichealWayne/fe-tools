const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const srcDir = path.resolve(process.cwd(), 'src');

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
  const jsPath = path.resolve(srcDir, 'js');
  const dirs = fs.readdirSync(jsPath);
  const matchs = [];
  const files = {};
  dirs.forEach(function (item) {
    matchs = item.match(/(.+)\.js$/);
    if (matchs) {
      files[matchs[1]] = [path.resolve(srcDir, 'js', item)];
    }
  });

  return files;
}

module.exports = {
  entry: getEntry(),
  output: {
    path: __dirname + '/src/js',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
