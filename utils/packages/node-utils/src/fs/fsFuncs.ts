/**
 * @fileoverview File system utilities for Node.js applications, providing comprehensive file and directory operations with enhanced error handling and convenience functions.
 *
 * This module provides a comprehensive set of file system utilities for Node.js applications.
 * It includes directory traversal, file reading/writing, JSON handling, path operations,
 * and various convenience functions for common file system tasks with proper error handling.
 *
 * @module FSFuncs
 * @author Wayne
 * @since 1.0.0
 */

import fs from 'fs';
import { join, dirname } from 'path';

import Tip from '../logging/tip';

/**
 * @function travelFolderSync
 * @description 递归遍历目录并对文件和文件夹执行回调函数。Recursively traverses a directory and executes callbacks for files and folders with comprehensive error handling.
 * @param {string} dirPath - 要遍历的目录路径。The directory path to traverse
 * @param {(filePath?: string) => void} fileCallback - 对每个找到的文件执行的回调函数。Callback function executed for each file found
 * @param {(folderPath?: string) => void} folderCallback - 对每个找到的文件夹执行的回调函数。Callback function executed for each folder found
 * @throws {Error} 如果目录不存在则记录错误但不抛出。Logs error if directory doesn't exist but doesn't throw
 * @example
 * // Basic directory traversal
 * travelFolderSync('./src',
 *   (filePath) => console.log('File:', filePath),
 *   (folderPath) => console.log('Folder:', folderPath)
 * );
 *
 * @example
 * // Count files and folders
 * let fileCount = 0, folderCount = 0;
 * travelFolderSync('./project',
 *   () => fileCount++,
 *   () => folderCount++
 * );
 * console.log(`Found ${fileCount} files and ${folderCount} folders`);
 */
export function travelFolderSync(
  dirPath: string,
  fileCallback: (pathName?: string) => void,
  folderCallback: (pathName?: string) => void
) {
  if (!fs.existsSync(dirPath)) {
    Tip.error(`Directory not found: ${dirPath}`);
    return;
  }
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
 * @description 同步递归创建目录，带错误处理。Synchronously creates directories recursively with comprehensive error handling and path validation.
 * @param {string} dirPath - 要创建的目录路径（支持嵌套路径）。The directory path to create (supports nested paths)
 * @returns {boolean} 如果目录创建成功返回true，否则返回false。True if directory creation succeeded, false otherwise
 * @example
 * // Create a simple directory
 * const success = mkdirsSync('./new-folder');
 * console.log(success); // true
 *
 * @example
 * // Create nested directories
 * const created = mkdirsSync('./path/to/nested/folder');
 * if (created) {
 *   console.log('Directory structure created successfully');
 * } else {
 *   console.log('Failed to create directory structure');
 * }
 *
 * @example
 * // Handle existing directories gracefully
 * mkdirsSync('./existing-folder'); // Returns true if already exists
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
 * @description 同步检查文件或目录是否存在。Synchronously checks if a file or directory exists using fs.accessSync with proper error handling.
 * @param {string} folderPath - 要检查的文件或目录路径。The file or directory path to check
 * @returns {boolean} 如果路径存在且可访问返回true，否则返回false。True if the path exists and is accessible, false otherwise
 * @example
 * // Check if a file exists
 * if (fsExistsSync('./config.json')) {
 *   console.log('Config file found');
 * } else {
 *   console.log('Config file missing');
 * }
 *
 * @example
 * // Check directory existence before operations
 * const dirExists = fsExistsSync('./uploads');
 * if (!dirExists) {
 *   mkdirsSync('./uploads');
 * }
 *
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode} - Node.js fs.accessSync documentation
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
 * @description 同步确保文件夹存在，必要时创建它。Synchronously ensures a folder exists, creating it if necessary with optional console output control.
 * @param {string} folderPath - 要创建或验证的文件夹路径。The folder path to create or verify
 * @param {boolean} [noTip=false] - 如果为true，当文件夹已存在时抑制控制台输出。If true, suppresses console output when folder already exists
 * @example
 * // Create folder with console feedback
 * setFolderSync('./output');
 * // Logs: "(./output folder existed.)" if folder exists
 *
 * @example
 * // Create folder silently
 * setFolderSync('./temp', true);
 * // No console output regardless of folder state
 *
 * @example
 * // Ensure upload directory exists before file operations
 * setFolderSync('./uploads');
 * // Now safe to write files to ./uploads/
 *
 * @see {@link mkdirsSync} - For more control over directory creation
 */
export function setFolderSync(folderPath: string, noTip = false) {
  if (!fs.existsSync(folderPath)) {
    mkdirsSync(folderPath);
  } else if (!noTip) {
    Tip.log(`\r\n(${folderPath} folder existed.)`);
  }
}

