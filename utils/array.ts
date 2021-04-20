/**
 * @module Array
 * @description array functions
 */

export type NumberArr = number[];

export type AnyArr = any[];

/**
  * @function arrayMax
  * @param {array} arr 
  * @return {number}
  */
export function arrayMax (arr: NumberArr) {
    return Math.max(...arr);
}

/**
 * @function arrayMin
 * @param {array} arr 
 * @return {number}
 */
export function arrayMin (arr: NumberArr) {
    return Math.min(...arr);
}

/**
 * @function arrayAverage
 * @param {number[]} arr 
 */
export function arrayAverage (arr) {
    return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

/**
 * @function arraySum
 * @param {number[]} arr 
 */
export function arraySum (arr: number[]) {
    return arr.reduce((acc, val) => acc + val, 0);
}



/**
 * @function all
 * @param {array} arr 
 * @param {function} fn 
 * @return {boolean}
 */
export interface ArrayHook {
    (value: any, index: number, array: any[]): boolean;
}
export const all = (arr: AnyArr, fn: ArrayHook = Boolean) => arr.every(fn);

/**
 * @function allEqual
 * @param {array} arr 
 * @return {boolean}
 */
export const allEqual = (arr: AnyArr) => arr.every(val => val === arr[0]);

/**
 * @function arrayToCSV
 * @param {array} arr 
 * @param {string} delimiter 
 * @return {string}
 */
export function arrayToCSV(arr: AnyArr, delimiter: string = ',') {
    return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
}

/**
 * @function castArray
 * @param {any} val 
 * @return {array}
 */
export function castArray (val: any) {
    return Array.isArray(val) ? val : [val];
}

/**
 * @function chunk
 * @param {array} arr 
 * @param {number} size 
 * @return {array}
 */
export function chunk (arr: AnyArr, size: number) {
    return Array.from({
        length: Math.ceil(arr.length / size)
    }, (v, i) => arr.slice(i * size, i * size + size));
}

/**
 * @function compact
 * @param {array} arr 
 * @return {array}
 */
export function compact (arr: AnyArr) {
    return arr.filter(Boolean);
}

/**
 * @function countOccurrences
 * @param {array} arr 
 * @param {any} val 
 * @return {number}
 */
export function countOccurrences (arr: AnyArr, val: any) {
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
}

/**
 * @function deepFlatten
 * @param {array} arr 
 * @return {array}
 */
export function deepFlatten (arr: AnyArr) {
    return [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
}

/**
 * @function flatten
 * @param {array} arr 
 * @param {number} depth 
 * @return {array}
 */
export function flatten (arr: AnyArr, depth = 1) {
    return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
}

/**
 * @function difference
 * @param {array} arr1 
 * @param {array} arr2 
 * @return {array}
 */
export function difference (arr1: AnyArr, arr2: AnyArr) {
    const s = new Set(arr2);
    return arr1.filter(x => !s.has(x));
}

/**
 * @function differenceBy
 * @param {array} arr1 
 * @param {array} arr2 
 * @param {function} fn 
 * @return {array}
 */
export function differenceBy (arr1: AnyArr, arr2: AnyArr, fn) {
    const s = new Set(arr2.map(fn));
    return arr1.filter(x => !s.has(fn(x)));
}

/**
 * @function dropWhile
 * @param {array} arr 
 * @param {function} func
 * @return {array} 
 */
export function dropWhile (arr: AnyArr, func) {
    while (arr.length && !func(arr[0])) arr = arr.slice(1);
    return arr;
}

/**
 * @function indexOfAll
 * @param {array} arr 
 * @param {any} val 
 * @return {array}
 */
export function indexOfAll (arr: AnyArr, val) {
    return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * @function intersection
 * @param {array} arr1 
 * @param {array} arr2 
 * @return {array}
 */
export function intersection (arr1: AnyArr, arr2: AnyArr) {
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
export function intersectionBy (arr1: AnyArr, arr2: AnyArr, fn) {
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
export function intersectionWith (arr1: AnyArr, arr2: AnyArr, fn) {
    return arr1.filter(x => arr2.findIndex(y => fn(x, y)) !== -1);
}

/**
 * @function negate
 * @param {function} func 
 * @example [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0));
 * @return {function}
 */
export function negate (func) {
    return function (...args) {
        return !func(...args);
    }
}

/**
 * @function sample
 * @param {array} arr 
 * @return {any}
 */
export function sample (arr: AnyArr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * @function sampleSize
 * @param {array} param0 
 * @param {number} num 
 * @return {array}
 */
export function sampleSize ([...arr], num = 1) {
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
export function shuffle ([...arr]) {
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
export function everyNth (arr: AnyArr, nth: number) {
    return arr.filter((e, i) => i % nth === 0);
}

/**
 * @function filterNonUnique
 * @param {array} arr 
 * @return {array}
 */
export function filterNonUnique (arr: AnyArr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

/**
 * @function initializeArrayWithValues
 * @param {number} n 
 * @param {number} value 
 * @return {array}
 */
export function initializeArrayWithValues (n: number, value = 0) {
    return Array(n).fill(value);
}

/**
 * @function remove
 * @param {array} arr 
 * @param {function} func 
 * @return {array}
 */
export function remove (arr: AnyArr, func) {
    return Array.isArray(arr)
        ? arr.filter(func).reduce((acc, val) => {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, []) : [];
}

/**
 * @funciton digitize
 * @param {number} num 
 * @example digitize(12345); // [1, 2, 3, 4, 5]
 * @return {number[]}
 */
export function digitize (num: number) {
    return [...(num.toString())].map(i => parseInt(i));
}

/**
 * @function fibonacci
 * @param {number} n 
 * @return {array}
 */
export function fibonacci (n: number) {
    return Array(n).fill(0).reduce((acc, val, i) => {
        return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []
    })
}

/**
 * @function median
 * @param {number[]} arr 
 * @return {number}
 */
export function median (arr: NumberArr) {
    const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}