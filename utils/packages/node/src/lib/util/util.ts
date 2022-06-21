/**
 * extend functions
 */

/**
 * @function getTimeStr
 * @description get time format: y/m/d h:m:s
 * @param {String} timestr: time string, optional;
 * @return {String} time string;
 */
export function getTimeStr(timeStr?: string) {
  const setTimeShow = (num: number) => {
    const isLessTen = num < 10;
    return isLessTen ? `0${num}` : num;
  };
  const _date = timeStr ? new Date(timeStr) : new Date();
  const _month = setTimeShow(_date.getMonth() + 1);
  const _day = setTimeShow(_date.getDate());
  const _hour = setTimeShow(_date.getHours());
  const _minute = setTimeShow(_date.getMinutes());
  const _second = setTimeShow(_date.getSeconds());

  return `${_date.getFullYear()}/${_month}/${_day} ${_hour}:${_minute}:${_second}`;
}

export default {
  getTimeStr,
};
