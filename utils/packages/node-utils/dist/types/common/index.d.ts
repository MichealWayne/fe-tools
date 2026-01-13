/**
 * @fileoverview Common utility functions for Node.js applications, providing date formatting, buffer detection, and other essential helper functions.
 *
 * This module provides fundamental utility functions commonly needed in Node.js applications.
 * It includes date and time formatting utilities, buffer type checking, and other helper functions
 * that enhance development productivity and code consistency.
 *
 * @module Common
 * @author Wayne
 * @since 1.0.0
 */
/**
 * @function getTimeStr
 * @description 格式化日期为可读字符串，格式为YYYY/MM/DD HH:MM:SS。Formats a date as a readable string in YYYY/MM/DD HH:MM:SS format for consistent timestamp display.
 * @param {string} [timeStr] - 可选的时间字符串，省略时使用当前时间。Optional time string to parse; uses current time if omitted
 * @returns {string} 格式化的时间字符串。Formatted time string in YYYY/MM/DD HH:MM:SS format
 * @example
 * // Get current time formatted
 * const now = getTimeStr();
 * console.log(now); // '2024/03/15 14:30:25'
 *
 * @example
 * // Format specific date
 * const specificTime = getTimeStr('2024-01-01T12:00:00Z');
 * console.log(specificTime); // '2024/01/01 12:00:00'
 *
 * @example
 * // Use in logging with timestamps
 * function logWithTimestamp(message) {
 *   console.log(`[${getTimeStr()}] ${message}`);
 * }
 * logWithTimestamp('Server started'); // '[2024/03/15 14:30:25] Server started'
 *
 * @example
 * // Format various date inputs
 * console.log(getTimeStr('March 15, 2024 2:30 PM')); // '2024/03/15 14:30:00'
 * console.log(getTimeStr(Date.now()));               // Current time formatted
 * console.log(getTimeStr(new Date()));              // Current time formatted
 */
export declare function getTimeStr(timeStr?: string): string;
declare const _default: {
    isBuffer: any;
    getTimeStr: typeof getTimeStr;
};
export default _default;
