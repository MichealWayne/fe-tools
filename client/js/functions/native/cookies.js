/*
* cookie
* @author: Micheal Wang
* @build time: 2017.11.10
*/

/*
* 获取cookie的值
* @param {String} name cookie字段名
*/
export function getCookie (name) {
	let arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}

/*
* 这是有设定过期时间的使用示例
* @param {String | Number} str: 日期字符串；
* @example：
*  s20是代表20秒
*  h是指小时，如12小时则是：h12
*  d是天数，30天则：d30
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

/*
* 设置cookie
* @param {String} name cookie字段名；
* @param {String} value cookie值；
* @param {String | Number} time 过期时间；
* @param {String} domain 域名；
* @param {String} path 路径；
*/
export function setCookie (name, value, time, domain, path) {
	let strsec = getsec(time);
	let exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	
	document.cookie = name + '=' + escape (value) + ';expires=' + exp.toGMTString() + (domain ? ';domain=' + domain : '') + (path ? ';path=' + path : '');
}

/**
* @function delCookie
* @description **_.deleteCookie(name)**。删除cookie
* @param {String} name cookie字段名
* @example
* _.delCooke('testcookie');	// 删除testcookie字段
*/
export function delCookie (name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);

    let cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}