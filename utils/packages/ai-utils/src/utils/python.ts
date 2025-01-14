/**
 * @module aiUtils
 * @author Wayne
 * @Date 2023-08-10 13:32:22
 * @LastEditTime 2025-01-12 19:10:00
 */

/** Boa文档：https://github1s.com/imgcook/boa/blob/main/README.md */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const boa = require('@pipcook/boa'); // import会打包进去、存在莫名报错；需要按需手动安装

/**
 * @function getBoa
 * @description 获取Boa进程ID
 * @returns
 */
export function getBoa() {
  const os = boa.import('os');
  return os.getpid();
}
