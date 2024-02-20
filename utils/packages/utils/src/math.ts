/**
 * @module Math
 * @description math functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-02-18 11:02:05
 */

/**
 * @function factorial
 * @description 获取斐波那契数列第n项的值
 * @param {number} n
 * @return {number}
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
 * @param {number} x
 * @param {number} y
 * @return {number}
 * @example gcd(12, 18); // 6
 */
export function gcd(x: number, y: number): number {
  return !y ? x : gcd(y, x % y);
}

/**
 * @function isDivisible
 * @description 检查一个数是否可以被另一个数整除
 * @param {number} dividend
 * @param {number} divisor
 * @return {boolean}
 */
export function isDivisible(dividend: number, divisor: number) {
  return dividend % divisor === 0;
}

/**
 * @function lcm
 * @description 用于计算两个数字的最小公倍数
 * @need gcd
 * @param {number} x
 * @param {number} y
 * @example
 * lcm(12, 18); // 36
 */
export function lcm(x: number, y: number) {
  return Math.abs(x * y) / gcd(x, y);
}
