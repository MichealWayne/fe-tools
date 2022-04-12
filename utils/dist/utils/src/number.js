"use strict";
/**
 * @module Number
 * @description number functions
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
exports.clamp = exports.isNumberEqual = exports.sum = exports.round = exports.randomIntArrayInRange = exports.randomNumberInRange = exports.randomIntegerInRange = exports.average = exports.approximatelyEqual = void 0;
/**
 * @function approximatelyEqual
 * @param {number} val1
 * @param {number} val2
 * @param {number} epsilon
 */
function approximatelyEqual(val1, val2, epsilon) {
    if (epsilon === void 0) { epsilon = 0.001; }
    return Math.abs(val1 - val2) < epsilon;
}
exports.approximatelyEqual = approximatelyEqual;
/**
 * @function average
 * @param  {number[]} nums
 */
function average() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    return nums.reduce(function (acc, val) { return acc + val; }, 0) / nums.length;
}
exports.average = average;
/**
 * @function randomIntegerInRange
 * @param {number} min
 * @param {number} max
 */
function randomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randomIntegerInRange = randomIntegerInRange;
/**
 * @function randomNumberInRange
 * @param {number} min
 * @param {number} max
 */
function randomNumberInRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}
exports.randomNumberInRange = randomNumberInRange;
/**
 * @function randomIntArrayInRange
 * @param {number} min
 * @param {number} max
 * @param {number} num
 */
function randomIntArrayInRange(min, max, num) {
    if (num === void 0) { num = 1; }
    return Array.from({ length: num }, function () { return Math.floor(Math.random() * (max - min + 1)) + min; });
}
exports.randomIntArrayInRange = randomIntArrayInRange;
/**
 * @function round
 * @param {number} n
 * @param {number} decimals
 */
function round(n, decimals) {
    return Number("".concat(Math.round(+"".concat(n, "e").concat(decimals || 0)), "e-").concat(decimals));
}
exports.round = round;
/**
 * @function sum
 * @param  {number[]} arr
 */
function sum() {
    var arr = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arr[_i] = arguments[_i];
    }
    return __spreadArray([], __read(arr), false).reduce(function (acc, val) { return acc + val; }, 0);
}
exports.sum = sum;
/**
 * @function isNumberEqual
 * @param {number} num1
 * @param {number} num2
 * @param {number} precision?
 */
function isNumberEqual(num1, num2, precision) {
    if (precision === void 0) { precision = 0.00001; }
    return Math.abs(num1 - num2) < precision;
}
exports.isNumberEqual = isNumberEqual;
/**
 * @function clamp
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
function clamp(val, min, max) {
    if (val < min) {
        return min;
    }
    else if (val > max) {
        return max;
    }
    return val;
}
exports.clamp = clamp;
