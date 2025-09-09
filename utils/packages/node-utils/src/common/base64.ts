/**
 * @fileoverview Base64 encoding and decoding utilities for Node.js applications, providing secure string encoding/decoding with validation functions.
 *
 * This module provides comprehensive Base64 encoding and decoding functionality using Node.js Buffer.
 * It includes encoding, decoding, and validation functions for handling Base64 data safely.
 * All functions support UTF-8 encoding and provide proper error handling for invalid inputs.
 *
 * @module Base64
 * @author Wayne
 * @since 1.0.0
 */

/**
 * @function base64Encode
 * @description 将UTF-8字符串编码为Base64格式。Encodes a UTF-8 string to Base64 format using Node.js Buffer for secure data transmission and storage.
 * @param {string} str - 要编码的字符串。The string to encode (supports UTF-8 and Unicode characters)
 * @returns {string} Base64编码后的字符串。Base64 encoded string
 * @example
 * // Basic string encoding
 * const encoded = base64Encode('hello world');
 * console.log(encoded); // 'aGVsbG8gd29ybGQ='
 *
 * @example
 * // Encode JSON data for API transmission
 * const data = { user: 'john', token: 'abc123' };
 * const encoded = base64Encode(JSON.stringify(data));
 * console.log(encoded); // Base64 representation of JSON
 *
 * @example
 * // Encode special characters and Unicode
 * const unicode = base64Encode('Hello 世界! 🌍');
 * console.log(unicode); // Properly encoded Unicode string
 *
 * @example
 * // Encode for URL-safe transmission
 * const credentials = base64Encode('username:password');
 * const authHeader = `Basic ${credentials}`;
 *
 * @see {@link base64Decode} - Decode Base64 strings
 * @see {@link isBase64Str} - Validate Base64 format
 */
export function base64Encode(str: string) {
  const buff = Buffer.from(str, 'utf-8');
  return buff.toString('base64');
}

/**
 * @function base64Decode
 * @description 将Base64字符串解码回UTF-8格式。Decodes a Base64 string back to UTF-8 format using Node.js Buffer with proper error handling.
 * @param {string} base64Str - 要解码的Base64字符串。The Base64 encoded string to decode
 * @returns {string} 解码后的UTF-8字符串。Decoded UTF-8 string
 * @throws {Error} 如果输入不是有效的Base64可能抛出错误。May throw if the input is not valid Base64
 * @example
 * // Basic string decoding
 * const decoded = base64Decode('aGVsbG8gd29ybGQ=');
 * console.log(decoded); // 'hello world'
 *
 * @example
 * // Decode and parse JSON data
 * const encodedJson = 'eyJ1c2VyIjoiam9obiIsInRva2VuIjoiYWJjMTIzIn0=';
 * const decodedJson = base64Decode(encodedJson);
 * const data = JSON.parse(decodedJson);
 * console.log(data); // { user: 'john', token: 'abc123' }
 *
 * @example
 * // Safe decoding with error handling
 * try {
 *   const result = base64Decode(userInput);
 *   console.log('Decoded successfully:', result);
 * } catch (error) {
 *   console.error('Invalid Base64 input:', error.message);
 * }
 *
 * @example
 * // Decode authentication credentials
 * const authHeader = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
 * const credentials = base64Decode(authHeader.replace('Basic ', ''));
 * console.log(credentials); // 'username:password'
 *
 * @see {@link base64Encode} - Encode strings to Base64
 * @see {@link isBase64Str} - Validate Base64 strings
 */
export function base64Decode(base64Str: string) {
  const buff = Buffer.from(base64Str, 'base64');
  return buff.toString('utf-8');
}

/**
 * @function isBase64Str
 * @description 验证字符串是否为正确格式的Base64。Validates whether a string is properly formatted Base64 using round-trip encoding verification.
 * @param {string} str - 要验证的字符串。The string to validate for Base64 format
 * @returns {boolean} 如果是有效Base64返回true，否则返回false。True if the string is valid Base64, false otherwise
 * @example
 * // Validate Base64 strings
 * console.log(isBase64Str('aGVsbG8gd29ybGQ=')); // true
 * console.log(isBase64Str('hello world'));       // false
 * console.log(isBase64Str('invalid@base64!'));   // false
 *
 * @example
 * // Input validation before decoding
 * function safeBase64Decode(input) {
 *   if (!isBase64Str(input)) {
 *     throw new Error('Invalid Base64 input');
 *   }
 *   return base64Decode(input);
 * }
 *
 * @example
 * // Filter valid Base64 strings from array
 * const inputs = ['aGVsbG8=', 'invalid', 'dGVzdA==', 'also-invalid'];
 * const validBase64 = inputs.filter(isBase64Str);
 * console.log(validBase64); // ['aGVsbG8=', 'dGVzdA==']
 *
 * @example
 * // API input validation
 * app.post('/decode', (req, res) => {
 *   const { data } = req.body;
 *   if (!isBase64Str(data)) {
 *     return res.status(400).json({ error: 'Invalid Base64 format' });
 *   }
 *   const decoded = base64Decode(data);
 *   res.json({ result: decoded });
 * });
 *
 * @see {@link base64Decode} - Decode validated Base64 strings
 */
export function isBase64Str(str: string): boolean {
  return Buffer.from(str, 'base64').toString('base64') === str;
}
