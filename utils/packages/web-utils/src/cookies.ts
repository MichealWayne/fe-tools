/**
 * @module Cookie
 * @author Wayne
 * @Date 2020-04-11 21:53:56
 * @LastEditTime 2023-03-14 11:14:06
 */

/**
 * @function getCookie
 * @description 获取cookie
 * @param {string} name
 * @return {string | null}
 * @example
 getCookie('name');
 */
export function getCookie(name: string) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr;

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

/**
 * @function getSec
 * @param {String?} str
 * @explain
 *  's20'是代表20秒
 *  h是指小时，如12小时则是：'h12'
 *  d是天数，30天则：'d30'
 * @return {number}
 */
function getSecond(str?: string) {
  if (!str) return 24 * 60 * 60 * 1000;
  const str1 = Number(str.substring(1, str.length));
  const str2 = str.substring(0, 1);

  if (str2 === 's') return str1 * 1000;
  else if (str2 === 'h') return str1 * 60 * 60 * 1000;
  else if (str2 === 'd') return str1 * 24 * 60 * 60 * 1000;
  else return Number(str);
}

/**
 * @function setCookie
 * @description 设置cookie
 * @param {string} name
 * @param {string} value
 * @param {string} time
 * @param {string} domain
 * @param {string} path
 * @example
 setCookie('username', 'Wayne');
 setCookie('token', 'abcdefghijk', '1d', '.example.com', '/');
 */
export function setCookie(name: string, value: string, time?: string, domain = '', path = '') {
  const strsec = getSecond(time);
  const exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);

  document.cookie =
    name +
    '=' +
    value +
    ';expires=' +
    exp.toUTCString() +
    (domain ? ';domain=' + domain : '') +
    (path ? ';path=' + path : '');
}

/**
 * @function delCookie
 * @description 删除cookie
 * @param {string} name
 * @example
 delCookie('name');
 */
export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);

  const cval = getCookie(name);
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
}
