/**
 * @module Url
 * @notice 如无兼容要求，可直接用URL对象进行处理
 * @Date 2022-08-24 14:18:25
 * @LastEditTime 2025-05-13 19:09:57
 */
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
export declare function parseQueryString(url?: string): Record<string, string>;
/**
 * @function getUrlParam
 * @description 获取页面地址中查询参数字段对应的信息。Gets information corresponding to a query parameter field in the page URL
 * @param {string} name - 查询参数字段名称。The query parameter field name
 * @param {Function | undefined} decode - 解码函数。The decode function
 * @return {string | null} 查询参数字段对应的信息。Information corresponding to the query parameter field
 * @example
 * const name = getUrlParam('name');
 */
export declare function getUrlParam(name: string, decode?: (s: string) => string): string | null;
/**
 * @func paramsJoinUrl
 * @description 将参数对象转为 url 字符串
 * @param {object} 参数对象
 * @returns {string} url 修改后的URL
 * @example
 * const url = `https://example.com/api?${paramsJoinUrl({ age: 25, city: 'New York' })}`;
 * console.log(url); // "https://example.com/api?age=25&city=New%20York"
 */
export declare const paramsJoinUrl: (params: {
    [key: string]: string;
}) => string;
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
export declare const getBaseUrl: (url?: string) => string;
/**
 * @function getUrlDomain
 * @description 获取 url 中的域名
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @example
 * console.log(getUrlDomain('https://example.com/page.html?query=string')); // https://example.com
 */
export declare const getUrlDomain: (url?: string) => string;
/**
 * @function uniqueSlash
 * @description 将路径中重复的正斜杆替换成单个斜杆隔开的字符串
 * @param {string} path 要处理的路径
 * @returns {string} 将/去重后的结果
 * @example
 * uniqueSlash('http://www.example.com//foo//bar'); // 'http://www.example.com/foo/bar'
 */
export declare const uniqueSlash: (path: string) => string;
