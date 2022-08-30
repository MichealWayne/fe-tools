/**
 * @module String
 * @description string functions
 */

/**
 * @function byteSize
 * @param {string} str
 */
export function byteSize(str: string) {
  return new Blob([str]).size;
}

/**
 * @function capitalize
 * @param {string} param0
 */
export function capitalize([first, ...rest]: string[]) {
  return first.toUpperCase() + rest.join('');
}

/**
 * @function capitalizeEveryWord
 * @param {string} str
 */
export function capitalizeEveryWord(str: string) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * @function decapitalize
 * @param {string} param0
 */
export function decapitalize([first, ...rest]: string) {
  return first.toLowerCase() + rest.join('');
}

/**
 * @function splitLines
 * @description 字符换行分割
 * @param {String} str
 */
export function splitLines(str: string) {
  return str.split(/\r?\n/);
}

/**
 * @function stripHTMLTags
 * @param {string} str
 */
export function stripHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * @function palindrome
 * @param {string} str
 */
export function palindrome(str: string) {
  const s = str.toLowerCase().replace(/[\W_]/g, '');
  return s === s.split('').reverse().join('');
}

/**
 * @function fromCamelCase
 * @param {string} str
 * @param {string} separator
 */
export function fromCamelCase(str: string, separator = '_') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}

/**
 * @function reverseString
 * @param {string} str
 */
export function reverseString(str: string) {
  return [...str].reverse().join('');
}

/**
 * @function truncateString
 * @param {string} str
 * @param {number} num
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
