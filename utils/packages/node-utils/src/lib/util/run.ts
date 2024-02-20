/**
 * @module nodeRun
 * @author Wayne
 * @Date 2022-08-24 19:58:13
 * @LastEditTime 2024-02-18 13:21:24
 */
import { spawn, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

export const IGNORE = '__ignore__';

/**
 * @function runAsyncBase
 * @description 执行外部命令行（异步）
 * @param {string | URL} cmd
 * @param {string[]} args
 * @param {object} param2
 * @returns {Promise<unknown>}
 */
function runAsyncBase(
  cmd: string | URL,
  args: string[],
  { ignoreFailure = true, spawnArgs, captureStdout = false }: any = {}
) {
  if (cmd instanceof URL) {
    cmd = fileURLToPath(cmd as any);
  }
  return new Promise((resolve, reject) => {
    const opt = Object.assign(
      {
        cwd: process.cwd(),
        stdio: captureStdout ? ['inherit', 'pipe', 'inherit'] : 'inherit',
      },
      spawnArgs
    );

    const child = spawn(cmd as string, args, opt);
    let stdout: string | string[];
    if (captureStdout) {
      stdout = '';
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', chunk => {
        stdout += chunk;
      });
    }
    child.on('close', code => {
      if (code !== 0) {
        if (ignoreFailure) {
          return reject(new Error(IGNORE));
        }
        const err: any = new Error(`${cmd} ${args} failed: ${code}`);
        err.code = code;
        err.messageOnly = true;
        return reject(err);
      }
      if (captureStdout === 'lines') {
        stdout = (stdout as string).split(/\r?\n/g);
        if (stdout[stdout.length - 1] === '') stdout.pop();
      }
      return resolve(stdout);
    });
  });
}

/**
 * @function forceRunAsync
 * @description 强制执行外部命令行（异步），如果命令行执行失败，则抛出错误，否则忽略错误。
 * @param {string | URL} cmd
 * @param {string[]} args
 * @param {Object} options
 * @returns {Promise<unknown>}
 */
export function forceRunAsync(cmd: string | URL, args: string[], options: any) {
  return runAsyncBase(cmd, args, options).catch(error => {
    if (error.message !== IGNORE) {
      if (!error.messageOnly) {
        console.error(error);
      }
      throw error;
    }
  });
}

/**
 * @function runPromise
 * @description 在promise的catch错误处理中: 如果错误消息不是特定的IGNORE,则打印错误。调用exit()退出进程。
 * @param {Promise<any>} promise
 * @returns {Promise<any>}
 */
export function runPromise(promise: Promise<any>) {
  return promise.catch(error => {
    if (error.message !== IGNORE) {
      console.error(error);
    }
    exit();
  });
}

/**
 * @function runAsync
 * @description 异步执行
 * @param cmd
 * @param args
 * @param options
 * @returns
 */
export function runAsync(cmd: string, args: string[], options: any) {
  return runPromise(runAsyncBase(cmd, args, options));
}

/**
 * @function runSync
 * @description 同步执行
 * @param {URL | string} cmd
 * @param {string[]} args
 * @param {Object} options
 * @returns
 */
export function runSync(cmd: URL | string, args: string[], options: any) {
  if (cmd instanceof URL) {
    cmd = fileURLToPath(cmd as any);
  }
  const opt = Object.assign(
    {
      cwd: process.cwd(),
    },
    options
  );

  const child = spawnSync(cmd as string, args, opt);
  if (child.error) {
    throw child.error;
  } else if (child.status !== 0) {
    throw new Error(`${cmd} ${args} failed with stderr: ` + child.stderr.toString());
  } else {
    return child.stdout.toString();
  }
}

/**
 * @function exit
 * @description 退出进程
 */
export function exit() {
  process.exit(1);
}

export default {
  forceRunAsync,
  runPromise,
  runAsync,
  runSync,
  exit,
};
