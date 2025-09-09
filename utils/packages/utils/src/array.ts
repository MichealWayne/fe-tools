/**
 * @module Array
 * @description Comprehensive array utility functions for common operations
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-09-07 20:33:35
 */

import { isArray, isObject } from './type';

export type NumberArr = number[];

export type AnyArr = unknown[];

/**
 * @function arrayMax
 * @description 查找数字数组中的最大值。Finds the maximum value in a numeric array
 * @param {NumberArr} arr - 要查找最大值的数字数组。Array of numbers to find maximum from
 * @returns {number} 数组中的最大值。对于空数组返回-Infinity，如果数组包含非数字值则返回NaN。The maximum value in the array. Returns -Infinity for empty arrays, NaN if array contains non-numeric values
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * arrayMax([1, 2, 3, 0, -1, -5]); // -> 3
 * arrayMax([1, 2, 3]); // -> 3
 *
 * @example
 * // Edge cases
 * arrayMax([]); // -> -Infinity
 * arrayMax([1, 2, NaN]); // -> NaN
 * arrayMax([-5, -10, -1]); // -> -1
 */
export function arrayMax(arr: NumberArr): number {
  return Math.max(...arr);
}

/**
 * @function arrayMin
 * @description 查找数字数组中的最小值。Finds the minimum value in a numeric array
 * @param {NumberArr} arr - 要查找最小值的数字数组。Array of numbers to find minimum from
 * @returns {number} 数组中的最小值。对于空数组返回Infinity，如果数组包含非数字值则返回NaN。The minimum value in the array. Returns Infinity for empty arrays, NaN if array contains non-numeric values
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * arrayMin([1, 2, 3, 0, -1, -5]); // -> -5
 * arrayMin([1, 2, 3]); // -> 1
 *
 * @example
 * // Edge cases
 * arrayMin([]); // -> Infinity
 * arrayMin([1, 2, NaN]); // -> NaN
 * arrayMin([-5, -10, -1]); // -> -10
 */
export function arrayMin(arr: NumberArr): number {
  return Math.min(...arr);
}

/**
 * @function arrayAverage
 * @description 计算数组中数字的平均值（算术平均数）。Calculates the average (arithmetic mean) of numbers in an array
 * @param {number[]} arr - 要计算平均值的数字数组。Array of numbers to calculate average from
 * @returns {number} 数组中所有数字的平均值。对于空数组返回NaN。The average value of all numbers in the array. Returns NaN for empty arrays
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * arrayAverage([1, 2, 3, 0, -1, -5]); // -> 0
 * arrayAverage([1, 2, 3]); // -> 2
 *
 * @example
 * // Edge cases
 * arrayAverage([]); // -> NaN
 * arrayAverage([5]); // -> 5
 * arrayAverage([1.5, 2.5, 3.5]); // -> 2.5
 */
