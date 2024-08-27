/**
 * @module Cookie
 * @note 目前不建议操作cookie，可见google Chrome《为停用第三方 Cookie 做好准备》：https://developers.google.com/privacy-sandbox/3pcd?hl=zh-cn
 * @author Wayne
 * @Date 2020-04-11 21:53:56
 * @LastEditTime 2024-08-25 10:00:55
 */

// 涉及大量cookie操作可以考虑使用js-cookie(https://github.com/js-cookie/js-cookie)

/**
 * @function getCookie
 * @description 根据name获取对应cookie
 * @param {string} name cookie名称
 * @return {string | null} 返回cookie值,没有则返回null
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
 * @param {string?} str 时间字符串
 * @explain
 *  's20'是代表20秒
 *  h是指小时，如12小时则是：'h12'
 *  d是天数，30天则：'d30'
 * @return {number} 返回毫秒数
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
 * @param {string} name cookie名称
 * @param {string} value cookie值
 * @param {string} time 过期时间,默认是一天,单位：s秒,h小时,d天,格式：'s20','h12','d30'
 * @param {string} domain 域名
 * @param {string} path 路径
 * @example
 setCookie('username', 'Wayne');
 setCookie('token', 'abcdefghijk', '1d', '.example.com', '/');
 setCookie('name', 'value', 's20');
 setCookie('name2', 'value2', 'h12');
 */
export function setCookie(name: string, value: string, time?: string, domain = '', path = '') {
  const strsec = getSecond(time);
  const exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);

  document.cookie = `${name}=${value};expires=${exp.toUTCString()}${
    domain ? ';domain=' + domain : ''
  }${path ? ';path=' + path : '/'}`;
}

/**
 * @function delCookie
 * @description 根据name删除指定cookie
 * @param {string} name cookie名称
 * @example delCookie('name');
 */
export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);

  const cval = getCookie(name);
  if (cval !== null) {
    document.cookie = `${name}=${cval};expires=${exp.toUTCString()}`;
  }
}
