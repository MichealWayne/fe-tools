/**
 * @module Url
 * @notice 如无兼容要求，可直接用URL对象进行处理
 * @Date 2022-08-24 14:18:25
 * @LastEditTime 2023-03-14 11:17:01
 */

/**
 * @function parseQueryString
 * @description 获取url中的query信息
 * @param {String} url
 * @return {Object}
 * @example console.log(parseQueryString('https://github.com/?a=1&b=sss')); // {a: '1', b: 'sss'}
 */
export function parseQueryString(url = window.location.href) {
  const search = url.substring(url.lastIndexOf('?') + 1);

  if (!search) return {};
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  );
}

/**
 * @function getUrlParam
 * @description 获取页面地址中query字段对应的信息
 * @param {String} name
 * @param {Function | undefined} decode
 * @return {String | null}
 * @example
 * const name = getUrlParam('name');
 */
export function getUrlParam(name: string, decode?: (s: string) => string) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const res = window.location.search.substring(1).match(reg);
  if (res !== null) {
    if (!decode) {
      return decodeURI(res[2]);
    } else {
      // eslint-disable-next-line no-eval
      return decode(res[2]);
    }
  }
  return null;
}

/**
 * @func paramsJoinUrl
 * @description 将参数对象转为 url 字符串
 * @param {object} 参数对象
 * @returns {string} url 修改后的URL
 * @example
const url = `https://example.com/api?${paramsJoinUrl({ age: 25, city: 'New York' })}`;
console.log(url); // "https://example.com/api?age=25&city=New%20York"
 */
export const paramsJoinUrl = (params: { [key: string]: string }): string => {
  const param = [];
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      param.push(`${key}=${params[key]}`);
    }
  }
  return encodeURIComponent(param.join('&'));
};

/**
 * @function getBaseUrl
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 * @desc 📝 获取 url 中?之前的部分
 * @example
 console.log(getBaseUrl());
 console.log(getBaseUrl('https://example.com/page.html?query=string')); // https://example.com/page.html
 console.log(getBaseUrl('https://example.com/')); // https://example.com/
 */
export const getBaseUrl = (url: string = location.href.toString()): string =>
  url.includes('?') ? url.split('?')[0] : url;

/**
 * @function getUrlDomain
 * @description 获取 url 中的域名
 * @param {string} url 原始URL
 * @returns {string} url 修改后的URL
 */
export const getUrlDomain = (url: string = location.href.toString()): string => {
  // eslint-disable-next-line no-useless-escape
  const baseUrl = /^(http|https):\/\/[^\/]+/.exec(url)?.[0] || '';
  return baseUrl;
};

/**
 * @function httpsRedirect
 * @description page http -> https
 */
export function httpsRedirect() {
  if (location.protocol !== 'https:') location.replace(`https://${location.href.split('//')[1]}`);
}
