/**
 * @module Trade
 * @description trade functions
 * @author Wayne
 * @Date 2022-04-11 21:45:54
 * @LastEditTime 2024-06-29 14:13:56
 */

/**
 * @function luhnCheck
 * @description 用于验证信用卡号是否有效（Luhn算法）
 * @param {number | string} num
 * @extends to:https://github.com/navyxie/bankcardinfo
 * @return {boolean}
 * @example
 * luhnCheck(79927398713); // true
 * luhnCheck(79927398710); // false
 */
export function luhnCheck(num: number) {
  const arr = String(num)
    .split('')
    .reverse()
    .map(x => parseInt(x, 10));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9 || 9)), 0);

  sum += lastDigit;
  return sum % 10 === 0;
}

/**
 * @function toCurrency
 * @description 将数字转换为货币格式的字符串
 * @param {Number} n
 * @param {currency string} curr
 * @param {country string} LanguageFormat
 * @return {string}
 * @example
 * toCurrency(1234.56, 'USD', 'en-US');  // '$1,234.56'
 * toCurrency(1234.56, 'USD', 'zh-CN');  // 'US$1,234.56'
 */
export function toCurrency(n: number, curr: string, LanguageFormat?: string) {
  return Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n);
}
