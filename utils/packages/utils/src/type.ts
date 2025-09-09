/**
 * @module Type
 * @description Type checking and validation utility functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-09-07 20:37:55
 */

/**
 * @function type
 * @description 使用Object.prototype.toString获取值的精确类型。Gets the precise type of a value as a string using Object.prototype.toString
 * @param {unknown} val - 要获取类型的值。Value to get the type of
 * @returns {string} 值类型的字符串表示（例如，'Array'，'Object'，'String'，'Number'）。String representation of the value's type (e.g., 'Array', 'Object', 'String', 'Number')
 * @example
 * // Basic types
 * type([1, 2, 3]); // -> 'Array'
 * type({ a: 1, b: '2' }); // -> 'Object'
 * type('abc'); // -> 'String'
 * type(123); // -> 'Number'
 *
 * @example
 * // Special values
 * type(null); // -> 'Null'
 * type(undefined); // -> 'Undefined'
 * type(NaN); // -> 'Number'
 * type(Infinity); // -> 'Number'
 *
 * @example
 * // Functions and dates
 * type(() => {}); // -> 'Function'
 * type(new Date()); // -> 'Date'
 * type(/regex/); // -> 'RegExp'
 *
 * @example
 * // Built-in objects
 * type(new Map()); // -> 'Map'
 * type(new Set()); // -> 'Set'
 * type(new WeakMap()); // -> 'WeakMap'
 * type(Promise.resolve()); // -> 'Promise'
 */
export function type(val?: unknown): string {
  return Object.prototype.toString.call(val).replace(/\[object\s|\]/g, '');
}

/**
 * @function isUndefined
 * @description 检查值是否为undefined。Checks if a value is undefined
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为undefined则返回true，否则返回false。True if the value is undefined, false otherwise
 * @example
 * // Basic usage
 * let test1 = [1, 2, 3];
 * let test2;
 * isUndefined(test1); // -> false
 * isUndefined(test2); // -> true
 *
 * @example
 * // Different undefined scenarios
 * isUndefined(undefined); // -> true
 * isUndefined(null); // -> false
 * isUndefined(''); // -> false
 * isUndefined(0); // -> false
 * isUndefined(false); // -> false
 *
 * @example
 * // Object properties
 * const obj = { a: 1 };
 * isUndefined(obj.a); // -> false
 * isUndefined(obj.b); // -> true (property doesn't exist)
 *
 * @example
 * // Function parameters
 * function test(param) {
 *   return isUndefined(param);
 * }
 * test(); // -> true (no argument passed)
 * test(null); // -> false
 */
export function isUndefined(val?: unknown): val is undefined {
  return typeof val === 'undefined';
}

/**
 * @function isArray
 * @description 检查值是否为数组（跨框架兼容）。Checks if a value is an array (cross-frame compatible)
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为数组则返回true，否则返回false。True if the value is an array, false otherwise
 * @example
 * // Basic usage
 * isArray([1, 2, 3]); // -> true
 * isArray({ a: 1, b: '2' }); // -> false
 * isArray('string'); // -> false
 *
 * @example
 * // Different array types
 * isArray([]); // -> true (empty array)
 * isArray(new Array()); // -> true
 * isArray(Array.from('abc')); // -> true
 * isArray([...new Set([1, 2, 3])]); // -> true
 *
 * @example
 * // Array-like objects (not arrays)
 * isArray(arguments); // -> false (in function context)
 * isArray({ 0: 'a', 1: 'b', length: 2 }); // -> false
 * isArray('abc'); // -> false (string is array-like but not array)
 *
 * @example
 * // Typed arrays
 * isArray(new Int32Array([1, 2, 3])); // -> false (typed arrays are not regular arrays)
 * isArray(new Uint8Array([1, 2, 3])); // -> false
 */
export const isArray = (val?: unknown): val is Array<any> => type(val) === 'Array';

/**
 * @function isString
 * @description 检查值是否为字符串原始类型。Checks if a value is a string primitive
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为字符串原始类型则返回true，否则返回false。True if the value is a string primitive, false otherwise
 * @example
 * // Basic usage
 * isString('abc'); // -> true
 * isString([1, 2, 3]); // -> false
 * isString(123); // -> false
 *
 * @example
 * // Different string types
 * isString(''); // -> true (empty string)
 * isString('hello world'); // -> true
 * isString(`template string`); // -> true
 * isString(String('converted')); // -> true
 *
 * @example
 * // String objects vs primitives
 * isString('primitive'); // -> true
 * isString(new String('object')); // -> false (String object, not primitive)
 *
 * @example
 * // Other types
 * isString(null); // -> false
 * isString(undefined); // -> false
 * isString(0); // -> false
 * isString(false); // -> false
 */
