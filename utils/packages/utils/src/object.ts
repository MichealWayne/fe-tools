/**
 * @module Object
 * @description Object utility functions for manipulation and analysis
 * @author Wayne
 * @Date 2022-07-05 13:53:42
 * @LastEditTime 2025-09-07 20:37:56
 */

import { isObject } from './type';

export type PlainObject = {
  [propName: string]: unknown;
};

/**
 * @function forOwn
 * @description 遍历对象的所有可枚举自有属性，为每个属性执行回调函数。Iterates over all enumerable own properties of an object, executing a callback for each property
 * @param {PlainObject} obj - 要遍历的对象。Object to iterate over
 * @param {Function} fn - 为每个属性执行的回调函数（接收值、键和对象）。Callback function executed for each property (receives value, key, and object)
 * @returns {void} 无返回值（函数用于副作用）。void (function is used for side effects)
 * @throws {TypeError} 当obj不是对象或fn不是函数时。When obj is not an object or fn is not a function
 * @example
 * // Basic iteration
 * const obj = { a: 1, b: 2, c: 3 };
 * forOwn(obj, (val, key) => console.log(`${key}: ${val}`));
 * // Output: "a: 1", "b: 2", "c: 3"
 *
 * @example
 * // Collecting values
 * const values = [];
 * forOwn({ x: 10, y: 20, z: 30 }, (val) => values.push(val));
 * console.log(values); // -> [10, 20, 30]
 *
 * @example
 * // Conditional processing
 * const result = {};
 * forOwn({ a: 1, b: 2, c: 3, d: 4 }, (val, key) => {
 *   if (val % 2 === 0) result[key] = val * 2;
 * });
 * console.log(result); // -> { b: 4, d: 8 }
 *
 * @example
 * // Using all parameters
 * forOwn({ name: 'John', age: 30 }, (val, key, obj) => {
 *   console.log(`Property ${key} has value ${val} in object with ${Object.keys(obj).length} properties`);
 * });
 *
 * @example
 * // Edge cases
 * forOwn({}, (val) => console.log(val)); // No output (empty object)
 * forOwn({ a: undefined, b: null }, (val, key) => console.log(`${key}: ${val}`)); // -> "a: undefined", "b: null"
 */
export function forOwn(
  obj: PlainObject,
  fn: (val?: unknown, key?: string, obj?: PlainObject) => void
) {
  return Object.keys(obj).forEach(key => fn(obj[key], key, obj));
}

/**
 * @function objectFromPairs
 * @description 将键值对数组转换为对象。Converts an array of key-value pairs into an object
 * @param {Array<Array<string, unknown>>} arr - 要转换为对象的[key, value]对数组。Array of [key, value] pairs to convert to object
 * @returns {PlainObject} 从键值对创建的对象。Object created from the key-value pairs
 * @throws {TypeError} 当arr不是数组或包含无效对时。When arr is not an array or contains invalid pairs
 * @example
 * // Basic usage
 * objectFromPairs([['a', 1], ['b', 2]]); // -> { a: 1, b: 2 }
 * objectFromPairs([['name', 'John'], ['age', 30]]); // -> { name: 'John', age: 30 }
 *
 * @example
 * // Complex values
 * objectFromPairs([['a', 1], ['b', [2, 3]], ['c', { d: 4 }]]); // -> { a: 1, b: [2, 3], c: { d: 4 } }
 *
 * @example
 * // Different value types
 * objectFromPairs([
 *   ['string', 'hello'],
 *   ['number', 42],
 *   ['boolean', true],
 *   ['null', null],
 *   ['undefined', undefined]
 * ]); // -> { string: 'hello', number: 42, boolean: true, null: null, undefined: undefined }
 *
 * @example
 * // Edge cases
 * objectFromPairs([]); // -> {}
 * objectFromPairs([['key', 'value']]); // -> { key: 'value' }
 *
 * @example
 * // Duplicate keys (later values overwrite earlier ones)
 * objectFromPairs([['a', 1], ['b', 2], ['a', 3]]); // -> { a: 3, b: 2 }
 *
 * @see {@link Object.fromEntries} - Native equivalent in modern JavaScript
 */
export function objectFromPairs(arr: [string, unknown][]) {
  return arr.reduce((a: PlainObject, v) => {
    a[v[0] as keyof typeof a] = v[1];
    return a;
  }, {});
}

