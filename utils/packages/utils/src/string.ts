/**
 * @module String
 * @author Wayne
 * @Date 2022-07-11 13:34:54
 * @LastEditTime 2023-06-17 14:06:50
 */

/**
 * @function byteSize
 * @description 用于计算字符串的字节数
 * @param {string} str
 * @return {number}
 * @example
byteSize('Hello, world!'); // 13
byteSize('你好，世界！'); // 14
 */
export function byteSize(str: string) {
  return new Blob([str]).size;
}

/**
 * @function capitalize
 * @description 用于将字符串的第一个字母转换为大写字母
 * @param {string} paramString
 * @return {string}
 * @example
capitalize('hello'); // 'Hello'
capitalize('world'); // 'World'
 */
export function capitalize([first, ...rest]: string[]) {
  return first.toUpperCase() + rest.join('');
}

/**
 * @function capitalizeEveryWord
 * @description 将字符串中的每个单词的第一个字母转换为大写字母
 * @param {string} str
 * @return {string}
 * @example
capitalizeEveryWord('hello world'); // 'Hello World'
capitalizeEveryWord('the quick brown fox'); // 'The Quick Brown Fox'
 */
export function capitalizeEveryWord(str: string) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * @function decapitalize
 * @description 用于将字符串的第一个字母转换为小写字母
 * @param {string} paramString
 * @return {string}
 * @example
decapitalize('Hello'); // 'hello'
decapitalize('World'); // 'world'
 */
export function decapitalize([first, ...rest]: string) {
  return first.toLowerCase() + rest.join('');
}

/**
 * @function splitLines
 * @description 字符换行分割
 * @param {string} str
 * @return {string[]}
 * @example
 splitLines('line 1\nline 2\nline 3\n'); // ['line 1', 'line 2', 'line 3', '']
 splitLines('line 1\r\nline 2\r\nline 3\r\n'); // ['line 1', 'line 2', 'line 3', '']
 splitLines('line 1\nline 2\r\nline 3\n\r'); // ['line 1', 'line 2', 'line 3', '']
 splitLines(''); // ['']
 */
export function splitLines(str: string) {
  return str.split(/\r?\n/);
}

/**
 * @function stripHTMLTags
 * @description 从字符串中删除 HTML 标签
 * @param {string} str
 * @return {string}
 * @example
stripHTMLTags('<p>Hello, world!</p>'); // 'Hello, world!'
stripHTMLTags('<div><h1>Title</h1><p>Paragraph</p></div>'); // 'TitleParagraph'
 */
export function stripHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * @function palindrome
 * @description 判断一个字符串是否为回文
 * @param {string} str
 * @return {boolean}
 * @example
palindrome('racecar'); // true
palindrome('hello'); // false
palindrome('A man, a plan, a canal: Panama'); // true
 */
export function palindrome(str: string) {
  const _str = str.toLowerCase().replace(/[\W_]/g, '');
  return _str === _str.split('').reverse().join('');
}

/**
 * @function fromCamelCase
 * @description 用于将驼峰命名法的字符串转换为下划线命名法的字符串
 * @param {string} str
 * @param {string} separator
 * @return {string}
 * @example
fromCamelCase('helloWorld'); // 'hello_world'
fromCamelCase('HelloWorld'); // 'hello_world'
fromCamelCase('HelloWorld', '-'); // 'hello-world'
 */
export function fromCamelCase(str: string, separator = '_') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}

/**
 * @function reverseString
 * @description 反转字符串，比如用户需要将文本从右到左排列时。
 * @param {string} str
 * @return {string}
 * @example
reverseString('hello'); // 'olleh'
reverseString('world'); // 'dlrow'
reverseString('hello world'); // 'dlrow olleh'
 */
export function reverseString(str: string) {
  return [...str].reverse().join('');
}

/**
 * @function truncateString
 * @description 如果字符串的长度大于 num（默认为10），则返回截取后的字符串加上省略号
 * @param {string} str
 * @param {number} num
 * @return {string}
 * @example
truncateString('hello world', 5); // 'hello...'
truncateString('hello world'); // 'hello worl...'
truncateString('hello world', 11); // 'hello world'
 */
export function truncateString(str: string, num = 10) {
  return str?.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

/**
 * @function isChinese
 * @description 判断字符串是否全部是中文
 * @param {string} str
 * @return {boolean}
 * @example
isChinese('你好'); // true
isChinese('hello'); // false
isChinese('你好hello'); // false
 */
export function isChinese(str: string) {
  return /^[\u4E00-\u9FA5]{1,}$/.test(str);
}
