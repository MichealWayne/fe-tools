/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview Basic utility functions for canvas operations including object manipulation, array processing, and error handling.
 *
 * This module provides fundamental utility functions that support canvas-based applications.
 * It includes functions for deep object cloning, array manipulation, and standardized error handling
 * that are commonly needed in canvas drawing and animation scenarios.
 *
 * @module Base
 * @author Wayne
 * @since 1.0.0
 */

import { isObject, isEmptyObj } from 'utils';
import { SimpleObj } from '../types';

/**
 * @function NOOP
 * @description “空”函数。A no-operation function that returns an empty string. Commonly used as a default callback or placeholder function to avoid null/undefined function calls.
 * @returns {string} Always returns an empty string
 * @example
 * // Using as default callback
 * function processData(data, callback = NOOP) {
 *   // Process data...
 *   callback(); // Safe to call even if no callback provided
 * }
 *
 * @example
 * // Using in animation options
 * const animationOptions = {
 *   duration: 1000,
 *   onProcess: NOOP, // Default no-op if no process handler needed
 *   onFinish: () => console.log('Done')
 * };
 *
 * @since 1.0.0
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const NOOP = () => '';

/**
 * @function each
 * @description Iterates through an array and executes a callback function for each element. The callback receives both the element value and its index as parameters.
 * @param {T[]} arr - The array to traverse
 * @param {Function} fn - The callback function to execute for each element. Receives (element, index) as parameters
 * @returns {T[]} The original array (for method chaining)
 * @example
 * // Basic iteration with logging
 * const numbers = [1, 2, 3, 4, 5];
 * each(numbers, (value, index) => {
 *   console.log(`Index ${index}: ${value}`);
 * });
 * // Output:
 * // Index 0: 1
 * // Index 1: 2
 * // Index 2: 3
 * // Index 3: 4
 * // Index 4: 5
 *
 * @example
 * // Drawing multiple canvas elements
 * const points = [
 *   { x: 10, y: 10 },
 *   { x: 50, y: 30 },
 *   { x: 90, y: 20 }
 * ];
 *
 * each(points, (point, index) => {
 *   ctx.fillStyle = `hsl(${index * 60}, 70%, 50%)`;
 *   ctx.fillRect(point.x, point.y, 10, 10);
 * });
 *
 * @example
 * // Method chaining
 * const result = each([1, 2, 3], (val) => console.log(val * 2))
 *   .map(x => x * 3); // Can chain other array methods
 *
 * @since 1.0.0
 */
export function each<T>(arr: T[], fn: (...args: any[]) => void): T[] {
  for (let i = 0, len = arr.length; i < len; i++) {
    fn(arr[i], i);
  }
  return arr;
}

/**
 * @function cloneObjDeep
 * @description 简单的深拷贝（没考虑特殊类型和循环依赖）。Performs a deep merge of two objects, copying properties from the source object to the target object. Existing properties in the target object take precedence over source properties. Nested objects are recursively merged.
 * @param {SimpleObj} fromObj - 源对象。The source object to copy properties from
 * @param {SimpleObj} toObj - 拷贝覆盖的对象。The target object to copy properties to (modified in place)
 * @returns {Record<any, any>} The modified target object with merged properties
 * @example
 * // Basic object merging
 * const defaults = {
 *   width: 400,
 *   height: 300,
 *   style: {
 *     color: '#000000',
 *     lineWidth: 1
 *   }
 * };
 *
 * const userOptions = {
 *   width: 800,
 *   style: {
 *     color: '#ff0000'
 *   }
 * };
 *
 * const config = cloneObjDeep(defaults, userOptions);
 * // Result: {
 * //   width: 800,           // User value takes precedence
 * //   height: 300,          // Default value used
 * //   style: {
 * //     color: '#ff0000',   // User value takes precedence
 * //     lineWidth: 1        // Default value used
 * //   }
 * // }
 *
 * @example
 * // Canvas configuration merging
 * const defaultCanvasConfig = {
 *   dimensions: { width: 500, height: 400 },
 *   rendering: { antialias: true, alpha: false },
 *   animation: { duration: 1000, easing: 'ease-in-out' }
 * };
 *
 * const customConfig = {
 *   dimensions: { width: 800 },
 *   animation: { duration: 2000 }
 * };
 *
 * const finalConfig = cloneObjDeep(defaultCanvasConfig, customConfig);
 * // Preserves all default values while applying custom overrides
 *
 * @since 1.0.0
 */
