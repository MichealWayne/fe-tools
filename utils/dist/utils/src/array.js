"use strict";
/**
 * @module Array
 * @description array functions
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = exports.fibonacci = exports.digitize = exports.remove = exports.initializeArrayWithValues = exports.filterNonUnique = exports.everyNth = exports.shuffle = exports.sampleSize = exports.sample = exports.negate = exports.intersectionWith = exports.intersectionBy = exports.intersection = exports.indexOfAll = exports.dropWhile = exports.differenceBy = exports.difference = exports.flatten = exports.deepFlatten = exports.countOccurrences = exports.compact = exports.chunk = exports.castArray = exports.arrayToCSV = exports.allEqual = exports.all = exports.arraySum = exports.arrayAverage = exports.arrayMin = exports.arrayMax = void 0;
/**
 * @function arrayMax
 * @param {array} arr
 * @return {number}
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> 3
 */
function arrayMax(arr) {
    return Math.max.apply(Math, __spreadArray([], __read(arr), false));
}
exports.arrayMax = arrayMax;
/**
 * @function arrayMin
 * @param {array} arr
 * @return {number}
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> -5
 */
function arrayMin(arr) {
    return Math.min.apply(Math, __spreadArray([], __read(arr), false));
}
exports.arrayMin = arrayMin;
/**
 * @function arrayAverage
 * @param {number[]} arr
 * @example
 *   arrayMax([1, 2, 3, 0, -1, -5]); // -> 0
 */
function arrayAverage(arr) {
    return arr.reduce(function (acc, val) { return acc + val; }, 0) / arr.length;
}
exports.arrayAverage = arrayAverage;
/**
 * @function arraySum
 * @param {number[]} arr
 * @example
 *   arrayMax([1, 2, 3]); // -> 6
 */
function arraySum(arr) {
    return arr.reduce(function (acc, val) { return acc + val; }, 0);
}
exports.arraySum = arraySum;
var all = function (arr, fn) {
    if (fn === void 0) { fn = Boolean; }
    return arr.every(fn);
};
exports.all = all;
/**
 * @function allEqual
 * @param {array} arr
 * @return {boolean}
 * @example
 *   allEqual([0, 1, 2]); // false
 *   allEqual([2, 2, 2]); // true
 */
var allEqual = function (arr) { return arr.every(function (val) { return val === arr[0]; }); };
exports.allEqual = allEqual;
/**
 * @function arrayToCSV
 * @param {unknown[][]} arr
 * @param {string} delimiter
 * @return {string}
 */
function arrayToCSV(arr, delimiter) {
    return arr.map(function (v) { return v.map(function (x) { return "\"".concat(x, "\""); }).join(delimiter || ','); }).join('\n');
}
exports.arrayToCSV = arrayToCSV;
/**
 * @function castArray
 * @param {any} val
 * @return {array}
 */
function castArray(val) {
    return Array.isArray(val) ? val : [val];
}
exports.castArray = castArray;
/**
 * @function chunk
 * @param {array} arr
 * @param {number} size
 * @return {array}
 */
function chunk(arr, size) {
    return Array.from({
        length: Math.ceil(arr.length / size),
    }, function (v, i) { return arr.slice(i * size, i * size + size); });
}
exports.chunk = chunk;
/**
 * @function compact
 * @param {unknown[]} arr
 * @return {array}
 */
function compact(arr) {
    return arr.filter(Boolean);
}
exports.compact = compact;
/**
 * @function countOccurrences
 * @param {unknown[]} arr
 * @param {unknown} val
 * @return {number}
 * @example
 *   countOccurrences([1,2,4,5,2,6,3], 2);  // -> 2
 */
function countOccurrences(arr, val) {
    return arr.reduce(function (a, v) { return (v === val ? a + 1 : a); }, 0);
}
exports.countOccurrences = countOccurrences;
/**
 * @function deepFlatten
 * @param {unknown[]} arr
 * @return {array}
 * @example
 *   deepFlatten([[1, 2, 3], 4, [5, 6, [7, 8, [9]]]]);  // -> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
function deepFlatten(arr) {
    return [].concat.apply([], __spreadArray([], __read(arr.map(function (v) { return (Array.isArray(v) ? deepFlatten(v) : v); })), false));
}
exports.deepFlatten = deepFlatten;
/**
 * @function flatten
 * @param {array} arr
 * @param {number} depth
 * @return {array}
 * @example
 *   flatten([1, 2, [3, 4, [5, 6]]]); // -> [1, 2, 3, 4, [5, 6]]
 *   flatten([1, 2, [3, 4, [5, 6]]], 2); // -> [1, 2, 3, 4, 5, 6]
 */
function flatten(arr, depth) {
    if (depth === void 0) { depth = 1; }
    return arr.reduce(function (a, v) {
        return a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v);
    }, []);
}
exports.flatten = flatten;
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
function difference(arr1, arr2) {
    var s = new Set(arr2);
    return arr1.filter(function (x) { return !s.has(x); });
}
exports.difference = difference;
/**
 * @function differenceBy
 * @param {unknown[]} arr1
 * @param {unknown[]} arr2
 * @param {function} fn
 * @return {array}
 * @example
 *   differenceBy([1, 2, 3], [2, 4, 6], x => x > 0);  // -> false
 */
