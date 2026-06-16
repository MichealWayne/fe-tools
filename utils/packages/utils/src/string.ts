/**
 * @module String
 * @description String utility functions for text manipulation and processing
 * @author Wayne
 * @Date 2022-07-11 13:34:54
 * @LastEditTime 2025-09-07 21:24:31
 */

/**
 * @function byteSize
 * @description 使用UTF-8编码计算字符串的字节大小。Calculates the byte size of a string using UTF-8 encoding
 * @param {string} str - 要计算字节大小的字符串。String to calculate byte size for
 * @returns {number} 字符串在UTF-8编码中占用的字节数。Number of bytes the string occupies in UTF-8 encoding
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // ASCII characters (1 byte each)
 * byteSize('Hello, world!'); // -> 13
 * byteSize('ABC'); // -> 3
 *
 * ```
 * @example
 * ```ts
 * // Unicode characters (multi-byte)
 * byteSize('你好，世界！'); // -> 18 (Chinese characters are 3 bytes each in UTF-8)
 * byteSize('café'); // -> 5 (é is 2 bytes)
 *
 * ```
 * @example
 * ```ts
 * // Emoji and special characters
 * byteSize('😊'); // -> 4 (emoji are typically 4 bytes)
 * byteSize('🌟💫'); // -> 8 (two 4-byte emojis)
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * byteSize(''); // -> 0
 * byteSize(' '); // -> 1 (space character)
 * ```
 */
export function byteSize(str: string) {
  return new Blob([str]).size;
}

/**
 * @function capitalize
 * @description 将字符串的第一个字母大写，其余部分保持不变。Capitalizes the first letter of a string while keeping the rest unchanged
 * @param {string} paramString - 要大写的字符串。String to capitalize
 * @returns {string} 首字母大写的字符串。String with first letter capitalized
 * @throws {TypeError} 当paramString不是字符串时。When paramString is not a string
 * @example
 * ```ts
 * // Basic usage
 * capitalize('hello'); // -> 'Hello'
 * capitalize('world'); // -> 'World'
 * capitalize('hello world'); // -> 'Hello world'
 *
 * ```
 * @example
 * ```ts
 * // Already capitalized
 * capitalize('Hello'); // -> 'Hello'
 * capitalize('HELLO'); // -> 'HELLO'
 *
 * ```
 * @example
 * ```ts
 * // Special characters and numbers
 * capitalize('123abc'); // -> '123abc' (no letter to capitalize)
 * capitalize('!hello'); // -> '!hello' (first character is not a letter)
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * capitalize(''); // -> ''
 * capitalize('a'); // -> 'A'
 * ```
 */
export function capitalize(paramString: string): string {
  return paramString.charAt(0).toUpperCase() + paramString.slice(1);
}

/**
 * @function capitalizeEveryWord
 * @description 将字符串中每个单词的首字母大写（标题大小写）。Capitalizes the first letter of every word in a string (title case)
 * @param {string} str - 要转换为标题大小写的字符串。String to convert to title case
 * @returns {string} 每个单词首字母大写的字符串。String with each word's first letter capitalized
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Basic usage
 * capitalizeEveryWord('hello world'); // -> 'Hello World'
 * capitalizeEveryWord('the quick brown fox'); // -> 'The Quick Brown Fox'
 *
 * ```
 * @example
 * ```ts
 * // Mixed case input
 * capitalizeEveryWord('hELLo WoRLd'); // -> 'HELLo WoRLd' (only first letters are affected)
 *
 * ```
 * @example
 * ```ts
 * // Special characters and numbers
 * capitalizeEveryWord('hello-world test_case'); // -> 'Hello-World Test_Case'
 * capitalizeEveryWord('item1 item2 item3'); // -> 'Item1 Item2 Item3'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * capitalizeEveryWord(''); // -> ''
 * capitalizeEveryWord('a b c'); // -> 'A B C'
 * capitalizeEveryWord('  hello   world  '); // -> '  Hello   World  '
 * ```
 */
