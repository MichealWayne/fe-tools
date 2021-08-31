/**
 * @module Check
 * @description check functions
 */

/**
 * @function validateEmail
 * @param {string} str
 * @return {boolean}
 */
export function validateEmail(str: string) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    str
  );
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
 * @function validateNumber
 * @param {any} n
 * @return {boolean}
 */
export function validateNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n;
}
