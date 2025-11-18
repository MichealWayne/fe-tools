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
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * @function formatDuration
 * @description 将毫秒数格式化为人类可读的时长。Formats milliseconds to human-readable duration
 * @param {number} ms - 毫秒数。Milliseconds
 * @returns {string} 格式化的时长字符串。Formatted duration string
 * @example
 * formatDuration(60000); // -> '1m 0s'
 * formatDuration(3661000); // -> '1h 1m 1s'
 * formatDuration(500); // -> '0.5s'
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
}

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
export function formatNumber(num: number, decimals?: number, separator = ','): string {
  const parts = typeof decimals === 'number' ? num.toFixed(decimals).split('.') : num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

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
export function formatCurrency(amount: number, currency = '$', decimals = 2): string {
  return `${currency}${formatNumber(amount, decimals)}`;
}

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
export function formatRelativeTime(date: Date | number): string {
  const timestamp = date instanceof Date ? date.getTime() : date;
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

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
export function formatPhone(phone: string, format = '(###) ###-####'): string {
  const digits = phone.replace(/\D/g, '');
  let formatted = format;
  let digitIndex = 0;

  for (let i = 0; i < formatted.length && digitIndex < digits.length; i++) {
    if (formatted[i] === '#') {
      formatted = formatted.substring(0, i) + digits[digitIndex] + formatted.substring(i + 1);
      digitIndex++;
    }
  }

  return formatted.replace(/#/g, '');
}

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
export function formatPercentage(value: number, decimals = 2, isDecimal = true): string {
  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
}

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
export function formatOrdinal(num: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
}
