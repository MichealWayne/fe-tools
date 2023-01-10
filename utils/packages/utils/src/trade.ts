/**
 * @module Trade
 * @description trade functions
 * @author Wayne
 * @Date 2022-04-11 21:45:54
 * @LastEditTime 2023-01-07 13:58:27
 */

/**
 * @function luhnCheck
 * @param {Number | String} num
 * @extends to:https://github.com/navyxie/bankcardinfo
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
 * @param {Number} n
 * @param {currency string} curr
 * @param {country string} LanguageFormat
 */
export function toCurrency(n: number, curr: string, LanguageFormat = undefined) {
  return Intl.NumberFormat(LanguageFormat, {
    style: 'currency',
    currency: curr,
  }).format(n);
}
