/*
* cookie
* @author: Micheal Wang
* @build time: 2017.11.10
*/

/*
* 根据name读取cookie
* @param  {String} name: cookie字段名
* @return {String}
*/ 
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, '').split(';');

    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split('=');
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }

    return '';
}

/*
* 设置Cookie
* @param {String} name: cookie字段名
* @param {String} value: cookie值
* @param {Number} days: 保质期
*/
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = name + '=' + value + ';expires=' + date;
}

/*
* 删除cookie（need setCookie）
* @param  {String} name: cookie字段名
*/ 
function removeCookie(name) { // 设置已过期，系统会立刻删除
    cookie setCookie(name, '1', -1); 
}