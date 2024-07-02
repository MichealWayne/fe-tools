/**
 * @module Array
 * @description array functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-06-29 13:52:21
 */

import { isArray, isObject } from './type';

export type NumberArr = number[];

export type AnyArr = unknown[];

/**
 * @function arrayMax
 * @description 求数组最大值
 * @param {number[]} arr
 * @return {number}
 * @example
 * arrayMax([1, 2, 3, 0, -1, -5]); // -> 3
 * arrayMax([1, 2, 3]); // -> 3
 */
export function arrayMax(arr: NumberArr): number {
  return Math.max(...arr);
}

/**
 * @function arrayMin
 * @description 求数组最小值
 * @param {number[]} arr
 * @return {number}
 * @example
 * arrayMax([1, 2, 3, 0, -1, -5]); // -> -5
 * arrayMax([1, 2, 3]); // -> 1
 */
export function arrayMin(arr: NumberArr): number {
  return Math.min(...arr);
}

/**
 * @function arrayAverage
 * @description 求数组平均值
 * @param {number[]} arr
 * @example
 * arrayMax([1, 2, 3, 0, -1, -5]); // -> 0
 * arrayMax([1, 2, 3]); // -> 2
 */
export function arrayAverage(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

/**
 * @function arraySum
 * @description 数组求和
 * @param {number[]} arr
 * @example
 * arrayMax([1, 2, 3]); // -> 6
 * arrayMax([-1, 2, 3]); // -> 4
 */
export function arraySum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * @function allEqual
 * @description 判断数组中所有项是否都相等。（NaN !== NaN）
 * @param {array} arr
 * @return {boolean}
 * @example
 * allEqual([0, 1, 2]); // false
 * allEqual([2, 2, 2]); // true
 * allEqual([2, 2, '2']); // false
 * allEqual([NaN, NaN, NaN]); // false
 */
export const allEqual = (arr: AnyArr): boolean => arr.every(val => val === arr[0]);

/**
 * @function size
 * @description 获取数组/字符串/Map/Set/对象属性/Blob对象数量
 * @param {any} val
 * @return {number}
 * @example
const arr = [1, 2, 3, 4, 5];
const arrSize = size(arr); // 5

const str = 'Hello, world!';
const strSize = size(str); // 14

const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
const mapSize = size(myMap); // 2

const mySet = new Set([1, 2, 3, 4, 5]);
const setSize = size(mySet); // 5

const obj = { a: 1, b: 2, c: 3 };
const objSize = size(obj); // 3

const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
const blobSize = size(blob); // 13
 */
export function size(val: unknown) {
  // eslint-disable-next-line no-nested-ternary
  return isArray(val)
    ? val.length
    : val && isObject(val)
    ? val.size || val.length || Object.keys(val).length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0;
}

/**
 * @function arrayToCSV
 * @description 二维数据转csv字符串
 * @param {unknown[][]} arr
 * @param {string} delimiter
 * @return {string}
 * @example
 * arrayToCSV([['a', 'b'], ['c', 'd']], ','); // '"a","b"\n"c","d"'
 */
export function arrayToCSV(arr: AnyArr[], delimiter = ','): string {
  return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
}

/**
 * @function castArray
 * @description 未知类型的数据val转数组
 * @param {unknown} val
 * @return {unknown[]}
 * @example
 * castArray('foo'); // ['foo']
 * castArray([1]); // [1]
 */
export function castArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val];
}

/**
 * @function chunk
 * @description 数组分片。
 * @param {array} arr
 * @param {number} size
 * @return {array}
 * @example
 * chunk([1,2,3,4,5], 3);  // [[1,2,3],[4,5]]
 * chunk([1,2,3,4,5], 2);  // [[1,2],[3,4],[5]]
 * chunk([1,2,3,4,5], 1);  // [[1],[2],[3],[4],[5]]
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from(
    {
      length: Math.ceil(arr.length / size),
    },
    (_v, i) => arr.slice(i * size, i * size + size)
  );
}

/**
 * @function compact
 * @description 数组筛选出“真”值项。（false、0、NaN、Undefined、null非真）
 * @param {unknown[]} arr
 * @return {array}
 * @example
 * compact([0, 1, false, 2, '', 3]);  // -> [1, 2, 3]
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN]);  // -> [1, 2, 3]
 */
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean);
}

