/* eslint-disable no-useless-escape */
/**
 * @module Check
 * @description check functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-09-26 11:04:06
 */

/**
 * @function isEmail
 * @param {String} str
 * @return {Boolean}
 */
export function isEmail(str: string) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}

/**
 * @function isIdCard
 * @param {String} str
 * @return {Boolean}
 */
export function isIdCard(str: string) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  );
}

/**
 * @function isUrl
 * @param {String} str
 * @return {Boolean}
 */
export function isUrl(str: string) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @function isPhoneNumber
 * @description 中国大陆手机号验证。（如果要国际通用请用三方库或/^\+?\d+$/）
 * @param {String} str
 * @return {Boolean}
 */
export function isPhoneNumber(str: string) {
  return /^0*(86)*(1)\d{10}$/.test(str);
}
