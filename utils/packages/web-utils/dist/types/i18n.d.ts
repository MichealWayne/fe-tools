/**
 * @module I18n
 * @description Internationalization utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:33
 */
/**
 * @function getLocale
 * @description 获取用户的首选语言。Gets user's preferred language
 * @returns {string} 语言代码(如'en-US')。Language code (e.g., 'en-US')
 * @example
 * const locale = getLocale(); // -> 'en-US' or 'zh-CN', etc.
 */
export declare function getLocale(): string;
/**
 * @function formatDateLocale
 * @description 根据本地化格式化日期。Formats date according to locale
 * @param {Date | number} date - 日期对象或时间戳。Date object or timestamp
 * @param {string} locale - 语言代码(可选,默认使用浏览器语言)。Language code (optional, defaults to browser language)
 * @param {object} options - 格式化选项。Formatting options
 * @returns {string} 格式化的日期字符串。Formatted date string
 * @example
 * const date = new Date('2025-01-18');
 * formatDateLocale(date, 'en-US'); // -> '1/18/2025'
 * formatDateLocale(date, 'zh-CN'); // -> '2025/1/18'
 * formatDateLocale(date, 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
 * // -> 'Saturday, January 18, 2025'
 */
export declare function formatDateLocale(date: Date | number, locale?: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * @function formatNumberLocale
 * @description 根据本地化格式化数字。Formats number according to locale
 * @param {number} num - 要格式化的数字。Number to format
 * @param {string} locale - 语言代码(可选)。Language code (optional)
 * @param {object} options - 格式化选项。Formatting options
 * @returns {string} 格式化的数字字符串。Formatted number string
 * @example
 * formatNumberLocale(1234567.89, 'en-US'); // -> '1,234,567.89'
 * formatNumberLocale(1234567.89, 'de-DE'); // -> '1.234.567,89'
 * formatNumberLocale(0.42, 'en-US', { style: 'percent' }); // -> '42%'
 */
export declare function formatNumberLocale(num: number, locale?: string, options?: Intl.NumberFormatOptions): string;
/**
 * @function formatCurrencyLocale
 * @description 根据本地化格式化货币。Formats currency according to locale
 * @param {number} amount - 金额。Amount
 * @param {string} currency - 货币代码(如'USD', 'EUR', 'CNY')。Currency code (e.g., 'USD', 'EUR', 'CNY')
 * @param {string} locale - 语言代码(可选)。Language code (optional)
 * @returns {string} 格式化的货币字符串。Formatted currency string
 * @example
 * formatCurrencyLocale(1234.56, 'USD', 'en-US'); // -> '$1,234.56'
 * formatCurrencyLocale(1234.56, 'EUR', 'de-DE'); // -> '1.234,56 €'
 * formatCurrencyLocale(1234.56, 'CNY', 'zh-CN'); // -> '¥1,234.56'
 */
export declare function formatCurrencyLocale(amount: number, currency: string, locale?: string): string;
/**
 * @function pluralize
 * @description 处理复数形式。Handles plural forms
 * @param {number} count - 数量。Count
 * @param {string} singular - 单数形式。Singular form
 * @param {string} plural - 复数形式(可选)。Plural form (optional)
 * @returns {string} 正确的单复数形式。Correct singular/plural form
 * @example
 * pluralize(1, 'item'); // -> 'item'
 * pluralize(5, 'item'); // -> 'items'
 * pluralize(2, 'person', 'people'); // -> 'people'
 */
export declare function pluralize(count: number, singular: string, plural?: string): string;
/**
 * @function getDirection
 * @description 获取文本方向(LTR或RTL)。Gets text direction (LTR or RTL)
 * @param {string} locale - 语言代码(可选)。Language code (optional)
 * @returns {string} 'ltr'或'rtl'。'ltr' or 'rtl'
 * @example
 * getDirection('en-US'); // -> 'ltr'
 * getDirection('ar-SA'); // -> 'rtl'
 * getDirection('he-IL'); // -> 'rtl'
 */
export declare function getDirection(locale?: string): 'ltr' | 'rtl';
/**
 * @function formatRelativeTime
 * @description 格式化相对时间。Formats relative time
 * @param {number} value - 时间值。Time value
 * @param {string} unit - 时间单位。Time unit
 * @param {string} locale - 语言代码(可选)。Language code (optional)
 * @returns {string} 格式化的相对时间。Formatted relative time
 * @example
 * formatRelativeTime(-1, 'day', 'en-US'); // -> 'yesterday'
 * formatRelativeTime(3, 'day', 'en-US'); // -> 'in 3 days'
 * formatRelativeTime(-2, 'hour', 'zh-CN'); // -> '2小时前'
 */
export declare function formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, locale?: string): string;
