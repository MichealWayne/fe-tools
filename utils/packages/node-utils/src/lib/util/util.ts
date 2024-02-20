/**
 * @modle nodeUtil
 * @extend functions
 * @author Wayne
 * @Date 2022-06-21 14:12:36
 * @LastEditTime 2024-02-18 13:21:40
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isBuffer = require('buffer').Buffer.isBuffer;

/**
 * @function getTimeStr
 * @description get time format: y/m/d h:m:s
 * @param {String} timestr: time string, optional;
 * @return {String} time string;
 */
export function getTimeStr(timeStr?: string) {
  const setTimeShow = (num: number) => (num < 10 ? `0${num}` : num);

  const date = timeStr ? new Date(timeStr) : new Date();
  const _month = setTimeShow(date.getMonth() + 1);
  const _day = setTimeShow(date.getDate());
  const _hour = setTimeShow(date.getHours());
  const _minute = setTimeShow(date.getMinutes());
  const _second = setTimeShow(date.getSeconds());

  return `${date.getFullYear()}/${_month}/${_day} ${_hour}:${_minute}:${_second}`;
}

export default {
  isBuffer,
  getTimeStr,
};
