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
 * ```ts
 * isInt(5); // true
 * isInt(2.5); // false
 * isInt('3'); // false
 * isInt(null); // false
 * isInt(undefined); // false
 * ```
 */
export const isInt = (val: unknown): val is number => {
  return isNumber(val) && val % 1 === 0;
};

/**
 * @function isOdd
 * @description 判断一个数字是不是奇数。Checks if a number is odd
 * @param {number} num - 数字。The number to check
 * @return {boolean} 是否为奇数。Whether the number is odd
 * @example
 * ```ts
 * isOdd(2); // false
 * isOdd(0); // false
 * isOdd(1); // true
 * isOdd(-2); // false
 * isOdd(-3); // true
 * ```
 */
export function isOdd(num: number) {
  // 与函数名语义一致：判奇。旧实现是 num % 2 === 0（判偶），与函数名 isOdd 矛盾。
  // Match the function name: detect odd numbers. The old body (=== 0) checked even, contradicting isOdd.
  return num % 2 !== 0;
}

/**
 * @function isFloat
 * @description 判断是否为浮点数。Checks if a value is a float
 * @param {unknown} val - 任意值。Any value
 * @return {boolean} 是否为浮点数。Whether the value is a float
 * @example
 * ```ts
 * isFloat(3.14); // true
 * isFloat(-0.5); // true
 * isFloat(2); // false
 * isFloat('3.14'); // false
 * isFloat(null); // false
 * isFloat(undefined); // false
 * ```
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
 * ```ts
 * isValidNumber(1); // true
 * isValidNumber('1'); // false
 * isValidNumber(NaN); // false
 * isValidNumber(Infinity); // false
 * ```
 */
export function isValidNumber(val: unknown) {
  // 旧实现对 [1]（数组）返回 true：parseFloat([1]) → parseFloat('1') → 1，
  // isFinite(1) → true，Number([1])===1 → true。加上 typeof 排除非原始数字。
  // The old impl returned true for arrays like [1]: parseFloat([1]) → 1,
  // isFinite(1) → true, Number([1])===1 → true. Add typeof guard to reject non-primitives.
  return typeof val === 'number' && !isNaN(val) && isFinite(val);
}

/**
 * @function isApproximatelyEqual
 * @description 两个数字是否约等于。Checks if two numbers are approximately equal
 * @param {number} val1 - 数字1。First number
 * @param {number} val2 - 数字2。Second number
 * @param {number} epsilon - 误差范围，默认为0.001。Error margin, default is 0.001
 * @return {boolean} 两个数字是否约等于。Whether the two numbers are approximately equal
 * @example
 * ```ts
 * const val1 = 0.1 + 0.2;
 * const val2 = 0.3;
 * isApproximatelyEqual(val1, val2); // true
 * isApproximatelyEqual(val1, val2, 0.0001); // false
 * ```
 */
export function isApproximatelyEqual(val1: number, val2: number, epsilon = 0.001) {
  return Math.abs(val1 - val2) < epsilon;
}

/**
 * @function average
 * @description 计算平均数。Calculates the average of numbers
 * @param  {...number} nums - 数字。Numbers to average
 * @return {number} 平均数。The average of the numbers
 * @example
 * ```ts
 * average(1, 2, 3); // 2
 * ```
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
 * ```ts
 * randomIntegerInRange(1, 10); // 一个1～10的随机整数。A random integer between 1 and 10
 * ```
 */
export function randomIntegerInRange(min: number, max: number) {
  // 旧实现不处理 min>max，randomIntegerInRange(10,1) 会算出负的区间宽度，
  // 返回语义混乱的值。这里对 min>max 抛 RangeError 明确契约。
  // The old impl did not handle min>max; randomIntegerInRange(10,1) computed a negative
  // range width and returned a semantically meaningless value. Throw RangeError for min>max.
  if (min > max) {
    throw new RangeError(`randomIntegerInRange() expects min (${min}) <= max (${max})`);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @description 求范围中的随机数（浮点数，包含最小值，不包含最大值）。Generates a random floating-point number within a range (min inclusive, max exclusive)
 * @param {number} min - 范围最小值。Minimum value of the range
 * @param {number} max - 范围最大值。Maximum value of the range
 * @return {number} 随机浮点数。Random floating-point number within the range
 * @example
 * ```ts
 * randomNumberInRange(1, 10); // 一个1～10的随机浮点数。A random floating-point number between 1 and 10
 * ```
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * @function randomIntArrayInRange
 * @description 求范围中的随机整数数组。Generates an array of random integers within a range
 * @param {number} min - 范围最小值。Minimum value of the range
 * @param {number} max - 范围最大值。Maximum value of the range
 * @param {number} num - 数组长度。Length of the array
 * @return {number[]} 随机整数数组。Array of random integers within the range
 * @example
 * ```ts
 * randomIntArrayInRange(1, 10, 2); // [一个1～10的随机数, 另一个1～10的随机数]。[A random number between 1 and 10, another random number between 1 and 10]
 * ```
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
 * ```ts
 * round(5.6, 0); // 6
 * round(10, -1); // 10
 * round(12345.6789); // 12346
 * round(12345.6789, 2); // 12345.68
 * ```
 */
export function round(num: number, decimals = 0) {
  if (decimals === 0) return Math.round(num);
  if (decimals > 0) {
    const factor = 10 ** decimals;
    return Math.round(num * factor) / factor;
  }
  const factor = 10 ** Math.abs(decimals);
  return Math.round(num / factor) * factor;
}

/**
 * @function sum
 * @description 数字求和。Calculates the sum of numbers
 * @param  {...number} arr - 数字。Numbers to sum
 * @return {number} 数字求和结果。The sum of the numbers
 * @example
 * ```ts
 * sum(1, 2, 3); // 6
 * ```
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
 * ```ts
 * clamp(5, 0, 10); // 5
 * clamp(-5, 0, 10); // 0
 * clamp(15, 0, 10); // 10
 * ```
 */
export function clamp(num: number, min: number, max: number) {
  // 旧实现不校验 min>max，clamp(5,10,1) 等无意义输入会返回不可预测的值。这里与 chunk 的 size 校验一致，
  // 对 min>max 抛 RangeError 明确契约。
  // The old impl did not guard min>max; clamp(5,10,1) returned an unpredictable value.
  // Mirror chunk's validation and throw RangeError when min>max to make the contract explicit.
  if (min > max) {
    throw new RangeError(`clamp() expects min (${min}) <= max (${max})`);
  }
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return num;
}
