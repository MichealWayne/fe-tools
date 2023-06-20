/**
 * @author Wayne
 * @description async-await/promise操作相关
 * @notice 来自`await-to-js`
 * @Date 2023-06-17 13:27:43
 * @LastEditTime 2023-06-17 13:38:13
 */
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise<[U, undefined] | [null, T]> }
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