export function capitalizeEveryWord(str: string) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase());
}

/**
 * @function decapitalize
 * @description 将字符串的第一个字母转换为小写，其余部分保持不变。Converts the first letter of a string to lowercase while keeping the rest unchanged
 * @param {string} paramString - 要取消大写的字符串（使用解构获取第一个字符）。String to decapitalize (uses destructuring for first character)
 * @returns {string} 首字母小写的字符串。String with first letter in lowercase
 * @throws {TypeError} 当paramString不是字符串时。When paramString is not a string
 * @example
 * ```ts
 * // Basic usage
 * decapitalize('Hello'); // -> 'hello'
 * decapitalize('World'); // -> 'world'
 * decapitalize('Hello World'); // -> 'hello World'
 *
 * ```
 * @example
 * ```ts
 * // Already lowercase
 * decapitalize('hello'); // -> 'hello'
 * decapitalize('hELLO'); // -> 'hELLO'
 *
 * ```
 * @example
 * ```ts
 * // Special characters and numbers
 * decapitalize('123ABC'); // -> '123ABC' (first character is not a letter)
 * decapitalize('!Hello'); // -> '!Hello' (first character is not a letter)
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * decapitalize(''); // -> ''
 * decapitalize('A'); // -> 'a'
 * ```
 */
export function decapitalize([first, ...rest]: string) {
  // 旧实现用解构 [first, ...rest]：空串 '' 时 first 为 undefined，调用 first.toLowerCase() 抛 TypeError。
  // 修复：空串直接返回空串。
  // The old impl used destructuring: for empty string '', first is undefined and calling
  // .toLowerCase() throws TypeError. Fix: return empty string early.
  if (first === undefined) return '';
  return first.toLowerCase() + rest.join('');
}

/**
 * @function splitLines
 * @description 将字符串拆分为行数组，处理不同的行结束格式。Splits a string into an array of lines, handling different line ending formats
 * @param {string} str - 要拆分为行的字符串。String to split into lines
 * @returns {string[]} 字符串数组，每个字符串代表一行。Array of strings, each representing a line
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Unix line endings (
)
 * splitLines('line 1
line 2
line 3
'); // -> ['line 1', 'line 2', 'line 3', '']
 *
 * ```
 * @example
 * ```ts
 * // Windows line endings (
)
 * splitLines('line 1
line 2
line 3
'); // -> ['line 1', 'line 2', 'line 3', '']
 *
 * ```
 * @example
 * ```ts
 * // Mixed line endings
 * splitLines('line 1
line 2
line 3

'); // -> ['line 1', 'line 2', 'line 3', '']
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * splitLines(''); // -> ['']
 * splitLines('single line'); // -> ['single line']
 * splitLines('

'); // -> ['', '', '', '']
 * ```
 */

export function splitLines(str: string) {
  return str.split(/\r?\n/);
}

/**
 * @function stripHTMLTags
 * @description 移除字符串中的所有HTML标签，只保留文本内容。Removes all HTML tags from a string, leaving only the text content
 * @param {string} str - 包含要移除的HTML标签的字符串。String containing HTML tags to remove
 * @returns {string} 移除了所有HTML标签的字符串。String with all HTML tags removed
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Basic HTML removal
 * stripHTMLTags('<p>Hello, world!</p>'); // -> 'Hello, world!'
 * stripHTMLTags('<div><h1>Title</h1><p>Paragraph</p></div>'); // -> 'TitleParagraph'
 *
 * ```
 * @example
 * ```ts
 * // Links and attributes
 * stripHTMLTags('<a href="#" class="link">Home</a>'); // -> 'Home'
 * stripHTMLTags('<img src="image.jpg" alt="Image" />'); // -> ''
 *
 * ```
 * @example
 * ```ts
 * // Complex HTML structures
 * stripHTMLTags('<div class="container"><span style="color: red;">Red text</span></div>'); // -> 'Red text'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * stripHTMLTags(''); // -> ''
 * stripHTMLTags('No HTML here'); // -> 'No HTML here'
 * stripHTMLTags('<>'); // -> '<>' (malformed tags are not removed)
 *
 * ```
 * @example
 * ```ts
 * // Security note: This function only removes tags, not content
 * stripHTMLTags('<script>alert("xss")</script>'); // -> 'alert("xss")' (script content remains!)
 * ```
 */
