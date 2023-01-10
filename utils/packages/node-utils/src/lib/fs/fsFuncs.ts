/**
 * @module fsFuncs
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-01-07 13:59:11
 */

import fs from 'fs';
import { join, dirname } from 'path';

import Tip from '../util/tip.js';

/**
 * @function travelFolderSync
 * @description 遍历文件夹输出文件信息
 * @param {String} dirPath
 * @param {Function} callback
 * @param {Function} folderCallback
 */
export function travelFolderSync(
  dirPath: string,
  callback: (pathName?: string) => void,
  folderCallback: (pathName?: string) => void
) {
  fs.readdirSync(dirPath).forEach(file => {
    const pathName = join(dirPath, file);

    if (fs.statSync(pathName).isDirectory()) {
      folderCallback(pathName);
      travelFolderSync(pathName, callback, folderCallback);
    } else {
      callback(pathName);
    }
  });
}

/**
 * @function mkdirsSync
 * @description make folder(sync)
 * @param {String} dirPath
 * @param {String} mode
 */
export function mkdirsSync(dirPath: string) {
  try {
    if (!fs.existsSync(dirPath)) {
      let pathTemp;
      const dirs = dirPath.split(/[/\\]/);
      for (let i = 0, len = dirs.length; i < len; i++) {
        const dirName = dirs[i];
        pathTemp = pathTemp ? join(pathTemp, dirName) : dirName;
        if (!fs.existsSync(pathTemp)) {
          try {
            fs.mkdirSync(pathTemp);
          } catch (e) {
            Tip.log(`Error!create director fail! path=${pathTemp} errorMsg:${e}`);
            return false;
          }
        }
      }
    }
    return true;
  } catch (err) {
    Tip.log(`Error!create director fail! path=${dirPath} errorMsg:${err}`);
    return false;
  }
}

/**
 * @function fsExistsSync
 * @description find folder or file
 * @param {String} path: folder or file path
 * @return {Boolean} if exist, true | false
 */
export function fsExistsSync(folderPath: string) {
  try {
    fs.accessSync(folderPath, fs.constants.F_OK);

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * @function setFolderSync
 * @description find folder, if not exist, build it
 * @param {String} folderPath: folder path
 * @param {String} notip: no tip log
 */
export function setFolderSync(folderPath: string, noTip?: boolean) {
  if (!fs.existsSync(folderPath)) {
    mkdirsSync(folderPath);
  } else if (!noTip) {
    Tip.log(`\r\n(${folderPath} folder existed.)`);
  }
}

/**
 * @function rmdirsSync
 * @description 同步删除指定目录下的所前目录和文件,包括当前目录
 * @param {String} targetPath
 * @returns
 */
export function rmdirsSync(targetPath: string) {
  try {
    let files = [];
    if (fs.existsSync(targetPath)) {
      files = fs.readdirSync(targetPath);
      files.forEach(function (file) {
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
  } catch (err) {
    Tip.error(`Error! remove director fail!(rmdirsSync) path=${targetPath}, error=${err}`);
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
export function writeFile(filePath: string, fileData: string, replaceBool?: boolean) {
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
    resolve(1);
  });
}

/**
 * @function writeJson
 * @description 写JSON文件
 * @param {String} filePath
 * @param {Object} obj
 */
export function writeJson(filePath: string, obj: { [key: string]: unknown }) {
  writeFile(filePath, `${JSON.stringify(obj, null, 2)}\n`);
}

/**
 * @function readFile
 * @description 读取文件内容
 * @param {String} filePath
 * @returns {String}
 */
export function readFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return '';
}

/**
 * @function readJson
 * @description 读取JSON文件内容
 * @param {String} filePath
 * @returns {String}
 */
export function readJson(filePath: string) {
  const content = readFile(filePath);
  if (content) {
    return JSON.parse(content);
  }
  return {};
}

export default {
  travelFolderSync,
  fsExistsSync,
  setFolderSync,
  mkdirsSync,
  rmdirsSync,
  writeFile,
  readFile,
  readJson,
};
