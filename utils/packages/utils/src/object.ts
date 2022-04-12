/**
 * @module Object
 * @description object functions
 */

export type plainObject = {
  [propName: string]: unknown;
};

/**
 * @function forOwn
 * @param {object} obj
 * @param {function} fn
 */
export function forOwn(obj: plainObject, fn: (val: any, key: string, obj: plainObject) => unknown) {
  return Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

/**
 * @function objectFromPairs
 * @param {array} arr
 * @example
 *   objectFromPairs([['a', 1], ['b', [2]]]); // -> {a:1, b:[2]}
 */
export function objectFromPairs(arr: [string, unknown][]) {
  return arr.reduce((a: plainObject, v) => {
    a[v[0] as keyof typeof a] = v[1];
    return a;
  }, {});
}

/**
 * @function mapObject
 * @param {array} arr
 * @param {function} fn
 * @return {object}
 */
export function mapObject(arr: string[], fn: (...args: unknown[]) => unknown) {
  const _arr = arr.map(fn);
  const obj: plainObject = {};
  return arr.reduce((acc, val, index) => {
    obj[val] = _arr[index];
    return obj;
  }, obj);
}

/**
 * @function pick
 * @param {object} obj
 * @param {array} arr
 * @return {object}
 */
export function pick(obj: plainObject, arr: string[]) {
  return arr.reduce((acc: plainObject, curr) => {
    curr in obj && (acc[curr] = obj[curr]);
    return acc;
  }, {});
}

/**
 * @function hasOwnProp
 * @param {unknown} obj
 * @param {String} key
 * @returns {Boolean}
 */
export function hasOwnProp(obj: unknown, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
