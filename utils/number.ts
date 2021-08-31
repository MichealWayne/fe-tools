/**
 * @module Number
 * @description number functions
 */

/**
 * @function approximatelyEqual
 * @param {number} val1
 * @param {number} val2
 * @param {number} epsilon
 */
export function approximatelyEqual(val1, val2, epsilon = 0.001) {
  return Math.abs(val1 - val2) < epsilon;
}

/**
 * @function average
 * @param  {...number} nums
 */
export function average(...nums) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

/**
 * @function randomIntegerInRange
 * @param {number} min
 * @param {number} max
 */
export function randomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @param {number} min
 * @param {number} max
 */
export function randomNumberInRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * @function randomIntArrayInRange
 * @param {number} min
 * @param {number} max
 * @param {number} num
 */
export function randomIntArrayInRange(min, max, num = 1) {
  return Array.from({ length: num }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * @function round
 * @param {number} n
 * @param {number} decimals
 */
export function round(n: number, decimals: number = 0) {
  return Number(`${Math.round(+`${n}e${decimals}`)}e-${decimals}`);
}

/**
 * @function sum
 * @param  {...any} arr
 */
export function sum(...arr) {
  return [...arr].reduce((acc, val) => acc + val, 0);
}

/**
 * @function isNumberEqual
 * @param {number} num1
 * @param {number} num2
 * @param {number} precision?
 */
export function isNumberEqual(num1, num2, precision = 0.00001) {
  return Math.abs(num1 - num2) < precision;
}

/**
 * @function clamp
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
export function clamp(val, min, max) {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }
  return val;
}