/**
 * @function countOccurrences
 * @description 计算数据val在数组arr中出现的次数
 * @param {unknown[]} arr
 * @param {unknown} val
 * @return {number}
 * @example
 *   countOccurrences([1,2,4,5,2,6,3], 2);  // -> 2
 *  countOccurrences([1,2,4,5,2,6,3], 3);  // -> 1
 */
export function countOccurrences<T>(arr: T[], val: T): number {
  return arr.reduce((a: number, v) => (v === val ? a + 1 : a), 0);
}

/**
 * @function deepFlatten
 * @description 数组深度扁平化。（无ES5兼容要求的话可以直接用数组原型上的flat(deep)方法）
 * @param {unknown[]} arr
 * @return {array}
 * @example
 * deepFlatten([[1, 2, 3], 4, [5, 6, [7, 8, [9]]]]);  // -> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
export function deepFlatten(arr: unknown[]): unknown[] {
  return [].concat(...arr.map((v: any) => (Array.isArray(v) ? deepFlatten(v) : v)));
}

/**
 * @function flatten
 * @description 可控制扁平化深度depth的数组扁平化
 * @param {array} arr
 * @param {number} depth
 * @return {array}
 * @example
 * flatten([1, 2, [3, 4, [5, 6]]]); // -> [1, 2, 3, 4, [5, 6]]
 * flatten([1, 2, [3, 4, [5, 6]]], 2); // -> [1, 2, 3, 4, 5, 6]
 */
export function flatten(arr: AnyArr, depth = 1): unknown[] {
  return arr.reduce(
    (a: unknown[], v: unknown) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );
}

/**
 * @function difference
 * @description 判断两个数组项是否相同
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @return {boolean}
 * @example
 * difference([1, 2, 3], [1, 1, 2, 2, 3]);  // -> false
 * difference([1, 2, 3], [1, 2, 3, 4]);  // -> false
 * difference([1, 2, 3], [1, 2, 3]);  // -> true
 */
export function difference(arr1: AnyArr, arr2: AnyArr) {
  const s = new Set(arr2);
  return arr1.filter(x => !s.has(x));
}

/**
 * @function differenceBy
 * @description 每项比较通过方法fn进行判断，判断两个数组项是否相同
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @param {function} fn
 * @return {Boolean}
 * @example
 *   differenceBy([1, 2, 3], [2, 4, 6], x => x > 0);  // -> false
 *  differenceBy([1, 2, 3], [2, 4, 6], x => x > 1);  // -> true
 */
export function differenceBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => !s.has(fn(x)));
}

/**
 * @function dropWhile
 * @description 数组arr通过fn处理进行遍历
 * @param {unknown[]} arr
 * @param {function} func
 * @return {array}
 * @example
 * dropWhile([1, 2, 3, 4], n => n >= 3);  // -> [3, 4]
 */
export function dropWhile(_arr: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  let arr = _arr;
  while (arr.length && !fn(arr[0])) {
    arr = arr.slice(1);
  }
  return arr;
}

/**
 * @function indexOfAll
 * @description 查找数据val在数组arr中出现的所有位置
 * @param {array} arr
 * @param {any} val
 * @return {array}
 * @example
 * indexOfAll([1,2,3,4,2,2], 2);  // -> [1, 4, 5]
 * indexOfAll([1,2,3,4,2,2], 5);  // -> []
 */
export function indexOfAll(arr: any[], val: unknown): unknown[] {
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * @function intersection
 * @description 在数组arr1中筛选出arr2也包含的数据项。
 * @param {array} arr1
 * @param {array} arr2
 * @return {array}
 * @example
 * intersection([1, 2, 3, 4], [1, 2]);  // => [1, 2]
 * intersection([1, 2, 3, 4], [1, 5]);  // => [1]
 */
export function intersection(arr1: AnyArr, arr2: AnyArr): unknown[] {
  const s = new Set(arr2);
  return arr1.filter(x => s.has(x));
}

/**
 * @function intersectionBy
 * @description 在数组arr1中筛选出arr2也包含的数据项，通过方法fn进行筛选判断。
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);  // [2.1]
 */
export function intersectionBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => s.has(fn(x)));
}

