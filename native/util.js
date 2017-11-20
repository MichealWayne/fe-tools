/*
* 功能函数
* @author: Micheal Wang
* @build time: 2017.11.15
*/

/*
* 判断两个数组是否相等
* @param {Array} arr1 
* @param {Array} arr2 
* @return {Boolean}
*/
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/*
* 深拷贝，支持常见类型
* @param {Any} values
*/
function deepClone(values) {
    var copy; 

    // Handle the 3 simple types, and null or undefined 
    if (null == values || "object" != typeof values) return values;

    // Handle Date 
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    } 

    // Handle Array 
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    } 

    // Handle Object 
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
}

/*
* 判断`obj`是否为空
* @param  {Object} obj
* @return {Boolean}
*/
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
    return !Object.keys(obj).length
}

/*
* 生成指定范围随机数
* @param  {Number} min 
* @param  {Number} max 
* @return {Number} 
*/
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}


/*
* 对象转字符串
* @param {Object} obj
* @return {String}
*/
function obj2str (obj) {
    if (JSON) return JSON.stringify(obj);

    var dto = [];

    for (var i in obj) {
        if (obj[i] === null) dto.push('\"' + i + '\":' + obj[i]);
        else if (isObject(obj[i])) dto.push('\"' + i + '\":' + _.obj2str(obj[i]));
        else dto.push('\"' + i + '\":\"' + encodeURI(obj[i]) + '\"');
    }

    return '{' + dto.join(',') + '}';
}