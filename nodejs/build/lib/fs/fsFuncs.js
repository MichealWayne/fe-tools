'use strict';

const fs = require('fs');
const path = require('path');
const colors = require(path.join(__dirname, '../util/colors.js'));
require(path.join(__dirname, '../util/util.js'));


// find folder or file
// @param {String} path: folder or file path;
// @return {Boolean}: if exist, true || false;
function fsExistsSync (folderPath) {
    try {
        fs.accessSync(folderPath, fs.F_OK);
    } catch (e) {
        return false;
    }

    return true;
}

// find folder, if not exist, build it
// @param {String} path: folder path;
function setFolder (folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    } else {
        console.log(colors.get('FgMagenta'), `\r\n${folderPath}目录已存在`);
    }
}

// find file, if not exist, build it
function setFile (filePath, filedata) {
    let dirpath = path.dirname(filePath);

    setFolder(dirpath);

    if (!filedata) return;
    if (fsExistsSync(filePath)) {    // already has file
        fs.readFile(filePath, {
            encoding: 'utf8'
        }, function (err, data) {
            if (err) {
                console.log(colors.get('FgRed'), err);
                return false;
            }

            let _data = data ? (data.indexOf(filedata) > -1 ? data : data + filedata) : filedata;

            fs.writeFile(filePath, _data, {
                encoding: 'utf8'
            }, (err) => {
                if (err) {
                    console.log(colors.get('FgRed'), err);
                    return false;
                }

                console.log(colors.get('FgCyan'), `${filePath}创建成功`);
            });
        });
    } else { // new file

        fs.appendFile(filePath, filedata, {
            encoding: 'utf8'
        }, (err) => {
            if (err) {
                console.log(colors.get('FgRed'), err);
                return false;
            }

            console.log(colors.get('FgCyan'), `${filePath}创建成功`);
        });
    }
}

// build style.css
// @param {String} styleData: css data;
// @param {String} distPath: output path; 
function buildCssFile (styleData, distPath) {
    const folderPath = path.join(distPath, 'css');
    const cssPath = path.join(folderPath, 'style.css');

    setFile(cssPath, styleData);
}

// build js file
function buildJsFile (jsArr, distPath) {
    // build single js file
    function appendJs (dist, filename, data) {
        const jsPath = path.join(dist, 'js', filename + '.js');

        setFile(jsPath, data);
    }

    const folderPath = path.join(distPath, 'js');
    setFolder(folderPath);

    let jsname = [];
    let jsArrlength = jsArr.length,
        reg = /@@(.*)@@/;

    for (let i = 0; i < jsArrlength; i++) {
        let _d = jsArr[i].match(reg);
        jsname[i] = _d.length > 1 ? _d[1].replace(reg).trim() : '';
    }

    if (!jsname[0]) {
        console.log('No js file or no module statement.');
        return false;
    }

    for (let i = 0; i < jsArrlength; i++) {
        appendJs(distPath, jsname[i], jsArr[i]);
    }
}

// render templates
// @param {String} srcPath: module page path;
// @param {Function} callback: callback function;
function renderTemplates (srcPath, callback) {
    if (!srcPath) return false;
    let folderPath = path.dirname(srcPath);

    fs.readFile(srcPath, {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            console.log(colors.get('FgRed'), err);
            return false;
        }

        let dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, (matchs, m1) => {
            return fs.readFileSync(path.join(folderPath, m1), {
                encoding: 'utf8'
            });
        });

        dataReplace = dataReplace.replace(/"\.\.\//g, '"');
        if (callback) callback(dataReplace);
    });
}

module.exports = {
    fsExistsSync,
    setFolder,
    setFile,
    buildCssFile,
    buildJsFile,
    renderTemplates
};
