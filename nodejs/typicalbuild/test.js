const fs = require('fs');
const path = require('path');

/*function travel(dir, callback, foldercallback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
 
    if (fs.statSync(pathname).isDirectory()) {
        foldercallback(pathname);
      travel(pathname, callback, foldercallback);
    } else {
      callback(pathname);
    }
  });
}*/

/*travel(__dirname + '/webpack', p => {
    console.log(p)
}, d => {
    console.log(d)
});*/

const Typicalinit = require('./index');
Typicalinit.init({
  name: 'test',
  type: 'webpack',
  dirname: __dirname
});