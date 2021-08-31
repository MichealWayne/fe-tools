/**
 * @module Type
 * @description value type functions
 */

/**
 * @function type
 * @param {any} obj
 * @return {string}
 */
export function type(obj) {
  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '');
}

/**
 * @function isObject
 * @param {any} object
 * @return {boolean}
 */
export function isObject(object) {
  return type(object) === 'Object';
}

/**
 * @function isEmptyObject
 * @param {any} obj
 */
export function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}

/**
 * @function equals
 * @param {any} a
 * @param {any} b
 */
export function equals(a, b) {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}

/**
 * @function size
 * @param {any} val
 */
export function size(val) {
  // eslint-disable-next-line no-nested-ternary
  return Array.isArray(val)
    ? val.length
    : val && isObject(val)
    ? val.size || val.length || Object.keys(val).length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0;
}
