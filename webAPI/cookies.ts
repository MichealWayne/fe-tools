/**
 * @module Cookie
 */

/**
 * @function getCookie
 * @param {string} name 
 * @return {string | null}
 */
export function getCookie (name: string) {
	let arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}


/**
 * @function getsec
 * @param {string | number} str
 * @explain
 *  's20'是代表20秒
 *  h是指小时，如12小时则是：'h12'
 *  d是天数，30天则：'d30'
 * @return {number}
 */
function getsec (str) {
	if (!str) return 24 * 60 * 60 * 1000;
	let str1 = str.substring(1, str.length) * 1;
	let str2 = str.substring(0, 1);

	if (str2 === 's') return str1 * 1000;
	else if (str2 === 'h') return str1 * 60 * 60 * 1000;
	else if (str2 === 'd') return str1 * 24 * 60 * 60 * 1000;
	else return str;
}


/**
 * @function setCookie
 * @param {string} name
 * @param {string} value 
 * @param {string} time 
 * @param {string} domain 
 * @param {string} path 
 */
export function setCookie (name, value, time, domain, path) {
	let strsec = getsec(time);
	let exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	
	document.cookie = name + '=' + escape (value) + ';expires=' + exp.toUTCString() + (domain ? ';domain=' + domain : '') + (path ? ';path=' + path : '');
}


/**
 * @function delCookie
 * @param {string} name 
 */
export function delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);

    let cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString();
}