/**
 * @function intersectionWith
 * @description 在数组arr1中筛选出arr2也包含的数据项，通过方法fn进行筛选判断。
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
 * @example
 * intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b));  // [1.5, 3, 0]
 */
export function intersectionWith(
  arr1: AnyArr,
  arr2: AnyArr,
  fn: (v: unknown, k: unknown) => unknown
) {
  return arr1.filter(x => arr2.findIndex(y => fn(x, y)) !== -1);
}

/**
 * @function negate
 * @description 反向筛选
 * @param {function} func
 * @return {function}
 * @example
 * [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0)); // [1,2,3]
 * [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 1)); // [2,4]
 */
export function negate(fn: (...args: unknown[]) => unknown) {
  return function (...args: unknown[]) {
    return !fn(...args);
  };
}

/**
 * @function sample
 * @description 从数组arr中随机取一项
 * @param {unknown[]} arr
 * @return {unknown}
 * @example
 * sample([3, 7, 9, 11]);  // -> 9(randomly)
 */
export function sample(arr: AnyArr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @function sampleSize
 *  @description 从数组arr中随机取几项
 * @param {array} param0
 * @param {number} num
 * @return {array}
 * @example
 * sampleSize([1, 2, 3], 2);  // [3,1] (randomly)
 */
export function sampleSize([...arr], num = 1) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, num);
}

/**
 * @function shuffle
 * @description 数组arr数据项打乱
 * @param {array} arr
 * @return {array}
 * @example
 * shuffle([1, 2, 3]);  // [2,3,1] (randomly)
 */
export function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

/**
 * @function everyNth
 * @description 数组arr间隔取值
 * @param {array} arr
 * @param {number} nth
 * @return {array}
 * @example
 * everyNth([1,2,3,4,5,6], 2);  // [1,3,5]
 */
export function everyNth(arr: AnyArr, nth: number) {
  return arr.filter((_e, i) => i % nth === 0);
}

/**
 * @function filterNonUnique
 * @description 筛选出数组中没有重复数字的数据项
 * @param {array} arr
 * @return {array}
 * @example
 * filterNonUnique([1,2,2,3,4,4,5]);  // [1,3,5]
 */
export function filterNonUnique(arr: AnyArr) {
  return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

/**
 * @function initializeArrayWithValues
 * @description 初始化数组
 * @param {number} len
 * @param {number} value
 * @return {array}
 * @example
 * initializeArrayWithValues(5, 2);  // [2,2,2,2,2]
 * initializeArrayWithValues(5);  // [0,0,0,0,0]
 */
export function initializeArrayWithValues(len: number, value = 0) {
  return Array(len).fill(value);
}

/**
 * @function remove
 * @description 筛选数组
 * @param {array} arr
 * @param {function} func
 * @return {array}
 * @example
 * const arr = [1,2,3,4,5]
 * remove(arr, (v) => v % 2 === 0);  // [2,4] (arr变成了[1,3,5])
 */
export function remove<T>(arr: T[], fn: (v: T) => boolean): T[] {
  const result: T[] = [];
  if (Array.isArray(arr)) {
    const filtered = arr.filter(fn);
    filtered.forEach(val => {
      arr.splice(arr.indexOf(val), 1);
      result.push(val);
    });
  }
  return result;
}

/**
 * @funciton digitize
 * @description 数字分隔为数字列表
 * @param {number} num
 * @return {number[]}
 * @example
 * digitize(12345); // [1, 2, 3, 4, 5]
 */
export function digitize(num: number) {
  return [...num.toString()].map(i => parseInt(i, 10));
}

/**
 * @function fibonacci
 * @description 斐波那次序列
 * @param {number} n
 * @return {array}
 * @example
 * fibonacci(5); // [0, 1, 1, 2, 3]
 */
export function fibonacci(n: number) {
  return Array(n)
    .fill(0)
    .reduce((acc, _val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
}

/**
 * @function median
 * @description 找中位数
 * @param {number[]} arr
 * @return {number}
 * @example
 * median([1, 2, 3, 4, 5]); // 3
 * median([1, 2, 3, 4, 5, 6]); // 3.5
 */
export function median(arr: NumberArr) {
  const mid = Math.floor(arr.length / 2);
  arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
}