export function isString(val?: unknown): val is string {
  return typeof val === 'string';
}

/**
 * @function isNumber
 * @description 检查值是否为有限数字（排除NaN和Infinity）。Checks if a value is a finite number (excludes NaN and Infinity)
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为有限数字则返回true，否则返回false。True if the value is a finite number, false otherwise
 * @example
 * // Valid numbers
 * isNumber(1); // -> true
 * isNumber(0); // -> true
 * isNumber(-42); // -> true
 * isNumber(3.14); // -> true
 * isNumber(Number(1)); // -> true
 *
 * @example
 * // Invalid numbers
 * isNumber(NaN); // -> false
 * isNumber(Infinity); // -> false
 * isNumber(-Infinity); // -> false
 * isNumber(new Number(1)); // -> false (Number object)
 *
 * @example
 * // Non-numbers
 * isNumber('123'); // -> false (string)
 * isNumber(null); // -> false
 * isNumber(undefined); // -> false
 * isNumber(true); // -> false
 *
 * @example
 * // Edge cases
 * isNumber(0 / 0); // -> false (NaN)
 * isNumber(1 / 0); // -> false (Infinity)
 * isNumber(-0); // -> true (negative zero is a valid number)
 */
export function isNumber(val?: unknown): val is number {
  return typeof val === 'number' && val === val;
}

/**
 * @function isObject
 * @description 检查值是否为普通对象（不是数组、函数、日期等）。Checks if a value is a plain object (not array, function, date, etc.)
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为普通对象则返回true，否则返回false。True if the value is a plain object, false otherwise
 * @example
 * // Plain objects
 * isObject({ a: 1, b: '2' }); // -> true
 * isObject({}); // -> true (empty object)
 * isObject(Object.create(null)); // -> true
 *
 * @example
 * // Not plain objects
 * isObject([1, 2, 3]); // -> false (array)
 * isObject(null); // -> false
 * isObject(new Date()); // -> false (Date object)
 * isObject(() => {}); // -> false (function)
 *
 * @example
 * // Constructor objects
 * isObject(new Object()); // -> true
 * isObject(new String('test')); // -> false (String object)
 * isObject(new Number(42)); // -> false (Number object)
 *
 * @example
 * // Built-in objects
 * isObject(new Map()); // -> false
 * isObject(new Set()); // -> false
 * isObject(/regex/); // -> false
 */
export function isObject(val?: unknown): val is Record<any, any> {
  return type(val) === 'Object';
}

/**
 * @function isFunction
 * @description 检查值是否为函数。Checks if a value is a function
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为函数则返回true，否则返回false。True if the value is a function, false otherwise
 * @example
 * // Regular functions
 * isFunction(function() {}); // -> true
 * isFunction(() => {}); // -> true
 * isFunction(async function() {}); // -> true
 *
 * @example
 * // Built-in functions
 * isFunction(console.log); // -> true
 * isFunction(Math.max); // -> true
 * isFunction(Array.isArray); // -> true
 *
 * @example
 * // Constructor functions
 * isFunction(Date); // -> true
 * isFunction(Array); // -> true
 * isFunction(Object); // -> true
 *
 * @example
 * // Not functions
 * isFunction([1, 2, 3]); // -> false
 * isFunction({ a: 1 }); // -> false
 * isFunction('function'); // -> false
 * isFunction(null); // -> false
 *
 * @example
 * // Class constructors
 * class MyClass {}
 * isFunction(MyClass); // -> true (classes are functions)
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val?: unknown): val is Function {
  return typeof val === 'function';
}

/**
 * @function isPrimitive
 * @description 检查值是否为类Promise对象（具有'then'方法）。Checks if a value is a Promise-like object (has a 'then' method)
 * @param {unknown} val - 要检查的值。Value to check
 * @returns {boolean} 如果值为类Promise对象则返回true，否则返回false。True if the value is Promise-like, false otherwise
 * @example
 * // Real Promises
 * isPrimitive(new Promise(resolve => resolve(1))); // -> true
 * isPrimitive(Promise.resolve(42)); // -> true
 * isPrimitive(Promise.reject('error')); // -> true
 *
 * @example
 * // Thenable objects
 * isPrimitive({ then: () => {}, catch: () => {} }); // -> true
 * isPrimitive({ then: function(resolve) { resolve(1); } }); // -> true
 *
 * @example
 * // Not Promise-like
 * isPrimitive({}); // -> false
 * isPrimitive({ then: 'not a function' }); // -> false
 * isPrimitive(null); // -> false
 * isPrimitive(undefined); // -> false
 *
 * @example
 * // Async functions return Promises
 * async function asyncFn() { return 42; }
 * isPrimitive(asyncFn()); // -> true
 *
 * @example
 * // Custom thenable
 * const customThenable = {
 *   then(onResolve, onReject) {
 *     setTimeout(() => onResolve('done'), 1000);
 *   }
 * };
 * isPrimitive(customThenable); // -> true
 */
