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
export function arrayEqual(arr1, arr2) {
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
export function deepClone(values) {
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
export function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
    return !Object.keys(obj).length
}

/*
* 生成指定范围随机数
* @param  {Number} min 
* @param  {Number} max 
* @return {Number} 
*/
export function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

// 获取类型
// @param obj: 变量；
// @return {String} 类型
export function type (obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
};

// 判断变量是否为对象类型
// @param list: 变量
// @return {Boolean} true | false
export function isObject (object) {
  return type(object) === 'Object'
};

/*
* 对象转字符串（主要用于post数据）
* (need isObject, type)
* @param {Object} obj
* @return {String}
*/
export function obj2str (obj) {
    if (JSON) return JSON.stringify(obj);

    var dto = [];

    for (var i in obj) {
        if (obj[i] === null) dto.push('\"' + i + '\":' + obj[i]);
        else if (isObject(obj[i])) dto.push('\"' + i + '\":' + obj2str(obj[i]));
        else dto.push('\"' + i + '\":\"' + encodeURI(obj[i]) + '\"');
    }

    return '{' + dto.join(',') + '}';
}