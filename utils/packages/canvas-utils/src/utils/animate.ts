/**
 * @fileoverview Animation utilities for smooth canvas animations with easing functions and cross-platform compatibility.
 *
 * This module provides animation functionality that works across different environments including browsers,
 * Node.js, and environments with limited requestAnimationFrame support. It includes built-in easing functions
 * and handles animation timing with fallbacks for older or restricted environments.
 *
 * @module Animate
 * @author Wayne
 * @since 1.0.0
 */

import { DEFAULT_ANIMATION_TIME } from '../constants';
import { NOOP } from './base';

/**
 * @function timingFunction
 * @description Built-in easeInOut timing function that provides smooth acceleration and deceleration for animations. The function creates a cubic easing curve that starts slowly, accelerates in the middle, and decelerates at the end.
 * @param {number} pos - The animation progress position (0 to 1, where 0 is start and 1 is end)
 * @returns {number} The eased position value (0 to 1) with smooth acceleration/deceleration applied
 * @example
 * // Manual easing calculation
 * const startPos = timingFunction(0);    // Returns 0 (start)
 * const midPos = timingFunction(0.5);    // Returns ~0.5 (middle, but eased)
 * const endPos = timingFunction(1);      // Returns 1 (end)
 *
 * @example
 * // Using in custom animation loop
 * function customAnimate(duration, callback) {
 *   const startTime = Date.now();
 *
 *   function step() {
 *     const elapsed = Date.now() - startTime;
 *     const progress = Math.min(elapsed / duration, 1);
 *     const easedProgress = timingFunction(progress);
 *
 *     callback(easedProgress);
 *
 *     if (progress < 1) {
 *       requestAnimationFrame(step);
 *     }
 *   }
 *
 *   step();
 * }
 *
 * @since 1.0.0
 */
const timingFunction = (pos: number) => {
  const THRESHOLD_VAL = 0.5;
  const IS_LT_HALF = (pos /= THRESHOLD_VAL) < 1;
  if (IS_LT_HALF) {
    return THRESHOLD_VAL * Math.pow(pos, 3);
  }

  return THRESHOLD_VAL * (Math.pow(pos - 2, 3) + 2);
};

/**
 * @description Creates a cross-platform animation frame function that provides consistent animation timing across different environments. Falls back to setTimeout when requestAnimationFrame is not available.
 * @returns {Function} Animation frame function that accepts a callback and optional delay
 * @private
 * @compatibility
 * - Mobile: iOS 6.1+, Android 4.4.3+
 * - Desktop: IE10+, Chrome 22+, Firefox 23+, Safari 6.1+
 * - Node.js: Uses setTimeout fallback
 * @see {@link https://caniuse.com/requestanimationframe} Browser compatibility reference
 */
let createAnimationFrame = function () {
  // normal webview
  if (typeof requestAnimationFrame !== 'undefined') {
    createAnimationFrame = function () {
      return requestAnimationFrame;
    };
    return requestAnimationFrame;
  }

  // abnormal webview or nodejs
  return function (step: (num: number) => void, delay: number) {
    setTimeout(function () {
      step(+new Date());
    }, delay);
  };
};

interface AnimationOptions {
  // 动画时间
  duration: number;

  // 进行中回调，process范围0～1（含）
  onProcess?: (process: number) => void;

  // 动画结束回调
  onAnimationFinish?: () => void;
}

/**
 * @function animation
 * @description Creates and runs a smooth animation with customizable duration, progress callbacks, and completion handlers. Uses requestAnimationFrame for optimal performance and includes built-in easing for natural motion.
 * @param {AnimationOptions} opts - 参数。Animation configuration options
 * @param {number} opts.duration - 动画时间。Animation duration in milliseconds
 * @param {Function} [opts.onProcess] - 动画执行回调。Callback function called during animation with progress value (0-1)
 * @param {Function} [opts.onAnimationFinish] - 动画完成回调。Callback function called when animation completes
 * @returns {void} This function does not return a value
 * @example
 * // Basic fade-in animation
 * const element = document.getElementById('myElement');
 *
 * animate({
 *   duration: 1000,
 *   onProcess: (progress) => {
 *     element.style.opacity = progress;
 *   },
 *   onAnimationFinish: () => {
 *     console.log('Fade-in complete!');
 *   }
 * });
 *
 * @example
 * // Canvas object movement animation
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 * let objectX = 0;
 * const targetX = 200;
 *
 * animate({
 *   duration: 2000,
 *   onProcess: (progress) => {
 *     // Clear and redraw
 *     ctx.clearRect(0, 0, canvas.width, canvas.height);
 *
 *     // Calculate current position
 *     objectX = targetX * progress;
 *
 *     // Draw object at new position
 *     ctx.fillStyle = '#0066cc';
 *     ctx.fillRect(objectX, 50, 20, 20);
 *   },
 *   onAnimationFinish: () => {
 *     console.log('Object reached target position');
 *   }
 * });
 *
 * @example
 * // Chart data animation
 * const chartData = [10, 25, 40, 30, 50];
 * let animatedData = new Array(chartData.length).fill(0);
 *
 * animate({
 *   duration: 1500,
 *   onProcess: (progress) => {
 *     // Animate each data point
 *     animatedData = chartData.map(value => value * progress);
 *
 *     // Redraw chart with animated values
 *     drawChart(animatedData);
 *   },
 *   onAnimationFinish: () => {
 *     console.log('Chart animation complete');
 *   }
 * });
 *
 * @since 1.0.0
 * @see {@link timingFunction} - The easing function used for smooth animation
 */
export function animate(opts: AnimationOptions): void {
  const DELAY_TIME = 23;
  const duration = opts.duration || DEFAULT_ANIMATION_TIME;
  const onProcess = opts.onProcess || NOOP;
  const onAnimationFinish = opts.onAnimationFinish || NOOP;
  const animationFrame = createAnimationFrame();

  let startTimeStamp: number | null = null;

  function step(timeStamp: number) {
    if (timeStamp === null) {
      // end
      onProcess(1);
      onAnimationFinish();
      return false;
    }

    if (startTimeStamp === null) {
      startTimeStamp = timeStamp;
    }
    if (timeStamp - startTimeStamp < duration) {
      let process = (timeStamp - startTimeStamp) / duration;

      process = timingFunction(process);
      onProcess(process);
      animationFrame(step, DELAY_TIME);
    } else {
      onProcess(1);
      onAnimationFinish();
    }
    return true;
  }

  animationFrame(step, DELAY_TIME);
}
