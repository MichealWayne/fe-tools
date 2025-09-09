/**
 * @author Wayne
 * @Date 2023-05-28 15:45:10
 * @LastEditTime 2025-09-07 21:40:34
 * @description Web 安全工具函数
 */

/**
 * XSS 防御工具
 */

/**
 * @function escapeHtml
 * @description HTML转义函数，防止XSS攻击。HTML escape function to prevent XSS attacks
 * @param {string} str - 需要转义的字符串。The string to escape
 * @returns {string} 转义后的字符串。The escaped string
 */
export function escapeHtml(str: string): string {
  if (!str) return '';

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * @function unescapeHtml
 * @description HTML反转义函数。HTML unescape function
 * @param {string} str - 需要反转义的字符串。The string to unescape
 * @returns {string} 反转义后的字符串。The unescaped string
 */
export function unescapeHtml(str: string): string {
  if (!str) return '';

  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * @function sanitizeUrl
 * @description 过滤URL，防止JavaScript伪协议攻击。Filters URLs to prevent JavaScript pseudo-protocol attacks
 * @param {string} url - 需要过滤的URL。The URL to filter
 * @returns {string} 过滤后的URL。The filtered URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';

  const invalidProtocolRegex = /^([^\w]*)(javascript|data|vbscript|file):/i;

  // 移除控制字符 (ASCII 0-31) 和其他不可见字符
  // 逐个字符检查而不是使用正则表达式
  const sanitizedUrl = Array.from(url)
    .filter(char => {
      const code = char.charCodeAt(0);
      // 过滤 ASCII 控制字符 (0-31)、特殊区域 (127-159) 和某些 Unicode 空格字符
      return !(
        (
          (code >= 0 && code <= 31) ||
          (code >= 127 && code <= 159) ||
          (code >= 8192 && code <= 8205) ||
          code === 65279
        ) // FEFF (Zero Width No-Break Space)
      );
    })
    .join('');

  if (invalidProtocolRegex.test(sanitizedUrl)) {
    return 'about:blank';
  }

  return sanitizedUrl;
}

/**
 * 创建 CSP nonce 值
 * @returns 随机生成的 nonce 值
 */
export function generateCSPNonce(): string {
  // 生成一个随机的 base64 字符串作为 nonce
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  return btoa(String.fromCharCode.apply(null, Array.from(randomBytes)));
}

/**
 * 数据脱敏工具
 */

/**
 * 手机号脱敏（保留前 3 位和后 4 位）
 * @param phoneNumber 手机号
 * @returns 脱敏后的手机号
 */
export function maskPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) return '';

  const regex = /^(\d{3})(\d*)(\d{4})$/;
  return phoneNumber.replace(regex, '$1****$3');
}

/**
 * 邮箱脱敏（保留用户名首尾字符和域名）
 * @param email 邮箱
 * @returns 脱敏后的邮箱
 */
export function maskEmail(email: string): string {
  if (!email) return '';

  const [username, domain] = email.split('@');

  if (!domain) return email;

  let maskedUsername = username;
  if (username.length > 2) {
    maskedUsername = `${username.charAt(0)}***${username.charAt(username.length - 1)}`;
  }

  return `${maskedUsername}@${domain}`;
}

/**
 * 身份证号脱敏（保留前 4 位和后 4 位）
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号
 */
export function maskIDCard(idCard: string): string {
  if (!idCard) return '';

  const regex = /^(\d{4})(\d*)(\d{4})$/;
  return idCard.replace(regex, '$1**********$3');
}

/**
 * 银行卡号脱敏（保留后 4 位）
 * @param cardNumber 银行卡号
 * @returns 脱敏后的银行卡号
 */
export function maskBankCard(cardNumber: string): string {
  if (!cardNumber) return '';

  const regex = /^(\d*)(\d{4})$/;
  return cardNumber.replace(regex, '****$2');
}

/**
 * 通用文本脱敏函数
 * @param text 需要脱敏的文本
 * @param visibleStartChars 开头可见字符数
 * @param visibleEndChars 结尾可见字符数
 * @param mask 遮罩字符，默认为 *
 * @returns 脱敏后的文本
 */
export function maskText(
  text: string,
  visibleStartChars = 0,
  visibleEndChars = 0,
  mask = '*'
): string {
  if (!text) return '';

  const textLength = text.length;

  if (textLength <= visibleStartChars + visibleEndChars) {
    return text;
  }

  const start = text.substring(0, visibleStartChars);
  const end = text.substring(textLength - visibleEndChars);
  const masked = mask.repeat(textLength - visibleStartChars - visibleEndChars);

  return `${start}${masked}${end}`;
}

/**
 * CSRF 防护工具
 */

/**
 * 生成 CSRF Token
 * @returns 随机生成的 CSRF Token
 */
export function generateCSRFToken(): string {
  const randomBytes = new Uint8Array(32);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * 将 CSRF Token 存储到 localStorage
 * @param token CSRF Token
 * @param key 存储的键名，默认为 'csrf_token'
 */
export function storeCSRFToken(token: string, key = 'csrf_token'): void {
  localStorage.setItem(key, token);
}

/**
 * 从 localStorage 获取 CSRF Token
 * @param key 存储的键名，默认为 'csrf_token'
 * @returns CSRF Token
 */
export function getCSRFToken(key = 'csrf_token'): string {
  return localStorage.getItem(key) || '';
}

/**
 * 请求头中添加 CSRF Token
 * @param headers 请求头对象
 * @param token CSRF Token
 * @returns 添加了 CSRF Token 的请求头对象
 */
export function addCSRFHeader(
  headers: Record<string, string>,
  token?: string
): Record<string, string> {
  const csrfToken = token || getCSRFToken();

  if (csrfToken) {
    return {
      ...headers,
      'X-CSRF-Token': csrfToken,
    };
  }

  return headers;
}

/**
 * 内容安全策略 (CSP) 相关工具
 */

/**
 * 解析 CSP 策略字符串为对象
 * @param cspString CSP 策略字符串
 * @returns 解析后的 CSP 对象
 */
export function parseCSP(cspString: string): Record<string, string[]> {
  if (!cspString) return {};

  const result: Record<string, string[]> = {};
  const directives = cspString
    .split(';')
    .map(directive => directive.trim())
    .filter(Boolean);

  for (const directive of directives) {
    const [name, ...values] = directive.split(/\s+/);
    if (name) {
      result[name] = values;
    }
  }

  return result;
}

/**
 * 将 CSP 对象转换为策略字符串
 * @param cspObject CSP 对象
 * @returns CSP 策略字符串
 */
export function stringifyCSP(cspObject: Record<string, string[]>): string {
  return Object.entries(cspObject)
    .map(([name, values]) => {
      if (values.length === 0) {
        return name;
      }
      return `${name} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * 创建基本的 CSP 对象
 * @param nonce 可选的 nonce 值
 * @returns 基本的 CSP 对象
 */
export function createBaseCSP(nonce?: string): Record<string, string[]> {
  const csp: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'"],
    'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
  };

  if (nonce) {
    csp['script-src'].push(`'nonce-${nonce}'`);
    csp['style-src'].push(`'nonce-${nonce}'`);
  }

  return csp;
}
