/**
 * @module URL
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-05-31 15:34:53
 */

/**
 * @function parseQueryString
 * @description 获取url中的query信息
 * @param {String} url
 * @return {Object}
 * @example console.log(parseQueryString('https://github.com/?a=1&b=sss')); // {a: '1', b: 'sss'}
 */
export function parseQueryString(url: string) {
  url = url || window.location.href;
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
 * @param {String | undefined} decode
 * @return {String | null}
 */
export function getUrlParam(name: string, decode?: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substring(1).match(reg);
  if (r !== null) {
    if (!decode) {
      return decodeURI(r[2]);
    } else {
      return eval(decode + '(r[2])');
    }
  }
  return null;
}

/**
 * @function httpsRedirect
 * @description page http -> https
 */
export function httpsRedirect() {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
}