export function arrayAverage(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

/**
 * @function arraySum
 * @description 计算数组中所有数字的总和。Calculates the sum of all numbers in an array
 * @param {number[]} arr - 要求和的数字数组。Array of numbers to sum
 * @returns {number} 数组中所有数字的总和。对于空数组返回0。The sum of all numbers in the array. Returns 0 for empty arrays
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * arraySum([1, 2, 3]); // -> 6
 * arraySum([-1, 2, 3]); // -> 4
 *
 * @example
 * // Edge cases
 * arraySum([]); // -> 0
 * arraySum([5]); // -> 5
 * arraySum([-1, -2, -3]); // -> -6
 * arraySum([1.5, 2.5]); // -> 4
 */
export function arraySum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * @function allEqual
 * @description 检查数组中的所有元素是否使用严格相等（===）相等。Checks if all elements in an array are equal using strict equality (===)
 * @param {AnyArr} arr - 要检查所有元素是否相等的数组。Array to check for equality of all elements
 * @returns {boolean} 如果所有元素都相等则返回true，否则返回false。对于空数组返回true。True if all elements are equal, false otherwise. Returns true for empty arrays
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * allEqual([0, 1, 2]); // -> false
 * allEqual([2, 2, 2]); // -> true
 * allEqual([2, 2, '2']); // -> false
 *
 * @example
 * // Edge cases
 * allEqual([]); // -> true
 * allEqual([5]); // -> true
 * allEqual([NaN, NaN, NaN]); // -> false (NaN !== NaN)
 * allEqual([null, null]); // -> true
 * allEqual([undefined, undefined]); // -> true
 */
export const allEqual = (arr: AnyArr): boolean => arr.every(val => val === arr[0]);

/**
 * @function size
 * @description 获取各种数据类型的大小/长度，包括数组、字符串、Maps、Sets、对象和Blobs。Gets the size/length of various data types including arrays, strings, Maps, Sets, objects, and Blobs
 * @param {unknown} val - 要获取大小的值（数组、字符串、Map、Set、对象或Blob）。The value to get the size of (array, string, Map, Set, object, or Blob)
 * @returns {number} 输入值的大小/长度。对于null、undefined或不支持的类型返回0。The size/length of the input value. Returns 0 for null, undefined, or unsupported types
 * @example
 * // Array size
 * const arr = [1, 2, 3, 4, 5];
 * size(arr); // -> 5
 *
 * @example
 * // String size (byte length)
 * const str = 'Hello, world!';
 * size(str); // -> 13
 *
 * @example
 * // Map and Set size
 * const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * size(myMap); // -> 2
 *
 * const mySet = new Set([1, 2, 3, 4, 5]);
 * size(mySet); // -> 5
 *
 * @example
 * // Object property count
 * const obj = { a: 1, b: 2, c: 3 };
 * size(obj); // -> 3
 *
 * @example
 * // Blob size
 * const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
 * size(blob); // -> 13
 *
 * @example
 * // Edge cases
 * size(null); // -> 0
 * size(undefined); // -> 0
 * size(42); // -> 0
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
 * @description 将二维数组转换为带适当转义的CSV字符串。Converts a 2D array to a CSV string with proper escaping
 * @param {AnyArr[]} arr - 要转换为CSV格式的二维数组。2D array to convert to CSV format
 * @param {string} delimiter - 用作字段分隔符的字符（默认：','）。Character to use as field delimiter (default: ',')
 * @returns {string} 带引号值和换行分隔符的CSV格式字符串。CSV formatted string with quoted values and newline separators
 * @throws {TypeError} 当arr不是数组或包含非数组元素时抛出错误。When arr is not an array or contains non-array elements
 * @example
 * // Basic usage
 * arrayToCSV([['a', 'b'], ['c', 'd']]); // -> '"a","b"\n"c","d"'
 * arrayToCSV([['Name', 'Age'], ['John', 25], ['Jane', 30]]); // -> '"Name","Age"\n"John","25"\n"Jane","30"'
 *
 * @example
 * // Custom delimiter
 * arrayToCSV([['a', 'b'], ['c', 'd']], ';'); // -> '"a";"b"\n"c";"d"'
 * arrayToCSV([['a', 'b'], ['c', 'd']], '\t'); // -> '"a"\t"b"\n"c"\t"d"'
 *
 * @example
 * // Edge cases
 * arrayToCSV([]); // -> ''
 * arrayToCSV([['single']]); // -> '"single"'
 * arrayToCSV([['with,comma', 'normal']]); // -> '"with,comma","normal"'
 */
export function arrayToCSV(arr: AnyArr[], delimiter = ','): string {
  return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
}

/**
 * @function castArray
 * @description 将值转换为数组。如果值已经是数组，则返回 unchanged。Converts a value to an array. If the value is already an array, returns it unchanged
 * @param {T | T[]} val - 要转换为数组的值（可以是任何类型或已经是数组）。Value to convert to array (can be any type or already an array)
 * @returns {T[]} 包含该值的数组，如果输入已经是数组则返回原数组。Array containing the value, or the original array if input was already an array
 * @example
 * // Converting single values
 * castArray('foo'); // -> ['foo']
 * castArray(42); // -> [42]
 * castArray(null); // -> [null]
 * castArray(undefined); // -> [undefined]
 *
 * @example
 * // Already arrays remain unchanged
 * castArray([1, 2, 3]); // -> [1, 2, 3]
 * castArray([]); // -> []
 *
 * @example
 * // Objects and complex types
 * castArray({ a: 1 }); // -> [{ a: 1 }]
 * castArray(new Date()); // -> [Date object]
 */
export function castArray<T>(val: T | T[]): T[] {
  return Array.isArray(val) ? val : [val];
}

/**
 * @function chunk
 * @description 将数组拆分为指定大小的块。Splits an array into chunks of specified size
 * @param {T[]} arr - 要拆分为块的数组。Array to split into chunks
 * @param {number} size - 每个块的大小（必须是正整数）。Size of each chunk (must be positive integer)
 * @returns {T[][]} 块数组，其中每个块是指定大小的数组（最后一个块可能较小）。Array of chunks, where each chunk is an array of the specified size (last chunk may be smaller)
 * @throws {RangeError} 当size小于1时抛出错误。When size is less than 1
 * @throws {TypeError} 当arr不是数组或size不是数字时抛出错误。When arr is not an array or size is not a number
 * @example
 * // Basic chunking
 * chunk([1, 2, 3, 4, 5], 3); // -> [[1, 2, 3], [4, 5]]
 * chunk([1, 2, 3, 4, 5], 2); // -> [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3, 4, 5], 1); // -> [[1], [2], [3], [4], [5]]
 *
 * @example
 * // Edge cases
 * chunk([], 2); // -> []
 * chunk([1, 2, 3], 5); // -> [[1, 2, 3]]
 * chunk(['a', 'b', 'c', 'd'], 2); // -> [['a', 'b'], ['c', 'd']]
 *
 * @example
 * // Processing data in batches
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const batches = chunk(data, 3);
 * batches.forEach((batch, index) => {
 *   console.log(`Batch ${index + 1}:`, batch);
 * });
 * // Batch 1: [1, 2, 3]
 * // Batch 2: [4, 5, 6]
 * // Batch 3: [7, 8, 9]
 * // Batch 4: [10]
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
 * @description 从数组中过滤掉假值（false, 0, '', null, undefined, NaN）。Filters out falsy values from an array (false, 0, '', null, undefined, NaN)
 * @param {T[]} arr - 要过滤假值的数组。Array to filter falsy values from
 * @returns {T[]} 仅包含真值的新数组。New array with only truthy values
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * compact([0, 1, false, 2, '', 3]); // -> [1, 2, 3]
 * compact([0, 1, false, 2, '', 3, null, undefined, NaN]); // -> [1, 2, 3]
 *
 * @example
 * // Various falsy values
 * compact([false, 0, '', null, undefined, NaN, 'hello', 42, true]); // -> ['hello', 42, true]
 * compact(['', '0', 'false']); // -> ['0', 'false'] (strings are truthy except empty string)
 *
 * @example
 * // Edge cases
 * compact([]); // -> []
 * compact([false, 0, '', null, undefined, NaN]); // -> []
 * compact([1, 2, 3]); // -> [1, 2, 3] (no change)
 *
 * @example
 * // Objects and arrays (always truthy)
 * compact([{}, [], 0, false]); // -> [{}, []]
 */
export function compact<T>(arr: T[]): T[] {
  return arr.filter(Boolean);
}

/**
 * @function countOccurrences
 * @description 计算数组中特定值的出现次数。Counts the number of occurrences of a specific value in an array
 * @param {T[]} arr - 要搜索的数组。Array to search in
 * @param {T} val - 要计算出现次数的值。Value to count occurrences of
 * @returns {number} 该值在数组中出现的次数。Number of times the value appears in the array
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * countOccurrences([1, 2, 4, 5, 2, 6, 3], 2); // -> 2
 * countOccurrences([1, 2, 4, 5, 2, 6, 3], 3); // -> 1
 * countOccurrences([1, 2, 4, 5, 2, 6, 3], 7); // -> 0
 *
 * @example
 * // String arrays
 * countOccurrences(['a', 'b', 'a', 'c', 'a'], 'a'); // -> 3
 * countOccurrences(['hello', 'world', 'hello'], 'hello'); // -> 2
 *
 * @example
 * // Edge cases
 * countOccurrences([], 1); // -> 0
 * countOccurrences([null, null, undefined], null); // -> 2
 * countOccurrences([NaN, NaN, 1], NaN); // -> 0 (NaN !== NaN)
 */
export function countOccurrences<T>(arr: T[], val: T): number {
  return arr.reduce((a: number, v) => (v === val ? a + 1 : a), 0);
}
/**
 * @function deepFlatten
 * @description 递归地将数组展平到任何深度（替代Array.flat(Infinity)）。Recursively flattens an array to any depth (alternative to Array.flat(Infinity))
 * @param {unknown[]} arr - 要递归展平的数组。Array to flatten recursively
 * @returns {unknown[]} 完全展平的数组，所有嵌套数组都已展开。Completely flattened array with all nested arrays expanded
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * deepFlatten([[1, 2, 3], 4, [5, 6, [7, 8, [9]]]]); // -> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * deepFlatten([1, [2, [3, [4]]]]); // -> [1, 2, 3, 4]
 *
 * @example
 * // Mixed types
 * deepFlatten([1, ['a', [true, [null]]], 2]); // -> [1, 'a', true, null, 2]
 *
 * @example
 * // Edge cases
 * deepFlatten([]); // -> []
 * deepFlatten([1, 2, 3]); // -> [1, 2, 3] (no nesting)
 * deepFlatten([[]]); // -> []
 */
export function deepFlatten(arr: unknown[]): unknown[] {
  return [].concat(...arr.map((v: any) => (Array.isArray(v) ? deepFlatten(v) : v)));
}

/**
 * @function flatten
 * @description 将数组展平到指定的深度级别。Flattens an array to a specified depth level
 * @param {AnyArr} arr - 要展平的数组。Array to flatten
 * @param {number} depth - 要展平的最大深度（默认：1）。Maximum depth to flatten (default: 1)
 * @returns {unknown[]} 展平到指定深度的数组。Flattened array up to the specified depth
 * @throws {TypeError} 当arr不是数组或depth不是数字时抛出错误。When arr is not an array or depth is not a number
 * @example
 * // Basic usage
 * flatten([1, 2, [3, 4, [5, 6]]]); // -> [1, 2, 3, 4, [5, 6]]
 * flatten([1, 2, [3, 4, [5, 6]]], 2); // -> [1, 2, 3, 4, 5, 6]
 *
 * @example
 * // Different depth levels
 * flatten([1, [2, [3, [4]]]], 0); // -> [1, [2, [3, [4]]]] (no flattening)
 * flatten([1, [2, [3, [4]]]], 1); // -> [1, 2, [3, [4]]]
 * flatten([1, [2, [3, [4]]]], 3); // -> [1, 2, 3, 4]
 *
 * @example
 * // Edge cases
 * flatten([], 5); // -> []
 * flatten([1, 2, 3], 1); // -> [1, 2, 3] (no nesting)
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
 * @description 返回第一个数组中不存在于第二个数组中的元素。Returns elements from the first array that are not present in the second array
 * @param {AnyArr} arr1 - 要比较的第一个数组。First array to compare
 * @param {AnyArr} arr2 - 要比较的第二个数组。Second array to compare against
 * @returns {unknown[]} 包含arr1中不在arr2中的元素的数组。Array containing elements from arr1 that are not in arr2
 * @throws {TypeError} 当arr1或arr2不是数组时抛出错误。When arr1 or arr2 is not an array
 * @example
 * // Basic usage
 * difference([1, 2, 3], [1, 2]); // -> [3]
 * difference([1, 2, 3, 4], [2, 4]); // -> [1, 3]
 * difference(['a', 'b', 'c'], ['b']); // -> ['a', 'c']
 *
 * @example
 * // No differences
 * difference([1, 2, 3], [1, 2, 3]); // -> []
 * difference([1, 2, 3], [1, 2, 3, 4, 5]); // -> []
 *
 * @example
 * // Edge cases
 * difference([], [1, 2, 3]); // -> []
 * difference([1, 2, 3], []); // -> [1, 2, 3]
 * difference([1, 1, 2], [1]); // -> [2] (duplicates in first array are preserved)
 */
export function difference(arr1: AnyArr, arr2: AnyArr) {
  const s = new Set(arr2);
  return arr1.filter(x => !s.has(x));
}

/**
 * @function differenceBy
 * @description 返回第一个数组中不存在于第二个数组中的元素，使用函数在比较前转换值。Returns elements from the first array that are not present in the second array, using a function to transform values before comparison
 * @param {AnyArr} arr1 - 要比较的第一个数组。First array to compare
 * @param {AnyArr} arr2 - 要比较的第二个数组。Second array to compare against
 * @param {Function} fn - 在比较前转换值的函数。Function to transform values before comparison
 * @returns {unknown[]} 包含arr1中没有匹配转换值的元素的数组。Array containing elements from arr1 that don't have matching transformed values in arr2
 * @throws {TypeError} 当arr1或arr2不是数组，或fn不是函数时抛出错误。When arr1 or arr2 is not an array, or fn is not a function
 * @example
 * // Basic usage with transformation
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // -> [1.2]
 * differenceBy(['apple', 'banana'], ['APPLE'], s => s.toLowerCase()); // -> ['banana']
 *
 * @example
 * // Object comparison
 * const users1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * const users2 = [{ id: 1, name: 'Johnny' }];
 * differenceBy(users1, users2, u => u.id); // -> [{ id: 2, name: 'Jane' }]
 *
 * @example
 * // Edge cases
 * differenceBy([], [1, 2], x => x); // -> []
 * differenceBy([1, 2], [], x => x); // -> [1, 2]
 */
export function differenceBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => !s.has(fn(x)));
}