/**
 * @function rmdirsSync
 * @description 同步递归删除目录及其所有内容。Synchronously removes a directory and all its contents recursively with comprehensive error handling.
 * @param {string} targetPath - 要完全删除的目录路径。The directory path to remove completely
 * @returns {boolean} 如果删除成功返回true，如果发生错误返回false。True if deletion succeeded, false if an error occurred
 * @example
 * // Remove a temporary directory
 * const removed = rmdirsSync('./temp-build');
 * if (removed) {
 *   console.log('Temporary files cleaned up');
 * } else {
 *   console.log('Failed to clean up temporary files');
 * }
 *
 * @example
 * // Safe cleanup with existence check
 * if (fsExistsSync('./old-cache')) {
 *   rmdirsSync('./old-cache');
 * }
 *
 * @deprecated For Node.js 14+, consider using fs.rmSync with recursive option
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_rmsync_path_options} - Node.js fs.rmSync documentation
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
 * @description 异步写入数据到文件，根据需要创建目录。Asynchronously writes data to a file, creating directories as needed with automatic directory structure creation.
 * @param {string} filePath - 要写入的文件路径。The file path to write to
 * @param {string} fileData - 要写入文件的内容。The content to write to the file
 * @param {boolean} [replace=true] - 如果为true，覆盖现有文件；如果为false，追加到现有文件。If true, overwrites existing file; if false, appends to existing file
 * @returns {Promise<boolean>} 成功写入时解析为true的Promise。Promise that resolves to true on successful write
 * @throws {Error} 如果fileData为空或写入操作失败则拒绝。Rejects if fileData is empty or write operation fails
 * @example
 * // Write a new file
 * await writeFile('./output.txt', 'Hello World');
 * console.log('File written successfully');
 *
 * @example
 * // Append to existing file
 * await writeFile('./log.txt', 'New log entry\n', false);
 *
 * @example
 * // Write with error handling
 * try {
 *   await writeFile('./config/settings.json', JSON.stringify(config));
 *   console.log('Configuration saved');
 * } catch (error) {
 *   console.error('Failed to save configuration:', error);
 * }
 */
export function writeFile(filePath: string, fileData: string, replace = true) {
  return new Promise((resolve, reject) => {
    const dirPath = dirname(filePath);
    setFolderSync(dirPath, true);

    if (!fileData) reject(new Error('fileData is empty'));
    if (fsExistsSync(filePath) && !replace) {
      fs.appendFileSync(filePath, fileData);
    } else {
      fs.writeFileSync(filePath, fileData);
    }
    resolve(true);
  });
}

/**
 * @function writeJson
 * @description 将JavaScript对象写入JSON文件并格式化。Writes a JavaScript object to a JSON file with customizable formatting and automatic serialization.
 * @param {string} filePath - 要写入JSON的文件路径。The file path to write the JSON to
 * @param {Record<string, unknown>} obj - 要序列化为JSON的对象。The object to serialize as JSON
 * @param {number} [spaceLen=2] - JSON缩进的空格数。Number of spaces for JSON indentation
 * @example
 * // Write formatted JSON configuration
 * const config = { port: 3000, host: 'localhost' };
 * writeJson('./config.json', config);
 * // Creates: {"port": 3000, "host": "localhost"}
 *
 * @example
 * // Write compact JSON (no indentation)
 * writeJson('./data.json', { users: ['alice', 'bob'] }, 0);
 *
 * @example
 * // Write deeply nested object
 * const appState = {
 *   user: { id: 1, name: 'John' },
 *   settings: { theme: 'dark', notifications: true }
 * };
 * writeJson('./state.json', appState, 4); // 4-space indentation
 *
 * @see {@link writeFile} - Underlying file write function
 */
export function writeJson(filePath: string, obj: { [key: string]: unknown }, spaceLen = 2) {
  writeFile(filePath, `${JSON.stringify(obj, null, spaceLen)}\n`);
}

/**
 * @function readFileSync
 * @description 同步读取文件内容为UTF-8字符串。Synchronously reads file content as UTF-8 string with automatic existence checking and error handling.
 * @param {string} filePath - 要读取的文件路径。The file path to read from
 * @returns {string} 文件内容字符串，如果文件不存在则返回空字符串。The file content as string, or empty string if file doesn't exist
 * @example
 * // Read configuration file
 * const config = readFileSync('./config.txt');
 * if (config) {
 *   console.log('Config loaded:', config);
 * } else {
 *   console.log('Config file not found');
 * }
 *
 * @example
 * // Read and process text file
 * const content = readFileSync('./data.csv');
 * const lines = content.split('\n').filter(line => line.trim());
 * console.log(`Found ${lines.length} data rows`);
 *
 * @example
 * // Safe file reading with existence check
 * if (fsExistsSync('./readme.md')) {
 *   const readme = readFileSync('./readme.md');
 *   console.log(readme.substring(0, 100)); // First 100 characters
 * }
 */
export function readFileSync(filePath: string) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return '';
}

/**
 * @function readJsonFile
 * @description 读取并解析JSON文件，对无效JSON进行错误处理。Reads and parses a JSON file with comprehensive error handling for invalid JSON and missing files.
 * @param {string} filePath - 要读取的JSON文件路径。The JSON file path to read
 * @returns {Record<string, unknown>} 解析的JSON对象，如果文件不存在或解析失败则返回空对象。Parsed JSON object, or empty object if file doesn't exist or parsing fails
 * @example
 * // Read configuration JSON
 * const config = readJsonFile('./config.json');
 * console.log('Server port:', config.port || 3000);
 *
 * @example
 * // Read package.json safely
 * const pkg = readJsonFile('./package.json');
 * if (pkg.name) {
 *   console.log(`Package: ${pkg.name}@${pkg.version}`);
 * } else {
 *   console.log('Invalid or missing package.json');
 * }
 *
 * @example
 * // Read user data with fallback
 * const userData = readJsonFile('./user-data.json');
 * const users = userData.users || [];
 * console.log(`Found ${users.length} users`);
 *
 * @see {@link readFileSync} - Underlying file read function
 */
export function readJsonFile(filePath: string) {
  try {
    const content = readFileSync(filePath);
    if (content) {
      return JSON.parse(content);
    }
  } catch (err) {
    Tip.error(`Failed to parse JSON file: ${filePath}, error: ${err}`);
    return {};
  }
}

export default {
  travelFolderSync,
  fsExistsSync,
  setFolderSync,
  mkdirsSync,
  rmdirsSync,
  writeFile,
  readFileSync,
  readJsonFile,
};