function differenceBy(arr1, arr2, fn) {
    var s = new Set(arr2.map(fn));
    return arr1.filter(function (x) { return !s.has(fn(x)); });
}
exports.differenceBy = differenceBy;
/**
 * @function dropWhile
 * @param {unknown[]} arr
 * @param {function} func
 * @return {array}
 */
function dropWhile(_arr, fn) {
    var arr = _arr;
    while (arr.length && !fn(arr[0]))
        arr = arr.slice(1);
    return arr;
}
exports.dropWhile = dropWhile;
/**
 * @function indexOfAll
 * @param {array} arr
 * @param {any} val
 * @return {array}
 * @example
 *   indexOfAll([1,2,3,4,2,2], 2);  // -> [1, 4, 5]
 */
function indexOfAll(arr, val) {
    return arr.reduce(function (acc, el, i) { return (el === val ? __spreadArray(__spreadArray([], __read(acc), false), [i], false) : acc); }, []);
}
exports.indexOfAll = indexOfAll;
/**
 * @function intersection
 * @param {array} arr1
 * @param {array} arr2
 * @return {array}
 * @example
 *   intersection([1, 2, 3, 4], [1, 2]);  // => [1, 2]
 */
function intersection(arr1, arr2) {
    var s = new Set(arr2);
    return arr1.filter(function (x) { return s.has(x); });
}
exports.intersection = intersection;
/**
 * @function intersectionBy
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
 */
function intersectionBy(arr1, arr2, fn) {
    var s = new Set(arr2.map(fn));
    return arr1.filter(function (x) { return s.has(fn(x)); });
}
exports.intersectionBy = intersectionBy;
/**
 * @function intersectionWith
 * @param {array} arr1
 * @param {array} arr2
 * @param {function} fn
 * @return {array}
 */
function intersectionWith(arr1, arr2, fn) {
    return arr1.filter(function (x) { return arr2.findIndex(function (y) { return fn(x, y); }) !== -1; });
}
exports.intersectionWith = intersectionWith;
/**
 * @function negate
 * @param {function} func
 * @return {function}
 * @example [1, 2, 3, 4, 5].filter(negate(n => n % 2 === 0));
 */
function negate(fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return !fn.apply(void 0, __spreadArray([], __read(args), false));
    };
}
exports.negate = negate;
/**
 * @function sample
 * @param {unknown[]} arr
 * @return {any}
 */
function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.sample = sample;
/**
 * @function sampleSize
 * @param {array} param0
 * @param {number} num
 * @return {array}
 */
function sampleSize(_a, num) {
    var _b;
    var _c = __read(_a), arr = _c.slice(0);
    if (num === void 0) { num = 1; }
    var m = arr.length;
    while (m) {
        var i = Math.floor(Math.random() * m--);
        _b = __read([arr[i], arr[m]], 2), arr[m] = _b[0], arr[i] = _b[1];
    }
    return arr.slice(0, num);
}
exports.sampleSize = sampleSize;
/**
 * @function shuffle
 * @param {array} param0
 * @return {array}
 */
function shuffle(_a) {
    var _b;
    var _c = __read(_a), arr = _c.slice(0);
    var m = arr.length;
    while (m) {
        var i = Math.floor(Math.random() * m--);
        _b = __read([arr[i], arr[m]], 2), arr[m] = _b[0], arr[i] = _b[1];
    }
    return arr;
}
exports.shuffle = shuffle;
/**
 * @function everyNth
 * @param {array} arr
 * @param {number} nth
 * @return {array}
 */
function everyNth(arr, nth) {
    return arr.filter(function (e, i) { return i % nth === 0; });
}
exports.everyNth = everyNth;
/**
 * @function filterNonUnique
 * @param {array} arr
 * @return {array}
 */
function filterNonUnique(arr) {
    return arr.filter(function (i) { return arr.indexOf(i) === arr.lastIndexOf(i); });
}
exports.filterNonUnique = filterNonUnique;
/**
 * @function initializeArrayWithValues
 * @param {number} n
 * @param {number} value
 * @return {array}
 */
function initializeArrayWithValues(n, value) {
    if (value === void 0) { value = 0; }
    return Array(n).fill(value);
}
exports.initializeArrayWithValues = initializeArrayWithValues;
/**
 * @function remove
 * @param {array} arr
 * @param {function} func
 * @return {array}
 */
function remove(arr, fn) {
    return Array.isArray(arr)
        ? arr.filter(fn).reduce(function (acc, val) {
            arr.splice(arr.indexOf(val), 1);
            return acc.concat(val);
        }, [])
        : [];
}
exports.remove = remove;
/**
 * @funciton digitize
 * @param {number} num
 * @example digitize(12345); // [1, 2, 3, 4, 5]
 * @return {number[]}
 */
function digitize(num) {
    return __spreadArray([], __read(num.toString()), false).map(function (i) { return parseInt(i, 10); });
}
exports.digitize = digitize;
/**
 * @function fibonacci
 * @param {number} n
 * @return {array}
 */
function fibonacci(n) {
    return Array(n)
        .fill(0)
        .reduce(function (acc, val, i) { return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i); }, []);
}
exports.fibonacci = fibonacci;
/**
 * @function median
 * @param {number[]} arr
 * @return {number}
 */
function median(arr) {
    var mid = Math.floor(arr.length / 2);
    var nums = arr.sort(function (a, b) { return a - b; });
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
exports.median = median;
