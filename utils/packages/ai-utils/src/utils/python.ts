/**
 * @fileoverview Python integration utilities using Boa for seamless Python-JavaScript interoperability in AI workflows.
 *
 * This module provides utilities for integrating Python functionality into Node.js applications.
 * It uses the Boa library to enable Python script execution, library access, and data exchange
 * between JavaScript and Python environments, particularly useful for AI and ML workflows.
 *
 * @module Python
 * @author Wayne
 * @since 1.0.0
 * @see {@link https://github.com/imgcook/boa} - Boa documentation
 */

/** Boa文档：https://github1s.com/imgcook/boa/blob/main/README.md */

/**
 * @function getBoa
 * @description 获取Boa进程ID用于进程管理和调试。Gets the Boa process ID for process management and debugging purposes in Python-JavaScript integration.
 * @returns {number} Boa进程ID。The process ID of the current Boa Python interpreter instance
 * @example
 * ```ts
 * // Get current Boa process ID
 * const processId = getBoa();
 * console.log(`Boa process ID: ${processId}`);
 *
 * ```
 * @example
 * ```ts
 * // Use for process monitoring
 * const pid = getBoa();
 * console.log(`Python interpreter running on PID: ${pid}`);
 *
 * ```
 * @example
 * ```ts
 * // Debug Python integration
 * try {
 *   const boaPid = getBoa();
 *   console.log('Python integration active, PID:', boaPid);
 * } catch (error) {
 *   console.error('Boa not available:', error.message);
 * }
 * ```
 */
export function getBoa(): number {
  // @pipcook/boa is an optional runtime integration. Load it lazily so importing
  // the package entry does not fail when Python integration is not installed.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const boa = require('@pipcook/boa');
  const os = boa.import('os');
  return os.getpid();
}
