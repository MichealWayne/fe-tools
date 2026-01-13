"use strict";
/**
 * @module JSON
 * @description Advanced JSON processing utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:32
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
exports.cloneJSON = exports.mergeJSON = exports.compareJSON = exports.unflattenJSON = exports.flattenJSON = exports.safeJSONParse = void 0;
/**
 * @function safeJSONParse
 * @description 安全地解析JSON字符串,失败时返回默认值。Safely parses JSON string, returns default value on failure
 * @param {string} str - 要解析的JSON字符串。JSON string to parse
 * @param {any} defaultValue - 解析失败时的默认值。Default value on parse failure
 * @returns {any} 解析后的对象或默认值。Parsed object or default value
 * @example
 * safeJSONParse('{"name": "John"}'); // -> { name: 'John' }
 * safeJSONParse('invalid json', {}); // -> {}
 * safeJSONParse('invalid', []); // -> []
 */
function safeJSONParse(str, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    try {
        return JSON.parse(str);
    }
    catch (_a) {
        return defaultValue;
    }
}
exports.safeJSONParse = safeJSONParse;
/**
 * @function flattenJSON
 * @description 将嵌套的JSON对象扁平化为单层对象。Flattens nested JSON object to single level
 * @param {object} obj - 要扁平化的对象。Object to flatten
 * @param {string} prefix - 键名前缀(默认: '')。Key prefix (default: '')
 * @returns {object} 扁平化后的对象。Flattened object
 * @example
 * const nested = {
 *   user: {
 *     name: 'John',
 *     address: {
 *       city: 'NYC',
 *       zip: '10001'
 *     }
 *   }
 * };
 * flattenJSON(nested);
 * // -> { 'user.name': 'John', 'user.address.city': 'NYC', 'user.address.zip': '10001' }
 */
function flattenJSON(obj, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return Object.keys(obj).reduce(function (acc, key) {
        var prefixedKey = prefix ? "".concat(prefix, ".").concat(key) : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenJSON(obj[key], prefixedKey));
        }
        else {
            acc[prefixedKey] = obj[key];
        }
        return acc;
    }, {});
}
exports.flattenJSON = flattenJSON;
/**
 * @function unflattenJSON
 * @description 将扁平化的对象还原为嵌套结构。Unflattens a flat object to nested structure
 * @param {object} obj - 扁平化的对象。Flattened object
 * @returns {object} 嵌套的对象。Nested object
 * @example
 * const flat = { 'user.name': 'John', 'user.address.city': 'NYC' };
 * unflattenJSON(flat);
 * // -> { user: { name: 'John', address: { city: 'NYC' } } }
 */
function unflattenJSON(obj) {
    var result = {};
    var _loop_1 = function (key) {
        var keys = key.split('.');
        keys.reduce(function (acc, k, i) {
            if (i === keys.length - 1) {
                acc[k] = obj[key];
            }
            else {
                acc[k] = acc[k] || {};
            }
            return acc[k];
        }, result);
    };
    for (var key in obj) {
        _loop_1(key);
    }
    return result;
}
exports.unflattenJSON = unflattenJSON;
/**
 * @function compareJSON
 * @description 深度比较两个JSON对象的差异。Deep compares two JSON objects for differences
 * @param {any} obj1 - 第一个对象。First object
 * @param {any} obj2 - 第二个对象。Second object
 * @returns {object} 差异对象。Difference object
 * @example
 * const obj1 = { a: 1, b: 2, c: { d: 3 } };
 * const obj2 = { a: 1, b: 3, c: { d: 4 } };
 * compareJSON(obj1, obj2); // -> { b: { old: 2, new: 3 }, 'c.d': { old: 3, new: 4 } }
 */
function compareJSON(obj1, obj2) {
    var diff = {};
    var flat1 = flattenJSON(obj1);
    var flat2 = flattenJSON(obj2);
    var allKeys = new Set(__spreadArray(__spreadArray([], __read(Object.keys(flat1)), false), __read(Object.keys(flat2)), false));
    allKeys.forEach(function (key) {
        if (flat1[key] !== flat2[key]) {
            diff[key] = { old: flat1[key], new: flat2[key] };
        }
    });
    return diff;
}
exports.compareJSON = compareJSON;
/**
 * @function mergeJSON
 * @description 深度合并多个JSON对象。Deep merges multiple JSON objects
 * @param {...object} objects - 要合并的对象。Objects to merge
 * @returns {object} 合并后的对象。Merged object
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * mergeJSON(obj1, obj2); // -> { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
function mergeJSON() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    return objects.reduce(function (acc, obj) {
        Object.keys(obj).forEach(function (key) {
            if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                acc[key] = mergeJSON(acc[key] || {}, obj[key]);
            }
            else {
                acc[key] = obj[key];
            }
        });
        return acc;
    }, {});
}
exports.mergeJSON = mergeJSON;
/**
 * @function cloneJSON
 * @description 深度克隆JSON对象。Deep clones a JSON object
 * @param {any} obj - 要克隆的对象。Object to clone
 * @returns {any} 克隆的对象。Cloned object
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = cloneJSON(original);
 * cloned.b.c = 3;
 * console.log(original.b.c); // -> 2 (unchanged)
 */
function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.cloneJSON = cloneJSON;
