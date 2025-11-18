/**
 * @module Collection
 * @description Advanced collection operations and utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-16 11:27:31
 */

/**
 * @function groupBy
 * @description 根据提供的函数对数组元素进行分组。Groups array elements by a provided function
 * @param {T[]} arr - 要分组的数组。Array to group
 * @param {Function} fn - 生成分组键的函数。Function to generate grouping keys
 * @returns {Record<string, T[]>} 包含分组元素的对象。Object containing grouped elements
 * @throws {TypeError} 当arr不是数组或fn不是函数时。When arr is not an array or fn is not a function
 * @example
 * // Group by property
 * const users = [
 *   { name: 'John', age: 25 },
 *   { name: 'Jane', age: 25 },
 *   { name: 'Bob', age: 30 }
 * ];
 * groupBy(users, u => u.age); // -> { '25': [{...}, {...}], '30': [{...}] }
 *
 * @example
 * // Group by first letter
 * const words = ['apple', 'banana', 'apricot', 'blueberry'];
 * groupBy(words, w => w[0]); // -> { a: ['apple', 'apricot'], b: ['banana', 'blueberry'] }
 *
 * @example
 * // Group numbers by even/odd
 * const numbers = [1, 2, 3, 4, 5, 6];
 * groupBy(numbers, n => n % 2 === 0 ? 'even' : 'odd'); // -> { odd: [1, 3, 5], even: [2, 4, 6] }
 */
export function groupBy<T>(arr: T[], fn: (item: T) => string | number): Record<string, T[]> {
  return arr.reduce((acc: Record<string, T[]>, item) => {
    const key = String(fn(item));
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * @function partition
 * @description 根据谓词函数将数组分为两个数组。Partitions array into two arrays based on a predicate function
 * @param {T[]} arr - 要分区的数组。Array to partition
 * @param {Function} fn - 测试函数,返回true的进入第一个数组。Test function, items returning true go to first array
 * @returns {[T[], T[]]} 包含两个数组的元组:[匹配项, 不匹配项]。Tuple containing two arrays: [matching, non-matching]
 * @throws {TypeError} 当arr不是数组或fn不是函数时。When arr is not an array or fn is not a function
 * @example
 * // Partition by even/odd
 * const numbers = [1, 2, 3, 4, 5, 6];
 * partition(numbers, n => n % 2 === 0); // -> [[2, 4, 6], [1, 3, 5]]
 *
 * @example
 * // Partition users by status
 * const users = [
 *   { name: 'John', active: true },
 *   { name: 'Jane', active: false },
 *   { name: 'Bob', active: true }
 * ];
 * partition(users, u => u.active); // -> [[{John}, {Bob}], [{Jane}]]
 */
export function partition<T>(arr: T[], fn: (item: T) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  arr.forEach(item => (fn(item) ? pass : fail).push(item));
  return [pass, fail];
}

/**
 * @function zip
 * @description 将多个数组组合成元组数组。Combines multiple arrays into an array of tuples
 * @param {...Array} arrays - 要组合的数组。Arrays to combine
 * @returns {Array[]} 元组数组。Array of tuples
 * @example
 * // Combine parallel arrays
 * const names = ['John', 'Jane', 'Bob'];
 * const ages = [25, 30, 35];
 * const cities = ['NYC', 'LA', 'SF'];
 * zip(names, ages, cities); // -> [['John', 25, 'NYC'], ['Jane', 30, 'LA'], ['Bob', 35, 'SF']]
 *
 * @example
 * // Create key-value pairs
 * const keys = ['a', 'b', 'c'];
 * const values = [1, 2, 3];
 * zip(keys, values); // -> [['a', 1], ['b', 2], ['c', 3]]
 */
export function zip(...arrays: any[][]): any[][] {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length: maxLength }, (_, i) => arrays.map(arr => arr[i]));
}

/**
 * @function unzip
 * @description 将元组数组拆分为单独的数组(zip的反向操作)。Splits an array of tuples into separate arrays (reverse of zip)
 * @param {Array[]} arr - 要拆分的元组数组。Array of tuples to split
 * @returns {Array[]} 单独数组的数组。Array of separate arrays
 * @example
 * // Unzip key-value pairs
 * const pairs = [['a', 1], ['b', 2], ['c', 3]];
 * unzip(pairs); // -> [['a', 'b', 'c'], [1, 2, 3]]
 *
 * @example
 * // Unzip coordinates
 * const points = [[1, 2], [3, 4], [5, 6]];
 * unzip(points); // -> [[1, 3, 5], [2, 4, 6]]
 */
export function unzip(arr: any[][]): any[][] {
  return arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({ length: Math.max(...arr.map(a => a.length)) }, () => [])
  );
}

