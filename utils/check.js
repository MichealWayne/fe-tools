/**
 * @module Check
 * @description check functions
 */

/**
 * @function validateEmail
 * @param {string} str 
 */
export function validateEmail (str) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
}

/**
 * @function validateNumber
 * @param {any} n 
 */
export function validateNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
}