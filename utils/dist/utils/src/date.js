"use strict";
/**
 * @module Date
 * @description date functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRemainTime = exports.tomorrow = exports.isBeforeDate = exports.isAfterDate = exports.getDaysDiffBetweenDates = exports.getColonTimeFromDate = exports.dayOfYear = void 0;
/**
 * @function dayOfYear
 * @param {Date} date
 * @return {number}
 */
function dayOfYear(date) {
    return Math.floor((+date - +new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}
exports.dayOfYear = dayOfYear;
/**
 * @function getColonTimeFromDate
 * @param {Date} date
 * @return {string}
 */
function getColonTimeFromDate(date) {
    return date.toTimeString().slice(0, 8);
}
exports.getColonTimeFromDate = getColonTimeFromDate;
/**
 * @function getDaysDiffBetweenDates
 * @param {Date} dateInitial
 * @param {Date} dateFinal
 * @return {number}
 */
function getDaysDiffBetweenDates(dateInitial, dateFinal) {
    return (+dateFinal - +dateInitial) / (1000 * 3600 * 24);
}
exports.getDaysDiffBetweenDates = getDaysDiffBetweenDates;
/**
 * @function isAfterDate
 * @param {Date} dateA
 * @param {Date} dateB
 * @return {boolean}
 */
function isAfterDate(dateA, dateB) {
    return dateA > dateB;
}
exports.isAfterDate = isAfterDate;
/**
 * @function isBeforeDate
 * @param {Date} dateA
 * @param {Date} dateB
 * @return {boolean}
 */
function isBeforeDate(dateA, dateB) {
    return dateA < dateB;
}
exports.isBeforeDate = isBeforeDate;
/**
 * @function tomorrow
 * @return {string}
 */
function tomorrow() {
    var t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
}
exports.tomorrow = tomorrow;
/**
 * @function formatRemainTime
 * @param {Date} startTime
 * @param {Date} endTime
 * @return {string}
 */
function formatRemainTime(startDate, endDate) {
    var t = +endDate - +startDate;
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    if (t >= 0) {
        day = Math.floor(t / 1000 / 3600 / 24);
        hour = Math.floor((t / 1000 / 60 / 60) % 24);
        minute = Math.floor((t / 1000 / 60) % 60);
        second = Math.floor((t / 1000) % 60);
    }
    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
    };
}
exports.formatRemainTime = formatRemainTime;
