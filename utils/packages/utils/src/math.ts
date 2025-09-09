/**
 * @module Math
 * @description Mathematical utility functions for common calculations
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-09-07 20:35:07
 */

/**
 * @function factorial
 * @description 使用递归计算非负整数的阶乘。Calculates the factorial of a non-negative integer using recursion
 * @param {number} n - 要计算阶乘的非负整数。Non-negative integer to calculate factorial for
 * @returns {number} n的阶乘（n! = n × (n-1) × ... × 1）。对于n = 0或n = 1返回1。The factorial of n (n! = n × (n-1) × ... × 1). Returns 1 for n = 0 or n = 1
 * @throws {TypeError} 当n为负数时（负数不允许用于阶乘）。When n is negative (negative numbers are not allowed for factorial)
 * @throws {TypeError} 当n不是整数时。When n is not an integer
 * @example
 * // Basic usage
 * factorial(5); // -> 120 (5 × 4 × 3 × 2 × 1)
 * factorial(3); // -> 6 (3 × 2 × 1)
 * factorial(1); // -> 1
 * factorial(0); // -> 1 (by mathematical definition)
 *
 * @example
 * // Mathematical applications
 * // Permutations: n! / (n-r)!
 * const permutations = factorial(5) / factorial(5 - 3); // -> 60 (P(5,3))
 *
 * // Combinations: n! / (r! × (n-r)!)
 * const combinations = factorial(5) / (factorial(3) * factorial(5 - 3)); // -> 10 (C(5,3))
 *
 * @example
 * // Edge cases and errors
 * factorial(-1); // -> throws TypeError: "Negative numbers are not allowed!"
 * factorial(2.5); // -> works but not mathematically meaningful for non-integers
 *
 * @see {@link https://en.wikipedia.org/wiki/Factorial} - Mathematical definition of factorial
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
 * @description 使用欧几里得算法计算两个整数的最大公约数（GCD）。Calculates the Greatest Common Divisor (GCD) of two integers using Euclidean algorithm
 * @param {number} x - 第一个整数。First integer
 * @param {number} y - 第二个整数。Second integer
 * @returns {number} 能同时整除x和y的最大正整数。当y为0时返回|x|。The largest positive integer that divides both x and y. Returns |x| when y is 0
 * @throws {TypeError} 当x或y不是数字时。When x or y is not a number
 * @example
 * // Basic usage
 * gcd(12, 18); // -> 6 (largest number that divides both 12 and 18)
 * gcd(48, 18); // -> 6
 * gcd(17, 13); // -> 1 (coprime numbers)
 *
 * @example
 * // Edge cases
 * gcd(12, 0); // -> 12 (GCD of any number and 0 is the number itself)
 * gcd(0, 18); // -> 18
 * gcd(0, 0); // -> 0
 *
 * @example
 * // Negative numbers
 * gcd(-12, 18); // -> 6 (GCD is always positive)
 * gcd(12, -18); // -> 6
 * gcd(-12, -18); // -> 6
 *
 * @example
 * // Mathematical applications
 * // Simplifying fractions: reduce 12/18 to lowest terms
 * const numerator = 12, denominator = 18;
 * const divisor = gcd(numerator, denominator); // -> 6
 * const simplified = [numerator / divisor, denominator / divisor]; // -> [2, 3]
 *
 * @see {@link https://en.wikipedia.org/wiki/Euclidean_algorithm} - Euclidean algorithm explanation
 */
export function gcd(x: number, y: number): number {
  return !y ? x : gcd(y, x % y);
}

/**
 * @function isDivisible
 * @description 检查一个数字是否能被另一个数字整除（余数为零）。Checks if one number is evenly divisible by another (remainder is zero)
 * @param {number} dividend - 被除数。The number to be divided
 * @param {number} divisor - 除数。The number to divide by
 * @returns {boolean} 如果dividend能被divisor整除则返回true，否则返回false。True if dividend is evenly divisible by divisor, false otherwise
 * @throws {TypeError} 当dividend或divisor不是数字时。When dividend or divisor is not a number
 * @throws {Error} 当divisor为零时（除零错误）。When divisor is zero (division by zero)
 * @example
 * // Basic usage
 * isDivisible(12, 3); // -> true (12 ÷ 3 = 4 with remainder 0)
 * isDivisible(12, 5); // -> false (12 ÷ 5 = 2 with remainder 2)
 * isDivisible(15, 3); // -> true (15 ÷ 3 = 5 with remainder 0)
 *
 * @example
 * // Testing for even/odd numbers
 * isDivisible(8, 2); // -> true (8 is even)
 * isDivisible(7, 2); // -> false (7 is odd)
 *
 * @example
 * // Testing multiples
 * isDivisible(100, 10); // -> true (100 is a multiple of 10)
 * isDivisible(101, 10); // -> false (101 is not a multiple of 10)
 *
 * @example
 * // Edge cases
 * isDivisible(0, 5); // -> true (0 is divisible by any non-zero number)
 * isDivisible(5, 1); // -> true (any number is divisible by 1)
 * isDivisible(5, 0); // -> throws Error (division by zero)
 *
 * @example
 * // Negative numbers
 * isDivisible(-12, 3); // -> true (-12 ÷ 3 = -4 with remainder 0)
 * isDivisible(12, -3); // -> true (12 ÷ -3 = -4 with remainder 0)
 * isDivisible(-12, -3); // -> true (-12 ÷ -3 = 4 with remainder 0)
 */
export function isDivisible(dividend: number, divisor: number) {
  return dividend % divisor === 0;
}

/**
 * @function lcm
 * @description 计算两个整数的最小公倍数（LCM）。Calculates the Least Common Multiple (LCM) of two integers
 * @param {number} x - 第一个整数。First integer
 * @param {number} y - 第二个整数。Second integer
 * @returns {number} 能被x和y同时整除的最小正整数。如果x或y为0则返回0。The smallest positive integer that is divisible by both x and y. Returns 0 if either x or y is 0
 * @throws {TypeError} 当x或y不是数字时。When x or y is not a number
 * @example
 * // Basic usage
 * lcm(12, 18); // -> 36 (smallest number divisible by both 12 and 18)
 * lcm(4, 6); // -> 12
 * lcm(7, 5); // -> 35 (coprime numbers: LCM = x × y)
 *
 * @example
 * // Edge cases
 * lcm(12, 0); // -> 0 (LCM with 0 is always 0)
 * lcm(0, 18); // -> 0
 * lcm(5, 1); // -> 5 (LCM with 1 is the number itself)
 *
 * @example
 * // Identical numbers
 * lcm(8, 8); // -> 8 (LCM of identical numbers is the number itself)
 *
 * @example
 * // Mathematical relationship: LCM(x,y) × GCD(x,y) = |x × y|
 * const x = 12, y = 18;
 * const lcmResult = lcm(x, y); // -> 36
 * const gcdResult = gcd(x, y); // -> 6
 * console.log(lcmResult * gcdResult === Math.abs(x * y)); // -> true (36 × 6 = 216 = |12 × 18|)
 *
 * @example
 * // Practical application: finding common denominators
 * // To add fractions 1/12 + 1/18, find LCM of denominators
 * const commonDenominator = lcm(12, 18); // -> 36
 * // Convert: 1/12 = 3/36, 1/18 = 2/36, sum = 5/36
 *
 * @see {@link gcd} - Used internally to calculate LCM using the formula: LCM(x,y) = |x×y| / GCD(x,y)
 */
export function lcm(x: number, y: number) {
  return Math.abs(x * y) / gcd(x, y);
}
