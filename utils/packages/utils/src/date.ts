/**
 * @module Date
 * @description date functions.
 * @notice 存在复杂的日期处理场景建议直接使用date-fns
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-12-27 13:17:32
 */

/**
 * @function dayOfYear
 * @description 此日期是当年中的第几天
 * @param {Date} date
 * @return {Number}
 * @example
 *   dayOfYear(new Date('2022/02/20')); // 51
 */
export function dayOfYear(date = new Date()) {
  return Math.floor((+date - +new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}

/**
 * @function getColonTimeFromDate
 * @description 获取hh:mm:ss时间
 * @param {Date} date
 * @return {String}
 * @example
 *  getColonTimeFromDate(new Date()); // '15:58:40'
 */
export function getColonTimeFromDate(date = new Date()) {
  return date.toTimeString().slice(0, 8);
}

/**
 * @function getDaysDiffBetweenDates
 * @description 判断两个日期差了几天
 * @param {Date} dateInitial
 * @param {Date} dateFinal
 * @return {Number}
 */
export function getDaysDiffBetweenDates(dateInitial: Date, dateFinal: Date) {
  return (+dateFinal - +dateInitial) / (1000 * 60 * 60 * 24);
}

/**
 * @function isAfterDate
 * @param {Date} dateA
 * @param {Date} dateB
 * @return {boolean}
 */
export function isAfterDate(dateA: Date, dateB = new Date()) {
  return dateA > dateB;
}

/**
 * @function isBeforeDate
 * @param {Date} date1
 * @param {Date} date2
 * @return {boolean}
 */
export function isBeforeDate(dateA: Date, dateB = new Date()) {
  return dateA < dateB;
}

/**
 * @function daysLater
 * @description 获取几天后的日期
 * @return {String}
 */
export function daysLater(date = new Date(), days = 1) {
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * @function getFormattedRemainTime
 * @description 该函数的作用是计算两个日期之间的时间差，并返回以日、小时、分钟和秒为单位的格式化结果
 * @param {Date} startTime
 * @param {Date} endTime
 * @return {string}
 */
export function getFormattedRemainTime(dateInitial: Date, dateFinal: Date) {
  const time = +dateFinal - +dateInitial;
  let day = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;

  if (time >= 0) {
    day = Math.floor(time / 1000 / 3600 / 24);
    hour = Math.floor((time / 1000 / 60 / 60) % 24);
    minute = Math.floor((time / 1000 / 60) % 60);
    second = Math.floor((time / 1000) % 60);
  }
  return {
    day,
    hour,
    minute,
    second,
  };
}
