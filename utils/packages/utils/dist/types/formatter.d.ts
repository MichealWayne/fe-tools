/**
 * @module Formatter
 * @description Data formatting utilities for common use cases
 * @author Wayne
 * @Date 2025-01-18
 * @LastEditTime 2025-11-18 11:27:30
 */
/**
 * @function formatFileSize
 * @description 将字节数格式化为人类可读的文件大小。Formats bytes to human-readable file size
 * @param {number} bytes - 字节数。Number of bytes
 * @param {number} decimals - 小数位数(默认: 2)。Decimal places (default: 2)
 * @returns {string} 格式化的文件大小字符串。Formatted file size string
 * @example
 * formatFileSize(1024); // -> '1.00 KB'
 * formatFileSize(1234567); // -> '1.18 MB'
 * formatFileSize(1234567890); // -> '1.15 GB'
 * formatFileSize(1024, 0); // -> '1 KB'
 */
export declare function formatFileSize(bytes: number, decimals?: number): string;
/**
 * @function formatDuration
 * @description 将毫秒数格式化为人类可读的时长。Formats milliseconds to human-readable duration
 * @param {number} ms - 毫秒数。Milliseconds
 * @returns {string} 格式化的时长字符串。Formatted duration string
 * @example
 * formatDuration(60000); // -> '1m 0s'
 * formatDuration(3661000); // -> '1h 1m 1s'
 * formatDuration(500); // -> '500ms'
 */
export declare function formatDuration(ms: number): string;
/**
 * @function formatNumber
 * @description 格式化数字为千分位显示。Formats number with thousand separators
 * @param {number} num - 要格式化的数字。Number to format
 * @param {number} decimals - 小数位数。Decimal places
 * @param {string} separator - 千分位分隔符(默认: ',')。Thousand separator (default: ',')
 * @returns {string} 格式化的数字字符串。Formatted number string
 * @example
 * formatNumber(1234567.89); // -> '1,234,567.89'
 * formatNumber(1234567.89, 0); // -> '1,234,568'
 * formatNumber(1234567.89, 2, ' '); // -> '1 234 567.89'
 */
export declare function formatNumber(num: number, decimals?: number, separator?: string): string;
/**
 * @function formatCurrency
 * @description 格式化数字为货币显示。Formats number as currency
 * @param {number} amount - 金额。Amount
 * @param {string} currency - 货币符号(默认: '$')。Currency symbol (default: '$')
 * @param {number} decimals - 小数位数(默认: 2)。Decimal places (default: 2)
 * @returns {string} 格式化的货币字符串。Formatted currency string
 * @example
 * formatCurrency(1234.56); // -> '$1,234.56'
 * formatCurrency(1234.56, '¥'); // -> '¥1,234.56'
 * formatCurrency(1234.5, '$', 0); // -> '$1,235'
 */
export declare function formatCurrency(amount: number, currency?: string, decimals?: number): string;
/**
 * @function formatRelativeTime
 * @description 格式化相对时间(如"刚刚"、"5分钟前")。Formats relative time (like "just now", "5 minutes ago")
 * @param {Date | number} date - 日期对象或时间戳。Date object or timestamp
 * @returns {string} 相对时间字符串。Relative time string
 * @example
 * const now = Date.now();
 * formatRelativeTime(now); // -> 'just now'
 * formatRelativeTime(now - 60000); // -> '1 minute ago'
 * formatRelativeTime(now - 3600000); // -> '1 hour ago'
 * formatRelativeTime(now - 86400000); // -> '1 day ago'
 */
export declare function formatRelativeTime(date: Date | number): string;
/**
 * @function formatPhone
 * @description 格式化电话号码。Formats phone number
 * @param {string} phone - 电话号码字符串。Phone number string
 * @param {string} format - 格式模板(默认: '(###) ###-####')。Format template (default: '(###) ###-####')
 * @returns {string} 格式化的电话号码。Formatted phone number
 * @example
 * formatPhone('1234567890'); // -> '(123) 456-7890'
 * formatPhone('1234567890', '###-###-####'); // -> '123-456-7890'
 * formatPhone('12345678901', '+# (###) ###-####'); // -> '+1 (234) 567-8901'
 */
export declare function formatPhone(phone: string, format?: string): string;
/**
 * @function formatPercentage
 * @description 格式化数字为百分比。Formats number as percentage
 * @param {number} value - 数值(0-1或0-100)。Value (0-1 or 0-100)
 * @param {number} decimals - 小数位数(默认: 2)。Decimal places (default: 2)
 * @param {boolean} isDecimal - 输入是否为小数形式(默认: true)。Whether input is in decimal form (default: true)
 * @returns {string} 格式化的百分比字符串。Formatted percentage string
 * @example
 * formatPercentage(0.1234); // -> '12.34%'
 * formatPercentage(0.1234, 0); // -> '12%'
 * formatPercentage(12.34, 2, false); // -> '12.34%'
 */
export declare function formatPercentage(value: number, decimals?: number, isDecimal?: boolean): string;
/**
 * @function formatOrdinal
 * @description 将数字格式化为序数词(1st, 2nd, 3rd等)。Formats number as ordinal (1st, 2nd, 3rd, etc.)
 * @param {number} num - 要格式化的数字。Number to format
 * @returns {string} 序数词字符串。Ordinal string
 * @example
 * formatOrdinal(1); // -> '1st'
 * formatOrdinal(2); // -> '2nd'
 * formatOrdinal(3); // -> '3rd'
 * formatOrdinal(21); // -> '21st'
 * formatOrdinal(100); // -> '100th'
 */
export declare function formatOrdinal(num: number): string;
