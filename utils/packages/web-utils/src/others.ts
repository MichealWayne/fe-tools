/**
 * @author Wayne
 * @Date 2024-10-13 13:34:58
 * @LastEditTime 2024-10-13 13:35:16
 */

/**
 * @function isBase64
 * @description 判断字符串是否是base64
 * @param {string} str 字符串
 * @return {boolean} 是否是base64
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
