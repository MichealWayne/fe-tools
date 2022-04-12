"use strict";
/**
 * @module URL
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpsRedirect = exports.getUrlParam = exports.parseQueryString = void 0;
/**
 * @function parseQueryString
 * @param {any} url
 * @return {Object}
 */
function parseQueryString(url) {
    url = url || window.location.href;
    var search = url.substring(url.lastIndexOf('?') + 1);
    if (!search)
        return {};
    return JSON.parse('{"' +
        decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
        '"}');
}
exports.parseQueryString = parseQueryString;
/**
 * @function getUrlParam
 * @param {string} name
 * @param {string | undefined} decode
 * @return {string | null}
 */
function getUrlParam(name, decode) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substring(1).match(reg);
    if (r !== null) {
        if (!decode) {
            return decodeURI(r[2]);
        }
        else {
            return eval(decode + '(r[2])');
        }
    }
    return null;
}
exports.getUrlParam = getUrlParam;
/**
 * @function httpsRedirect
 * @description page http -> https
 */
function httpsRedirect() {
    if (location.protocol !== 'https:')
        location.replace('https://' + location.href.split('//')[1]);
}
exports.httpsRedirect = httpsRedirect;
