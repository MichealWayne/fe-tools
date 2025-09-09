/**
 * @fileoverview Mathematical calculation utilities for canvas charts and graphics, including coordinate geometry and data analysis functions.
 *
 * This module provides essential mathematical functions for canvas-based charting and graphics applications.
 * It includes functions for finding data extremes, calculating distances and angles between points,
 * and determining appropriate axis scaling for visual representations.
 *
 * @module Calculate
 * @author Wayne
 * @since 1.0.0
 */

import { arrayMin, arrayMax } from 'utils';

import { PointPosition, ListExtremum } from '../types';

/**
 * @function min
 * @description 求数组最小值。Finds the minimum value in an array of numbers. This is an alias for the arrayMin function from the utils package.
 * @param {number[]} arr - 数值列表。Array of numbers to find the minimum value from (must not be empty)
 * @returns {number} 最小值。The smallest number in the array
 * @throws {Error} Throws an error if the array is empty or contains non-numeric values
 * @example
 * // Basic minimum finding
 * const values = [10, 5, 8, 3, 12];
 * const minValue = min(values); // Returns 3
 *
 * @example
 * // Finding minimum in chart data
 * const chartData = [25, 40, 15, 60, 30];
 * const minDataPoint = min(chartData); // Returns 15
 * // Use for setting chart Y-axis minimum
 *
 * @since 1.0.0
 * @see {@link max} - For finding maximum values
 * @see {@link getListExtremum} - For finding both min and max in one operation
 */
export const min = arrayMin;

/**
 * @function max
 * @description 求数组最大值。Finds the maximum value in an array of numbers. This is an alias for the arrayMax function from the utils package.
 * @param {number[]} arr - 数值列表。Array of numbers to find the maximum value from (must not be empty)
 * @returns {number} 最大值。The largest number in the array
 * @throws {Error} Throws an error if the array is empty or contains non-numeric values
 * @example
 * // Basic maximum finding
 * const values = [10, 5, 8, 3, 12];
 * const maxValue = max(values); // Returns 12
 *
 * @example
 * // Finding maximum in chart data
 * const chartData = [25, 40, 15, 60, 30];
 * const maxDataPoint = max(chartData); // Returns 60
 * // Use for setting chart Y-axis maximum
 *
 * @since 1.0.0
 * @see {@link min} - For finding minimum values
 * @see {@link getListExtremum} - For finding both min and max in one operation
 */
export const max = arrayMax;

/**
 * @function getListExtremum
 * @description Efficiently finds both the minimum and maximum values in an array of numbers in a single pass. More performant than calling min() and max() separately for large datasets.
 * @param {number[]} arr - 数值列表。Array of numbers to analyze (must not be empty)
 * @returns {ListExtremum} 极值对象。Object containing both min and max values
 * @returns {number} returns.min - The smallest number in the array
 * @returns {number} returns.max - The largest number in the array
 * @throws {Error} Throws an error if the array is empty
 * @example
 * // Basic extremum finding
 * const data = [1, 3, 5, 2, 2, 4, 5, 7];
 * const { min, max } = getListExtremum(data);
 * console.log(`Range: ${min} to ${max}`); // Range: 1 to 7
 *
 * @example
 * // Chart axis calculation
 * const chartValues = [25, 40, 15, 60, 30, 45];
 * const { min: dataMin, max: dataMax } = getListExtremum(chartValues);
 *
 * // Add padding for better visualization
 * const padding = (dataMax - dataMin) * 0.1;
 * const yAxisMin = dataMin - padding;
 * const yAxisMax = dataMax + padding;
 *
 * @example
 * // Performance comparison for large datasets
 * const largeDataset = new Array(10000).fill(0).map(() => Math.random() * 100);
 *
 * // Efficient: single pass
 * const { min, max } = getListExtremum(largeDataset);
 *
 * // Less efficient: two passes
 * // const min = min(largeDataset);
 * // const max = max(largeDataset);
 *
 * @since 1.0.0
 * @see {@link min} - For finding only minimum values
 * @see {@link max} - For finding only maximum values
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
 * @description 获取网格最大范围值。Calculates an appropriate axis limit for chart grids based on the data range. Provides visually pleasing axis bounds by rounding up to nice numbers and adding visual padding.
 * @param {number} [range] - The data range (max - min) to calculate axis limit for
 * @returns {number} The calculated axis limit that provides good visual spacing
 * @example
 * // Basic axis limit calculation
 * const dataRange = 87; // e.g., max: 95, min: 8
 * const axisLimit = getAxisLimit(dataRange); // Returns 88 (rounded to nearest 4)
 *
 * @example
 * // Chart axis setup
 * const chartData = [10, 25, 40, 35, 60];
 * const { min, max } = getListExtremum(chartData);
 * const range = max - min; // 50
 *
 * const yAxisMax = min + getAxisLimit(range);
 * // Creates visually appealing chart bounds
 *
 * @example
 * // Small range handling
 * const smallRange = 1.5;
 * const limit = getAxisLimit(smallRange); // Returns 1.8 (1.5 * 1.2 for padding)
 *
 * @example
 * // No data case
 * const emptyLimit = getAxisLimit(); // Returns 1 (default)
 * const zeroLimit = getAxisLimit(0); // Returns 1 (default)
 *
 * @since 1.0.0
 */
