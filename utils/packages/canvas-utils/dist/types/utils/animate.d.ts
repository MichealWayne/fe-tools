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
interface AnimationOptions {
    duration: number;
    onProcess?: (process: number) => void;
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
export declare function animate(opts: AnimationOptions): void;
export {};
