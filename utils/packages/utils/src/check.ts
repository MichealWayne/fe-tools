/* eslint-disable no-useless-escape */
/**
 * @module Check
 * @description check functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-09-01 10:08:44
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
 * @param {string} str
 * @return {boolean}
 */
export function isIdCard(str: string) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  );
}

/**
 * @function isUrl
 * @param {string} str
 * @return {boolean}
 */
export function isUrl(str: string) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @function isPhoneNumber
 * @param {string} str
 * @return {boolean}
 */
export function isPhoneNumber(str: string) {
  return /^0*(86)*(1)\d{10}$/.test(str);
}

/**
 * @function validateNumber
 * @param {any} n
 * @return {boolean}
 */
export function validateNumber(n: unknown) {
  return !isNaN(parseFloat(n as string)) && isFinite(n as number) && Number(n) === n;
}
