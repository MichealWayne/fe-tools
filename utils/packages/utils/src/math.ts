/**
 * @module Math
 * @description math functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-05-31 16:01:58
 */

/**
 * @function factorial
 * @param {number} n
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
 * @param {number} x
 * @param {number} y
 */
export function gcd(x: number, y: number): number {
  return !y ? x : gcd(y, x % y);
}

/**
 * @function isDivisible
 * @param {number} dividend
 * @param {number} divisor
 */
export function isDivisible(dividend: number, divisor: number) {
  return dividend % divisor === 0;
}

/**
 * @function isEven
 * @param {number} num
 */
export function isEven(num: number) {
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
