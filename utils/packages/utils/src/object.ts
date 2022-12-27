/**
 * @module Object
 * @description object functions
 * @author Wayne
 * @Date 2022-07-05 13:53:42
 * @LastEditTime 2022-08-17 19:48:54
 */

import { isObject } from './type';

export type PlainObject = {
  [propName: string]: unknown;
};

/**
 * @function forOwn
 * @param {object} obj
 * @param {function} fn
 */
export function forOwn(obj: PlainObject, fn: (val: any, key: string, obj: PlainObject) => unknown) {
  return Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

/**
 * @function objectFromPairs
 * @param {array} arr
 * @example
 *   objectFromPairs([['a', 1], ['b', [2]]]); // -> {a:1, b:[2]}
 */
export function objectFromPairs(arr: [string, unknown][]) {
  return arr.reduce((a: PlainObject, v) => {
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
  const obj: PlainObject = {};
  return arr.reduce((_acc, val, index) => {
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
export function pick(obj: PlainObject, keys: string[]) {
  return keys.reduce((acc: PlainObject, curr) => {
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

/**
 * @function isEmptyObj
 * @description 是否为空对象
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isEmptyObj(obj?: PlainObject | null): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

