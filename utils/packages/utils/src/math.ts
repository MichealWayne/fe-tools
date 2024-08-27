/**
 * @module Math
 * @description math functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:44:02
 */

/**
 * @function factorial
 * @description 获取斐波那契数列第n项的值
 * @param {number} n 阶乘数
 * @return {number} 阶乘结果
 * @example
 * factorial(5); // 120
 * factorial(0); // 1
 */
export function factorial(n: number): number {
  // eslint-disable-next-line no-nested-ternary
  return n < 0
    ? (() => {
        throw new TypeError('Negative numbers are not allowed!');
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);
}

/**
 * @function gcd
 * @description 计算两个数的最大公约数
 * @param {number} x 数字x
 * @param {number} y 数字y
 * @return {number} 最大公约数，如果y为0，则返回x
 * @example
 * gcd(12, 18); // 6
 * gcd(12, 0); // 12
 * gcd(1, 1); // 1
 */
export function gcd(x: number, y: number): number {
  return !y ? x : gcd(y, x % y);
}

/**
 * @function isDivisible
 * @description 检查一个数是否可以被另一个数整除
 * @param {number} dividend 被除数
 * @param {number} divisor  除数
 * @return {boolean} 是否可以整除
 * @example
 * isDivisible(12, 3); // true
 * isDivisible(12, 5); // false
 */
export function isDivisible(dividend: number, divisor: number) {
  return dividend % divisor === 0;
}

/**
 * @function lcm
 * @description 用于计算两个数字的最小公倍数
 * @need gcd
 * @param {number} x 数字x
 * @param {number} y 数字y
 * @return {number} 最小公倍数
 * @example
 * lcm(12, 18); // 36
 * lcm(12, 0); // 0
 */
export function lcm(x: number, y: number) {
  return Math.abs(x * y) / gcd(x, y);
}
