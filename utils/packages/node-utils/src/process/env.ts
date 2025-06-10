/**
 * @author Wayne
 * @Date 2025-06-08 15:03:48
 * @LastEditTime 2025-06-08 15:07:53
 */

import minimist from 'minimist';

export interface CommandLineArgs {
  [key: string]: string | number | boolean | string[];
}

export function parseArgs(): CommandLineArgs {
  return minimist(process.argv.slice(2));
}

export default parseArgs();
