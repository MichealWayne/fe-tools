/**
 * @fileoverview Process execution utilities for Node.js applications, providing comprehensive command execution with timeout, output capture, and error handling.
 *
 * This module provides robust process execution capabilities for Node.js applications.
 * It includes both synchronous and asynchronous command execution, timeout handling,
 * output capture options, and comprehensive error management for reliable process automation.
 *
 * @module Run
 * @author Wayne
 * @since 1.0.0
 */
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
 * @description 异步执行命令，带有综合错误处理和输出捕获。Asynchronously executes a command with comprehensive error handling, timeout support, and flexible output capture options.
 * @param {string | NodeURL} cmd - 要执行的命令或文件URL。Command to execute or file URL
 * @param {string[]} [args=[]] - 命令参数数组。Array of command arguments
 * @param {RunOptions} [options={}] - 执行选项，包括超时、输出捕获和失败处理。Execution options including timeout, output capture, and failure handling
 * @returns {Promise<RunResult>} 解析为执行结果的Promise，包含状态码、stdout、stderr和成功状态。Promise resolving to execution result with code, stdout, stderr, and success status
 * @throws {Error} 如果命令失败且ignoreFailure为false，或者发生超时则拒绝。Rejects if command fails and ignoreFailure is false, or if timeout occurs
 * @example
 * // Basic command execution
 * try {
 *   const result = await runAsync('ls', ['-la']);
 *   console.log('Directory listing:', result.stdout);
 * } catch (error) {
 *   console.error('Command failed:', error.message);
 * }
 *
 * @example
 * // Command with timeout and output capture
 * const result = await runAsync('npm', ['install'], {
 *   timeout: 30000,        // 30 second timeout
 *   captureStdout: true,   // Capture output
 *   ignoreFailure: false,  // Throw on failure
 *   cwd: './project'       // Working directory
 * });
 *
 * @example
 * // Capture output as lines
 * const result = await runAsync('git', ['log', '--oneline'], {
 *   captureStdout: 'lines'
 * });
 * console.log(`Found ${result.stdout.length} commits`);
 *
 * @since 1.0.0
 * @see {@link runSync} - Synchronous command execution
 * @see {@link forceRunAsync} - Async execution with error suppression
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
 * @description 在特定忽略模式下异步执行命令，带有错误抑制。Executes a command asynchronously with error suppression for graceful handling of optional operations.
 * @param {string | NodeURL} cmd - 要执行的命令或文件URL。Command to execute or file URL
 * @param {string[]} [args=[]] - 命令参数数组。Array of command arguments
 * @param {RunOptions} [options={}] - 执行选项。Execution options
 * @returns {Promise<RunResult | void>} 解析为结果或void（如果错误被忽略）的Promise。Promise resolving to result or void if error is ignored
 * @example
 * // Execute with graceful error handling
 * await forceRunAsync('optional-tool', ['--check']);
 * // Will not throw if command fails, but logs error
 *
 * @example
 * // Conditional command execution
 * try {
 *   await forceRunAsync('git', ['status'], {
 *     cwd: './maybe-git-repo'
 *   });
 *   console.log('Git repository detected');
 * } catch (error) {
 *   console.log('Not a git repository, continuing...');
 * }
 *
 * @example
 * // Build pipeline with optional steps
 * await forceRunAsync('npm', ['run', 'lint']);     // Optional linting
 * await forceRunAsync('npm', ['run', 'test']);     // Optional testing
 * await runAsync('npm', ['run', 'build']);         // Required build step
 *
 * @since 1.0.0
 * @see {@link runAsync} - Standard async execution with error handling
 * @see {@link IGNORE} - Special error message for ignored failures
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
 * @description 包装Promise并处理错误，在非忽略错误时退出进程。Wraps a promise with error handling that exits the process on non-ignored errors for critical operations.
 * @param {Promise<T>} promise - 要包装的带有错误处理的Promise。Promise to wrap with error handling
 * @returns {Promise<T | void>} 在错误时退出进程或返回结果的Promise。Promise that exits process on error or returns result
 * @example
 * // Critical operation that should exit on failure
 * await runPromise(
 *   runAsync('npm', ['run', 'build'])
 * );
 * // Process will exit if build fails
 *
 * @example
 * // Database migration that must succeed
 * await runPromise(
 *   runAsync('npm', ['run', 'migrate'])
 * );
 * console.log('Migration completed successfully');
 *
 * @example
 * // Chain critical operations
 * await runPromise(runAsync('git', ['pull']));
 * await runPromise(runAsync('npm', ['install']));
 * await runPromise(runAsync('npm', ['run', 'deploy']));
 *
 * @since 1.0.0
 * @see {@link exit} - Process exit function
 * @see {@link IGNORE} - Special error message for ignored failures
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
 * @description 同步执行命令并立即返回结果。Synchronously executes a command and returns the result immediately with comprehensive error handling.
 * @param {string | NodeURL} cmd - 要执行的命令或文件URL。Command to execute or file URL
 * @param {string[]} [args=[]] - 命令参数数组。Array of command arguments
 * @param {SpawnSyncOptions} [options={}] - 同步执行选项。Synchronous execution options
 * @returns {RunResult} 包含状态码、stdout、stderr和成功状态的执行结果。Execution result with code, stdout, stderr, and success status
 * @example
 * // Quick synchronous command
 * const result = runSync('git', ['rev-parse', 'HEAD']);
 * if (result.success) {
 *   console.log('Current commit:', result.stdout.trim());
 * } else {
 *   console.error('Failed to get commit hash:', result.stderr);
 * }
 *
 * @example
 * // Check tool availability
 * const dockerCheck = runSync('docker', ['--version']);
 * if (dockerCheck.success) {
 *   console.log('Docker is available');
 * } else {
 *   console.log('Docker not found, skipping containerization');
 * }
 *
 * @example
 * // Environment setup validation
 * const nodeVersion = runSync('node', ['--version']);
 * const npmVersion = runSync('npm', ['--version']);
 *
 * console.log(`Node: ${nodeVersion.stdout.trim()}`);
 * console.log(`NPM: ${npmVersion.stdout.trim()}`);
 *
 * @since 1.0.0
 * @see {@link runAsync} - Asynchronous command execution
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
 * @description 以错误代码1退出Node.js进程。Exits the Node.js process with error code 1 for critical failure scenarios.
 * @returns {never} 该函数不会返回，因为它终止了进程。This function never returns as it terminates the process
 * @example
 * // Exit on critical error
 * if (!configFile) {
 *   console.error('Configuration file not found');
 *   exit();
 * }
 *
 * @example
 * // Validation failure
 * const args = parseArgs();
 * if (!args.required) {
 *   console.error('Missing required argument: --required');
 *   exit();
 * }
 *
 * @since 1.0.0
 * @see {@link runPromise} - Promise wrapper that calls exit on error
 */
export function exit(): never {
  process.exit(1);
}

/**
 * @description 命令事件发射器，用于监听命令执行过程中的事件。Command event emitter for monitoring command execution lifecycle and handling process events.
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
