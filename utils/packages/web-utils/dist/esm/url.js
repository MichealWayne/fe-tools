/**
 * @module Url
 * @notice 如无兼容要求，可直接用URL对象进行处理
 * @Date 2022-08-24 14:18:25
 * @LastEditTime 2025-05-13 19:09:57
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
/**
 * @function parseQueryString
 * @description 获取URL中的查询参数信息。Gets query parameter information from a URL
 * @note URLSearchParams更直观但在旧浏览器中兼容性有限，这里保持字符串解析实现
 * @param {string} url - 页面地址。The page URL
 * @return {object} 查询参数信息对象。Query parameter information object
 * @example
 * console.log(parseQueryString('https://github.com/?a=1&b=sss')); // {a: '1', b: 'sss'}
 * console.log(parseQueryString('https://github.com')); // {}
 */
export function parseQueryString(url) {
    if (url === void 0) { url = window.location.href; }
    var queryStart = url.indexOf('?');
    if (queryStart === -1)
        return {};
    var hashIndex = url.indexOf('#', queryStart);
    var search = url.substring(queryStart + 1, hashIndex === -1 ? url.length : hashIndex);
    if (!search)
        return {};
    return search.split('&').reduce(function (acc, pair) {
        if (!pair)
            return acc;
        var _a = __read(pair.split('=')), rawKey = _a[0], rest = _a.slice(1);
        if (!rawKey)
            return acc;
        var rawValue = rest.length ? rest.join('=') : '';
        var key = decodeURIComponent(rawKey);
        var value = decodeURIComponent(rawValue);
        acc[key] = value;
        return acc;
    }, {});
}
/**
 * @function getUrlParam
 * @description 获取页面地址中查询参数字段对应的信息。Gets information corresponding to a query parameter field in the page URL
 * @param {string} name - 查询参数字段名称。The query parameter field name
 * @param {Function | undefined} decode - 解码函数。The decode function
 * @return {string | null} 查询参数字段对应的信息。Information corresponding to the query parameter field
 * @example
 * const name = getUrlParam('name');
 */
export function getUrlParam(name, decode) {
    var escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var reg = new RegExp("(^|&)".concat(escapedName, "=([^&]*)(&|$)"));
    var res = window.location.search.substring(1).match(reg);
    if (res !== null) {
        if (!decode) {
            return decodeURIComponent(res[2]);
        }
        // eslint-disable-next-line no-eval
        return decode(res[2]);
    }
    return null;
}
/**
 * @func paramsJoinUrl
 * @description 将参数对象转为 url 字符串
 * @param {object} 参数对象
 * @returns {string} url 修改后的URL
 * @example
 * const url = `https://example.com/api?${paramsJoinUrl({ age: 25, city: 'New York' })}`;
 * console.log(url); // "https://example.com/api?age=25&city=New%20York"
 */
export var paramsJoinUrl = function (params) {
    var param = [];
    for (var key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(params[key]);
            param.push("".concat(encodedKey, "=").concat(encodedValue));
        }
    }
    return param.join('&');
};
/**
 * @function getBaseUrl
 * @description 获取基础地址（ url 中?之前的部分）
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @example
 * console.log(getBaseUrl());
 * console.log(getBaseUrl('https://example.com/page.html?query=string')); // https://example.com/page.html
 * console.log(getBaseUrl('https://example.com/')); // https://example.com/
 */
export var getBaseUrl = function (url) {
    if (url === void 0) { url = location.href.toString(); }
    return url.includes('?') ? url.split('?')[0] : url;
};
/**
 * @function getUrlDomain
 * @description 获取 url 中的域名
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @example
 * console.log(getUrlDomain('https://example.com/page.html?query=string')); // https://example.com
 */
export var getUrlDomain = function (url) {
    var _a;
    if (url === void 0) { url = location.href.toString(); }
    // eslint-disable-next-line no-useless-escape
    var baseUrl = ((_a = /^(http|https):\/\/[^\/]+/.exec(url)) === null || _a === void 0 ? void 0 : _a[0]) || '';
    return baseUrl;
};
/**
 * @function uniqueSlash
 * @description 将路径中重复的正斜杆替换成单个斜杆隔开的字符串
 * @param {string} path 要处理的路径
 * @returns {string} 将/去重后的结果
 * @example
 * uniqueSlash('http://www.example.com//foo//bar'); // 'http://www.example.com/foo/bar'
 */
export var uniqueSlash = function (path) { return path.replace(/(https?:\/)|(\/)+/g, '$1$2'); };
