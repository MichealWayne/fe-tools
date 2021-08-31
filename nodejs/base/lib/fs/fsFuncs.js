const fs = require('fs');
const { join, dirname } = require('path');
const Tip = require(join(__dirname, '../util/tip.js'));

/**
 * @function travelFolderSync
 * @description 遍历文件夹输出信息
 */
function travelFolderSync(dir, callback, foldercallback) {
  fs.readdirSync(dir).forEach(function (file) {
    const pathname = join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      foldercallback(pathname);
      travelFolderSync(pathname, callback, foldercallback);
    } else {
      callback(pathname);
    }
  });
}

/**
 * @function mkdirsSync
 * @description make folder(sync)
 * @param {String} dirPath
 * @param {String} mode
 */
function mkdirsSync(dirPath, mode) {
  try {
    if (!fs.existsSync(dirPath)) {
      let pathTemp;
      const dirs = dirPath.split(/[/\\]/);
      for (let i = 0, len = dirs.length; i < len; i++) {
        const dirName = dirs[i];
        pathTemp = pathTemp ? join(pathTemp, dirName) : dirName;
        if (!fs.existsSync(pathTemp) && !fs.mkdirSync(pathTemp, mode)) return false;
      }
    }
    return true;
  } catch (e) {
    Tip.log(`Error!create director fail! path=${dirPath} errorMsg:${e}`);
    return false;
  }
}

/**
 * @function fsExistsSync
 * @description find folder or file
 * @param {String} path: folder or file path
 * @return {Boolean} if exist, true | false
 */
function fsExistsSync(folderPath) {
  try {
    fs.accessSync(folderPath, fs.F_OK);

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * @function setFolderSync
 * @description find folder, if not exist, build it
 * @param {String} folderPath: folder path
 * @param {String} notip: no tip log
 */
function setFolderSync(folderPath, noTip) {
  if (!fs.existsSync(folderPath)) {
    mkdirsSync(folderPath);
  } else if (!noTip) {
    Tip.log(`\r\n(${folderPath} folder existed.)`);
  }
}

/**
 * @function rmdirsSync
 * @description 同步删除指定目录下的所前目录和文件,包括当前目录
 * @param {*} targetPath
 * @returns
 */
function rmdirsSync(targetPath) {
  try {
    let files = [];
    if (fs.existsSync(targetPath)) {
      files = fs.readdirSync(targetPath);
      files.forEach(function (file, index) {
        const curPath = `${targetPath}/${file}`;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          if (!rmdirsSync(curPath)) return false;
        } else {
          fs.unlinkSync(curPath);
        }
        return true;
      });
      fs.rmdirSync(targetPath);
    }
  } catch (e) {
    Tip.error(`Error! remove director fail!(rmdirsSync) path=${targetPath}, error=${e}`);
    return false;
  }
  return true;
}

/**
 * @function writeFile
 * @description find file, if not exist, build it.origin setFile
 * @param {String} filePath file path
 * @param {String} fileData file data
 * @param {Boolean} replaceBool replace original data or add
 * @return {Promise}
 */
function writeFile(filePath, fileData, replaceBool) {
  return new Promise((resolve, reject) => {
    const dirPath = dirname(filePath);
    setFolderSync(dirPath, true);

    if (!fileData) reject();
    if (fsExistsSync(filePath)) {
      const nowData = fs.readFileSync(filePath);

      fs.writeFileSync(filePath, replaceBool ? fileData : nowData + fileData);
    } else {
      fs.appendFileSync(filePath, fileData);
    }
    resolve();
  });
}

module.exports = {
  travelFolderSync,
  fsExistsSync,
  setFolderSync,
  mkdirsSync,
  rmdirsSync,
  writeFile,
};
