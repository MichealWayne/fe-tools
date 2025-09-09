/**
 * @module Date
 * @description date functions.
 * @notice 存在复杂的日期处理场景建议直接使用date-fns
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:27:43
 */

/**
 * @function dayOfYear
 * @description 此日期是当年中的第几天。Gets the day of year for the given date
 * @param {Date} date - 日期。The date to check
 * @return {number} 返回天数。The day number of the year
 * @example
 * dayOfYear(new Date('2022/02/20')); // 51
 * dayOfYear(new Date('2024/12/31')); // 366
 */
export function dayOfYear(date = new Date()) {
  return Math.floor((+date - +new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
}

/**
 * @function getColonTimeFromDate
 * @description 获取hh:mm:ss时间。Gets hh:mm:ss time format from date
 * @param {Date} date - 日期。The date to format
 * @return {string} 返回时间。The formatted time string
 * @example
 * getColonTimeFromDate(new Date()); // '15:58:40'
 * getColonTimeFromDate(); // '15:58:40'
 * getColonTimeFromDate(new Date('2022-02-20 11:10:20')); // '11:10:20'
 */
export function getColonTimeFromDate(date = new Date()) {
  return date.toTimeString().slice(0, 8);
}

/**
 * @function getDaysDiffBetweenDates
 * @description 判断两个日期差了几天。Calculates the difference in days between two dates
 * @param {Date} dateInitial - 开始日期。The initial date
 * @param {Date} dateFinal - 结束日期。The final date
 * @return {number} 日期差值（天数）。The difference in days
 * @example
 * const dateInitial = new Date('2023-01-01');
 * const dateFinal = new Date('2023-01-05');
 * getDaysDiffBetweenDates(dateInitial, dateFinal);  // 4
 */
export function getDaysDiffBetweenDates(dateInitial: Date, dateFinal: Date) {
  return (+dateFinal - +dateInitial) / (1000 * 60 * 60 * 24);
}

/**
 * @function isAfterDate
 * @description 判断dateA是否在dateB之后。Checks if dateA is after dateB
 * @param {Date} dateA - 日期A。Date A to compare
 * @param {Date} dateB - 日期B。Date B to compare against
 * @return {boolean} 日期A是否在日期B之后。Whether date A is after date B
 * @example
 * isAfterDate(new Date('2023-01-01'), new Date('2023-01-02')); // false
 * isAfterDate(new Date('2023-01-01'), new Date('2022-01-02')); // true
 */
export function isAfterDate(dateA: Date, dateB = new Date()) {
  return dateA > dateB;
}

/**
 * @function isBeforeDate
 * @description 判断date1是否在date2之前。Checks if dateA is before dateB
 * @param {Date} dateA - 日期A。Date A to compare
 * @param {Date} dateB - 日期B。Date B to compare against
 * @return {boolean} 日期A是否在日期B之前。Whether date A is before date B
 * @example
 * isBeforeDate(new Date('2023-01-01'), new Date('2023-01-02')); // true
 * isBeforeDate(new Date('2023-01-01'), new Date('2022-01-02')); // false
 */
export function isBeforeDate(dateA: Date, dateB = new Date()) {
  return dateA < dateB;
}

/**
 * @function daysLater
 * @description 获取几天后的日期。Gets the date after specified days
 * @param {Date} date - 日期。The base date
 * @param {number} days - 天数,默认为1。Number of days to add, default is 1
 * @return {string} 返回日期。The resulting date string
 * @example
 * const date = new Date('2023-01-01');
 * const days = 5;
 * daysLater(date, days); // '2023-01-06'
 */
export function daysLater(date = new Date(), days = 1) {
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * @function getFormattedRemainTime
 * @description 该函数的作用是计算两个日期之间的时间差，并返回以日、小时、分钟和秒为单位的格式化结果。Calculates time difference between two dates and returns formatted result in days, hours, minutes and seconds
 * @param {Date} dateInitial - 开始日期。The initial date
 * @param {Date} dateFinal - 结束日期。The final date
 * @return {object} 返回格式化后的时间对象。The formatted time object with day, hour, minute, second properties
 * @example
 * const dateInitial = new Date('2023-03-22T08:00:00.000Z');
 * const dateFinal = new Date('2023-03-23T14:15:30.000Z');
 * getFormattedRemainTime(dateInitial, dateFinal); // { day: 1, hour: 6, minute: 15, second: 30, }
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
