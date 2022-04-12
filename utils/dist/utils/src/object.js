"use strict";
/**
 * @module Object
 * @description object functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasOwnProp = exports.pick = exports.mapObject = exports.objectFromPairs = exports.forOwn = void 0;
/**
 * @function forOwn
 * @param {object} obj
 * @param {function} fn
 */
function forOwn(obj, fn) {
    return Object.keys(obj).forEach(function (key) { return fn(obj[key], key, obj); });
}
exports.forOwn = forOwn;
/**
 * @function objectFromPairs
 * @param {array} arr
 * @example
 *   objectFromPairs([['a', 1], ['b', [2]]]); // -> {a:1, b:[2]}
 */
function objectFromPairs(arr) {
    return arr.reduce(function (a, v) {
        a[v[0]] = v[1];
        return a;
    }, {});
}
exports.objectFromPairs = objectFromPairs;
/**
 * @function mapObject
 * @param {array} arr
 * @param {function} fn
 * @return {object}
 */
function mapObject(arr, fn) {
    var _arr = arr.map(fn);
    var obj = {};
    return arr.reduce(function (acc, val, index) {
        obj[val] = _arr[index];
        return obj;
    }, obj);
}
exports.mapObject = mapObject;
/**
 * @function pick
 * @param {object} obj
 * @param {array} arr
 * @return {object}
 */
function pick(obj, arr) {
    return arr.reduce(function (acc, curr) {
        curr in obj && (acc[curr] = obj[curr]);
        return acc;
    }, {});
}
exports.pick = pick;
/**
 * @function hasOwnProp
 * @param {unknown} obj
 * @param {String} key
 * @returns {Boolean}
 */
function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
exports.hasOwnProp = hasOwnProp;
