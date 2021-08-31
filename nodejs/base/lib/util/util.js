/**
 * extend functions
 */

/**
 * @extend Array function
 * @description array unique function
 */
Array.prototype.unique = function () {
  const res = [];
  const json = {};

  for (let i = 0, len = this.length; i < len; i++) {
    if (!json[this[i]]) {
      res.push(this[i]);
      json[this[i]] = 1;
    }
  }
  return res;
};

/**
 * @extend date format show
 * @param {String} format: date format;
 * @return {String} format: time
 */
Date.prototype.format = function (_format) {
  let format = _format;
  const TimeInfos = {
    // month
    'M+': this.getMonth() + 1,
    // day
    'd+': this.getDate(),
    // hour
    'h+': this.getHours(),
    // minute
    'm+': this.getMinutes(),
    // second
    's+': this.getSeconds(),
    // quarter
    'q+': Math.floor((this.getMonth() + 3) / 3),
    // millisecond
    S: this.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
  }
  for (const k in TimeInfos) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? TimeInfos[k]
          : `00${TimeInfos[k]}`.substr(String(TimeInfos[k]).length)
      );
    }
  }
  return format;
};

/**
 * @function getTimeStr
 * @description get time format: y/m/d h:m:s
 * @param {String} timestr: time string, optional;
 * @return {String} time string;
 */
function getTimeStr(timestr) {
  const setTimeShow = num => {
    const isLessTen = num < 10;
    return isLessTen ? `0${num}` : num;
  };
  const _date = timestr ? new Date(timestr) : new Date();
  const _month = setTimeShow(_date.getMonth() + 1);
  const _day = setTimeShow(_date.getDate());
  const _hour = setTimeShow(_date.getHours());
  const _minute = setTimeShow(_date.getMinutes());
  const _second = setTimeShow(_date.getSeconds());

  return `${_date.getFullYear()}/${_month}/${_day} ${_hour}:${_minute}:${_second}`;
}

module.exports = {
  getTimeStr,
};