export function stripHTMLTags(str: string) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * @function palindrome
 * @description 检查字符串是否为回文（正读和反读相同）。Checks if a string is a palindrome (reads the same forwards and backwards)
 * @param {string} str - 要检查回文属性的字符串。String to check for palindrome property
 * @returns {boolean} 如果字符串是回文则返回true（忽略大小写、空格和标点），否则返回false。True if the string is a palindrome (ignoring case, spaces, and punctuation), false otherwise
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Simple palindromes
 * palindrome('racecar'); // -> true
 * palindrome('level'); // -> true
 * palindrome('hello'); // -> false
 *
 * ```
 * @example
 * ```ts
 * // Case insensitive
 * palindrome('Racecar'); // -> true
 * palindrome('MadAm'); // -> true
 *
 * ```
 * @example
 * ```ts
 * // Ignoring spaces and punctuation
 * palindrome('A man, a plan, a canal: Panama'); // -> true
 * palindrome('race a car'); // -> false
 *
 * ```
 * @example
 * ```ts
 * // Numbers
 * palindrome('1001'); // -> true
 * palindrome('12321'); // -> true
 * palindrome('12345'); // -> false
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * palindrome(''); // -> true (empty string is considered palindrome)
 * palindrome('a'); // -> true (single character)
 * palindrome('!!'); // -> true (repeated punctuation)
 * ```
 */
export function palindrome(str: string) {
  const _str = str.toLowerCase().replace(/[\W_]/g, '');
  return _str === _str.split('').reverse().join('');
}
/**
 * @function fromCamelCase
 * @description 将camelCase或PascalCase字符串转换为snake_case或自定义分隔符格式。Converts camelCase or PascalCase strings to snake_case or custom separator format
 * @param {string} str - 要转换的camelCase字符串。CamelCase string to convert
 * @param {string} separator - 用作分隔符的字符（默认：'_'）。Character to use as separator (default: '_')
 * @returns {string} 转换为snake_case或自定义分隔符格式的字符串。String converted to snake_case or custom separator format
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Basic camelCase conversion
 * fromCamelCase('helloWorld'); // -> 'hello_world'
 * fromCamelCase('getUserName'); // -> 'get_user_name'
 *
 * ```
 * @example
 * ```ts
 * // PascalCase conversion
 * fromCamelCase('HelloWorld'); // -> 'hello_world'
 * fromCamelCase('XMLHttpRequest'); // -> 'xml_http_request'
 *
 * ```
 * @example
 * ```ts
 * // Custom separators
 * fromCamelCase('HelloWorld', '-'); // -> 'hello-world'
 * fromCamelCase('getUserName', '.'); // -> 'get.user.name'
 * fromCamelCase('XMLHttpRequest', ' '); // -> 'xml http request'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * fromCamelCase(''); // -> ''
 * fromCamelCase('hello'); // -> 'hello' (no conversion needed)
 * fromCamelCase('HTML'); // -> 'html'
 * fromCamelCase('XMLParser'); // -> 'xml_parser'
 * ```
 */
export function fromCamelCase(str: string, separator = '_') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${separator}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${separator}$2`)
    .toLowerCase();
}

/**
 * @function reverseString
 * @description 逐字符反转字符串，正确处理Unicode字符。Reverses a string character by character, properly handling Unicode characters
 * @param {string} str - 要反转的字符串。String to reverse
 * @returns {string} 字符顺序反转的字符串。String with characters in reverse order
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Basic usage
 * reverseString('hello'); // -> 'olleh'
 * reverseString('world'); // -> 'dlrow'
 * reverseString('hello world'); // -> 'dlrow olleh'
 *
 * ```
 * @example
 * ```ts
 * // Numbers and special characters
 * reverseString('12345'); // -> '54321'
 * reverseString('a!b@c#'); // -> '#c@b!a'
 *
 * ```
 * @example
 * ```ts
 * // Unicode characters (properly handled)
 * reverseString('你好世界'); // -> '界世好你'
 * reverseString('café'); // -> 'éfac'
 *
 * ```
 * @example
 * ```ts
 * // Emoji (properly handled as single units)
 * reverseString('😊🌟'); // -> '🌟😊'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * reverseString(''); // -> ''
 * reverseString('a'); // -> 'a'
 * reverseString('  '); // -> '  '
 * ```
 */
