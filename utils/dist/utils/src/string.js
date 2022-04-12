"use strict";
/**
 * @module String
 * @description string functions
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
exports.isChinese = exports.truncateString = exports.reverseString = exports.fromCamelCase = exports.palindrome = exports.stripHTMLTags = exports.splitLines = exports.decapitalize = exports.capitalizeEveryWord = exports.capitalize = exports.byteSize = void 0;
/**
 * @function byteSize
 * @param {string} str
 */
function byteSize(str) {
    return new Blob([str]).size;
}
exports.byteSize = byteSize;
/**
 * @function capitalize
 * @param {string} param0
 */
function capitalize(_a) {
    var _b = __read(_a), first = _b[0], rest = _b.slice(1);
    return first.toUpperCase() + rest.join('');
}
exports.capitalize = capitalize;
/**
 * @function capitalizeEveryWord
 * @param {string} str
 */
function capitalizeEveryWord(str) {
    return str.replace(/\b[a-z]/g, function (char) { return char.toUpperCase(); });
}
exports.capitalizeEveryWord = capitalizeEveryWord;
/**
 * @function decapitalize
 * @param {string} param0
 */
function decapitalize(_a) {
    var _b = __read(_a), first = _b[0], rest = _b.slice(1);
    return first.toLowerCase() + rest.join('');
}
exports.decapitalize = decapitalize;
/**
 * @function splitLines
 * @param {string} str
 */
function splitLines(str) {
    return str.split(/\r?\n/);
}
exports.splitLines = splitLines;
/**
 * @function stripHTMLTags
 * @param {string} str
 */
function stripHTMLTags(str) {
    return str.replace(/<[^>]*>/g, '');
}
exports.stripHTMLTags = stripHTMLTags;
/**
 * @function palindrome
 * @param {string} str
 */
function palindrome(str) {
    var s = str.toLowerCase().replace(/[\W_]/g, '');
    return s === s.split('').reverse().join('');
}
exports.palindrome = palindrome;
/**
 * @function fromCamelCase
 * @param {string} str
 * @param {string} separator
 */
function fromCamelCase(str, separator) {
    if (separator === void 0) { separator = '_'; }
    return str
        .replace(/([a-z\d])([A-Z])/g, "$1".concat(separator, "$2"))
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1".concat(separator, "$2"))
        .toLowerCase();
}
exports.fromCamelCase = fromCamelCase;
/**
 * @function reverseString
 * @param {string} str
 */
function reverseString(str) {
    return __spreadArray([], __read(str), false).reverse().join('');
}
exports.reverseString = reverseString;
/**
 * @function truncateString
 * @param {string} str
 * @param {number} num
 */
function truncateString(str, num) {
    return (str === null || str === void 0 ? void 0 : str.length) > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
}
exports.truncateString = truncateString;
/**
 * @function isChinese
 * @param {string} str
 * @return {boolean}
 */
function isChinese(str) {
    return /^[\u4E00-\u9FA5]{1,}$/.test(str);
}
exports.isChinese = isChinese;
