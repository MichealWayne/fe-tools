/**
 * @module String
 * @description string functions
 */

/**
 * @function byteSize
 * @param {String} str
 * @return {Number}
 */
export function byteSize(str: string) {
  return new Blob([str]).size;
}

/**
 * @function capitalize
 * @param {String} paramString
 * @return {String}
 */
export function capitalize([first, ...rest]: string[]) {
  return first.toUpperCase() + rest.join('');
}

/**
 * @function capitalizeEveryWord
 * @param {String} str
 * @return {String}
 */
export function capitalizeEveryWord(str: string) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * @function decapitalize
 * @param {String} paramString
 * @return {String}
 */
export function decapitalize([first, ...rest]: string) {
  return first.toLowerCase() + rest.join('');
}

/**
 * @function splitLines
 * @description 字符换行分割
 * @param {String} str
 * @return {String}
 */
export function splitLines(str: string) {
  return str.split(/\r?\n/);
}

/**
 * @function stripHTMLTags
 * @param {String} str
 * @return {String}
 */
export function stripHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * @function palindrome
 * @param {String} str
 * @return {String}
 */
export function palindrome(str: string) {
  const _str = str.toLowerCase().replace(/[\W_]/g, '');
  return _str === _str.split('').reverse().join('');
}

/**
 * @function fromCamelCase
 * @param {String} str
 * @param {String} separator
 * @return {String}
 */
export function fromCamelCase(str: string, separator = '_') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}

/**
 * @function reverseString
 * @param {String} str
 * @return {String}
 */
export function reverseString(str: string) {
  return [...str].reverse().join('');
}

/**
 * @function truncateString
 * @param {String} str
 * @param {Number} num
 * @return {String}
 */
export function truncateString(str: string, num: number) {
  return str?.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

/**
 * @function isChinese
 * @param {String} str
 * @return {Boolean}
 */
export function isChinese(str: string) {
  return /^[\u4E00-\u9FA5]{1,}$/.test(str);
}