export const isPrimitive = <T = any>(val?: unknown): val is Promise<T> =>
  !!val &&
  (typeof val === 'object' || typeof val === 'function') &&
  typeof (val as PromiseLike<T>).then === 'function';

/**
 * @function isDate
 * @description 检查值是否为Date对象。Checks if a value is a Date object
 * @param {unknown} value - 要检查的值。Value to check
 * @returns {boolean} 如果值为Date对象则返回true，否则返回false。True if the value is a Date object, false otherwise
 * @example
 * // Valid Date objects
 * isDate(new Date()); // -> true
 * isDate(new Date('2022-03-14')); // -> true
 * isDate(new Date(1647312000000)); // -> true
 *
 * @example
 * // Invalid Date objects (still Date instances)
 * isDate(new Date('invalid')); // -> true (but date.getTime() would be NaN)
 *
 * @example
 * // Not Date objects
 * isDate('2022-03-14'); // -> false (string)
 * isDate(1647312000000); // -> false (timestamp number)
 * isDate({ year: 2022, month: 3, day: 14 }); // -> false (plain object)
 *
 * @example
 * // Edge cases
 * isDate(null); // -> false
 * isDate(undefined); // -> false
 * isDate(Date.now()); // -> false (returns number, not Date)
 *
 * @example
 * // Checking for valid dates
 * function isValidDate(value) {
 *   return isDate(value) && !isNaN(value.getTime());
 * }
 * isValidDate(new Date()); // -> true
 * isValidDate(new Date('invalid')); // -> false
 */
export const isDate = (value: unknown): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]';
};

/**
 * @function equals
 * @description 在两个值之间执行深度相等比较。Performs deep equality comparison between two values
 * @param {any} a - 要比较的第一个值。First value to compare
 * @param {any} b - 要比较的第二个值。Second value to compare
 * @returns {boolean} 如果值深度相等则返回true，否则返回false。True if values are deeply equal, false otherwise
 * @example
 * // Primitive values
 * equals(1, 1); // -> true
 * equals('hello', 'hello'); // -> true
 * equals(true, true); // -> true
 * equals(null, null); // -> true
 *
 * @example
 * // Arrays (deep comparison)
 * equals([1, 2, 3], [1, 2, 3]); // -> true
 * equals([1, [2, 3]], [1, [2, 3]]); // -> true
 * equals([1, 2, 3], [1, 2, 4]); // -> false
 *
 * @example
 * // Objects (deep comparison)
 * equals({ a: 1, b: 2 }, { a: 1, b: 2 }); // -> true
 * equals({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } }); // -> true
 * equals({ a: 1 }, { a: 1, b: 2 }); // -> false (different keys)
 *
 * @example
 * // Date objects
 * const date1 = new Date('2022-01-01');
 * const date2 = new Date('2022-01-01');
 * equals(date1, date2); // -> true (same timestamp)
 * equals(new Date('2022-01-01'), new Date('2022-01-02')); // -> false
 *
 * @example
 * // Mixed types
 * equals(1, '1'); // -> false (different types)
 * equals([], {}); // -> false (different constructors)
 * equals(null, undefined); // -> false
 *
 * @example
 * // Complex nested structures
 * const obj1 = { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
 * const obj2 = { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] };
 * equals(obj1, obj2); // -> true
 *
 * @example
 * // Reference vs value equality
 * const arr = [1, 2, 3];
 * equals(arr, arr); // -> true (same reference)
 * equals(arr, [1, 2, 3]); // -> true (same values)
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
