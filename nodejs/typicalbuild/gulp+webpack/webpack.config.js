var webpack = require("webpack");
var path = require("path");
var fs = require("fs");


var srcDir = path.resolve(process.cwd(), 'src');
console.log("-----srcDir: " + srcDir);

//获取多页面的每个入口文件，用于配置中的entry
function getEntry () {
    var jsPath = path.resolve(srcDir,'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if(matchs){
            files[matchs[1]] = [path.resolve(srcDir,'js',item)];
        }
    })

    return files;
}


module.exports = {    
    entry: getEntry(),    
    output: {    
        path: __dirname + "/src/js",    
        filename: '[name].js',    
    },    
    module: {    
        loaders: [{    
            test: /\.js$/,    
            exclude: /node_modules/,    
            loader: 'babel-loader'    
        }]    
    }    
}    