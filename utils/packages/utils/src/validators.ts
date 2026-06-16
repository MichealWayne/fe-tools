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
 * ```ts
 * isValidJSON('{"name": "John"}'); // -> true
 * isValidJSON('invalid'); // -> false
 * isValidJSON('[1, 2, 3]'); // -> true
 * ```
 */
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * @function isValidEmail
 * @description 检查字符串是否为有效的电子邮件地址(更严格的验证)。Checks if a string is a valid email address (stricter validation)
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效电子邮件则返回true。True if valid email
 * @example
 * ```ts
 * isValidEmail('user@example.com'); // -> true
 * isValidEmail('invalid.email'); // -> false
 * isValidEmail('test@domain.co.uk'); // -> true
 * ```
 */
export function isValidEmail(str: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * @function isValidURL
 * @description 检查字符串是否为有效的URL。Checks if a string is a valid URL
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效URL则返回true。True if valid URL
 * @example
 * ```ts
 * isValidURL('https://example.com'); // -> true
 * isValidURL('http://localhost:3000'); // -> true
 * isValidURL('not a url'); // -> false
 * ```
 */
export function isValidURL(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * @function isCreditCard
 * @description 使用Luhn算法检查信用卡号是否有效。Checks if credit card number is valid using Luhn algorithm
 * @param {string} str - 信用卡号字符串。Credit card number string
 * @returns {boolean} 如果是有效信用卡号则返回true。True if valid credit card number
 * @example
 * ```ts
 * isCreditCard('4532015112830366'); // -> true (Visa test number)
 * isCreditCard('1234567890123456'); // -> false
 * ```
 */
export function isCreditCard(str: string): boolean {
  const cleaned = str.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * @function isHexColor
 * @description 检查字符串是否为有效的十六进制颜色代码。Checks if string is a valid hex color code
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效十六进制颜色则返回true。True if valid hex color
 * @example
 * ```ts
 * isHexColor('#fff'); // -> true
 * isHexColor('#ffffff'); // -> true
 * isHexColor('#ABCDEF'); // -> true
 * isHexColor('red'); // -> false
 * ```
 */
export function isHexColor(str: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
}

/**
 * @function isIPv4
 * @description 检查字符串是否为有效的IPv4地址。Checks if string is a valid IPv4 address
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效IPv4地址则返回true。True if valid IPv4 address
 * @example
 * ```ts
 * isIPv4('192.168.1.1'); // -> true
 * isIPv4('255.255.255.255'); // -> true
 * isIPv4('256.1.1.1'); // -> false
 * ```
 */
export function isIPv4(str: string): boolean {
  const parts = str.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part, 10);
    return num >= 0 && num <= 255 && part === num.toString();
  });
}

/**
 * @function isPort
 * @description 检查数字是否为有效的端口号(1-65535)。Checks if number is a valid port (1-65535)
 * @param {number} port - 要验证的端口号。Port number to validate
 * @returns {boolean} 如果是有效端口则返回true。True if valid port
 * @example
 * ```ts
 * isPort(80); // -> true
 * isPort(3000); // -> true
 * isPort(0); // -> false
 * isPort(70000); // -> false
 * ```
 */
export function isPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/**
 * @function isJWT
 * @description 检查字符串是否为有效的JWT令牌格式。Checks if string is a valid JWT token format
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效JWT格式则返回true。True if valid JWT format
 * @example
 * ```ts
 * isJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U');
 * // -> true
 * ```
 */
export function isJWT(str: string): boolean {
  const parts = str.split('.');
  if (parts.length !== 3) return false;
  if (!parts.every(part => part.length > 0 && /^[A-Za-z0-9_-]+$/.test(part))) return false;

  const decodeBase64Url = (part: string): string | null => {
    try {
      const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
      if (typeof atob === 'function') {
        return atob(padded);
      }
      if (typeof Buffer !== 'undefined') {
        return Buffer.from(padded, 'base64').toString('utf8');
      }
      return null;
    } catch {
      return null;
    }
  };

  const header = decodeBase64Url(parts[0]);
  const payload = decodeBase64Url(parts[1]);
  if (header === null || payload === null) return false;

  try {
    const parsedHeader = JSON.parse(header);
    JSON.parse(payload);
    return Boolean(parsedHeader && typeof parsedHeader === 'object' && parsedHeader.alg);
  } catch {
    return false;
  }
}

/**
 * @function isSemVer
 * @description 检查字符串是否为有效的语义化版本号。Checks if string is a valid semantic version
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效语义化版本则返回true。True if valid semantic version
 * @example
 * ```ts
 * isSemVer('1.0.0'); // -> true
 * isSemVer('2.1.3-beta'); // -> true
 * isSemVer('1.0'); // -> false
 * ```
 */
export function isSemVer(str: string): boolean {
  return /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(
    str
  );
}

/**
 * @function isValidPhoneNumber
 * @description 检查字符串是否为有效的电话号码(支持多种格式)。Checks if string is a valid phone number (supports multiple formats)
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效电话号码则返回true。True if valid phone number
 * @example
 * ```ts
 * isValidPhoneNumber('+1234567890'); // -> true
 * isValidPhoneNumber('(123) 456-7890'); // -> true
 * isValidPhoneNumber('123-456-7890'); // -> true
 * ```
 */
export function isValidPhoneNumber(str: string): boolean {
  // 旧实现正则过宽：最少只需 3 位数字即可匹配（如 '12'），且允许中间全为括号分隔。
  // 修复：要求总数字位数至少 7 位（大多数国家号码至少 7 位），且整个字符串只含数字和常见分隔符。
  // The old regex was too permissive: as few as 3 digits could match (e.g. '12').
  // Fix: require at least 7 digits total and only allow digits and common separators.
  const digits = str.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(str);
}

/**
 * @function isMACAddress
 * @description 检查字符串是否为有效的MAC地址。Checks if string is a valid MAC address
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效MAC地址则返回true。True if valid MAC address
 * @example
 * ```ts
 * isMACAddress('00:1B:44:11:3A:B7'); // -> true
 * isMACAddress('00-1B-44-11-3A-B7'); // -> true
 * isMACAddress('invalid'); // -> false
 * ```
 */
export function isMACAddress(str: string): boolean {
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(str);
}

/**
 * @function isBase64
 * @description 检查字符串是否为有效的Base64编码。Checks if string is valid Base64 encoding
 * @param {string} str - 要验证的字符串。String to validate
 * @returns {boolean} 如果是有效Base64则返回true。True if valid Base64
 * @example
 * ```ts
 * isBase64('SGVsbG8gV29ybGQ='); // -> true
 * isBase64('not base64'); // -> false
 * ```
 */
export function isBase64(str: string): boolean {
  if (!str) return false;

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('base64') === str;
  }

  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}