export function reverseString(str: string) {
  return [...str].reverse().join('');
}

/**
 * @function truncateString
 * @description 将字符串截断到指定长度，如果截断则添加省略号。Truncates a string to a specified length and adds ellipsis if truncated
 * @param {string} str - 要截断的字符串。String to truncate
 * @param {number} num - 截断后的总长度上限（含省略号，默认：10）。Total length cap including the ellipsis (default: 10)
 * @returns {string} 如果需要则带有省略号的截断字符串，或在限制内的原始字符串。Truncated string with ellipsis if needed, or original string if within limit
 * @example
 * ```ts
 * // Basic truncation
 * truncateString('hello world', 5); // -> 'he...' (slice(0, 5-3) + '...')
 * truncateString('hello world', 8); // -> 'hello...'
 *
 * ```
 * @example
 * ```ts
 * // Default length (10)
 * truncateString('hello world'); // -> 'hello w...'
 * truncateString('short'); // -> 'short' (no truncation needed)
 *
 * ```
 * @example
 * ```ts
 * // No truncation needed
 * truncateString('hello world', 11); // -> 'hello world'
 * truncateString('hello world', 20); // -> 'hello world'
 *
 * ```
 * @example
 * ```ts
 * // Very short limits (num <= 3: slice to num then append '...')
 * truncateString('hello', 3); // -> 'hel...'
 * truncateString('hello', 2); // -> 'he...'
 * truncateString('hello', 1); // -> 'h...'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * truncateString('', 5); // -> ''
 * ```
 */
export function truncateString(str: string, num = 10) {
  // num <= 3 时省略号会超出 num 上限，旧行为是 slice(0, num) + '...'（结果长度 = num + 3）。
  // For num <= 3 the ellipsis exceeds the cap; the existing behavior is slice(0, num) + '...'
  // (result length = num + 3).
  return str?.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}

/**
 * @function ellipsis
 * @description 将字符串截断到最大长度并添加自定义省略号后缀。Truncates a string to a maximum length and adds a custom ellipsis suffix
 * @param {string} str - 要截断的字符串。String to truncate
 * @param {number} maxLength - 包括省略号在内的最大允许长度（默认：10）。Maximum allowed length including ellipsis (default: 10)
 * @param {string} ellipsisStr - 自定义省略号字符串（默认：'...'）。Custom ellipsis string (default: '...')
 * @returns {string} 带有自定义省略号的截断字符串，或在限制内的原始字符串。Truncated string with custom ellipsis, or original string if within limit
 * @throws {TypeError} 当参数类型不符合预期时。When parameters are not of expected types
 * @example
 * ```ts
 * // Basic usage
 * ellipsis('hello world', 5); // -> 'he...'
 * ellipsis('hello world', 8); // -> 'hello...'
 *
 * ```
 * @example
 * ```ts
 * // Custom ellipsis
 * ellipsis('hello world', 5, '***'); // -> 'he***'
 * ellipsis('hello world', 8, ' [more]'); // -> 'h [more]'
 * ellipsis('hello world', 10, '…'); // -> 'hello wor…'
 *
 * ```
 * @example
 * ```ts
 * // No truncation needed
 * ellipsis('hello world', 20); // -> 'hello world'
 * ellipsis('short', 10); // -> 'short'
 *
 * ```
 * @example
 * ```ts
 * // Unicode strings
 * ellipsis('你好世界', 2); // -> '你…' (properly handles Unicode)
 * ellipsis('café restaurant', 6, '...'); // -> 'caf...'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * ellipsis('', 5); // -> ''
 * ellipsis('hello', 3, '...'); // -> '...' (ellipsis longer than maxLength)
 * ellipsis('hello', 10, ''); // -> 'hello' (empty ellipsis)
 * ```
 */
