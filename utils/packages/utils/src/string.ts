/**
 * @module String
 * @author Wayne
 * @Date 2022-07-11 13:34:54
 * @LastEditTime 2025-06-14 16:54:27
 */

/**
 * @function byteSize
 * @description 用于计算字符串的字节数
 * @param {string} str 字符串
 * @return {number} 字节数
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
 * @param {string} paramString 字符串
 * @return {string} 返回转换后的字符串
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
 * @param {string} str 字符串
 * @return {string} 返回转换后的字符串
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
 * @param {string} paramString 字符串
 * @return {string} 返回转换后的字符串
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
 * @param {string} str 字符串
 * @return {string[]} 返回分割后的字符串数组
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
 * @param {string} str 字符串
 * @return {string} 返回删除 HTML 标签后的字符串
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
 * @param {string} str 字符串
 * @return {boolean} 是否为回文
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
 * @param {string} str 字符串
 * @param {string} separator 分隔符，默认为'_'
 * @return {string} 返回转换后的字符串
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
 * @param {string} str 字符串
 * @return {string} 返回反转后的字符串
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
 * @param {string} str 字符串
 * @param {number} num 截取长度，默认为10
 * @return {string} 返回截取后的字符串
 * @example
 * truncateString('hello world', 5); // 'hello...'
 * truncateString('hello world'); // 'hello worl...'
 * truncateString('hello world', 11); // 'hello world'
 */
export function truncateString(str: string, num = 10) {
  return str?.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

/**
 * @function ellipsis
 * @description 当字符串超过指定长度时进行截断并添加自定义后缀
 * @param {string} str 字符串
 * @param {number} maxLength 最大长度，默认为10
 * @param {string} ellipsisStr 省略符号，默认为"..."
 * @return {string} 返回处理后的字符串
 * @example
 * ellipsis('hello world', 5); // 'hello...'
 * ellipsis('hello world', 5, '***'); // 'hello***'
 * ellipsis('hello world', 20); // 'hello world'
 * ellipsis('你好世界', 2); // '你好...'
 */
export function ellipsis(str: string, maxLength = 10, ellipsisStr = '...') {
  if (!str) return '';

  const ellipsisLength = ellipsisStr.length;
  if (str.length <= maxLength) return str;

  return str.slice(0, maxLength - ellipsisLength) + ellipsisStr;
}

/**
 * @function maskString
 * @description 用于隐藏字符串中的部分信息，保留起始和结尾字符
 * @param {string} str 要处理的字符串
 * @param {number} startVisible 开头保留的字符数，默认为3
 * @param {number} endVisible 结尾保留的字符数，默认为4
 * @param {string} maskChar 遮罩字符，默认为"*"
 * @return {string} 返回处理后的字符串
 * @example
 * maskString('13812345678'); // '138****5678'
 * maskString('user@example.com', 2, 8); // 'us********example.com'
 * maskString('123456789', 2, 2, '#'); // '12#####89'
 * maskString('张三李四', 1, 1); // '张**四'
 */
export function maskString(str: string, startVisible = 3, endVisible = 4, maskChar = '*') {
  if (!str) return '';

  const len = str.length;

  // 如果字符串长度小于等于开头和结尾保留的字符数之和，直接返回原字符串
  if (len <= startVisible + endVisible) return str;

  const start = str.slice(0, startVisible);
  const end = str.slice(len - endVisible);
  const middle = maskChar.repeat(len - startVisible - endVisible);

  return start + middle + end;
}

/**
 * @function isChinese
 * @description 判断字符串是否全部是中文
 * @param {string} str 字符串
 * @return {boolean} 是否全部是中文
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
 * @param {string} str 待判断的字符串 test-data
 * @returns {string} 返回转换后的字符串 testData
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