/**
 * @function sortBy
 * @description 根据一个或多个字段对数组进行排序。Sorts array by one or more fields
 * @param {T[]} arr - 要排序的数组。Array to sort
 * @param {...Function} fns - 提取排序键的函数数组。Functions to extract sort keys
 * @returns {T[]} 排序后的新数组。New sorted array
 * @example
 * // Sort by single field
 * const users = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];
 * sortBy(users, u => u.age); // -> [{ name: 'Jane', age: 25 }, { name: 'John', age: 30 }]
 *
 * @example
 * // Sort by multiple fields
 * const data = [
 *   { dept: 'Sales', name: 'John', age: 30 },
 *   { dept: 'Sales', name: 'Jane', age: 25 },
 *   { dept: 'IT', name: 'Bob', age: 28 }
 * ];
 * sortBy(data, d => d.dept, d => d.age);
 * // -> Sorted by dept first, then age within each dept
 */
export function sortBy<T>(arr: T[], ...fns: Array<(item: T) => any>): T[] {
  return [...arr].sort((a, b) => {
    for (const fn of fns) {
      const valA = fn(a);
      const valB = fn(b);
      if (valA < valB) return -1;
      if (valA > valB) return 1;
    }
    return 0;
  });
}

/**
 * @function cartesianProduct
 * @description 计算多个数组的笛卡尔积。Computes the Cartesian product of multiple arrays
 * @param {...Array} arrays - 输入数组。Input arrays
 * @returns {Array[]} 笛卡尔积结果。Cartesian product result
 * @example
 * // Generate all combinations
 * const colors = ['red', 'blue'];
 * const sizes = ['S', 'M', 'L'];
 * cartesianProduct(colors, sizes);
 * // -> [['red', 'S'], ['red', 'M'], ['red', 'L'], ['blue', 'S'], ['blue', 'M'], ['blue', 'L']]
 *
 * @example
 * // Generate test cases
 * const browsers = ['Chrome', 'Firefox'];
 * const os = ['Windows', 'Mac'];
 * const versions = ['v1', 'v2'];
 * cartesianProduct(browsers, os, versions);
 * // -> All combinations of browser, OS, and version
 */
export function cartesianProduct(...arrays: any[][]): any[][] {
  return arrays.reduce(
    (acc: any[], curr: any[]) => {
      const result: any[] = [];
      acc.forEach((a: any) => {
        curr.forEach((b: any) => {
          result.push([...(Array.isArray(a) ? a : [a]), b]);
        });
      });
      return result;
    },
    [[]] as any[]
  );
}

/**
 * @function mergeSorted
 * @description 合并多个已排序数组为一个已排序数组。Merges multiple sorted arrays into one sorted array
 * @param {...Array} arrays - 已排序的数组。Sorted arrays
 * @returns {Array} 合并后的已排序数组。Merged sorted array
 * @example
 * // Merge sorted number arrays
 * mergeSorted([1, 3, 5], [2, 4, 6]); // -> [1, 2, 3, 4, 5, 6]
 *
 * @example
 * // Merge multiple arrays
 * mergeSorted([1, 5, 9], [2, 6], [3, 7, 8]); // -> [1, 2, 3, 5, 6, 7, 8, 9]
 */
export function mergeSorted<T>(...arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => {
    const result: T[] = [];
    let i = 0;
    let j = 0;
    while (i < acc.length && j < arr.length) {
      if (acc[i] <= arr[j]) {
        result.push(acc[i++]);
      } else {
        result.push(arr[j++]);
      }
    }
    return result.concat(acc.slice(i)).concat(arr.slice(j));
  }, []);
}
