/**
 * @module String
 * @author Wayne
 * @Date 2022-07-11 13:34:54
 * @LastEditTime 2024-06-29 14:13:28
 */

/**
 * @function byteSize
 * @description 用于计算字符串的字节数
 * @param {string} str
 * @return {number}
 * @example
 * byteSize('Hello, world!'); // 13
 * byteSize('你好，世界！'); // 14
 * byteSize('😊'); // 4
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
 * capitalize('hello'); // 'Hello'
 * capitalize('world'); // 'World'
 * capitalize('hello world'); // 'Hello world'
 */
export function capitalize(paramString: string): string {
  return paramString.charAt(0).toUpperCase() + paramString.slice(1);
}

/**
 * @function capitalizeEveryWord
 * @description 将字符串中的每个单词的第一个字母转换为大写字母
 * @param {string} str
 * @return {string}
 * @example
 * capitalizeEveryWord('hello world'); // 'Hello World'
 * capitalizeEveryWord('the quick brown fox'); // 'The Quick Brown Fox'
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
 * decapitalize('Hello'); // 'hello'
 * decapitalize('World'); // 'world'
 * decapitalize('Hello World'); // 'hello World'
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
 * splitLines('line 1\nline 2\nline 3\n'); // ['line 1', 'line 2', 'line 3', '']
 * splitLines('line 1\r\nline 2\r\nline 3\r\n'); // ['line 1', 'line 2', 'line 3', '']
 * splitLines('line 1\nline 2\r\nline 3\n\r'); // ['line 1', 'line 2', 'line 3', '']
 * splitLines(''); // ['']
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
 * stripHTMLTags('<p>Hello, world!</p>'); // 'Hello, world!'
 * stripHTMLTags('<div><h1>Title</h1><p>Paragraph</p></div>'); // 'TitleParagraph'
 * stripHTMLTags('<a href="#">Home</a>'); // 'Home'
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
 * palindrome('racecar'); // true
 * palindrome('hello'); // false
 * palindrome('A man, a plan, a canal: Panama'); // true
 * palindrome('1001'); // true
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
 * fromCamelCase('helloWorld'); // 'hello_world'
 * fromCamelCase('HelloWorld'); // 'hello_world'
 * fromCamelCase('HelloWorld', '-'); // 'hello-world'
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
 * reverseString('hello'); // 'olleh'
 * reverseString('world'); // 'dlrow'
 * reverseString('hello world'); // 'dlrow olleh'
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
 * truncateString('hello world', 5); // 'hello...'
 * truncateString('hello world'); // 'hello worl...'
 * truncateString('hello world', 11); // 'hello world'
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
 * isChinese('你好'); // true
 * isChinese('hello'); // false
 * isChinese('你好hello'); // false
 * isChinese('你好，世界！'); // true
 * isChinese('你好，世界！hello'); // false
 */
export function isChinese(str: string) {
  return /^[\u4E00-\u9FA5]{1,}$/.test(str);
}

/**
 * @function camelize
 * @description 将字符串转换成驼峰命名方式
 * @param {String} str 待判断的字符串 test-data
 * @returns {String} 返回转换后的字符串 testData
 * @example
// Test case 1: Basic functionality
const input1 = "hello-world";
const expectedOutput1 = "helloWorld";
const actualOutput1 = camelize(input1);
console.log(actualOutput1 === expectedOutput1); // true

// Test case 2: Input with underscore separator
const input2 = "foo_bar";
const expectedOutput2 = "fooBar";
const actualOutput2 = camelize(input2);
console.log(actualOutput2 === expectedOutput2); // true

// Test case 3: Input with multiple separators in a row
const input3 = "foo---bar";
const expectedOutput3 = "fooBar";
const actualOutput3 = camelize(input3);
console.log(actualOutput3 === expectedOutput3); // true

// Test case 4: Input with uppercase letters
const input4 = "foo-bar-BAZ";
const expectedOutput4 = "fooBarBAZ";
const actualOutput4 = camelize(input4);
console.log(actualOutput4 === expectedOutput4); // true

// Test case 5: Input with numbers
const input5 = "foo-123-bar";
const expectedOutput5 = "foo123Bar";
const actualOutput5 = camelize(input5);
console.log(actualOutput5 === expectedOutput5); // true
 */
export function camelize(str: string): string {
  return str.replace(/[-|_](\w)/g, (_, c) => c.toUpperCase());
}
