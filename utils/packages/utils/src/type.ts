/**
 * @module Type
 * @description value type functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-03-14 11:03:24
 */

/**
 * @function type
 * @description **type(val)** get the variable value's type
 * @param {unknown} val variable value
 * @return {String} type string
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
  // eslint-disable-next-line no-undefined
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
 * @function isNumber
 * @description **isNumber(val)** if the variable value is Number
 * @param {unknown} val
 * @return {Boolean}
 * @example
 * const test1 = 1,
 *     test2 = new Number(1),
 *     test3 = Number(1),
 *     test4 = Infinity,
 *     test5 = NaN;
 * isNumber(test1);  // true
 * isNumber(test2);  // false
 * isNumber(test3);  // true
 * isNumber(test4);  // false
 * isNumber(test5);  // false
 */
export function isNumber(val?: unknown): val is number {
  return typeof val === 'number' && val === val;
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
 * @function isPrimitive
 * @description **isPromise(val)** if the variable value is isPromise.(https://github.com/then/is-promise)
 * @param {unknown} val variable value
 * @return {Boolean}
 * @example
 * const test1 = new Promise(resolve => resolve(1))),
 *     test2 = { then: () => '', catch: () => '', };
 * isPrimitive(test1);  // true
 * isPrimitive(test2);  // true
 */
export const isPrimitive = <T = any>(val?: unknown): val is Promise<T> =>
  !!val &&
  (typeof val === 'object' || typeof val === 'function') &&
  typeof (val as PromiseLike<T>).then === 'function';

/**
 * @function isDate
 * @description 判断传入的参数是否为 Date 类型
 * @param {unknown} value 
 * @return {Boolean} 
 * @example
console.log(isDate(new Date())); // true
console.log(isDate('2022-03-14')); // false
console.log(isDate(1647312000000)); // false
console.log(isDate({ year: 2022, month: 3, day: 14 })); // false
 */
export const isDate = (value: unknown): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

/**
 * @function equals
 * @description 判断两个参数是否相等
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 * @example
const a = [1, 2, 3];
const b = [1, 2, 3];
const result = equals(a, b); // true
 */
export function equals(a: any, b: any): boolean {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (isPrimitive(a) || isPrimitive(b)) return a === b;
  if (a?.constructor !== b?.constructor) return false;

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
}