/**
 * @function mapObject
 * @description 将数组映射到对象，其中数组元素成为键，回调结果成为值。Maps an array to an object where array elements become keys and callback results become values
 * @param {T[]} arr - 用作对象键的元素数组。Array of elements to use as object keys
 * @param {Function} fn - 生成值的回调函数（接收值、索引和数组）。Callback function to generate values (receives value, index, and array)
 * @returns {Record<T extends string ? T : string, U>} 数组元素作为键、回调结果作为值的对象。Object with array elements as keys and callback results as values
 * @throws {TypeError} 当arr不是数组或fn不是函数时。When arr is not an array or fn is not a function
 * @example
 * // Basic mapping
 * mapObject(['a', 'b', 'c'], v => v + '1'); // -> { a: 'a1', b: 'b1', c: 'c1' }
 * mapObject(['x', 'y', 'z'], v => v.toUpperCase()); // -> { x: 'X', y: 'Y', z: 'Z' }
 *
 * @example
 * // Using index parameter
 * mapObject(['a', 'b', 'c'], (v, i) => i); // -> { a: 0, b: 1, c: 2 }
 * mapObject(['first', 'second', 'third'], (v, i) => `${v}-${i}`); // -> { first: 'first-0', second: 'second-1', third: 'third-2' }
 *
 * @example
 * // Using array parameter
 * mapObject(['a', 'b'], (v, i, arr) => arr.length - i); // -> { a: 2, b: 1 }
 *
 * @example
 * // Complex transformations
 * mapObject(['apple', 'banana', 'cherry'], v => ({
 *   name: v,
 *   length: v.length,
 *   uppercase: v.toUpperCase()
 * }));
 * // -> {
 * //   apple: { name: 'apple', length: 5, uppercase: 'APPLE' },
 * //   banana: { name: 'banana', length: 6, uppercase: 'BANANA' },
 * //   cherry: { name: 'cherry', length: 6, uppercase: 'CHERRY' }
 * // }
 *
 * @example
 * // Edge cases
 * mapObject([], v => v); // -> {}
 * mapObject(['single'], v => v); // -> { single: 'single' }
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
 * @description 从源对象中选择指定键创建新对象（浅拷贝）。Creates a new object with only the specified keys from the source object (shallow copy)
 * @param {PlainObject} obj - 要从中选择属性的源对象。Source object to pick properties from
 * @param {string[]} keys - 要包含在新对象中的属性名数组。Array of property names to include in the new object
 * @returns {PlainObject} 仅包含源对象中存在的指定属性的新对象。New object containing only the specified properties that exist in the source object
 * @throws {TypeError} 当obj不是对象或keys不是数组时。When obj is not an object or keys is not an array
 * @example
 * // Basic usage
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'b']); // -> { a: 1, b: 2 }
 * pick({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age']); // -> { name: 'John', age: 30 }
 *
 * @example
 * // Non-existent keys are ignored
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'd']); // -> { a: 1 }
 * pick({ x: 10 }, ['y', 'z']); // -> {}
 *
 * @example
 * // Complex values (shallow copy)
 * const source = {
 *   simple: 'value',
 *   array: [1, 2, 3],
 *   object: { nested: true },
 *   unused: 'ignored'
 * };
 * const result = pick(source, ['simple', 'array', 'object']);
 * // -> { simple: 'value', array: [1, 2, 3], object: { nested: true } }
 * // Note: array and object are shallow copied (same references)
 *
 * @example
 * // Edge cases
 * pick({}, ['a', 'b']); // -> {}
 * pick({ a: 1, b: 2 }, []); // -> {}
 * pick({ a: undefined, b: null }, ['a', 'b']); // -> { a: undefined, b: null }
 *
 * @example
 * // Practical use case: API response filtering
 * const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret', role: 'admin' };
 * const publicUser = pick(user, ['id', 'name', 'email']); // -> { id: 1, name: 'John', email: 'john@example.com' }
 */
export function pick(obj: PlainObject, keys: string[]) {
  return keys.reduce((acc: PlainObject, curr) => {
    curr in obj && (acc[curr] = obj[curr]);
    return acc;
  }, {});
}

