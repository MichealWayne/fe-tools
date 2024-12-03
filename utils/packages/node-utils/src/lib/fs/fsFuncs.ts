/**
 * @module fsFuncs
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-12-01 13:52:12
 */

import fs from 'fs';
import { join, dirname } from 'path';

import Tip from '../util/tip';

/**
 * @function travelFolderSync
 * @description 遍历文件夹输出文件信息
 * @param {String} dirPath 文件夹路径
 * @param {(filePath: string) => any} fileCallback 文件回调
 * @param {(folderPath: string) => any} folderCallback 文件夹回调
 */
export function travelFolderSync(
  dirPath: string,
  fileCallback: (pathName?: string) => void,
  folderCallback: (pathName?: string) => void
) {
  fs.readdirSync(dirPath).forEach(file => {
    const pathName = join(dirPath, file);

    if (fs.statSync(pathName).isDirectory()) {
      folderCallback(pathName);
      travelFolderSync(pathName, fileCallback, folderCallback);
    } else {
      fileCallback(pathName);
    }
  });
}

/**
 * @function mkdirsSync
 * @description 同步进行文件夹创建（容错）
 * @param {String} dirPath 文件夹路径
 * @return {Boolean} 是否创建成功
 */
export function mkdirsSync(dirPath: string) {
  try {
    if (fs.existsSync(dirPath)) {
      return true;
    }

    let pathTemp = '';
    const dirs = dirPath.split(/[/\\]/);

    for (const dirName of dirs) {
      pathTemp = pathTemp ? join(pathTemp, dirName) : dirName;

      if (!fs.existsSync(pathTemp)) {
        try {
          fs.mkdirSync(pathTemp);
        } catch (e) {
          Tip.log(`Error! Create directory failed! Path=${pathTemp} Error: ${e}`);
          return false;
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
 * @description  判断文件是否存在(同步)
 * @param {String} path 文件路径
 * @return {Boolean} 是否存在
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
 * @description 同步创建文件夹
 * @param {String} folderPath 文件夹路径
 * @param {String} notip 是否提示
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
 * @param {String} targetPath 目标目录
 * @returns {Boolean} 是否删除成功
 */
export function rmdirsSync(targetPath: string) {
  try {
    if (fs.existsSync(targetPath)) {
      const files = fs.readdirSync(targetPath);

      for (const file of files) {
        const curPath = `${targetPath}/${file}`;

        if (fs.statSync(curPath).isDirectory()) {
          if (!rmdirsSync(curPath)) return false;
        } else {
          fs.unlinkSync(curPath);
        }
      }

      fs.rmdirSync(targetPath);
    }
  } catch (err) {
    Tip.error(`Error! Remove directory failed! Path=${targetPath}, Error: ${err}`);
    return false;
  }
  return true;
}

/**
 * @function writeFile
 * @description 写文件,如果文件不存在则创建
 * @param {String} filePath 文件路径
 * @param {String} fileData  文件内容
 * @param {Boolean} replaceBool 是否替换
 * @return {Promise} 是否写入成功
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
    resolve(true);
  });
}

/**
 * @function writeJson
 * @description 写JSON文件
 * @param {String} filePath 文件路径
 * @param {Object} obj JSON对象
 */
export function writeJson(filePath: string, obj: { [key: string]: unknown }, spaceLen = 2) {
  writeFile(filePath, `${JSON.stringify(obj, null, spaceLen)}\n`);
}

/**
 * @function readFileSync
 * @description 读取文件内容（同步）
 * @param {String} filePath 文件路径
 * @returns {String} 文件内容
 */
export function readFileSync(filePath: string) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return '';
}

/**
 * @function readJson
 * @description 读取JSON文件内容
 * @param {String} filePath 文件路径
 * @returns {Object} JSON对象
 */
export function readJson(filePath: string) {
  const content = readFileSync(filePath);
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
  readFileSync,
  readJson,
};
