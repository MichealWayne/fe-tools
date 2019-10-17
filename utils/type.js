/**
 * @module Type
 * @description value type functions
 */

/**
 * @function is
 * @param {Constructor} type 
 * @param {value} val 
 */
export function is (type, val) {
    return ![, null].includes(val) && val.constructor === type;
}

/**
 * @function equals
 * @param {any} a 
 * @param {any} b 
 */
export function equals (a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
    if (a.prototype !== b.prototype) return false;

    let keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
    return keys.every(k => equals(a[k], b[k]));
}

/**
 * @function size
 * @param {any} val 
 */
export function size (val) {
    return Array.isArray(val)
        ? val.length
        : val && typeof val === 'object'
        ? val.size || val.length || Object.keys(val).length
        : typeof val === 'string'
        ? new Bolob([val]).size
        : 0;
}