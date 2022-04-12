/*
 * @module Cookie
 * @author: Wayne
 * @Date: 2021-04-27 14:47:13
 * @LastEditTime: 2021-08-28 14:41:06
 */

/**
 * @function getCookie
 * @param {string} name
 * @return {string | null}
 */
export function getCookie(name: string) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  let arr;

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

/**
 * @function getSec
 * @param {string | number} str
 * @explain
 *  's20'是代表20秒
 *  h是指小时，如12小时则是：'h12'
 *  d是天数，30天则：'d30'
 * @return {number}
 */
function getSec(str?: string) {
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
 * @param {string} name
 * @param {string} value
 * @param {string} time
 * @param {string} domain
 * @param {string} path
 */
export function setCookie(
  name: string,
  value: string,
  time?: string,
  domain?: string,
  path?: string
) {
  const strsec = getSec(time);
  const exp = new Date();
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

/**
 * @function delCookie
 * @param {string} name
 */
export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);

  const cval = getCookie(name);
  if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
}