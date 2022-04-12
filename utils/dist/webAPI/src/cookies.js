"use strict";
/*
 * @module Cookie
 * @author: Wayne
 * @Date: 2021-04-27 14:47:13
 * @LastEditTime: 2021-08-28 14:41:06
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.delCookie = exports.setCookie = exports.getCookie = void 0;
/**
 * @function getCookie
 * @param {string} name
 * @return {string | null}
 */
function getCookie(name) {
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    var arr;
    if ((arr = document.cookie.match(reg)))
        return unescape(arr[2]);
    else
        return null;
}
exports.getCookie = getCookie;
/**
 * @function getSec
 * @param {string | number} str
 * @explain
 *  's20'是代表20秒
 *  h是指小时，如12小时则是：'h12'
 *  d是天数，30天则：'d30'
 * @return {number}
 */
function getSec(str) {
    if (!str)
        return 24 * 60 * 60 * 1000;
    var str1 = Number(str.substring(1, str.length));
    var str2 = str.substring(0, 1);
    if (str2 === 's')
        return str1 * 1000;
    else if (str2 === 'h')
        return str1 * 60 * 60 * 1000;
    else if (str2 === 'd')
        return str1 * 24 * 60 * 60 * 1000;
    else
        return Number(str);
}
/**
 * @function setCookie
 * @param {string} name
 * @param {string} value
 * @param {string} time
 * @param {string} domain
 * @param {string} path
 */
function setCookie(name, value, time, domain, path) {
    var strsec = getSec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie =
        name +
            '=' +
            escape(value) +
            ';expires=' +
            exp.toUTCString() +
            (domain ? ';domain=' + domain : '') +
            (path ? ';path=' + path : '');
}
exports.setCookie = setCookie;
/**
 * @function delCookie
 * @param {string} name
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
}
exports.delCookie = delCookie;
