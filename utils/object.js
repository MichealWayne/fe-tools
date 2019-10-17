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
 */
export function mapObject (arr, fn) {
    return (a => (a = [arr, arr.map(fn)], a[0].reduce( (acc,val,ind) => (acc[val] = a[1][ind], acc), {}) )) ( );
}

export function pick (obj, arr) {
    return arr.reduce((acc, curr) => (
        curr in obj && (acc[curr] = obj[curr]),
        acc
    ), {});
}

