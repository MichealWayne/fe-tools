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
 * @return {Promise<[U, undefined] | [null, T]>} 返回一个Promise，成功时为[null, data]，失败时为[error, undefined]。Returns a Promise that resolves to [null, data] on success or [error, undefined] on failure
 * @example
const [err, data] = await to(promise); // some promise instance
if (err) {
  console.error(err);
} else {
  console.log(data);
}
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
