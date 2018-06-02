/*
* extend functions
*/

'use strict';

// extend Array function
// array unique function
Array.prototype.unique = function () {
    let res = [],
        json = {};

    for (let i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};

// date format show
// @param {String} format: date format;
// @return {String} format: time
Date.prototype.format = function (format) {
    let o = {
        'M+' : this.getMonth() + 1, //month
        'd+' : this.getDate(), //day
        'h+' : this.getHours(), //hour
        'm+' : this.getMinutes(), //minute
        's+' : this.getSeconds(), //second
        'q+' : Math.floor((this.getMonth() + 3) / 3), //quarter
        'S' : this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};

// get time string
// format: y/m/d h:m:s
// @param {String} timestr: time string, optional;
// @return {String} time string;
function getTimeStr (timestr) {
    let setTime = (num) => {
        return num < 10 ? '0' + num : num;
    };
    let _date = timestr ? new Date(timestr) : new Date();
    let _month = setTime(_date.getMonth() + 1);
    let _day = setTime(_date.getDate());
    let _hour = setTime(_date.getHours());
    let _minute = setTime(_date.getMinutes());
    let _second = setTime(_date.getSeconds());

    return _date.getFullYear() + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
}


module.exports = {
    getTimeStr: getTimeStr
};