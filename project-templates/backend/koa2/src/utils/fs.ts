/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-05-31 10:15:27
 */
import fs from 'fs';

import logger from '../controllers/logger';

type WriteSuccessCallback = (result: true) => void;
type WriteErrorCallback = (error: NodeJS.ErrnoException) => void;
type ReadSuccessCallback = (data: string) => void;

/**
 * @description find folder or file
 * @param {String} path folder or file path;
 * @return {Boolean} if exist, true || false;
 */
export function fsExistsSync(folderPath: string) {
  try {
    fs.statSync(folderPath);
    return true;
  } catch (e) {
    const error = e as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

/**
 * @function writeFile
 * @param {string} path
 * @param {string} data
 * @param {Function} callback
 * @param {Function} errcallback
 */
export function writeFile(
  path: string,
  data: string,
  callback?: WriteSuccessCallback,
  errcallback?: WriteErrorCallback
) {
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
export function readFile(
  path: string,
  callback: ReadSuccessCallback,
  errcallback?: WriteErrorCallback
) {
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
