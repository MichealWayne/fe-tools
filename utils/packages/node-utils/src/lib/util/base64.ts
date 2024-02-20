/**
 * @module nodeBase64
 * @author Wayne
 * @Date 2024-01-16 10:11:22
 * @LastEditTime 2024-02-18 13:20:33
 */

/**
 * @function base64Encode
 * @description 字符串转base64
 * @param {string} str
 * @returns {string}
 */
export function base64Encode(str: string) {
  const buff = Buffer.from(str, 'utf-8');
  return buff.toString('base64');
}

/**
 * @function base64Decode
 * @description base64字符串解码
 * @param {string} base64Str
 * @returns {string}
 */
export function base64Decode(base64Str: string) {
  const buff = Buffer.from(base64Str, 'base64');
  return buff.toString('utf-8');
}
