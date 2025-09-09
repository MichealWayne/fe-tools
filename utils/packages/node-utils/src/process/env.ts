/**
 * @fileoverview Command line argument parsing utilities for Node.js applications, providing structured access to CLI parameters and options.
 *
 * This module provides convenient command line argument parsing using minimist.
 * It includes type-safe argument parsing, default value handling, and structured access
 * to command line options for building robust CLI applications.
 *
 * @module Env
 * @author Wayne
 * @since 1.0.0
 */

import minimist from 'minimist';

export interface CommandLineArgs {
  [key: string]: string | number | boolean | string[];
}

/**
 * @function parseArgs
 * @description 使用minimist解析命令行参数，排除node和脚本路径。Parses command line arguments using minimist, excluding node and script paths for clean argument processing.
 * @returns {CommandLineArgs} 解析后的命令行参数对象。Parsed command line arguments object with type-safe access
 * @example
 * // Command: node script.js --port 3000 --debug --files a.txt b.txt
 * const args = parseArgs();
 * console.log(args.port);    // 3000 (number)
 * console.log(args.debug);   // true (boolean)
 * console.log(args.files);   // ['a.txt', 'b.txt'] (string[])
 * console.log(args._);       // Array of non-option arguments
 *
 * @example
 * // Environment-aware configuration
 * const args = parseArgs();
 * const config = {
 *   port: args.port || process.env.PORT || 3000,
 *   debug: args.debug || process.env.NODE_ENV === 'development',
 *   logLevel: args['log-level'] || 'info'
 * };
 *
 * @example
 * // CLI validation and defaults
 * const args = parseArgs();
 * if (!args.config) {
 *   console.error('--config argument is required');
 *   process.exit(1);
 * }
 *
 * @example
 * // Build tool configuration
 * const args = parseArgs();
 * const buildConfig = {
 *   watch: args.watch || args.w,           // --watch or -w
 *   minify: args.minify !== false,         // --no-minify to disable
 *   sourcemap: args.sourcemap || args.s,   // --sourcemap or -s
 *   outDir: args['out-dir'] || './dist'    // --out-dir
 * };
 *
 * @see {@link CommandLineArgs} - Type definition for parsed arguments
 */
export function parseArgs(): CommandLineArgs {
  return minimist(process.argv.slice(2));
}

export default parseArgs();
