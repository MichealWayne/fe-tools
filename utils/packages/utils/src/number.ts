/**
 * @module Number
 * @description number functions
 * @author Wayne
 * @Date 2023-02-09 15:08:11
 * @LastEditTime 2024-08-25 13:50:37
 */

import { isNumber } from './type';

/**
 * @function isInt
 * @description 判断是否为整数。Checks if a value is an integer
 * @param {unknown} val - 任意值。Any value
 * @return {boolean} 是否为整数。Whether the value is an integer
 * @example
 * isInt(5); // true
 * isInt(2.5); // false
 * isInt('3'); // false
 * isInt(null); // false
 * isInt(undefined); // false
 */
export const isInt = (val: unknown): val is number => {
  return isNumber(val) && val % 1 === 0;
};

/**
 * @function isOdd
 * @description 判断一个数字是不是偶数。Checks if a number is even
 * @param {number} num - 数字。The number to check
 * @return {boolean} 是否为偶数。Whether the number is even
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
 * @function isFloat
 * @description 判断是否为浮点数。Checks if a value is a float
 * @param {unknown} val - 任意值。Any value
 * @return {boolean} 是否为浮点数。Whether the value is a float
 * @example
 * isFloat(3.14); // true
 * isFloat(-0.5); // true
 * isFloat(2); // false
 * isFloat('3.14'); // false
 * isFloat(null); // false
 * isFloat(undefined); // false
 */
export const isFloat = (val: unknown): val is number => {
  return isNumber(val) && val % 1 !== 0;
};

/**
 * @function isValidNumber
 * @description 是否是合法的数字。Checks if a value is a valid number
 * @param {unknown} val - 任意值。Any value
 * @return {boolean} 是否是合法的数字。Whether the value is a valid number
 * @example
 * isValidNumber(1); // true
 * isValidNumber('1'); // false
 * isValidNumber(NaN); // false
 * isValidNumber(Infinity); // false
 */
export function isValidNumber(val: unknown) {
  return !isNaN(parseFloat(val as string)) && isFinite(val as number) && Number(val) === val;
}

/**
 * @function isApproximatelyEqual
 * @description 两个数字是否约等于。Checks if two numbers are approximately equal
 * @param {number} val1 - 数字1。First number
 * @param {number} val2 - 数字2。Second number
 * @param {number} epsilon - 误差范围，默认为0.001。Error margin, default is 0.001
 * @return {boolean} 两个数字是否约等于。Whether the two numbers are approximately equal
 * @example
 * const val1 = 0.1 + 0.2;
 * const val2 = 0.3;
 * isApproximatelyEqual(val1, val2); // true
 * isApproximatelyEqual(val1, val2, 0.0001); // false
 */
export function isApproximatelyEqual(val1: number, val2: number, epsilon = 0.001) {
  return Math.abs(val1 - val2) < epsilon;
}

/**
 * @function average
 * @description 计算平均数。Calculates the average of numbers
 * @param  {number[]} nums - 数字数组。Array of numbers
 * @return {number} 平均数。The average of the numbers
 * @example
 * average(1, 2, 3); // 2
 */
export function average(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

/**
 * @function randomIntegerInRange
 * @description 求范围中的随机整数。Generates a random integer within a range
 * @param {number} min - 范围最小值。Minimum value of the range
 * @param {number} max - 范围最大值。Maximum value of the range
 * @return {number} 随机整数。Random integer within the range
 * @example
 * randomIntegerInRange(1, 10); // 一个1～10的随机整数。A random integer between 1 and 10
 */
export function randomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @description 求范围中的随机数（浮点数）。Generates a random floating-point number within a range
 * @param {number} min - 范围最小值。Minimum value of the range
 * @param {number} max - 范围最大值。Maximum value of the range
 * @return {number} 随机浮点数。Random floating-point number within the range
 * @example
 * randomNumberInRange(1, 10); // 一个1～10的随机浮点数。A random floating-point number between 1 and 10
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * @function randomIntArrayInRange
 * @description 求范围中的随机整数数组。Generates an array of random integers within a range
 * @param {number} min - 范围最小值。Minimum value of the range
 * @param {number} max - 范围最大值。Maximum value of the range
 * @param {number} num - 数组长度。Length of the array
 * @return {number[]} 随机整数数组。Array of random integers within the range
 * @example
 * randomIntArrayInRange(1, 10, 2); // [一个1～10的随机数, 另一个1～10的随机数]。[A random number between 1 and 10, another random number between 1 and 10]
 */
export function randomIntArrayInRange(min: number, max: number, num = 1) {
  return Array.from({ length: num }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * @function round
 * @description 数字取位。Rounds a number to a specified number of decimal places
 * @param {number} num - 数字。The number to round
 * @param {number} decimals - 保留小数位数，默认为0。Number of decimal places to keep, default is 0
 * @return {number} 取位后的数字。The rounded number
 * @example
 * round(5.6, 0); // 6
 * round(10, -1); // 10
 * round(12345.6789); // 12346
 * round(12345.6789, 2); // 12345.68
 */
export function round(num: number, decimals = 0) {
  const _decimals = decimals;
  return Number(`${Math.round(+`${num}e${_decimals}`)}e-${_decimals}`);
}

/**
 * @function sum
 * @description 数字求和。Calculates the sum of numbers
 * @param  {number[]} arr - 数字数组。Array of numbers
 * @return {number} 数字求和结果。The sum of the numbers
 * @example
 * sum(1, 2, 3); // 6
 */
export function sum(...arr: number[]) {
  return [...arr].reduce((acc, val) => acc + val, 0);
}

/**
 * @function clamp
 * @description 通过区间约束范围值。Clamps a number within a range
 * @param {number} num - 数字。The number to clamp
 * @param {number} min - 最小值。Minimum value
 * @param {number} max - 最大值。Maximum value
 * @return {number} 约束后的数字。The clamped number
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 */
export function clamp(num: number, min: number, max: number) {
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return num;
}
