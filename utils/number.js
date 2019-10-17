/**
 * @module Number
 * @description number functions
 */

/**
 * @function approximatelyEqual
 * @param {*} val1 
 * @param {*} val2 
 * @param {*} epsilon 
 */
export function approximatelyEqual (val1, val2, epsilon = 0.001) {
    return Math.abs(val1 - val2) < epsilon;
}

/**
 * @function average
 * @param  {...number} nums 
 */
export function average (...nums) {
    return nums.reduce((acc, val) => acc + val, 0) / nums.length;
}

/**
 * @function randomIntegerInRange
 * @param {number} min 
 * @param {number} max 
 */
export function randomIntegerInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @function randomNumberInRange
 * @param {number} min 
 * @param {number} max 
 */
export function randomNumberInRange (min, max) {
    return Math.random() * (max - min + 1) + min;
}

/**
 * @function randomIntArrayInRange
 * @param {number} min 
 * @param {number} max 
 * @param {number} num 
 */
export function randomIntArrayInRange (min, max, num = 1) {
    return Array.from({length: num}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * @function round
 * @param {number} n 
 * @param {number} decimals 
 */
export function round (n, decimals = 0) {
    return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
}

/**
 * @function sum
 * @param  {...any} arr 
 */
export function sum (...arr) {
    return [...arr].reduce((acc, val) => acc + val, 0);
}