/**
 * @author Wayne
 * @Date 2024-10-13 13:34:58
 * @LastEditTime 2025-09-07 21:24:33
 */

/**
 * @function isBase64
 * @description 判断字符串是否是Base64格式。Determines whether a string is in Base64 format
 * @param {string} str - 要检查的字符串。The string to check
 * @return {boolean} 是否是Base64格式。Whether the string is in Base64 format
 */
export const isBase64 = (str: string): boolean => {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
};
