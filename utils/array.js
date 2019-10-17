/**
 * @module Array
 * @description array functions
 */

 /**
  * @function arrayMax
  * @param {array} arr 
  */
export function arrayMax (arr) {
    return Math.max(...arr);
}

/**
 * @function arrayMin
 * @param {array} arr 
 */
export function arrayMin (arr) {
    return Math.min(...arr);
}


/**
 * @function all
 * @param {array} arr 
 * @param {function} fn 
 */
export const all = (arr, fn = Boolean) => arr.every(fn);

/**
 * @function allEqual
 * @param {array} arr 
 */
export const allEqual = arr => arr.every(val => val === arr[0]);

/**
 * @function arrayToCSV
 * @param {array} arr 
 * @param {string} delimiter 
 */
export function arrayToCSV(arr, delimiter = ',') {
    return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join('\n');
}

/**
 * @function castArray
 * @param {any} val 
 */
export function castArray (val) {
    return Array.isArray(val) ? val : [val];
}

/**
 * @function chunk
 * @param {array} arr 
 * @param {number} size 
 */
export function chunk (arr, size) {
    return Array.from({
        length: Math.ceil(arr.length / size)
    }, (v, i) => arr.slice(i * size, i * size + size));
}

/**
 * @function compact
 * @param {array} arr 
 */
export function compact (arr) {
    return arr.filter(Boolean);
}

/**
 * @function countOccurrences
 * @param {array} arr 
 * @param {any} val 
 */
export function countOccurrences (arr, val) {
    return arr.reduce((a, v) => (v === val ? a + 1 : a), 0)
}

/**
 * @function deepFlatten
 * @param {array} arr 
 */
export function deepFlatten (arr) {
    return [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
}

/**
 * @function flatten
 * @param {array} arr 
 * @param {number} depth 
 */
export function flatten (arr, depth = 1) {
    return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v), []);
}

/**
 * @function difference
 * @param {array} arr1 
 * @param {array} arr2 
 */
export function difference (arr1, arr2) {
    const s = new Set(arr2);
    return arr1.filter(x => !s.has(x));
}

/**
 * @function differenceBy
 * @param {array} arr1 
 * @param {array} arr2 
 * @param {function} fn 
 */
export function differenceBy (arr1, arr2, fn) {
    const s = new Set(arr2.map(fn));
    return arr1.filter(x => !s.has(fn(x)));
}

/**
 * @function dropWhile
 * @param {array} arr 
 * @param {function} func 
 */
export function dropWhile (arr, func) {
    while (arr.length && !func(arr[0])) arr = arr.slice(1);
    return arr;
}

/**
 * @function indexOfAll
 * @param {array} arr 
 * @param {any} val 
 */
export function indexOfAll (arr, val) {
    return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * @function intersection
 * @param {array} arr1 
 * @param {array} arr2 
 */
export function intersection (arr1, arr2) {
    const s = new Set(arr2);
    return arr1.filter(x => s.has(x));
}

/**
 * @function intersectionBy
 * @param {array} arr1 
 * @param {array} arr2 
 * @param {function} fn 
 */
export function intersectionBy (arr1, arr2, fn) {
    const s = new Set(arr2.map(fn));
    return arr1.filter(x => s.has(fn(x)));
}

/**
 * @function intersectionWith
 * @param {array} arr1 
 * @param {array} arr2 
 * @param {function} fn 
 */
export function intersectionWith (arr1, arr2, fn) {
    return arr1.filter(x => arr2.findIndex(y => fn(x, y)) !== -1);
}

/**
 * @function negate
 * @param {function} func 
 * @example [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0));
 */
export function negate (func) {
    return function (...args) {
        return !func(...args);
    }
}

/**
 * @function sample
 * @param {array} arr 
 */
export function sample (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * @function sampleSize
 * @param {array} param0 
 * @param {number} num 
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
 */
export function everyNth (arr, nth) {
    return arr.filter((e, i) => i % nth === 0);
}

/**
 * @function filterNonUnique
 * @param {array} arr 
 */
export function filterNonUnique (arr) {
    return arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
}

/**
 * @function initializeArrayWithValues
 * @param {number} n 
 * @param {number} value 
 */
export function initializeArrayWithValues (n, value = 0) {
    return Array(n).fill(value);
}

/**
 * @function remove
 * @param {array} arr 
 * @param {function} func 
 */
export function remove (arr, func) {
    return Array.isArray(arr)
        ? arr.filter(func).reduce((acc, val) => {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, []) : [];
}

/**
 * @funciton digitize
 * @param {number} num 
 * @example 
 * digitize(12345); // [1, 2, 3, 4, 5]
 */
export function digitize (num) {
    return [...'' + num].map(i => parseInt(i));
}

/**
 * @function fibonacci
 * @param {number} n 
 */
export function fibonacci (n) {
    return Array(n).fill(0).reduce((acc, val, i) => {
        return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), []
    })
}

/**
 * @function median
 * @param {number[]} arr 
 */
export function median (arr) {
    const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}