/**
 * @module Calculate
 * @description chart calcluate
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-07-15
 */

import { arrayMin, arrayMax } from 'utils';

import { PointPosition, ListExtremum } from '../types';

/**
 * @function min
 * @param {number[]} arr
 * @return {number}
 * @notice 数组不能为空
 */
export const min = arrayMin;

/**
 * @function max
 * @param {number[]} arr
 * @return {number}
 * @notice 数组不能为空
 */
export const max = arrayMax;

/**
 * @function getListExtremum
 * @param {number[]} arr
 * @return {Object} extremum
 *         {Number} min
 *         {Number} max
 * @notice 数组不能为空
 * @example
 *   const { max, min } = getListExtremum([1,3,5,2,2,4,5,7]);  // -> { min: 1, max: 7 }
 */
export function getListExtremum(arr: number[]): ListExtremum {
  let maxNum = arr[0];
  let minNum = maxNum;

  for (let i = 1, len = arr.length; i < len; i++) {
    const item = arr[i];
    if (item > maxNum) {
      maxNum = item;
    } else if (item < minNum) {
      minNum = item;
    }
  }
  return {
    max: maxNum,
    min: minNum,
  };
}

/**
 * @function getAxisLimit
 * @description set grid charts scale rate range
 * @param {Number} range
 * @return {number}
 */
export function getAxisLimit(range?: number): number {
  if (!range) {
    return 1;
  }
  if (range > 2) {
    return Math.ceil(range / 4) * 4;
  } else {
    return range * 1.2;
  }
}

/**
 * @function getPointsAngle
 * @description 获得两个点的角度值
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 * @return {Number}
 * @example
 *   const angle = getPointsAngle({ x: 0, y: 0 }, { x: 1, y: 1 })
 */
export function getPointsAngle(point1: PointPosition, point2: PointPosition): number {
  const x1 = point1.x;
  const y1 = point1.y;
  const x2 = point2.x;
  const y2 = point2.y;

  const angle = Math.atan2(x2 - x1, y1 - y2);
  return angle < 0 ? Math.PI * 2 + angle : angle;
}

/**
 * @function getPointsDistance
 * @description 获得两个点距离
 * @param {PointPosition} point1
 * @param {NumberPointPosition} point2
 * @return {Number}
 * @example
 *   const distance = getPointsDistance({ x: 0, y: 0 }, { x: 1, y: 1 })
 */
export function getPointsDistance(point1: PointPosition, point2: PointPosition): number {
  const x1 = point1.x;
  const y1 = point1.y;
  const x2 = point2.x;
  const y2 = point2.y;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
