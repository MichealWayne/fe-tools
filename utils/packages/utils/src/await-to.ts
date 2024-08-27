/**
 * @author Wayne
 * @description async-await/promise操作相关
 * @notice 来自`await-to-js`
 * @Date 2023-06-17 13:27:43
 * @LastEditTime 2024-08-25 13:21:16
 */
/**
 * @function to
 * @description 将Promise的错误和数据分离
 * @param { Promise } promise Promise实例
 * @param { Object= } errorExt 错误扩展
 * @return { Promise<[U, undefined] | [null, T]> } 返回一个Promise
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
