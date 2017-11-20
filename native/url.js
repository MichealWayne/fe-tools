/*
* url操作
* @author: Micheal Wang
* @build time: 2017.11.15
*/

/*
* url参数转对象
* @param  {String} url  default: window.location.href
* @return {Object} 参数集合
*/ 
function parseQueryString(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);

    if (!search) {
        return {}
    }

    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/*
* 返回url单个参数的值
* @param {String} name: 参数名
* @param {String} decode: 转码方式
* @return {string} 参数值
*/
function getUrlParam (name, decode) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null){
        if(decode == undefined){
            return decodeURI(r[2]);
        } else {
            return eval(decode + '(r[2])');
        }
    }
    return null; //返回参数值
}