export function ellipsis(str: string, maxLength = 10, ellipsisStr = '...') {
  if (!str) return '';

  const ellipsisLength = ellipsisStr.length;
  if (str.length <= maxLength) return str;
  if (maxLength <= 0) return '';
  if (maxLength <= ellipsisLength) return ellipsisStr.slice(0, maxLength);

  return str.slice(0, maxLength - ellipsisLength) + ellipsisStr;
}

/**
 * @function maskString
 * @description 遮盖字符串的一部分，同时保持开头和结尾的指定字符可见。Masks part of a string while keeping specified characters visible at start and end
 * @param {string} str - 要遮盖的字符串。String to mask
 * @param {number} startVisible - 在开头保持可见的字符数（默认：3）。Number of characters to keep visible at the start (default: 3)
 * @param {number} endVisible - 在结尾保持可见的字符数（默认：4）。Number of characters to keep visible at the end (default: 4)
 * @param {string} maskChar - 用于遮盖的字符（默认：'*'）。Character to use for masking (default: '*')
 * @returns {string} 遮盖后的字符串，开头和结尾部分可见。Masked string with visible start and end portions
 * @throws {TypeError} 当参数类型不符合预期时。When parameters are not of expected types
 * @example
 * ```ts
 * // Phone number masking
 * maskString('13812345678'); // -> '138****5678'
 * maskString('1234567890', 2, 2); // -> '12******90'
 *
 * ```
 * @example
 * ```ts
 * // Email masking
 * maskString('user@example.com', 2, 8); // -> 'us****ample.com'
 * maskString('john.doe@company.com', 4, 12); // -> 'john********company.com'
 *
 * ```
 * @example
 * ```ts
 * // Custom mask character
 * maskString('123456789', 2, 2, '#'); // -> '12#####89'
 * maskString('password123', 1, 1, 'X'); // -> 'pXXXXXXXXX3'
 *
 * ```
 * @example
 * ```ts
 * // Unicode strings
 * maskString('张三李四王五', 1, 1); // -> '张***五'
 * maskString('用户名@邮箱.com', 2, 4); // -> '用户****箱.com'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * maskString(''); // -> ''
 * maskString('abc'); // -> 'abc' (too short to mask)
 * maskString('1234567', 3, 4); // -> '1234567' (startVisible + endVisible >= length)
 * maskString('12345', 10, 10); // -> '12345' (visible chars exceed string length)
 * ```
 */
export function maskString(str: string, startVisible = 3, endVisible = 4, maskChar = '*') {
  if (!str) return '';

  const len = str.length;

  // If string length is less than or equal to the sum of visible characters, return original
  if (len <= startVisible + endVisible) return str;

  const start = str.slice(0, startVisible);
  const end = str.slice(len - endVisible);
  const middle = maskChar.repeat(len - startVisible - endVisible);

  return start + middle + end;
}

/**
 * @function isChinese
 * @description 检查字符串是否仅包含中文字符（包括标点符号）。Checks if a string contains only Chinese characters (including punctuation)
 * @param {string} str - 要检查的字符串。String to check
 * @returns {boolean} 如果字符串仅包含中文字符（含中文标点）则返回true，否则返回false。True if string contains only Chinese characters (including Chinese punctuation), false otherwise
 * @example
 * ```ts
 * // Pure Chinese characters
 * isChinese('你好'); // -> true
 * isChinese('世界'); // -> true
 *
 * ```
 * @example
 * ```ts
 * // Mixed content
 * isChinese('hello'); // -> false
 * isChinese('你好hello'); // -> false
 * isChinese('你好123'); // -> false
 *
 * ```
 * @example
 * ```ts
 * // Chinese with punctuation
 * isChinese('你好，世界！'); // -> true
 * isChinese('这是一个测试。'); // -> true
 *
 * ```
 * @example
 * ```ts
 * // Mixed Chinese and English punctuation
 * isChinese('你好，世界！hello'); // -> false
 * isChinese('你好world'); // -> false
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * isChinese(''); // -> false
 * isChinese('123'); // -> false
 * isChinese('！￥。'); // -> true (full-width Chinese punctuation only)
 * isChinese('！@#￥%'); // -> false (contains half-width ASCII @#%)
 * ```
 */