export function cloneObjDeep(fromObj: SimpleObj, toObj: SimpleObj): Record<any, any> {
  if (!isObject(fromObj) || !isObject(toObj)) {
    return {};
  }

  for (const i in fromObj) {
    if (isObject(toObj[i]) && !isEmptyObj(toObj[i] as SimpleObj)) {
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
 * @description 简单的数组深拷贝（没考虑特殊类型和循环依赖）。Copies all elements from a source array to a target array, replacing the target array's contents. The target array is modified in place and returned.
 * @param {T[]} fromArr - 源数组。The source array to copy elements from
 * @param {T[]} toArr - 拷贝覆盖的数组。The target array to copy elements to (modified in place)
 * @returns {T[]} The modified target array containing all elements from the source array
 * @example
 * // Basic array copying
 * const sourceData = [1, 2, 3, 4, 5];
 * const targetArray = [99]; // Will be overwritten
 *
 * const result = cloneArray(sourceData, targetArray);
 * console.log(result); // [1, 2, 3, 4, 5]
 * console.log(targetArray === result); // true (same reference)
 *
 * @example
 * // Copying canvas drawing commands
 * const defaultCommands = ['beginPath', 'moveTo', 'lineTo', 'stroke'];
 * const currentCommands = [];
 *
 * cloneArray(defaultCommands, currentCommands);
 * // currentCommands now contains all default commands
 *
 * @example
 * // Updating animation keyframes
 * const newKeyframes = [
 *   { time: 0, value: 0 },
 *   { time: 0.5, value: 50 },
 *   { time: 1, value: 100 }
 * ];
 *
 * let animationFrames = [{ time: 0, value: 10 }];
 * cloneArray(newKeyframes, animationFrames);
 * // animationFrames now contains the new keyframe data
 *
 * @since 1.0.0
 */
export const cloneArray = <T>(fromArr: T[], toArr: T[]): T[] => {
  each(fromArr, (item, index: number) => {
    toArr[index] = item;
  });

  return toArr;
};

/**
 * @function throwError
 * @description Throws a standardized error with formatted message including error information, component part, and additional details. This function never returns as it always throws an exception.
 * @param {unknown} info -错误信息。 The main error information or message
 * @param {string} [part=''] - 错误单元。The component or module part where the error occurred
 * @param {string} [detail=''] - 错误单元细节。Additional error details or context
 * @returns {never} This function never returns as it always throws an Error
 * @throws {Error} Always throws an Error with formatted message
 * @example
 * // Basic error throwing
 * function validateCanvasSize(width, height) {
 *   if (width <= 0 || height <= 0) {
 *     throwError('Invalid canvas dimensions', 'validateCanvasSize', `width: ${width}, height: ${height}`);
 *   }
 * }
 *
 * @example
 * // Canvas context validation
 * function initializeCanvas(canvas) {
 *   const ctx = canvas.getContext('2d');
 *   if (!ctx) {
 *     throwError('Failed to get 2D context', 'initializeCanvas', 'Canvas may not support 2D rendering');
 *   }
 *   return ctx;
 * }
 *
 * @example
 * // Animation parameter validation
 * function startAnimation(options) {
 *   if (!options.duration || options.duration <= 0) {
 *     throwError(
 *       'Invalid animation duration',
 *       'startAnimation',
 *       `Expected positive number, got: ${options.duration}`
 *     );
 *   }
 * }
 *
 * @since 1.0.0
 */
export function throwError(info: unknown, part = '', detail = ''): never {
  throw new Error(`Error!${info}.(${part} ${detail})`);
}