/**
 * @function drop
 * @description 从数组的开头删除元素。Removes elements from the beginning of an array
 * @param {T[]} arr - 要从中删除元素的数组。Array to drop elements from
 * @param {number} itemsCount - 要从开头删除的元素数量（默认：1）。Number of elements to drop from the beginning (default: 1)
 * @returns {T[]} 从开头删除指定数量元素的新数组。New array with specified number of elements removed from the beginning
 * @throws {TypeError} 当arr不是数组或itemsCount不是数字时抛出错误。When arr is not an array or itemsCount is not a number
 * @example
 * // Basic usage
 * drop([1, 2, 3], 1); // -> [2, 3]
 * drop([1, 2, 3], 2); // -> [3]
 * drop([1, 2, 3, 4, 5], 3); // -> [4, 5]
 *
 * @example
 * // Edge cases
 * drop([1, 2, 3], 0); // -> [1, 2, 3]
 * drop([1, 2, 3], 4); // -> []
 * drop([], 2); // -> []
 * drop([1, 2, 3], -1); // -> [1, 2, 3] (negative values treated as 0)
 *
 * @example
 * // String arrays
 * drop(['a', 'b', 'c', 'd'], 2); // -> ['c', 'd']
 */
export function drop<T>(arr: readonly T[], itemsCount: number): T[] {
  itemsCount = Math.max(itemsCount, 0);
  return arr.slice(itemsCount);
}
/**
 * @function dropWhile
 * @description 当条件为false时从数组的开头删除元素。Removes elements from the beginning of an array while a condition is false
 * @param {T[]} _arr - 要处理的数组。Array to process
 * @param {Function} canContinueDropping - 当元素应该保留时返回true，当应该删除时返回false的函数。Function that returns true when element should be kept, false when it should be dropped
 * @returns {T[]} 从开头删除元素直到条件变为true的新数组。New array with elements dropped from the beginning until condition becomes true
 * @throws {TypeError} 当_arr不是数组或canContinueDropping不是函数时抛出错误。When _arr is not an array or canContinueDropping is not a function
 * @example
 * // Basic usage
 * dropWhile([1, 2, 3, 4], n => n >= 3); // -> [3, 4]
 * dropWhile([1, 2, 3, 4, 1], n => n >= 2); // -> [2, 3, 4, 1]
 *
 * @example
 * // String arrays
 * dropWhile(['a', 'b', 'c'], s => s >= 'b'); // -> ['b', 'c']
 * dropWhile(['apple', 'banana', 'cherry'], s => s.length > 5); // -> ['banana', 'cherry']
 *
 * @example
 * // Edge cases
 * dropWhile([], n => n > 0); // -> []
 * dropWhile([1, 2, 3], n => n > 10); // -> [] (all elements dropped)
 * dropWhile([1, 2, 3], n => n < 10); // -> [1, 2, 3] (no elements dropped)
 */
