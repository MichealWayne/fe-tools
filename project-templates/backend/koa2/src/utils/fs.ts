/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-05-31 10:15:27
 */
import fs from 'fs';

import logger from '../controllers/logger';

/**
 * @description find folder or file
 * @param {String} path folder or file path;
 * @return {Boolean} if exist, true || false;
 */
export function fsExistsSync(folderPath: string) {
  try {
    fs.statSync(folderPath);
    return true;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      return false;
    }
    throw e;
  }
}

/**
 * @function writeFile
 * @param {string} path
 * @param {string} data
 * @param {Function} callback
 * @param {Function} errcallback
 */
export function writeFile(path: string, data: string, callback?: Function, errcallback?: Function) {
  fs.writeFile(
    path,
    data,
    {
      encoding: 'utf8',
    },
    function (err) {
      if (err) {
        logger.error(err?.message || `writeFile failed(${path})`);
        if (errcallback) errcallback(err);
        return;
      }

      if (callback) callback(true);
    }
  );
}

/**
 * @function readFile
 * @param {string} path
 * @param {Function} callback
 * @param {Function} errcallback
 */
export function readFile(path: string, callback: Function, errcallback?: Function) {
  fs.readFile(
    path,
    {
      encoding: 'utf8',
    },
    function (err, data) {
      if (err) {
        logger.error(err?.message || `readFile failed(${path})`);
        if (errcallback) errcallback(err);
        return;
      }

      if (callback) callback(data);
    }
  );
}
