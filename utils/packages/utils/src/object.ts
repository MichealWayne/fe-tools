/**
 * @module Object
 * @description object functions
 * @author Wayne
 * @Date 2022-07-05 13:53:42
 * @LastEditTime 2024-03-10 13:22:44
 */

import { isObject } from './type';

export type PlainObject = {
  [propName: string]: unknown;
};

/**
 * @function forOwn
 * @description 遍历一个对象的所有属性，返回一个包含所有属性值的数组
 * @param {object} obj
 * @param {function} fn
 * @return {string[]}
 * @example
 * forOwn({a:1,b:2,c:3}, (val) => console.log(val)); // ['a','b','c']
 */
export function forOwn(
  obj: PlainObject,
  fn: (val?: unknown, key?: string, obj?: PlainObject) => void
) {
  return Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

/**
 * @function objectFromPairs
 * @description 将一个包含两个元素的数组转换为一个Object对象
 * @param {[string, unknown][]} arr
 * @return {object}
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
 * @description 将一个包含多个元素的数组转换为一个普通的Object对象
 * @param {array} arr
 * @param {function} fn
 * @return {object}
 * @example
 * objectFromPairs(["apple", "banana", "orange"]); // { apple: "", banana: "", orange: "" }
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
 * @description 将一个包含多个键值对的对象转换为一个只包含指定键的对象，注意是生成新的对象，源对象不会改变
 * @param {object} obj
 * @param {array} arr
 * @return {object}
 * @example
 * pick({a:1,b:2,c:3}, ['a','b']); // {a:1,b:2}
 */
export function pick(obj: PlainObject, keys: string[]) {
  return keys.reduce((acc: PlainObject, curr) => {
    curr in obj && (acc[curr] = obj[curr]);
    return acc;
  }, {});
}

/**
 * @function hasOwnProp
 * @description 检查一个对象是否具有指定的属性
 * @param {unknown} obj
 * @param {string} key
 * @returns {boolean}
 * @example
 * const obj = {a:1};
 * hasOwnProp(obj, 'a'); // true
 * hasOwnProp(obj, 'b'); // false
 * hasOwnProp(obj, 'toString'); // false
 */
export function hasOwnProp(obj: unknown, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * @function isEmptyObj
 * @description 是否为空对象
 * @param {object} obj
 * @returns {boolean}
 * @example
 * isEmptyObj({}); // true
 * isEmptyObj({a:1}); // false
 * isEmptyObj(null); // false
 */
export function isEmptyObj(obj?: unknown): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}