/**
 * @function hasOwnProperty
 * @description 安全地检查对象是否具有特定的自有属性（非继承）。Safely checks if an object has a specific own property (not inherited)
 * @param {T} obj - 要检查属性的对象。Object to check for the property
 * @param {PropertyKey} key - 要检查的属性键。Property key to check for
 * @returns {boolean} 如果对象具有指定的自有属性则返回true，否则返回false。True if the object has the specified own property, false otherwise
 * @throws {TypeError} 当obj不是对象时。When obj is not an object
 * @example
 * // Basic usage
 * const obj = { a: 1, b: 2 };
 * hasOwnProperty(obj, 'a'); // -> true
 * hasOwnProperty(obj, 'b'); // -> true
 * hasOwnProperty(obj, 'c'); // -> false
 *
 * @example
 * // Inherited properties return false
 * const obj = { a: 1 };
 * hasOwnProperty(obj, 'toString'); // -> false (inherited from Object.prototype)
 * hasOwnProperty(obj, 'hasOwnProperty'); // -> false (inherited)
 *
 * @example
 * // Different property types
 * const obj = {
 *   string: 'value',
 *   number: 42,
 *   boolean: true,
 *   null: null,
 *   undefined: undefined,
 *   0: 'numeric key',
 *   '': 'empty string key'
 * };
 * hasOwnProperty(obj, 'string'); // -> true
 * hasOwnProperty(obj, 'undefined'); // -> true (property exists, value is undefined)
 * hasOwnProperty(obj, 0); // -> true (numeric keys work)
 * hasOwnProperty(obj, ''); // -> true (empty string keys work)
 *
 * @example
 * // Symbol keys
 * const sym = Symbol('test');
 * const obj = { [sym]: 'symbol value', regular: 'regular value' };
 * hasOwnProperty(obj, sym); // -> true
 * hasOwnProperty(obj, 'regular'); // -> true
 *
 * @example
 * // Edge cases
 * hasOwnProperty({}, 'anything'); // -> false
 * hasOwnProperty({ a: undefined }, 'a'); // -> true (property exists with undefined value)
 *
 * @example
 * // Safe alternative to obj.hasOwnProperty() which can be overridden
 * const maliciousObj = { hasOwnProperty: 'not a function', a: 1 };
 * // maliciousObj.hasOwnProperty('a'); // Would throw error
 * hasOwnProperty(maliciousObj, 'a'); // -> true (safe)
 */
export function hasOwnProperty<T extends Record<string, unknown>>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * @function isEmptyObj
 * @description 检查值是否为空对象（没有自有可枚举属性的对象）。Checks if a value is an empty object (object with no own enumerable properties)
 * @param {unknown} obj - 要检查是否为空的值。Value to check for emptiness
 * @returns {boolean} 如果值是没有任何自有可枚举属性的对象则返回true，否则返回false。True if the value is an object with no own enumerable properties, false otherwise
 * @throws {TypeError} 当类型检查失败时。When type checking fails
 * @example
 * // Empty objects
 * isEmptyObj({}); // -> true
 * isEmptyObj(new Object()); // -> true
 * isEmptyObj(Object.create(null)); // -> true
 *
 * @example
 * // Non-empty objects
 * isEmptyObj({ a: 1 }); // -> false
 * isEmptyObj({ a: undefined }); // -> false (property exists)
 * isEmptyObj({ 0: 'value' }); // -> false
 *
 * @example
 * // Non-objects return false
 * isEmptyObj(null); // -> false
 * isEmptyObj(undefined); // -> false
 * isEmptyObj(''); // -> false (string, not object)
 * isEmptyObj([]); // -> false (array, not plain object)
 * isEmptyObj(0); // -> false
 * isEmptyObj(false); // -> false
 *
 * @example
 * // Objects with inherited properties only
 * const obj = Object.create({ inherited: 'value' });
 * isEmptyObj(obj); // -> true (no own properties)
 *
 * @example
 * // Objects with non-enumerable properties
 * const obj = {};
 * Object.defineProperty(obj, 'hidden', { value: 'secret', enumerable: false });
 * isEmptyObj(obj); // -> true (no enumerable own properties)
 *
 * @example
 * // Practical usage
 * function processConfig(config) {
 *   if (isEmptyObj(config)) {
 *     return getDefaultConfig();
 *   }
 *   return { ...getDefaultConfig(), ...config };
 * }
 */
export function isEmptyObj(obj?: unknown): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}
