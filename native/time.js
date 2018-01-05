/*
* 时间操作
* @author: Micheal Wang
* @build time: 2017.11.15
*/

/*
* 格式化${startTime}距现在的已过时间
* @param  {Date} startTime: 时间戳
* @return {String}
*/
function formatPassTime(startTime) {
    var currentTime = +new Date(),
        time = currentTime - startTime,
        day = ~~(time / (1000 * 60 * 60 * 24)),
        hour = ~~(time / (1000 * 60 * 60)),
        min = ~~(time / (1000 * 60)),
        month = ~~(day / 30),
        year = ~~(month / 12);

    if (year) return year + '年前'
    if (month) return month + '个月前'
    if (day) return day + '天前'
    if (hour) return hour + '小时前'
    if (min) return min + '分钟前'
    else return '刚刚'
}

/*
* 格式化现在距${endTime}的剩余时间
* @param  {Date} endTime  
* @return {String}
*/
function formatRemainTime(endTime) {
    var startDate = new Date(); //开始时间 
    var endDate = new Date(endTime); //结束时间 
    var t = (+endDate) - (+startDate); //时间差 
    var d = 0,
        h = 0,
        m = 0,
        s = 0;

    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
}

/*
* 倒计时
* @param {Number} timeNum: 倒计时时间戳
* @param {String} type: 'second' || 'minute'
* @param {Function} callback: 回调函数
* @param {Function} timovercallback: 倒计时结束回调函数
*/
function countDown (timeNum, type, callback, timeoverCallback) {
    if (timeNum < 0) {
        if (timeoverCallback) timeoverCallback();
        return false;
    }

    var _time = function () {
        switch (type) {
            case 'second': return 1000; break;
            case 'minute': return 1000 * 30; break;
        }
    } ();
    var _day = Math.floor(timeNum / 1000 / 60 / 60 / 24),
        _hour = Math.floor(timeNum / 1000 / 60 / 60 % 24),
        _minute = Math.floor(timeNum / 1000 / 60 % 60),
        _second = Math.floor(timeNum / 1000 % 60);

    if (callback) callback(_day, _hour, _minute, _second);
    setTimeout(function () {
        countDown(timeNum - _time, callback);
    }, _time);
}