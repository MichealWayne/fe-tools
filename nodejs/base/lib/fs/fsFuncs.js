'use strict';

const fs = require('fs');
const path = require('path');
const colors = require(path.join(__dirname, '../util/colors.js'));
const Tip = require(path.join(__dirname, '../util/tip.js'));

/*
 * 遍历文件夹
 */
function travelFolderSync(dir, callback, foldercallback) {
    fs.readdirSync(dir).forEach(function(file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            foldercallback(pathname);
            travelFolderSync(pathname, callback, foldercallback);
        } else {
            callback(pathname);
        }
    });
}

//同步创建目录
/**
 * @param [in] dirpath 要创建的目录,支持多层级创建
 */
function mkdirsSync(dirpath, mode) {
    try {
        if (!fs.existsSync(dirpath)) {
            let pathtmp;
            dirpath.split(/[/\\]/).forEach(function(dirname) { //这里指用/ 或\ 都可以分隔目录  如  linux的/usr/local/services   和windows的 d:\temp\aaaa
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                } else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            });
        }
        return true;
    } catch (e) {
        Tip.error("create director fail! path=" + dirpath + " errorMsg:" + e);
        return false;
    }
}
//同步删除指定目录下的所前目录和文件,包括当前目录
function rmdirsSync(targetPath) {
    try {
        let files = [];
        if (fs.existsSync(targetPath)) {
            files = fs.readdirSync(targetPath);
            files.forEach(function(file, index) {
                let curPath = targetPath + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    if (!rmdirsSync(curPath)) return false;
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(targetPath);
        }
    } catch (e) {
        Tip.error("remove director fail! path=" + targetPath + " errorMsg:" + e);
        return false;
    }
    return true;
}

// find folder or file
// @param {String} path: folder or file path;
// @return {Boolean}: if exist, true || false;
function fsExistsSync(folderPath) {
    try {
        fs.accessSync(folderPath, fs.F_OK);
    } catch (e) {
        return false;
    }

    return true;
}

// find folder, if not exist, build it
// @param {String} path: folder path;
function setFolder(folderPath, notip) {
    if (!fs.existsSync(folderPath)) {
        mkdirsSync(folderPath);
    } else {
        if (!notip) Tip.warn(`\r\n${folderPath}目录已存在`);
    }
}

// find file, if not exist, build it
function setFile(filePath, filedata, callback, replacebool) {
    let dirpath = path.dirname(filePath);

    setFolder(dirpath);

    if (!filedata) return;
    if (fsExistsSync(filePath)) { // already has file
        fs.readFile(filePath, {
            encoding: 'utf8'
        }, function(err, data) {
            if (err) {
                Tip.error(err);
                return false;
            }

            let _data = data && !replacebool ? (data.indexOf(filedata) > -1 ? data : data + filedata) : filedata;

            fs.writeFile(filePath, _data, {
                encoding: 'utf8'
            }, (err) => {
                if (err) {
                    Tip.error(err);
                    return false;
                }

                Tip.safe(`${filePath}创建成功。`, true);
                if (callback) callback();
            });
        });
    } else { // new file

        fs.appendFile(filePath, filedata, {
            encoding: 'utf8'
        }, (err) => {
            if (err) {
                Tip.error(err);
                return false;
            }

            Tip.safe(`${filePath}创建成功。`, true);
            if (callback) callback();
        });
    }
}

// build style.css
// @param {String} styleData: css data;
// @param {String} distPath: output path; 
function buildCssFile(styleData, distPath) {
    const folderPath = path.join(distPath, 'css');
    const cssPath = path.join(folderPath, 'style.css');

    setFile(cssPath, styleData);
}

// build js file
function buildJsFile(jsArr, distPath) {
    // build single js file
    function appendJs(dist, filename, data) {
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
        Tip.log('[log]No js file or no module statement.');
        return false;
    }

    for (let i = 0; i < jsArrlength; i++) {
        appendJs(distPath, jsname[i], jsArr[i]);
    }
}

// render templates
// @param {String} srcPath: module page path;
// @param {Function} callback: callback function;
function renderTemplates(srcPath, callback) {
    if (!srcPath) return false;
    let folderPath = path.dirname(srcPath);

    fs.readFile(srcPath, {
        encoding: 'utf8'
    }, (err, data) => {
        if (err) {
            Tip.error(err);
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
    travelFolderSync,
    fsExistsSync,
    setFolder,
    setFile,
    buildCssFile,
    buildJsFile,
    renderTemplates,
    mkdirsSync,
    rmdirsSync
};