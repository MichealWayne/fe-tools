"use strict";
/**
 * @module Math
 * @description math functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.lcm = exports.isEven = exports.isDivisible = exports.gcd = exports.factorial = void 0;
/**
 * @function factorial
 * @param {number} n
 */
function factorial(n) {
    // eslint-disable-next-line no-nested-ternary
    return n < 0
        ? (function () {
            throw new TypeError('Negative numbers are not allowed!');
        })()
        : n <= 1
            ? 1
            : n * factorial(n - 1);
}
exports.factorial = factorial;
/**
 * @function gcd
 * @param {number} x
 * @param {number} y
 */
function gcd(x, y) {
    return !y ? x : gcd(y, x % y);
}
exports.gcd = gcd;
/**
 * @function isDivisible
 * @param {number} dividend
 * @param {number} divisor
 */
function isDivisible(dividend, divisor) {
    return dividend % divisor === 0;
}
exports.isDivisible = isDivisible;
/**
 * @function isEven
 * @param {number} num
 */
function isEven(num) {
    return num % 2 === 0;
}
exports.isEven = isEven;
/**
 * @function lcm
 * @need gcd
 * @param {number} x
 * @param {number} y
 */
function lcm(x, y) {
    return Math.abs(x * y) / gcd(x, y);
}
exports.lcm = lcm;