export function getAxisLimit(range?: number): number {
  if (!range) {
    return 1;
  }
  if (range > 2) {
    return Math.ceil(range / 4) * 4;
  }

  // 为了美观、顶部留出一定空间
  return range * 1.2;
}

/**
 * @function getPointsAngle
 * @description 根据两个点获取角度值。Calculates the angle in radians between two points, measured from the first point to the second point. The angle is normalized to be between 0 and 2π radians (0 to 360 degrees).
 * @param {PointPosition} point1 - 起始点坐标。The starting point with x and y coordinates
 * @param {PointPosition} point2 - 结束点坐标。The ending point with x and y coordinates
 * @returns {number} The angle in radians (0 to 2π), where 0 is pointing up (north)
 * @example
 * // Basic angle calculation
 * const startPoint = { x: 0, y: 0 };
 * const endPoint = { x: 1, y: 1 };
 * const angle = getPointsAngle(startPoint, endPoint);
 * const degrees = angle * (180 / Math.PI); // Convert to degrees
 *
 * @example
 * // Arrow direction for canvas drawing
 * function drawArrow(ctx, from, to) {
 *   const angle = getPointsAngle(from, to);
 *
 *   // Draw line
 *   ctx.beginPath();
 *   ctx.moveTo(from.x, from.y);
 *   ctx.lineTo(to.x, to.y);
 *   ctx.stroke();
 *
 *   // Draw arrowhead
 *   const headLength = 10;
 *   ctx.save();
 *   ctx.translate(to.x, to.y);
 *   ctx.rotate(angle);
 *   ctx.beginPath();
 *   ctx.moveTo(0, 0);
 *   ctx.lineTo(-headLength, -headLength/2);
 *   ctx.lineTo(-headLength, headLength/2);
 *   ctx.closePath();
 *   ctx.fill();
 *   ctx.restore();
 * }
 *
 * @example
 * // Compass directions
 * const center = { x: 100, y: 100 };
 * const north = { x: 100, y: 50 };
 * const east = { x: 150, y: 100 };
 *
 * const northAngle = getPointsAngle(center, north); // ~0 radians (0°)
 * const eastAngle = getPointsAngle(center, east);   // ~π/2 radians (90°)
 *
 * @since 1.0.0
 * @see {@link getPointsDistance} - For calculating distance between the same points
 */
export function getPointsAngle(
  { x: x1, y: y1 }: PointPosition,
  { x: x2, y: y2 }: PointPosition
): number {
  const angle = Math.atan2(x2 - x1, y1 - y2);
  return angle < 0 ? Math.PI * 2 + angle : angle;
}

/**
 * @function getPointsDistance
 * @description 获得两个点距离。Calculates the Euclidean distance between two points using the Pythagorean theorem (√((x₂-x₁)² + (y₂-y₁)²)).
 * @param {PointPosition} point1 - 第一个点坐标。The first point with x and y coordinates
 * @param {PointPosition} point2 - 第二个点坐标。The second point with x and y coordinates
 * @returns {number} 两个点的距离数值。The distance between the two points in the same units as the coordinates
 * @example
 * // Basic distance calculation
 * const pointA = { x: 0, y: 0 };
 * const pointB = { x: 3, y: 4 };
 * const distance = getPointsDistance(pointA, pointB); // Returns 5 (3-4-5 triangle)
 *
 * @example
 * // Collision detection
 * function checkCollision(object1, object2, threshold = 20) {
 *   const distance = getPointsDistance(object1.position, object2.position);
 *   return distance < threshold;
 * }
 *
 * const player = { position: { x: 100, y: 150 } };
 * const enemy = { position: { x: 110, y: 160 } };
 *
 * if (checkCollision(player, enemy)) {
 *   console.log('Collision detected!');
 * }
 *
 * @example
 * // Animation easing based on distance
 * function animateToTarget(current, target, speed = 0.1) {
 *   const distance = getPointsDistance(current, target);
 *
 *   if (distance < 1) {
 *     return target; // Close enough, snap to target
 *   }
 *
 *   // Move towards target
 *   const dx = target.x - current.x;
 *   const dy = target.y - current.y;
 *
 *   return {
 *     x: current.x + dx * speed,
 *     y: current.y + dy * speed
 *   };
 * }
 *
 * @example
 * // Canvas zoom level calculation
 * const mouseStart = { x: 100, y: 100 };
 * const mouseCurrent = { x: 150, y: 120 };
 * const dragDistance = getPointsDistance(mouseStart, mouseCurrent);
 * const zoomFactor = 1 + (dragDistance / 100); // Zoom based on drag distance
 *
 * @since 1.0.0
 * @see {@link getPointsAngle} - For calculating angle between the same points
 */
export function getPointsDistance(
  { x: x1, y: y1 }: PointPosition,
  { x: x2, y: y2 }: PointPosition
): number {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
