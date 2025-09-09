/**
 * @fileoverview Terminal logging utilities with colored output for Node.js applications, providing structured logging functions for different message types.
 *
 * This module provides a comprehensive set of colored logging functions for terminal output.
 * It includes functions for success, error, warning, and informational messages with optional timestamps.
 * The logging system uses ANSI color codes for enhanced visual feedback in terminal environments.
 *
 * @module Tip
 * @author Wayne
 * @since 1.0.0
 */
import Colors from './colors';
import { getTimeStr } from '../common';



const TIP_MAP = {
  safe: 'FgGreen',
  error: 'FgRed',
  strongError: 'BgRed',
  warn: 'FgYellow',
  strongWarn: 'BgYellow',
};

/**
 * @function tipFunHoc
 * @description 高阶函数，创建带颜色的日志记录函数。Higher-order function that creates colored logging functions for terminal output with automatic color formatting and optional timestamp support.
 * @param {string} key - TIP_MAP中的颜色键名。Color key from TIP_MAP for the logging function (safe, error, strongError, warn, strongWarn)
 * @returns {Function} 日志记录函数，接受消息和可选的时间戳参数。Logging function that accepts message and optional timestamp flag
 * @example
 * // Create custom logger with green color
 * const customLogger = tipFunHoc('safe');
 * customLogger('Operation completed successfully');
 *
 * @example
 * // Create error logger with timestamp
 * const errorLogger = tipFunHoc('error');
 * errorLogger('Connection failed', true);
 * // Output: "2024/03/15 14:30:25:Connection failed" (in red)
 *
 * @example
 * // Create warning logger
 * const warnLogger = tipFunHoc('warn');
 * warnLogger('Deprecated function used');
 * // Output: "Deprecated function used" (in yellow)
 *
 * @see {@link TIP_MAP} - Available color mappings
 * @see {@link Tip} - Pre-configured logging functions
 */
const tipFunHoc = (key: string) => {
  const useColor = TIP_MAP[key as keyof typeof TIP_MAP];
  return (info: string | Error, timeFlag?: boolean) => {
    if (info) {
      const str = (timeFlag ? `${getTimeStr()}:` : '') + info;
      if (useColor) {
        console.log(Colors.get(useColor), str);
      } else {
        console.log(str);
      }
    }
  };
};

/**
 * @description 彩色日志记录函数集合，用于不同类型的消息输出。Collection of colored logging functions for different message types with enhanced terminal output formatting.
 * @example
 * // Success messages (green)
 * Tip.safe('Operation completed successfully');
 * Tip.success('File uploaded successfully');
 *
 * @example
 * // Information messages (default color)
 * Tip.log('Processing file...');
 * Tip.info('Server configuration loaded');
 *
 * @example
 * // Error messages (red)
 * Tip.error('Failed to connect to database');
 * Tip.err('Invalid input provided');
 *
 * @example
 * // Strong error messages (red background)
 * Tip.strongError('Critical system failure!');
 *
 * @example
 * // Warning messages (yellow)
 * Tip.warn('Deprecated function used');
 *
 * @example
 * // Strong warning messages (yellow background)
 * Tip.strongWarn('Memory usage approaching limit');
 *
 * @example
 * // With timestamps
 * Tip.error('Connection failed', true);
 * // Output: "2024/03/15 14:30:25:Connection failed"
 */
const Tip = {
  safe: tipFunHoc('safe'),
  success: tipFunHoc('safe'),
  log: tipFunHoc('log'),
  info: tipFunHoc('log'),
  err: tipFunHoc('error'),
  error: tipFunHoc('error'),
  strongError: tipFunHoc('strongError'),
  warn: tipFunHoc('warn'),
  strongWarn: tipFunHoc('strongWarn'),
};

export default Tip;
