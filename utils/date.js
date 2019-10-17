/**
 * @module Date
 * @description date functions
 */

/**
 * @function dayOfYear
 * @param {date object} date 
 */
export function dayOfYear (date) {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

/**
 * @function getColonTimeFromDate
 * @param {date object} date 
 */
export function getColonTimeFromDate (date) {
    return date.toTimeString().slice(0, 8);
}

/**
 * @function getDaysDiffBetweenDates
 * @param {date object} dateInitial 
 * @param {date object} dateFinal 
 */
export function getDaysDiffBetweenDates (dateInitial, dateFinal) {
    return (dateFinal - dateInitial) / (1000 * 3600 * 24);
}

/**
 * @function isAfterDate
 * @param {date object} dateA 
 * @param {date object} dateB 
 */
export function isAfterDate (dateA, dateB) {
    return dateA > dateB;
}

/**
 * @function isBeforeDate
 * @param {date object} dateA 
 * @param {date object} dateB 
 */
export function isBeforeDate (dateA, dateB) {
    return dateA < dateB;
}

/**
 * @function tomorrow
 */
export function tomorrow () {
    let t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split('T')[0];
}