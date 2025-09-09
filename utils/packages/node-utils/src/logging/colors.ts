/**
 * @fileoverview Terminal color utilities for Node.js console output, providing ANSI color codes and formatting functions for enhanced terminal display.
 *
 * This module provides comprehensive terminal color support using ANSI escape codes.
 * It includes foreground colors, background colors, text formatting options, and utility functions
 * for creating colored console output in Node.js applications.
 *
 * @module Colors
 * @author Wayne
 * @since 1.0.0
 */

const COLORS_MAP = {
  end: '%s\x1b[0m',

  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

/**
 * @function get
 * @description 获取带自动重置格式的终端颜色代码。Gets a terminal color code with automatic reset formatting for consistent console output styling.
 * @param {string} type - COLORS_MAP中的颜色类型。Color type from COLORS_MAP (e.g., 'FgRed', 'BgBlue', 'Bright')
 * @returns {string} 带重置代码的格式化颜色字符串。Formatted color string with reset code for use with console.log
 * @example
 * // Basic color usage
 * console.log(get('FgRed'), 'This text is red');
 * console.log(get('BgYellow'), 'This has yellow background');
 *
 * @example
 * // Multiple formatting
 * console.log(get('Bright') + get('FgGreen'), 'Bright green text');
 *
 * @example
 * // Error logging with red color
 * console.log(get('FgRed'), 'Error: Connection failed');
 *
 * @example
 * // Success message with green background
 * console.log(get('BgGreen'), 'Success: Operation completed');
 *
 * @see {@link COLORS_MAP} - Available color constants
 */
const get = (type: string) => COLORS_MAP[type as keyof typeof COLORS_MAP] + COLORS_MAP.end;

export default {
  colors: COLORS_MAP,
  get,
};