export function dropWhile<T>(_arr: T[], canContinueDropping: (item: T) => boolean): T[] {
  let arr = _arr;
  while (arr.length && !canContinueDropping(arr[0])) {
    arr = arr.slice(1);
  }
  return arr;
}

/**
 * @function indexOfAll
 * @description 查找数组中特定值出现的所有索引。Finds all indices where a specific value occurs in an array
 * @param {any[]} arr - 要搜索的数组。Array to search in
 * @param {unknown} val - 要查找索引的值。Value to find indices for
 * @returns {unknown[]} 找到该值的索引数组。Array of indices where the value was found
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * indexOfAll([1, 2, 3, 4, 2, 2], 2); // -> [1, 4, 5]
 * indexOfAll([1, 2, 3, 4, 2, 2], 5); // -> []
 * indexOfAll(['a', 'b', 'a', 'c', 'a'], 'a'); // -> [0, 2, 4]
 *
 * @example
 * // Edge cases
 * indexOfAll([], 1); // -> []
 * indexOfAll([1, 2, 3], 4); // -> []
 * indexOfAll([null, null, 1], null); // -> [0, 1]
 * indexOfAll([NaN, NaN, 1], NaN); // -> [] (NaN !== NaN)
 *
 * @example
 * // Object arrays
 * const obj = { id: 1 };
 * indexOfAll([obj, { id: 2 }, obj], obj); // -> [0, 2]
 */
