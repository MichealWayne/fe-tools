/**
 * @module Object
 * @description object functions
 * @author Wayne
 * @Date 2022-07-05 13:53:42
 * @LastEditTime 2024-06-29 14:06:53
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
 * forOwn({a:1,b:2,c:3}, (val, key) => console.log(key)); // [1,2,3]
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
 * objectFromPairs([['a', 1], ['b', [2]]]); // -> {a:1, b:[2]}
 * objectFromPairs([['a', 1], ['b', [2]], ['c', {d:3}]]); // -> {a:1, b:[2], c:{d:3}}
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
 * mapObject(['a', 'b', 'c'], v => v + '1') // { a: 'a1', b: 'b1', c: 'c1' }
 * mapObject(['a', 'b', 'c'], (v, i) => i) // { a: 0, b: 1, c: 2 }
 */
export function mapObject<T, U>(
  arr: T[],
  fn: (value: T, index: number, array: T[]) => U
): Record<T extends string ? T : string, U> {
  return arr.reduce((obj, value, index) => {
    const key = value as keyof typeof obj;
    obj[key] = fn(value, index, arr);
    return obj;
  }, {} as Record<T extends string ? T : string, U>);
}

/**
 * @function pick
 * @description 将一个包含多个键值对的对象转换为一个只包含指定键的对象，注意是生成新的对象，源对象不会改变
 * @param {object} obj
 * @param {array} arr
 * @return {object}
 * @example
 * pick({a:1,b:2,c:3}, ['a','b']); // {a:1,b:2}
 * pick({a:1,b:2,c:3}, ['a','d']); // {a:1}
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
export function hasOwnProperty<T extends Record<string, unknown>>(
  obj: T,
  key: PropertyKey
): key is keyof T {
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
 * isEmptyObj(undefined); // false
 * isEmptyObj([]); // false
 */
export function isEmptyObj(obj?: unknown): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}
