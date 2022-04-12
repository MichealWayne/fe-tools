/**
 * @module Array
 * @description array functions
 */

export type NumberArr = number[];

export type AnyArr = unknown[];

/**
 * @function arrayMax
 * @param {array} arr
 * @return {number}
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> 3
 */
export function arrayMax(arr: NumberArr): number {
  return Math.max(...arr);
}

/**
 * @function arrayMin
 * @param {array} arr
 * @return {number}
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> -5
 */
export function arrayMin(arr: NumberArr): number {
  return Math.min(...arr);
}

/**
 * @function arrayAverage
 * @param {number[]} arr
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> 0
 */
export function arrayAverage(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

/**
 * @function arraySum
 * @param {number[]} arr
 * @example
 *   arrayMax([1, 2, 3]); // -> 6
 */
export function arraySum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * @function all
 * @param {unknown[]} arr
 * @param {function} fn
 * @return {boolean}
 * @example
 *   all([1, 2, 3], num => num > 0);  // -> true
 *   all([1, 2, 3], num => num > 2);  // -> false
 */
export interface ArrayHook {
  (value: any, index?: number, array?: unknown[]): boolean;
}
export const all = (arr: AnyArr, fn: ArrayHook = Boolean): boolean => arr.every(fn);

/**
 * @function allEqual
 * @param {array} arr
 * @return {boolean}
 * @example
 *   allEqual([0, 1, 2]); // false
 *   allEqual([2, 2, 2]); // true
 */
export const allEqual = (arr: AnyArr): boolean => arr.every(val => val === arr[0]);

/**
 * @function arrayToCSV
 * @param {unknown[][]} arr
 * @param {string} delimiter
 * @return {string}
 */
export function arrayToCSV(arr: AnyArr[], delimiter?: string): string {
  return arr.map(v => v.map(x => `"${x}"`).join(delimiter || ',')).join('\n');
}

/**
 * @function castArray
 * @param {any} val
 * @return {array}
 */
export function castArray(val: unknown): unknown[] {
  return Array.isArray(val) ? val : [val];
}

/**
 * @function chunk
 * @param {array} arr
 * @param {number} size
 * @return {array}
 */
export function chunk(arr: AnyArr, size: number): unknown[] {
  return Array.from(
    {
      length: Math.ceil(arr.length / size),
    },
    (v, i) => arr.slice(i * size, i * size + size)
  );
}

/**
 * @function compact
 * @param {unknown[]} arr
 * @return {array}
 */
export function compact(arr: AnyArr): unknown[] {
  return arr.filter(Boolean);
}

/**
 * @function countOccurrences
 * @param {unknown[]} arr
 * @param {unknown} val
 * @return {number}
 * @example
 *   countOccurrences([1,2,4,5,2,6,3], 2);  // -> 2
 */
export function countOccurrences(arr: AnyArr, val: unknown): number {
  return arr.reduce((a: number, v) => (v === val ? a + 1 : a), 0);
}

/**
 * @function deepFlatten
 * @param {unknown[]} arr
 * @return {array}
 * @example
 *   deepFlatten([[1, 2, 3], 4, [5, 6, [7, 8, [9]]]]);  // -> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
export function deepFlatten(arr: unknown[]): unknown[] {
  return [].concat(...arr.map((v: any) => (Array.isArray(v) ? deepFlatten(v) : v)));
}

/**
 * @function flatten
 * @param {array} arr
 * @param {number} depth
 * @return {array}
 * @example
 *   flatten([1, 2, [3, 4, [5, 6]]]); // -> [1, 2, 3, 4, [5, 6]]
 *   flatten([1, 2, [3, 4, [5, 6]]], 2); // -> [1, 2, 3, 4, 5, 6]
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
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @return {array}
 * @example
 *   difference([1, 2, 3], [1, 1, 2, 2, 3]);  // -> false
 *   difference([1, 2, 3], [1, 2, 3, 4]);  // -> false
 *   difference([1, 2, 3], [1, 2, 4]);  // -> true
 */
export function difference(arr1: AnyArr, arr2: AnyArr) {
  const s = new Set(arr2);
  return arr1.filter(x => !s.has(x));
}

/**
 * @function differenceBy
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @param {function} fn
 * @return {array}
 * @example
 *   differenceBy([1, 2, 3], [2, 4, 6], x => x > 0);  // -> false
 */
export function differenceBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => !s.has(fn(x)));
}

/**
 * @function dropWhile
 * @param {unknown[]} arr
 * @param {function} func
 * @return {array}
 */
export function dropWhile(_arr: AnyArr, fn: (v: any) => unknown): unknown[] {
  let arr = _arr;
  while (arr.length && !fn(arr[0])) arr = arr.slice(1);
  return arr;
}

/**
 * @function indexOfAll
 * @param {array} arr
 * @param {any} val
 * @return {array}
 * @example
 *   indexOfAll([1,2,3,4,2,2], 2);  // -> [1, 4, 5]
 */
export function indexOfAll(arr: any[], val: unknown): unknown[] {
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * @function intersection
 * @param {array} arr1
 * @param {array} arr2
 * @return {array}
 * @example
 *   intersection([1, 2, 3, 4], [1, 2]);  // => [1, 2]
 */
export function intersection(arr1: AnyArr, arr2: AnyArr): unknown[] {
  const s = new Set(arr2);
  return arr1.filter(x => s.has(x));
}

/**
 * @function intersectionBy
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
 */
export function intersectionBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => s.has(fn(x)));
}

/**
 * @function intersectionWith
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
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
 * @param {function} func
 * @return {function}
 * @example [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0));
 */
export function negate(fn: (...args: unknown[]) => unknown) {
  return function (...args: unknown[]) {
    return !fn(...args);
  };
}

/**
 * @function sample
 * @param {unknown[]} arr
 * @return {any}
 */
export function sample(arr: AnyArr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @function sampleSize
 * @param {array} param0
 * @param {number} num
 * @return {array}
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
 * @param {array} param0
 * @return {array}
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
 * @param {array} arr
 * @param {number} nth
 * @return {array}
 */
export function everyNth(arr: AnyArr, nth: number) {
  return arr.filter((e, i) => i % nth === 0);
}

/**
 * @function filterNonUnique
 * @param {array} arr
 * @return {array}
 */
export function filterNonUnique(arr: AnyArr) {
  return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

/**
 * @function initializeArrayWithValues
 * @param {number} n
 * @param {number} value
 * @return {array}
 */
export function initializeArrayWithValues(n: number, value = 0) {
  return Array(n).fill(value);
}

/**
 * @function remove
 * @param {array} arr
 * @param {function} func
 * @return {array}
 */
export function remove(arr: AnyArr, fn: (v: unknown) => unknown) {
  return Array.isArray(arr)
    ? arr.filter(fn).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
}

/**
 * @funciton digitize
 * @param {number} num
 * @example digitize(12345); // [1, 2, 3, 4, 5]
 * @return {number[]}
 */
export function digitize(num: number) {
  return [...num.toString()].map(i => parseInt(i, 10));
}

/**
 * @function fibonacci
 * @param {number} n
 * @return {array}
 */
export function fibonacci(n: number) {
  return Array(n)
    .fill(0)
    .reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
}

/**
 * @function median
 * @param {number[]} arr
 * @return {number}
 */
export function median(arr: NumberArr) {
  const mid = Math.floor(arr.length / 2);
  const nums = arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
