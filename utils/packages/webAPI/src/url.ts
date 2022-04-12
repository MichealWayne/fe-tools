/**
 * @module URL
 */

/**
 * @function parseQueryString
 * @param {any} url
 * @return {Object}
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
 * @param {string} name
 * @param {string | undefined} decode
 * @return {string | null}
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
