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
export declare function escapeHtml(str: string): string;
/**
 * @function unescapeHtml
 * @description HTML反转义函数。HTML unescape function
 * @param {string} str - 需要反转义的字符串。The string to unescape
 * @returns {string} 反转义后的字符串。The unescaped string
 */
export declare function unescapeHtml(str: string): string;
/**
 * @function sanitizeUrl
 * @description 过滤URL，防止JavaScript伪协议攻击。Filters URLs to prevent JavaScript pseudo-protocol attacks
 * @param {string} url - 需要过滤的URL。The URL to filter
 * @returns {string} 过滤后的URL。The filtered URL
 */
export declare function sanitizeUrl(url: string): string;
/**
 * 创建 CSP nonce 值
 * @returns 随机生成的 nonce 值
 */
export declare function generateCSPNonce(): string;
/**
 * 数据脱敏工具
 */
/**
 * 手机号脱敏（保留前 3 位和后 4 位）
 * @param phoneNumber 手机号
 * @returns 脱敏后的手机号
 */
export declare function maskPhoneNumber(phoneNumber: string): string;
/**
 * 邮箱脱敏（保留用户名首尾字符和域名）
 * @param email 邮箱
 * @returns 脱敏后的邮箱
 */
export declare function maskEmail(email: string): string;
/**
 * 身份证号脱敏（保留前 4 位和后 4 位）
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号
 */
export declare function maskIDCard(idCard: string): string;
/**
 * 银行卡号脱敏（保留后 4 位）
 * @param cardNumber 银行卡号
 * @returns 脱敏后的银行卡号
 */
export declare function maskBankCard(cardNumber: string): string;
/**
 * 通用文本脱敏函数
 * @param text 需要脱敏的文本
 * @param visibleStartChars 开头可见字符数
 * @param visibleEndChars 结尾可见字符数
 * @param mask 遮罩字符，默认为 *
 * @returns 脱敏后的文本
 */
export declare function maskText(text: string, visibleStartChars?: number, visibleEndChars?: number, mask?: string): string;
/**
 * CSRF 防护工具
 */
/**
 * 生成 CSRF Token
 * @returns 随机生成的 CSRF Token
 */
export declare function generateCSRFToken(): string;
/**
 * 将 CSRF Token 存储到 localStorage
 * @param token CSRF Token
 * @param key 存储的键名，默认为 'csrf_token'
 */
export declare function storeCSRFToken(token: string, key?: string): void;
/**
 * 从 localStorage 获取 CSRF Token
 * @param key 存储的键名，默认为 'csrf_token'
 * @returns CSRF Token
 */
export declare function getCSRFToken(key?: string): string;
/**
 * 请求头中添加 CSRF Token
 * @param headers 请求头对象
 * @param token CSRF Token
 * @returns 添加了 CSRF Token 的请求头对象
 */
export declare function addCSRFHeader(headers: Record<string, string>, token?: string): Record<string, string>;
/**
 * 内容安全策略 (CSP) 相关工具
 */
/**
 * 解析 CSP 策略字符串为对象
 * @param cspString CSP 策略字符串
 * @returns 解析后的 CSP 对象
 */
export declare function parseCSP(cspString: string): Record<string, string[]>;
/**
 * 将 CSP 对象转换为策略字符串
 * @param cspObject CSP 对象
 * @returns CSP 策略字符串
 */
export declare function stringifyCSP(cspObject: Record<string, string[]>): string;
/**
 * 创建基本的 CSP 对象
 * @param nonce 可选的 nonce 值
 * @returns 基本的 CSP 对象
 */
export declare function createBaseCSP(nonce?: string): Record<string, string[]>;
