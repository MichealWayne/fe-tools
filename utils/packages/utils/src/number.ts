/**
 * @module Number
 * @description number functions
 */

/**
 * @function isApproximatelyEqual
 * @description 两个数字是否约等于
 * @param {Number} val1
 * @param {Number} val2
 * @param {Number} epsilon
 * @return {Boolean}
 */
export function isApproximatelyEqual(val1: number, val2: number, epsilon = 0.001) {
  return Math.abs(val1 - val2) < epsilon;
}

/**
 * @function average
 * @description 计算平均数
 * @param  {Number[]} nums
 */
export function average(...nums: number[]) {
  return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

/**
 * @function randomIntegerInRange
 * @description 求范围中的随机整数
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function randomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @description 求范围中的随机数（浮点数）
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * @function randomIntArrayInRange
 * @description 求范围中的随机整数数组
 * @param {Number} min
 * @param {Number} max
 * @param {Number} num
 * @return {Number[]}
 */
export function randomIntArrayInRange(min: number, max: number, num = 1) {
  return Array.from({ length: num }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * @function round
 * @description 数字取整
 * @param {Number} n
 * @param {Number} decimals
 * @return {Number}
 */
export function round(n: number, decimals: number) {
  return Number(`${Math.round(+`${n}e${decimals || 0}`)}e-${decimals}`);
}

/**
 * @function sum
 * @description 数字求和
 * @param  {Number[]} arr
 * @return {Number}
 */
export function sum(...arr: number[]) {
  return [...arr].reduce((acc, val) => acc + val, 0);
}

/**
 * @function isNumberEqual
 * @param {number} num1
 * @param {number} num2
 * @param {number} precision?
 */
export function isNumberEqual(num1: number, num2: number, precision = 0.00001) {
  return Math.abs(num1 - num2) < precision;
}

/**
 * @function clamp
 * @description 通过区间约束范围值
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 */
export function clamp(val: number, min: number, max: number) {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }
  return val;
}
