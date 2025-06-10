// src/process/run.ts
import { spawn, spawnSync, type SpawnOptions, type SpawnSyncOptions } from 'child_process';
import { fileURLToPath, URL as NodeURL } from 'url';
import { EventEmitter } from 'events';

export const IGNORE = '__ignore__';

export interface RunOptions extends SpawnOptions {
  /** 是否忽略失败 */
  ignoreFailure?: boolean;
  /** 是否捕获标准输出 */
  captureStdout?: boolean | 'lines';
  /** 超时时间(毫秒) */
  timeout?: number;
}

export interface RunResult {
  /** 命令执行状态码 */
  code: number | null;
  /** 标准输出 */
  stdout: string | string[];
  /** 标准错误 */
  stderr: string;
  /** 是否成功 */
  success: boolean;
}

/**
 * @function runAsync
 * @description 异步执行命令
 * @param {string} cmd 命令
 * @param {string[]} args 参数
 * @param {object} options 选项
 */
export function runAsync(
  cmd: string | NodeURL,
  args: string[] = [],
  options: RunOptions = {}
): Promise<RunResult> {
  if (cmd instanceof URL) {
    cmd = fileURLToPath(cmd);
  }

  return new Promise((resolve, reject) => {
    const { ignoreFailure = false, captureStdout = false, timeout, ...spawnOptions } = options;

    const opt: SpawnOptions = {
      cwd: process.cwd(),
      stdio: captureStdout ? ['inherit', 'pipe', 'pipe'] : 'inherit',
      ...spawnOptions,
    };

    const child = spawn(cmd as string, args, opt);
    let stdoutData = '';
    let stderrData = '';
    let timeoutId: NodeJS.Timeout | null = null;

    // 设置超时
    if (timeout) {
      timeoutId = setTimeout(() => {
        child.kill();
        const err = new Error(`Command timed out after ${timeout}ms: ${cmd} ${args.join(' ')}`);
        reject(err);
      }, timeout);
    }

    // 捕获输出
    if (captureStdout && child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', chunk => {
        stdoutData += chunk;
      });
    }

    // 捕获错误
    if (child.stderr) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', chunk => {
        stderrData += chunk;
      });
    }

    // 监听关闭事件
    child.on('close', code => {
      if (timeoutId) clearTimeout(timeoutId);

      let stdout: string | string[] = stdoutData;
      if (captureStdout === 'lines' && stdout) {
        stdout = stdout.split(/\r?\n/);
        if (stdout[stdout.length - 1] === '') stdout.pop();
      }

      const result: RunResult = {
        code,
        stdout,
        stderr: stderrData,
        success: code === 0,
      };

      if (code !== 0 && !ignoreFailure) {
        const err = new Error(`Command failed: ${cmd} ${args.join(' ')}\n${stderrData}`);
        Object.assign(err, result);
        reject(err);
      } else {
        resolve(result);
      }
    });

    // 处理进程错误
    child.on('error', err => {
      if (timeoutId) clearTimeout(timeoutId);
      reject(err);
    });
  });
}

/**
 * @function forceRunAsync
 * @description 强制执行外部命令行（异步），如果命令行执行失败，则抛出错误，否则忽略错误。
 * @param {string | NodeURL} cmd 命令行
 * @param {string[]} args 参数
 * @param {RunOptions} options 配置项
 * @returns {Promise<RunResult>} 返回Promise
 */
export function forceRunAsync(
  cmd: string | NodeURL,
  args: string[] = [],
  options: RunOptions = {}
): Promise<RunResult | void> {
  return runAsync(cmd, args, options).catch(error => {
    if (error.message !== IGNORE) {
      console.error(error);
      throw error;
    }
  });
}

/**
 * @function runPromise
 * @description 在promise的catch错误处理中: 如果错误消息不是特定的IGNORE,则打印错误。调用exit()退出进程。
 * @param {Promise<any>} promise promise对象
 * @returns {Promise<any>} 返回promise对象
 */
export function runPromise<T>(promise: Promise<T>): Promise<T | void> {
  return promise.catch(error => {
    if (error.message !== IGNORE) {
      console.error(error);
    }
    exit();
  });
}

/**
 * @function runSync
 * @description 同步执行命令
 * @param {string} cmd 命令
 * @param {string[]} args 参数
 * @param {object} options 选项
 */
export function runSync(
  cmd: string | NodeURL,
  args: string[] = [],
  options: SpawnSyncOptions = {}
): RunResult {
  if (cmd instanceof URL) {
    cmd = fileURLToPath(cmd);
  }

  const opt: SpawnSyncOptions = {
    cwd: process.cwd(),
    encoding: 'utf8',
    ...options,
  };

  try {
    const result = spawnSync(cmd as string, args, opt);

    return {
      code: result.status,
      stdout: result.stdout?.toString() || '',
      stderr: result.stderr?.toString() || '',
      success: result.status === 0,
    };
  } catch (error) {
    const err = error as any;
    return {
      code: err.code || 1,
      stdout: '',
      stderr: err.message || String(err),
      success: false,
    };
  }
}

/**
 * @function exit
 * @description 退出进程
 */
export function exit(): never {
  process.exit(1);
}

/**
 * @function commandEvents
 * @description 命令事件发射器
 */
export const commandEvents = new EventEmitter();

export default {
  runAsync,
  runSync,
  forceRunAsync,
  runPromise,
  exit,
  commandEvents,
};
