/**
 * @module Validators
 * @description Extended validation utilities for various data formats
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:32
 */
/**
 * @function isValidJSON
 * @description 检查字符串是否为有效的JSON格式。Checks if a string is valid JSON format
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效JSON则返回true。True if valid JSON
 * @example
 * isValidJSON('{"name": "John"}'); // -> true
 * isValidJSON('invalid'); // -> false
 * isValidJSON('[1, 2, 3]'); // -> true
 */
export declare function isValidJSON(str: string): boolean;
/**
 * @function isValidEmail
 * @description 检查字符串是否为有效的电子邮件地址(更严格的验证)。Checks if a string is a valid email address (stricter validation)
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效电子邮件则返回true。True if valid email
 * @example
 * isValidEmail('user@example.com'); // -> true
 * isValidEmail('invalid.email'); // -> false
 * isValidEmail('test@domain.co.uk'); // -> true
 */
export declare function isValidEmail(str: string): boolean;
/**
 * @function isValidURL
 * @description 检查字符串是否为有效的URL。Checks if a string is a valid URL
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效URL则返回true。True if valid URL
 * @example
 * isValidURL('https://example.com'); // -> true
 * isValidURL('http://localhost:3000'); // -> true
 * isValidURL('not a url'); // -> false
 */
export declare function isValidURL(str: string): boolean;
/**
 * @function isCreditCard
 * @description 使用Luhn算法检查信用卡号是否有效。Checks if credit card number is valid using Luhn algorithm
 * @param {string} str - 信用卡号字符串。Credit card number string
 * @returns {boolean} 如果是有效信用卡号则返回true。True if valid credit card number
 * @example
 * isCreditCard('4532015112830366'); // -> true (Visa test number)
 * isCreditCard('1234567890123456'); // -> false
 */
export declare function isCreditCard(str: string): boolean;
/**
 * @function isHexColor
 * @description 检查字符串是否为有效的十六进制颜色代码。Checks if string is a valid hex color code
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效十六进制颜色则返回true。True if valid hex color
 * @example
 * isHexColor('#fff'); // -> true
 * isHexColor('#ffffff'); // -> true
 * isHexColor('#ABCDEF'); // -> true
 * isHexColor('red'); // -> false
 */
export declare function isHexColor(str: string): boolean;
/**
 * @function isIPv4
 * @description 检查字符串是否为有效的IPv4地址。Checks if string is a valid IPv4 address
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效IPv4地址则返回true。True if valid IPv4 address
 * @example
 * isIPv4('192.168.1.1'); // -> true
 * isIPv4('255.255.255.255'); // -> true
 * isIPv4('256.1.1.1'); // -> false
 */
export declare function isIPv4(str: string): boolean;
/**
 * @function isPort
 * @description 检查数字是否为有效的端口号(1-65535)。Checks if number is a valid port (1-65535)
 * @param {number} port - 要验证的端口号。Port number to validate
 * @returns {boolean} 如果是有效端口则返回true。True if valid port
 * @example
 * isPort(80); // -> true
 * isPort(3000); // -> true
 * isPort(0); // -> false
 * isPort(70000); // -> false
 */
export declare function isPort(port: number): boolean;
/**
 * @function isJWT
 * @description 检查字符串是否为有效的JWT令牌格式。Checks if string is a valid JWT token format
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效JWT格式则返回true。True if valid JWT format
 * @example
 * isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U');
 * // -> true
 */
export declare function isJWT(str: string): boolean;
/**
 * @function isSemVer
 * @description 检查字符串是否为有效的语义化版本号。Checks if string is a valid semantic version
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效语义化版本则返回true。True if valid semantic version
 * @example
 * isSemVer('1.0.0'); // -> true
 * isSemVer('2.1.3-beta'); // -> true
 * isSemVer('1.0'); // -> false
 */
export declare function isSemVer(str: string): boolean;
/**
 * @function isValidPhoneNumber
 * @description 检查字符串是否为有效的电话号码(支持多种格式)。Checks if string is a valid phone number (supports multiple formats)
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效电话号码则返回true。True if valid phone number
 * @example
 * isValidPhoneNumber('+1234567890'); // -> true
 * isValidPhoneNumber('(123) 456-7890'); // -> true
 * isValidPhoneNumber('123-456-7890'); // -> true
 */
export declare function isValidPhoneNumber(str: string): boolean;
/**
 * @function isMACAddress
 * @description 检查字符串是否为有效的MAC地址。Checks if string is a valid MAC address
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效MAC地址则返回true。True if valid MAC address
 * @example
 * isMACAddress('00:1B:44:11:3A:B7'); // -> true
 * isMACAddress('00-1B-44-11-3A-B7'); // -> true
 * isMACAddress('invalid'); // -> false
 */
export declare function isMACAddress(str: string): boolean;
/**
 * @function isBase64
 * @description 检查字符串是否为有效的Base64编码。Checks if string is valid Base64 encoding
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效Base64则返回true。True if valid Base64
 * @example
 * isBase64('SGVsbG8gV29ybGQ='); // -> true
 * isBase64('not base64'); // -> false
 */
export declare function isBase64(str: string): boolean;
