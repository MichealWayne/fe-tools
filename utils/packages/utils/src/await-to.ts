/**
 * @fileoverview Utility functions for async/await and Promise operations, including error handling utilities.
 *
 * This module provides utility functions for working with async/await and Promise operations.
 * It includes functions for separating Promise errors and data, making async code more readable
 * and easier to handle.
 *
 * @module Await-to
 * @author Wayne
 * @notice 来自`await-to-js`。Based on `await-to-js`
 * @since 1.0.0
 */
/**
 * @function to
 * @description 将Promise的错误和数据分离。Separates Promise errors and data
 * @param {Promise} promise - Promise实例。The Promise instance
 * @param {Object} [errorExt] - 错误扩展对象。Error extension object
 * @return {Promise<[null, T] | [U, undefined]>} 返回一个Promise，成功时为[null, data]，失败时为[error, undefined]。Returns a Promise that resolves to [null, data] on success or [error, undefined] on failure
 * @remarks 错误值原样透传：拒因是什么就返回什么（如reject('x')会得到['x', undefined]，并非一定是Error）。传入errorExt时通过Object.assign({}, err, errorExt)合并，结果是普通对象（不再是Error实例），且errorExt的字段会覆盖原错误的同名字段（如message）。The rejection value is passed through as-is (e.g. reject('x') yields ['x', undefined], not necessarily an Error). When errorExt is provided it is merged via Object.assign({}, err, errorExt), producing a plain object (no longer an Error instance) where errorExt fields overwrite same-named error fields such as message.
 * @example
 * ```ts
const [err, data] = await to(promise); // some promise instance
if (err) {
  console.error(err);
} else {
  console.log(data);
}
 * ```
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

export default to;
