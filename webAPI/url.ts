/**
 * @model URL
 */

/**
 * @function parseQueryString
 * @param {any} url 
 * @return {Object}
 */
export function parseQueryString (url) {
    url = url || window.location.href;
    let search = url.substring(url.lastIndexOf('?') + 1);

    if (!search) return {}
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * @function getUrlParam
 * @param {string} name 
 * @param {string | undefined} decode 
 * @return {string | null}
 */
export function getUrlParam (name, decode) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null){
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
export function httpsRedirect () {
    if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
}