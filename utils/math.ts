/**
 * @module Math
 * @description math functions
 */


/**
 * @function factorial
 * @param {number} n 
 */
export function factorial (n) {
    return n < 0
            ? (() => { throw new TypeError('Negative numbers are not allowed!') }) ()
            : n <= 1 ? 1 : n * factorial(n - 1);
}

/**
 * @function gcd
 * @param {number} x 
 * @param {number} y 
 */
export function gcd (x, y) {
    return !y ? x : gcd(y, x % y);
}

/**
 * @function isDivisible
 * @param {number} dividend 
 * @param {number} divisor 
 */
export function isDivisible (dividend, divisor) {
    return dividend % divisor === 0;
}

/**
 * @function isEven
 * @param {number} num 
 */
export function isEven (num) {
    return num % 2 === 0;
}

/**
 * @function lcm
 * @need gcd
 * @param {number} x 
 * @param {number} y 
 */
export function lcm (x, y) {
    return Math.abs(x * y) / (gcd(x, y));
}