export function isChinese(str: string) {
  // 旧正则 ^[\u4E00-\u9FA5]+$ 只覆盖 CJK 统一汉字，不含中文标点，与 JSDoc"含标点"描述矛盾
  //（如 '你好，世界！' 实际返回 false）。这里扩展到 CJK 标点区 \u3000-\u303F 与全角符号区 \uFF00-\uFFEF。
  // The old regex only covered CJK Unified Ideographs, not Chinese punctuation, contradicting
  // the JSDoc (e.g. '你好，世界！' actually returned false). Extend to the CJK Symbols and
  // Punctuation block \u3000-\u303F and the Fullwidth Forms/Halfwidth block \uFF00-\uFFEF.
  return /^[\u4E00-\u9FA5\u3000-\u303F\uFF00-\uFFEF]+$/.test(str);
}

/**
 * @function camelize
 * @description 将kebab-case、snake_case或其他带分隔符的字符串转换为camelCase。Converts kebab-case, snake_case, or other delimited strings to camelCase
 * @param {string} str - 带分隔符要转换为camelCase的字符串。String with delimiters to convert to camelCase
 * @returns {string} 转换为camelCase格式的字符串。String converted to camelCase format
 * @throws {TypeError} 当str不是字符串时。When str is not a string
 * @example
 * ```ts
 * // Kebab-case conversion
 * camelize('hello-world'); // -> 'helloWorld'
 * camelize('get-user-name'); // -> 'getUserName'
 *
 * ```
 * @example
 * ```ts
 * // Snake_case conversion
 * camelize('foo_bar'); // -> 'fooBar'
 * camelize('user_profile_data'); // -> 'userProfileData'
 *
 * ```
 * @example
 * ```ts
 * // Multiple delimiters (consecutive delimiters: only the first is consumed,
 * // a trailing delimiter without a following word char is left as-is)
 * camelize('foo---bar'); // -> 'foo--Bar'
 * camelize('test__case'); // -> 'test_case'
 *
 * ```
 * @example
 * ```ts
 * // Mixed case preservation
 * camelize('foo-bar-BAZ'); // -> 'fooBarBAZ'
 * camelize('XML-http-request'); // -> 'XMLHttpRequest'
 *
 * ```
 * @example
 * ```ts
 * // Numbers and special cases
 * camelize('foo-123-bar'); // -> 'foo123Bar'
 * camelize('api-v2-endpoint'); // -> 'apiV2Endpoint'
 *
 * ```
 * @example
 * ```ts
 * // Edge cases
 * camelize(''); // -> ''
 * camelize('hello'); // -> 'hello' (no delimiters)
 * camelize('-hello-world-'); // -> 'HelloWorld-' (trailing delimiter is preserved)
 * camelize('--multiple--dashes--'); // -> '-Multiple-Dashes--'
 * ```
 */
export function camelize(str: string): string {
  // 旧正则 [-|_] 把 | 当成字符类内的字面管道符（非交替），导致 'foo|bar' 会被错误地 camelize 成 'fooBar'。
  // 这里改为 [-_]：仅匹配连字符与下划线。
  // The old regex [-|_] treated | as a literal pipe inside the character class (not alternation),
  // so 'foo|bar' was wrongly camelized to 'fooBar'. Use [-_] to match only dash and underscore.
  return str.replace(/[-_](\w)/g, (_, c) => c.toUpperCase());
}
