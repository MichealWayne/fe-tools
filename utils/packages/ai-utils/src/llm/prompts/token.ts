/**
 * @module tokenUtils
 * @author Wayne
 * @Date 2023-07-14 15:30:41
 * @LastEditTime 2024-02-18 13:26:52
 */

/**
 * @function estimateTokenLength
 * @description 计算token数量
 * @param {string} input
 * @return {number}
 */
export function estimateTokenLength(input: string): number {
  let tokenLength = 0;

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);

    if (charCode < 128) {
      // ASCII character
      if (charCode <= 122 && charCode >= 65) {
        // a-Z
        tokenLength += 0.25;
      } else {
        tokenLength += 0.5;
      }
    } else {
      // Unicode character
      tokenLength += 1.5;
    }
  }

  return tokenLength;
}
