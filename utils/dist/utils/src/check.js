"use strict";
/**
 * @module Check
 * @description check functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumber = exports.isUrl = exports.isIdCard = exports.validateEmail = void 0;
/**
 * @function validateEmail
 * @param {string} str
 * @return {boolean}
 */
function validateEmail(str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}
exports.validateEmail = validateEmail;
/**
 * @function isIdCard
 * @param {string} str
 * @return {boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}
exports.isIdCard = isIdCard;
/**
 * @function isUrl
 * @param {string} str
 * @return {boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}
exports.isUrl = isUrl;
/**
 * @function validateNumber
 * @param {any} n
 * @return {boolean}
 */
function validateNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n;
}
exports.validateNumber = validateNumber;
