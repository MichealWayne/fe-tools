"use strict";
/**
 * @module Type
 * @description value type functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = exports.equals = exports.isEmptyObj = exports.isPromise = exports.isFunction = exports.isObject = exports.isString = exports.isArray = exports.isUndefined = exports.type = void 0;
/**
 * @function type
 * @description **type(val)** get the variable value's type
 * @param {any} val variable value
 * @return {string} type string
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' },
 *     test3 = 'abc',
 *     test4;
 * type(test1);  // 'Array'
 * type(test2);  // 'Object'
 * type(test3);  // 'String'
 * type(test4);  // 'Undefined'
 */
function type(val) {
    return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '');
}
exports.type = type;
/**
 * @function isUndefined
 * @description **isUndefined(val)** if the variable value is undefined
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * var test1 = [1, 2, 3],
 *     test2;
 * isString(test1);  // false
 * isString(test2);  // true
 */
function isUndefined(val) {
    return val === undefined;
}
exports.isUndefined = isUndefined;
/**
 * @function isArray
 * @description **isArray(val)** if the variable value is Array.(Array.isArray: android 5+)
 * @param {any} val value
 * @return {boolean}
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isArray(test1);  // true
 * isArray(test2);  // false
 */
var isArray = function (val) {
    return type(val) === 'Array';
};
exports.isArray = isArray;
/**
 * @function isString
 * @description **isString(val)** if the variable value is String
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = 'abc';
 * isString(test1);  // false
 * isString(test2);  // true
 */
function isString(val) {
    return typeof val === 'string';
}
exports.isString = isString;
/**
 * @function isObject
 * @description **isObject(val)** if the variable value is Object
 * @param {any} val variable value
 * @return {boolean}
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isObject(test1);  // false
 * isObject(test2);  // true
 */
function isObject(val) {
    return type(val) === 'Object';
}
exports.isObject = isObject;
/**
 * @function isFunction
 * @description **isFunction(val)** if the variable value is Function
 * @param {any} val variable value
 * @return {Boolean}
 * @example
 * var test1 = [1, 2, 3],
 *     test2 = function () { alert(1) };
 * isFunction(test1);  // false
 * isFunction(test2);  // true
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(val) {
    return typeof val === 'function';
}
exports.isFunction = isFunction;
/**
 * @function isPromise
 * @description **isPromise(val)** if the variable value is isPromise.(https://github.com/then/is-promise)
 * @param {any} val variable value
 * @return {Boolean}
 * @example
 * var test1 = new Promise(resolve => resolve(1))),
 *     test2 = { then: () => '', catch: () => '', };
 * isPromise(test1);  // true
 * isPromise(test2);  // true
 */
var isPromise = function (val) {
    return (!!val &&
        (typeof val === 'object' || typeof val === 'function') &&
        typeof val.then === 'function');
};
exports.isPromise = isPromise;
/**
 * @function isEmptyObj
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmptyObj(obj) {
    if (!obj) {
        return false;
    }
    for (var _key in obj) {
        return false;
    }
    return true;
}
exports.isEmptyObj = isEmptyObj;
/**
 * @function equals
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function equals(a, b) {
    if (a === b)
        return true;
    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b;
    if (a.prototype !== b.prototype)
        return false;
    var keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
        return false;
    return keys.every(function (k) { return equals(a[k], b[k]); });
}
exports.equals = equals;
/**
 * @function size
 * @param {any} val
 */
function size(val) {
    // eslint-disable-next-line no-nested-ternary
    return Array.isArray(val)
        ? val.length
        : val && isObject(val)
            ? val.size || val.length || Object.keys(val).length
            : typeof val === 'string'
                ? new Blob([val]).size
                : 0;
}
exports.size = size;
