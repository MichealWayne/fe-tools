/**
 * @module Object
 * @description object functions
 */

/**
 * @function forOwn
 * @param {object} obj 
 * @param {function} fn 
 */
export function forOwn (obj, fn) {
    return Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

/**
 * @function objectFromPairs
 * @param {array} arr 
 */
export function objectFromPairs (arr) {
    return arr.reduce((a, v) => (a[v[0]] = v[1], a), {});
}

/**
 * @function mapObject
 * @param {array} arr 
 * @param {function} fn 
 * @return {object}
 */
export function mapObject (arr: string[], fn) {
    let _arr = arr.map(fn);
    let obj = {};
    return arr.reduce((acc, val, index) => {
        obj[val] = _arr[index];
        return obj
    }, obj);
}

/**
 * @function pick
 * @param {object} obj 
 * @param {array} arr 
 * @return {object}
 */
export function pick (obj, arr) {
    return arr.reduce((acc, curr) => (
        curr in obj && (acc[curr] = obj[curr]),
        acc
    ), {});
}

