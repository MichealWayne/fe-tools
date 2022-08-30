/**
 * @module Type
 * @description value type functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-06-22 10:37:28
 */

/**
 * @function type
 * @description **type(val)** get the variable value's type
 * @param {any} val variable value
 * @return {string} type string
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' },
 *     test3 = 'abc',
 *     test4;
 * type(test1);  // 'Array'
 * type(test2);  // 'Object'
 * type(test3);  // 'String'
 * type(test4);  // 'Undefined'
 */
export function type(val?: unknown): string {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '');
}

/**
 * @function isUndefined
 * @description **isUndefined(val)** if the variable value is undefined
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2;
 * isString(test1);  // false
 * isString(test2);  // true
 */
export function isUndefined(val?: unknown): val is undefined {
  return val === undefined;
}

/**
 * @function isArray
 * @description **isArray(val)** if the variable value is Array.(Array.isArray: android 5+)
 * @param {unknown} val value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isArray(test1);  // true
 * isArray(test2);  // false
 */
export const isArray = (val?: unknown): val is Array<any> => type(val) === 'Array';

/**
 * @function isString
 * @description **isString(val)** if the variable value is String
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = 'abc';
 * isString(test1);  // false
 * isString(test2);  // true
 */
export function isString(val?: unknown): val is string {
  return typeof val === 'string';
}

/**
 * @function isObject
 * @description **isObject(val)** if the variable value is Object
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = { a: 1, b: '2' };
 * isObject(test1);  // false
 * isObject(test2);  // true
 */
export function isObject(val?: unknown): val is Record<any, any> {
  return type(val) === 'Object';
}

/**
 * @function isFunction
 * @description **isFunction(val)** if the variable value is Function
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = [1, 2, 3],
 *     test2 = function () { alert(1) };
 * isFunction(test1);  // false
 * isFunction(test2);  // true
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val?: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * @function isPromise
 * @description **isPromise(val)** if the variable value is isPromise.(https://github.com/then/is-promise)
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = new Promise(resolve => resolve(1))),
 *     test2 = { then: () => '', catch: () => '', };
 * isPromise(test1);  // true
 * isPromise(test2);  // true
 */
export const isPromise = <T = any>(val?: unknown): val is Promise<T> =>
  !!val &&
  (typeof val === 'object' || typeof val === 'function') &&
  typeof (val as PromiseLike<T>).then === 'function';

/**
 * @function isEmptyObj
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isEmptyObj(obj?: { [propsName: string]: unknown } | null): boolean {
  if (!obj) {
    return false;
  }
  for (const _key in obj) {
    return false;
  }
  return true;
}

/**
 * @function equals
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
export function equals(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b;
  if (a.__proto__ !== b.__proto__) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}

/**
 * @function size
 * @param {any} val
 */
export function size(val: unknown) {
  // eslint-disable-next-line no-nested-ternary
  return isArray(val)
    ? val.length
    : val && isObject(val)
    ? val.size || val.length || Object.keys(val).length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0;
}
