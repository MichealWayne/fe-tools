/**
 * @module nodeBase64
 * @author Wayne
 * @Date 2024-01-16 10:11:22
 * @LastEditTime 2024-12-01 11:23:13
 */

/**
 * @function base64Encode
 * @description 字符串转base64
 * @param {string} str 字符串
 * @returns {string} base64字符串
 * @example
 * base64Encode('hello world'); // 'aGVsbG8gd29ybGQ='
 */
export function base64Encode(str: string) {
  const buff = Buffer.from(str, 'utf-8');
  return buff.toString('base64');
}

/**
 * @function base64Decode
 * @description base64字符串解码
 * @param {string} base64Str base64字符串
 * @returns {string} 解码后的字符串
 * @example
 * base64Decode('aGVsbG8gd29ybGQ='); // 'hello world'
 */
export function base64Decode(base64Str: string) {
  const buff = Buffer.from(base64Str, 'base64');
  return buff.toString('utf-8');
}

/**
 * @function isBase64Str
 * @description 判断字符串是否是base64
 * @param {string} str
 * @returns {boolean} 是否是base64
 */
export function isBase64Str(str: string): boolean {
  return Buffer.from(str, 'base64').toString('base64') === str;
}
