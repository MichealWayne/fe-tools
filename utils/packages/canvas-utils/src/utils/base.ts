/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module canvasUtils
 * @description basic functions
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-12-05
 * @updateInfo
 *  2019.12.05: add min & max
 */

import { isObject, isEmptyObj } from 'utils';
import { SimpleObj } from '../types';

/**
 * @function NOOP
 * @description empty function
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NOOP = () => '';

/**
 * @function each
 * @description **each(array, fn)** traverse Array
 * @param {any[]} array traverse array
 * @param {Function} handle function
 * @return {any[]} array
 * @example
 * var arr = [1, 2, 3];
 * each(arr, function (i) {console.log(i)});
 * // 1
 * // 2
 * // 3
 */
export function each(array: unknown[], fn: (...args: any[]) => void): unknown[] {
  for (let i = 0, len = array.length; i < len; i++) {
    fn(array[i], i);
  }
  return array;
}

/**
 * @function cloneObjDeep
 * @description **cloneObjDeep(fromobj, toobj)** clone a object to new vari
 * @param {object} fromobj from object
 * @param {object} toobj to object
 * @return {object} copied object
 * @example
 * var obj1 = {
 *    a: 1,
 *    b: {
 *        c: 2,
 *        d: 3
 *    },
 *    e: 4
 * };
 * var obj2 = {
 *    a: 'a',
 *    f: 'f'
 * };
 *
 * var obj3 = cloneObjDeep(obj1, obj2);
 * // obj3 == obj2 : {"a":"a","f":"f","b":{"c":2,"d":3},"e":4}
 */
export function cloneObjDeep(fromObj: SimpleObj, toObj: SimpleObj): Record<any, any> {
  if (!isObject(fromObj) || !isObject(toObj)) {
    return {};
  }

  for (const i in fromObj) {
    if (isObject(toObj[i]) && !isEmptyObj(toObj[i])) {
      // obj
      cloneObjDeep(fromObj[i] as SimpleObj, toObj[i] as SimpleObj);
      continue;
    }

    toObj[i] = toObj[i] || fromObj[i];
  }

  return toObj;
}

/**
 * @function cloneArray
 * @description **cloneArray(fromarr, toarr)**
 * @param {any[]} fromobj
 * @param {any[]} toobj
 * @return {any[]} copied array
 * @example
 * var arr1 = [1,2,3,4,5,6];
 * var arr2 = [7];
 * var arr3 = cloneArray(arr1, arr2);
 * // arr2 == arr3 : [1, 2, 3, 4, 5, 6]
 */
export const cloneArray = (fromArr: unknown[], toArr: unknown[]): unknown[] => {
  each(fromArr, (item: unknown, index: number) => {
    toArr[index] = item;
  });

  return toArr;
};

/**
 * @function throwError
 * @description throw Error Object
 * @param {string} info 错误信息
 * @param {string} part 错误单元
 * @param {string} detail 错误单元细节
 */
export function throwError(info: unknown, part = '', detail = ''): never {
  throw new Error(`Error!${info}.(FundCharts-${part} ${detail})`);
}
