"use strict";
/**
 * @module Trade
 * @description trade functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCurrency = exports.luhnCheck = void 0;
/**
 * @function luhnCheck
 * @param {number | string} num
 * @extends to:https://github.com/navyxie/bankcardinfo
 */
function luhnCheck(num) {
    var arr = String(num)
        .split('')
        .reverse()
        .map(function (x) { return parseInt(x, 10); });
    var lastDigit = arr.splice(0, 1)[0];
    var sum = arr.reduce(function (acc, val, i) { return (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9 || 9)); }, 0);
    sum += lastDigit;
    return sum % 10 === 0;
}
exports.luhnCheck = luhnCheck;
/**
 * @function toCurrency
 * @param {number} n
 * @param {currency string} curr
 * @param {country string} LanguageFormat
 */
function toCurrency(n, curr, LanguageFormat) {
    if (LanguageFormat === void 0) { LanguageFormat = undefined; }
    return Intl.NumberFormat(LanguageFormat, {
        style: 'currency',
        currency: curr,
    }).format(n);
}
exports.toCurrency = toCurrency;