export function indexOfAll(arr: any[], val: unknown): unknown[] {
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * @function intersection
 * @description 返回两个数组中存在的元素（交集）。Returns elements that exist in both arrays (intersection)
 * @param {AnyArr} arr1 - 第一个数组。First array
 * @param {AnyArr} arr2 - 第二个数组。Second array
 * @returns {unknown[]} 包含两个输入数组中都存在的元素的数组。Array containing elements that exist in both input arrays
 * @throws {TypeError} 当arr1或arr2不是数组时抛出错误。When arr1 or arr2 is not an array
 * @example
 * // Basic usage
 * intersection([1, 2, 3, 4], [1, 2]); // -> [1, 2]
 * intersection([1, 2, 3, 4], [1, 5]); // -> [1]
 * intersection(['a', 'b', 'c'], ['b', 'c', 'd']); // -> ['b', 'c']
 *
 * @example
 * // No intersection
 * intersection([1, 2, 3], [4, 5, 6]); // -> []
 *
 * @example
 * // Edge cases
 * intersection([], [1, 2, 3]); // -> []
 * intersection([1, 2, 3], []); // -> []
 * intersection([1, 1, 2], [1, 3]); // -> [1, 1] (duplicates preserved from first array)
 */
export function intersection(arr1: AnyArr, arr2: AnyArr): unknown[] {
  const s = new Set(arr2);
  return arr1.filter(x => s.has(x));
}

/**
 * @function intersectionBy
 * @description 在应用转换函数后返回两个数组中存在的元素。Returns elements that exist in both arrays after applying a transformation function
 * @param {AnyArr} arr1 - 第一个数组。First array
 * @param {AnyArr} arr2 - 第二个数组。Second array
 * @param {Function} fn - 在比较前转换值的函数。Function to transform values before comparison
 * @returns {unknown[]} 包含arr1中具有与arr2匹配的转换值的元素的数组。Array containing elements from arr1 that have matching transformed values in arr2
 * @throws {TypeError} 当arr1或arr2不是数组，或fn不是函数时抛出错误。When arr1 or arr2 is not an array, or fn is not a function
 * @example
 * // Basic usage
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // -> [2.1]
 * intersectionBy(['apple', 'BANANA'], ['banana', 'cherry'], s => s.toLowerCase()); // -> ['BANANA']
 *
 * @example
 * // Object comparison
 * const users1 = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
 * const users2 = [{ id: 1, name: 'Johnny' }, { id: 3, name: 'Bob' }];
 * intersectionBy(users1, users2, u => u.id); // -> [{ id: 1, name: 'John' }]
 *
 * @example
 * // Edge cases
 * intersectionBy([], [1, 2], x => x); // -> []
 * intersectionBy([1, 2], [], x => x); // -> []
 */
export function intersectionBy(arr1: AnyArr, arr2: AnyArr, fn: (v: unknown) => unknown): unknown[] {
  const s = new Set(arr2.map(fn));
  return arr1.filter(x => s.has(fn(x)));
}

/**
 * @function intersectionWith
 * @description 使用自定义比较函数返回两个数组中存在的元素。Returns elements that exist in both arrays using a custom comparison function
 * @param {AnyArr} arr1 - 第一个数组。First array
 * @param {AnyArr} arr2 - 第二个数组。Second array
 * @param {Function} fn - 比较两个数组中元素的函数。Function to compare elements from both arrays
 * @returns {unknown[]} 包含arr1中根据比较函数与arr2中的元素匹配的元素的数组。Array containing elements from arr1 that match elements in arr2 according to the comparison function
 * @throws {TypeError} 当arr1或arr2不是数组，或fn不是函数时抛出错误。When arr1 or arr2 is not an array, or fn is not a function
 * @example
 * // Basic usage with custom comparison
 * intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // -> [1.5, 3, 0]
 *
 * @example
 * // Object comparison
 * const arr1 = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const arr2 = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
 * intersectionWith(arr1, arr2, (a, b) => a.x === b.x && a.y === b.y); // -> [{ x: 1, y: 2 }]
 *
 * @example
 * // String comparison (case insensitive)
 * intersectionWith(['Apple', 'Banana'], ['apple', 'cherry'], (a, b) => a.toLowerCase() === b.toLowerCase()); // -> ['Apple']
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
 * @description 创建一个函数，该函数否定提供的谓词函数的结果。Creates a function that negates the result of the provided predicate function
 * @param {Function} fn - 要否定的谓词函数。Predicate function to negate
 * @returns {Function} 返回输入函数相反布尔结果的函数。Function that returns the opposite boolean result of the input function
 * @throws {TypeError} 当fn不是函数时抛出错误。When fn is not a function
 * @example
 * // Basic usage with array filtering
 * [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0)); // -> [1, 3, 5] (odd numbers)
 * [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 1)); // -> [2, 4] (even numbers)
 *
 * @example
 * // String filtering
 * ['apple', 'banana', 'cherry'].filter(negate(s => s.includes('a'))); // -> ['cherry']
 *
 * @example
 * // Object filtering
 * const users = [{ active: true }, { active: false }, { active: true }];
 * users.filter(negate(u => u.active)); // -> [{ active: false }]
 *
 * @example
 * // Custom predicate functions
 * const isPositive = n => n > 0;
 * const isNegative = negate(isPositive);
 * [-1, 0, 1, 2].filter(isNegative); // -> [-1, 0]
 */
export function negate(fn: (...args: unknown[]) => unknown) {
  return function (...args: unknown[]) {
    return !fn(...args);
  };
}

/**
 * @function sample
 * @description 从数组中返回一个随机元素。Returns a random element from an array
 * @param {AnyArr} arr - 要从中采样的数组。Array to sample from
 * @returns {any} 数组中的随机元素，如果数组为空则返回undefined。Random element from the array, or undefined if array is empty
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * sample([3, 7, 9, 11]); // -> 9 (randomly selected)
 * sample(['apple', 'banana', 'cherry']); // -> 'banana' (randomly selected)
 *
 * @example
 * // Edge cases
 * sample([]); // -> undefined
 * sample([42]); // -> 42 (only one element)
 *
 * @example
 * // Object arrays
 * const users = [{ name: 'John' }, { name: 'Jane' }, { name: 'Bob' }];
 * sample(users); // -> { name: 'Jane' } (randomly selected)
 */
export function sample(arr: AnyArr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * @function sampleSize
 * @description 在不替换的情况下从数组中返回多个随机元素。Returns multiple random elements from an array without replacement
 * @param {AnyArr} arr - 要从中采样的数组（将被复制以避免变异）。Array to sample from (will be copied to avoid mutation)
 * @param {number} num - 要采样的元素数量（默认：1）。Number of elements to sample (default: 1)
 * @returns {any[]} 包含随机选择元素的数组。Array containing randomly selected elements
 * @throws {TypeError} 当arr不是数组或num不是数字时抛出错误。When arr is not an array or num is not a number
 * @example
 * // Basic usage
 * sampleSize([1, 2, 3, 4, 5], 2); // -> [3, 1] (randomly selected)
 * sampleSize([1, 2, 3, 4, 5], 3); // -> [5, 2, 4] (randomly selected)
 *
 * @example
 * // Edge cases
 * sampleSize([], 2); // -> []
 * sampleSize([1, 2, 3], 0); // -> []
 * sampleSize([1, 2, 3], 5); // -> [2, 1, 3] (returns all elements when num > array length)
 *
 * @example
 * // String arrays
 * sampleSize(['a', 'b', 'c', 'd'], 2); // -> ['c', 'a'] (randomly selected)
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
 * @description 使用Fisher-Yates算法随机打乱数组元素。Randomly shuffles the elements of an array using Fisher-Yates algorithm
 * @param {AnyArr} arr - 要打乱的数组（将被复制以避免变异）。Array to shuffle (will be copied to avoid mutation)
 * @returns {any[]} 元素随机排序的新数组。New array with elements in random order
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * shuffle([1, 2, 3, 4, 5]); // -> [3, 1, 5, 2, 4] (randomly shuffled)
 * shuffle(['a', 'b', 'c']); // -> ['c', 'a', 'b'] (randomly shuffled)
 *
 * @example
 * // Edge cases
 * shuffle([]); // -> []
 * shuffle([42]); // -> [42] (single element)
 *
 * @example
 * // Object arrays
 * const cards = [{ suit: 'hearts', value: 'A' }, { suit: 'spades', value: 'K' }];
 * shuffle(cards); // -> randomly shuffled array of card objects
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
 * @description 从数组中返回每个第n个元素，从索引0开始。Returns every nth element from an array, starting from index 0
 * @param {AnyArr} arr - 要从中采样的数组。Array to sample from
 * @param {number} nth - 采样的间隔（每个第n个元素）。Interval for sampling (every nth element)
 * @returns {any[]} 包含每个第n个元素的数组。Array containing every nth element
 * @throws {TypeError} 当arr不是数组或nth不是数字时抛出错误。When arr is not an array or nth is not a number
 * @example
 * // Basic usage
 * everyNth([1, 2, 3, 4, 5, 6], 2); // -> [1, 3, 5]
 * everyNth([1, 2, 3, 4, 5, 6, 7, 8], 3); // -> [1, 4, 7]
 *
 * @example
 * // String arrays
 * everyNth(['a', 'b', 'c', 'd', 'e', 'f'], 2); // -> ['a', 'c', 'e']
 *
 * @example
 * // Edge cases
 * everyNth([], 2); // -> []
 * everyNth([1, 2, 3], 1); // -> [1, 2, 3] (every element)
 * everyNth([1, 2, 3], 5); // -> [1] (only first element when nth > length)
 */
export function everyNth(arr: AnyArr, nth: number) {
  return arr.filter((_e, i) => i % nth === 0);
}
/**
 * @function unique
 * @description 从数组中删除重复值，仅保留唯一元素。Removes duplicate values from an array, keeping only unique elements
 * @param {AnyArr} arr - 要从中删除重复项的数组。Array to remove duplicates from
 * @returns {any[]} 删除重复值的新数组。New array with duplicate values removed
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * unique([1, 2, 2, 3, 4, 4, 5]); // -> [1, 2, 3, 4, 5]
 * unique(['a', 'b', 'a', 'c', 'b']); // -> ['a', 'b', 'c']
 *
 * @example
 * // Mixed types
 * unique([1, '1', 2, '2', 1]); // -> [1, '1', 2, '2']
 * unique([true, false, 1, 0, true]); // -> [true, false, 1, 0]
 *
 * @example
 * // Edge cases
 * unique([]); // -> []
 * unique([1]); // -> [1]
 * unique([null, undefined, null, undefined]); // -> [null, undefined]
 * unique([NaN, NaN, 1]); // -> [NaN, 1] (NaN is treated as unique)
 *
 * @example
 * // Object arrays (by reference)
 * const obj1 = { id: 1 };
 * const obj2 = { id: 2 };
 * unique([obj1, obj2, obj1]); // -> [obj1, obj2]
 */
export function unique(arr: AnyArr) {
  return [...new Set(arr)];
}

/**
 * @function filterNonUnique
 * @description 过滤掉在数组中出现多次的元素，仅保留唯一元素。Filters out elements that appear more than once in an array, keeping only unique elements
 * @param {AnyArr} arr - 要过滤的数组。Array to filter
 * @returns {any[]} 仅包含恰好出现一次的元素的新数组。New array containing only elements that appear exactly once
 * @throws {TypeError} 当arr不是数组时抛出错误。When arr is not an array
 * @example
 * // Basic usage
 * filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // -> [1, 3, 5]
 * filterNonUnique(['a', 'b', 'a', 'c', 'b', 'd']); // -> ['c', 'd']
 *
 * @example
 * // All elements unique
 * filterNonUnique([1, 2, 3, 4]); // -> [1, 2, 3, 4]
 *
 * @example
 * // All elements duplicated
 * filterNonUnique([1, 1, 2, 2, 3, 3]); // -> []
 *
 * @example
 * // Edge cases
 * filterNonUnique([]); // -> []
 * filterNonUnique([1]); // -> [1]
 * filterNonUnique([null, null, undefined]); // -> [undefined]
 */
export function filterNonUnique(arr: AnyArr) {
  return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

/**
 * @function initializeArrayWithValues
 * @description 创建指定长度并用特定值填充的数组。Creates an array of specified length filled with a specific value
 * @param {number} len - 要创建的数组长度。Length of the array to create
 * @param {any} value - 用于填充数组的值（默认：0）。Value to fill the array with (default: 0)
 * @returns {any[]} 指定长度并用给定值填充的新数组。New array of specified length filled with the given value
 * @throws {TypeError} 当len不是数字时抛出错误。When len is not a number
 * @throws {RangeError} 当len为负数时抛出错误。When len is negative
 * @example
 * // Basic usage
 * initializeArrayWithValues(5, 2); // -> [2, 2, 2, 2, 2]
 * initializeArrayWithValues(3, 'hello'); // -> ['hello', 'hello', 'hello']
 *
 * @example
 * // Default value (0)
 * initializeArrayWithValues(4); // -> [0, 0, 0, 0]
 *
 * @example
 * // Different value types
 * initializeArrayWithValues(3, true); // -> [true, true, true]
 * initializeArrayWithValues(2, null); // -> [null, null]
 * initializeArrayWithValues(3, { id: 1 }); // -> [{ id: 1 }, { id: 1 }, { id: 1 }]
 *
 * @example
 * // Edge cases
 * initializeArrayWithValues(0); // -> []
 * initializeArrayWithValues(1, 'single'); // -> ['single']
 */
export function initializeArrayWithValues(len: number, value = 0) {
  return Array(len).fill(value);
}

/**
 * @function remove
 * @description 删除与谓词函数匹配的数组元素并返回已删除的元素。Removes elements from an array that match a predicate function and returns the removed elements
 * @param {T[]} arr - 要从中删除元素的数组（就地修改）。Array to remove elements from (modified in place)
 * @param {Function} fn - 测试元素的谓词函数。Predicate function to test elements
 * @returns {T[]} 包含已删除元素的数组。Array containing the removed elements
 * @throws {TypeError} 当arr不是数组或fn不是函数时抛出错误。When arr is not an array or fn is not a function
 * @example
 * // Basic usage
 * const arr = [1, 2, 3, 4, 5];
 * const removed = remove(arr, v => v % 2 === 0); // -> [2, 4]
 * console.log(arr); // -> [1, 3, 5] (original array modified)
 *
 * @example
 * // String arrays
 * const fruits = ['apple', 'banana', 'cherry', 'date'];
 * const longNames = remove(fruits, f => f.length > 5); // -> ['banana', 'cherry']
 * console.log(fruits); // -> ['apple', 'date']
 *
 * @example
 * // Object arrays
 * const users = [{ active: true, name: 'John' }, { active: false, name: 'Jane' }];
 * const inactive = remove(users, u => !u.active); // -> [{ active: false, name: 'Jane' }]
 * console.log(users); // -> [{ active: true, name: 'John' }]
 *
 * @example
 * // Edge cases
 * const empty = [];
 * remove(empty, x => x > 0); // -> []
 *
 * const noMatch = [1, 2, 3];
 * remove(noMatch, x => x > 10); // -> []
 * console.log(noMatch); // -> [1, 2, 3] (unchanged)
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
 * @function digitize
 * @description 将数字转换为单个数字的数组。Converts a number into an array of its individual digits
 * @param {number} num - 要转换为数字数组的数字。Number to convert to digit array
 * @returns {number[]} 包含数字各个位数的数组。Array containing individual digits of the number
 * @throws {TypeError} 当num不是数字时抛出错误。When num is not a number
 * @example
 * // Basic usage
 * digitize(12345); // -> [1, 2, 3, 4, 5]
 * digitize(987); // -> [9, 8, 7]
 *
 * @example
 * // Single digit
 * digitize(7); // -> [7]
 * digitize(0); // -> [0]
 *
 * @example
 * // Negative numbers (sign ignored)
 * digitize(-123); // -> [1, 2, 3]
 *
 * @example
 * // Decimal numbers (decimal point ignored)
 * digitize(12.34); // -> [1, 2, 3, 4]
 * digitize(0.567); // -> [0, 5, 6, 7]
 */
export function digitize(num: number) {
  return [...num.toString()].map(i => parseInt(i, 10));
}

/**
 * @function fibonacci
 * @description 生成指定长度的斐波那契数列。Generates a Fibonacci sequence of specified length
 * @param {number} n - 要生成的斐波那契数列的长度。Length of the Fibonacci sequence to generate
 * @returns {number[]} 包含前n个斐波那契数的数组。Array containing the first n numbers of the Fibonacci sequence
 * @throws {TypeError} 当n不是数字时抛出错误。When n is not a number
 * @throws {RangeError} 当n为负数时抛出错误。When n is negative
 * @example
 * // Basic usage
 * fibonacci(5); // -> [0, 1, 1, 2, 3]
 * fibonacci(8); // -> [0, 1, 1, 2, 3, 5, 8, 13]
 *
 * @example
 * // Edge cases
 * fibonacci(0); // -> []
 * fibonacci(1); // -> [0]
 * fibonacci(2); // -> [0, 1]
 *
 * @example
 * // Larger sequences
 * fibonacci(10); // -> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 */
export function fibonacci(n: number) {
  return Array(n)
    .fill(0)
    .reduce((acc, _val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []);
}

/**
 * @function median
 * @description 查找数字数组的中位数值。Finds the median value of a numeric array
 * @param {NumberArr} arr - 要查找中位数的数字数组。Array of numbers to find median of
 * @returns {number} 中位数值。对于偶数长度的数组，返回两个中间值的平均值。The median value. For even-length arrays, returns the average of the two middle values
 * @throws {TypeError} 当arr不是数组或包含非数字值时抛出错误。When arr is not an array or contains non-numeric values
 * @example
 * // Odd length arrays
 * median([1, 2, 3, 4, 5]); // -> 3
 * median([7, 2, 10, 9]); // -> 8 (sorted: [2, 7, 9, 10], median of 7 and 9)
 *
 * @example
 * // Even length arrays
 * median([1, 2, 3, 4, 5, 6]); // -> 3.5 (average of 3 and 4)
 * median([1, 3]); // -> 2 (average of 1 and 3)
 *
 * @example
 * // Unsorted arrays
 * median([1, 2, 10, 2, 20]); // -> 2 (sorted: [1, 2, 2, 10, 20])
 * median([5, 1, 9, 3]); // -> 4 (sorted: [1, 3, 5, 9], average of 3 and 5)
 *
 * @example
 * // Edge cases
 * median([]); // -> NaN
 * median([42]); // -> 42
 * median([1, 1, 1]); // -> 1
 */
export function median(arr: NumberArr): number {
  if (arr.length === 0) return NaN;

  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
