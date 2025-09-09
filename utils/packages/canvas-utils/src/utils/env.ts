/**
 * @fileoverview Environment detection utilities for cross-platform canvas applications.
 *
 * This module provides runtime environment detection to enable canvas applications
 * to work across different platforms including web browsers, WeChat mini-programs,
 * and Node.js environments. It also includes development mode detection for debugging.
 *
 * @module Env
 * @author Wayne
 * @since 1.0.0
 */

// Type declarations for cross-platform compatibility
declare const global: any;
declare const process: any;
declare const wx: any;

const { NODE_ENV } = (global?.process || {}).env;

/**
 * @const __DEV__
 * @description 基于NODE_ENV环境变量的开发模式标志。Development mode flag based on NODE_ENV environment variable. Can also be set using webpack.DefinePlugin for build-time optimization.
 * @type {boolean}
 * @example
 * // Conditional debugging
 * if (__DEV__) {
 *   console.log('Canvas debug info:', { width: canvas.width, height: canvas.height });
 * }
 *
 * @example
 * // Performance monitoring in development
 * function drawChart(ctx, data) {
 *   const startTime = __DEV__ ? performance.now() : 0;
 *
 *   // Chart drawing logic
 *   drawChartElements(ctx, data);
 *
 *   if (__DEV__) {
 *     const endTime = performance.now();
 *     console.log(`Chart render time: ${endTime - startTime}ms`);
 *   }
 * }
 *
 * @since 1.0.0
 */
export const __DEV__ = NODE_ENV === 'development';

/**
 * @const isWeapp
 * @description 检测代码是否在微信小程序环境中运行。Detects if the code is running in a WeChat mini-program environment by checking for WeChat-specific global objects and APIs.
 * @type {boolean}
 * @example
 * // Platform-specific canvas handling
 * function initializeCanvas(options) {
 *   if (isWeapp) {
 *     // Use WeChat mini-program canvas API
 *     const ctx = wx.createCanvasContext(options.canvasId);
 *     return { ctx, draw: () => ctx.draw() };
 *   } else {
 *     // Use standard web canvas API
 *     const canvas = document.createElement('canvas');
 *     const ctx = canvas.getContext('2d');
 *     return { canvas, ctx };
 *   }
 * }
 *
 * @example
 * // Conditional feature availability
 * function saveChart() {
 *   if (isWeapp) {
 *     // Use WeChat save API
 *     wx.canvasToTempFilePath({
 *       canvasId: 'myCanvas',
 *       success: (res) => console.log('Saved:', res.tempFilePath)
 *     });
 *   } else {
 *     // Use web download API
 *     const link = document.createElement('a');
 *     link.download = 'chart.png';
 *     link.href = canvas.toDataURL();
 *     link.click();
 *   }
 * }
 *
 * @since 1.0.0
 */
export const isWeapp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';

/**
 * @const isWeb
 * @description 检测代码是否在Web浏览器环境中运行（不包括微信小程序）。Detects if the code is running in a web browser environment (excluding WeChat mini-programs).
 * @type {boolean}
 * @example
 * // Web-specific DOM operations
 * function setupCanvasEvents(canvas) {
 *   if (isWeb) {
 *     canvas.addEventListener('click', handleCanvasClick);
 *     canvas.addEventListener('mousemove', handleMouseMove);
 *
 *     // Add touch events for mobile web
 *     canvas.addEventListener('touchstart', handleTouchStart);
 *     canvas.addEventListener('touchmove', handleTouchMove);
 *   }
 * }
 *
 * @example
 * // Responsive canvas sizing
 * function updateCanvasSize(canvas) {
 *   if (isWeb) {
 *     const rect = canvas.getBoundingClientRect();
 *     const dpr = window.devicePixelRatio || 1;
 *
 *     canvas.width = rect.width * dpr;
 *     canvas.height = rect.height * dpr;
 *
 *     const ctx = canvas.getContext('2d');
 *     ctx.scale(dpr, dpr);
 *   }
 * }
 *
 * @since 1.0.0
 */
export const isWeb = typeof window !== 'undefined' && !isWeapp;

/**
 * @const isNode
 * @description 检测代码是否在Node.js环境中运行。Detects if the code is running in a Node.js environment by checking for Node.js-specific process object and version information.
 * @type {boolean}
 * @example
 * // Server-side canvas rendering
 * function generateChartImage(data) {
 *   if (isNode) {
 *     const { createCanvas } = require('canvas');
 *     const fs = require('fs');
 *
 *     const canvas = createCanvas(800, 600);
 *     const ctx = canvas.getContext('2d');
 *
 *     // Draw chart
 *     drawChart(ctx, data);
 *
 *     // Save to file
 *     const buffer = canvas.toBuffer('image/png');
 *     fs.writeFileSync('chart.png', buffer);
 *
 *     return 'chart.png';
 *   }
 * }
 *
 * @example
 * // Environment-specific imports
 * async function loadCanvasLibrary() {
 *   if (isNode) {
 *     // Use node-canvas for server-side rendering
 *     const canvas = await import('canvas');
 *     return canvas;
 *   } else {
 *     // Use native browser canvas
 *     return null; // Browser has built-in canvas support
 *   }
 * }
 *
 * @since 1.0.0
 */
export const isNode =
  typeof process !== 'undefined' && !!(process.versions && process.versions.node);
