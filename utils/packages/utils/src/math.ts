/**
 * @module Math
 * @description math functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-04-03 21:21:12
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
 * @function isOdd
 * @description 判断一个数字是不是偶数
 * @param {number} num
 * @return {boolean}
 * @example
 * isOdd(2); // true
 * isOdd(0); // true
 * isOdd(1); // false
 * isOdd(-2); // true
 */
export function isOdd(num: number) {
  return num % 2 === 0;
}

/**
 * @function lcm
 * @need gcd
 * @param {number} x
 * @param {number} y
 */
export function lcm(x: number, y: number) {
  return Math.abs(x * y) / gcd(x, y);
}
