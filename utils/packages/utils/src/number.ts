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
 * @description 判断是否为整数
 * @param {unknown} val 任意值
 * @return {boolean} 是否为整数
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
 * @description 判断一个数字是不是偶数
 * @param {number} num 数字
 * @return {boolean} 是否为偶数
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
 * @description 判断是否为浮点数
 * @param {unknown} val 任意值
 * @return {boolean} 是否为浮点数
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
 * @description 是否是合法的数字
 * @param {unknown} val 任意值
 * @return {Boolean} 是否是合法的数字
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
 * @description 两个数字是否约等于
 * @param {number} val1 数字1
 * @param {number} val2 数字2
 * @param {number} epsilon 误差范围，默认为0.001
 * @return {boolean} 两个数字是否约等于
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
 * @description 计算平均数
 * @param  {number[]} nums 数字数组
 * @return {number} 平均数
 * @example
 * average(1, 2, 3); // 2
 */
export function average(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

/**
 * @function randomIntegerInRange
 * @description 求范围中的随机整数
 * @param {number} min 范围最小值
 * @param {number} max  范围最大值
 * @return {number} 随机整数
 * @example
 * randomNumberInRange(1, 10); // 一个1～10的随机整数
 */
export function randomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @description 求范围中的随机数（浮点数）
 * @param {number} min 范围最小值
 * @param {number} max 范围最大值
 * @return {number} 随机浮点数
 * @example
 * randomNumberInRange(1, 10); // 一个1～10的随机浮点数
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * @function randomIntArrayInRange
 * @description 求范围中的随机整数数组
 * @param {number} min 范围最小值
 * @param {number} max 范围最大值
 * @param {number} num 数组长度
 * @return {number[]} 随机整数数组
 * @example
 * randomIntArrayInRange(1, 10, 2); // [一个1～10的随机数, 另一个1～10的随机数]
 */
export function randomIntArrayInRange(min: number, max: number, num = 1) {
  return Array.from({ length: num }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * @function round
 * @description 数字取位
 * @param {number} num 数字
 * @param {number} decimals 保留小数位数，默认为0
 * @return {number} 取位后的数字
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
 * @description 数字求和
 * @param  {number[]} arr 数字数组
 * @return {number} 数字求和结果
 * @example
 * sum(1, 2, 3); // 6
 */
export function sum(...arr: number[]) {
  return [...arr].reduce((acc, val) => acc + val, 0);
}

/**
 * @function clamp
 * @description 通过区间约束范围值
 * @param {number} num 数字
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 约束后的数字
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
