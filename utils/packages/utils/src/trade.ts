/**
 * @module Trade
 * @description trade functions
 * @author Wayne
 * @Date 2022-04-11 21:45:54
 * @LastEditTime 2024-08-25 13:55:11
 */

/**
 * @function luhnCheck
 * @description 用于验证信用卡号是否有效（Luhn算法）。Used to validate if a credit card number is valid (Luhn algorithm)
 * @param {number | string} num - 信用卡号。Credit card number
 * @extends to:https://github.com/navyxie/bankcardinfo
 * @return {boolean} 信用卡号是否有效。Whether the credit card number is valid
 * @example
 * ```ts
 * luhnCheck(79927398713); // true
 * luhnCheck(79927398710); // false
 * luhnCheck('4532015112830366'); // true (Visa test number)
 * ```
 */
export function luhnCheck(num: number | string) {
  // 标准实现：从右起第二位起隔位乘 2，结果 >9 则减 9。
  // 旧实现用 (val*2) % 9 || 9，对偶数位 0 会得到 0%9||9 = 9（应为 0），导致含 0 的卡号误判。
  // Standard: double every second digit from the right, subtract 9 if > 9.
  // The old (val*2) % 9 || 9 form mis-evaluated doubled 0 as 9, rejecting valid numbers containing 0.
  const arr = String(num)
    .split('')
    .reverse()
    .map(x => parseInt(x, 10));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce((acc, val, i) => {
    if (i % 2 !== 0) return acc + val;
    const doubled = val * 2;
    return acc + (doubled > 9 ? doubled - 9 : doubled);
  }, 0);

  sum += lastDigit;
  return sum % 10 === 0;
}

/**
 * @function toCurrency
 * @description 将数字转换为货币格式的字符串。Converts a number to a currency formatted string
 * @param {number} n - 数字。Number
 * @param {string} curr - 货币类型。Currency type
 * @param {string} LanguageFormat - 语言格式。Language format
 * @return {string} 货币格式的字符串。Currency formatted string
 * @example
 * ```ts
 * toCurrency(1234.56, 'USD', 'en-US');  // '$1,234.56'
 * toCurrency(1234.56, 'USD', 'zh-CN');  // 'US$1,234.56'
 * ```
 */
export function toCurrency(n: number, curr: string, LanguageFormat?: string) {
  return Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n);
}
