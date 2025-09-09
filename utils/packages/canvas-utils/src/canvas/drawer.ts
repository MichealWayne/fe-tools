/**
 * @fileoverview Canvas drawing utilities for creating lines, shapes, text, and managing high-DPI displays.
 *
 * This module provides a collection of drawing functions that work with the HTML5 Canvas 2D rendering context.
 * All drawing functions follow a consistent pattern where the first parameter is always the canvas context (ctx),
 * enabling easy integration with context processing classes and method chaining.
 *
 * Key features:
 * - Line drawing (solid and dashed)
 * - Point/circle drawing with customizable styling
 * - Rotated text rendering
 * - Circular area clearing
 * - High-DPI (Retina) display support
 *
 * @module Drawer
 * @author Wayne
 * @since 1.0.0
 */

import { PointPosition } from '../types';

/**
 * @function drawLine
 * @description 画直线。Draws a straight line between two points on the canvas. The line uses the current stroke style and line width settings of the canvas context.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas element
 * @param {PointPosition} point1 - 起点。The starting point coordinates with x and y properties
 * @param {PointPosition} point2 - 终点。The ending point coordinates with x and y properties
 * @returns {void} This function does not return a value
 * @example
 * // Basic line drawing
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 * ctx.strokeStyle = '#ff0000';
 * ctx.lineWidth = 2;
 * drawLine(ctx, { x: 10, y: 10 }, { x: 100, y: 100 });
 *
 * @example
 * // Drawing multiple connected lines
 * const points = [
 *   { x: 0, y: 50 },
 *   { x: 50, y: 0 },
 *   { x: 100, y: 50 }
 * ];
 * ctx.strokeStyle = '#0066cc';
 * for (let i = 0; i < points.length - 1; i++) {
 *   drawLine(ctx, points[i], points[i + 1]);
 * }
 *
 * @since 1.0.0
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  { x: x1, y: y1 }: PointPosition,
  { x: x2, y: y2 }: PointPosition
): void {
  ctx.beginPath();

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.closePath();
  ctx.stroke();
}

/**
 * @function _getBeveling
 * @description 求斜边长度，勾股定理。drawDashLine方法有用到。Calculates the hypotenuse length using the Pythagorean theorem (√(x² + y²)). This is a private utility function used internally by drawDashLine to determine the total distance between two points.
 * @param {number} x - The horizontal distance (width) between two points
 * @param {number} y - The vertical distance (height) between two points
 * @returns {number} 斜边长度。The hypotenuse length (straight-line distance between the points)
 * @private
 * @example
 * // Calculate distance for a 3-4-5 right triangle
 * const distance = _getBeveling(3, 4); // Returns 5
 *
 * @example
 * // Calculate diagonal distance of a square
 * const diagonal = _getBeveling(10, 10); // Returns ~14.14
 *
 * @since 1.0.0
 */
function _getBeveling(x: number, y: number): number {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * @function drawDashLine
 * @description 画虚线，可控制虚线宽度。Draws a dashed line between two points with customizable dash segment length. The function creates alternating line segments and gaps to simulate a dashed line effect.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas element
 * @param {PointPosition} point1 - 起点。The starting point coordinates with x and y properties
 * @param {PointPosition} point2 - 终点。The ending point coordinates with x and y properties
 * @param {number} [dashLen=5] - 虚线宽度。The length of each dash segment in pixels
 * @returns {void} This function does not return a value
 * @example
 * // Basic dashed line with default dash length
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 * ctx.strokeStyle = '#333333';
 * drawDashLine(ctx, { x: 0, y: 50 }, { x: 200, y: 50 });
 *
 * @example
 * // Custom dash length for different visual effects
 * ctx.strokeStyle = '#ff6600';
 * drawDashLine(ctx, { x: 10, y: 10 }, { x: 150, y: 100 }, 10); // Longer dashes
 *
 * ctx.strokeStyle = '#0066ff';
 * drawDashLine(ctx, { x: 10, y: 120 }, { x: 150, y: 200 }, 2); // Shorter dashes
 *
 * @since 1.0.0
 * @see {@link drawLine} - For solid line drawing
 */
export function drawDashLine(
  ctx: CanvasRenderingContext2D,
  { x: x1, y: y1 }: PointPosition,
  { x: x2, y: y2 }: PointPosition,
  dashLen = 5
): void {
  const beveling = _getBeveling(x2 - x1, y2 - y1); // 斜边的总长度
  const num = ~~(beveling / dashLen); // 计算有多少个线段

  ctx.beginPath();
  for (let i = 0; i < num; i++) {
    ctx[i & 1 ? 'lineTo' : 'moveTo'](x1 + ((x2 - x1) / num) * i, y1 + ((y2 - y1) / num) * i);
  }
  ctx.closePath();
  ctx.stroke();
}

/**
 * @function drawPoint
 * @description 画圆点。Draws a circular point (dot) with customizable fill color, stroke color, radius, and stroke width. Useful for creating data points, markers, or decorative elements.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas element
 * @param {PointPosition} centerPoint - The center coordinates of the circle with x and y properties
 * @param {string} color - The fill color of the circle (CSS color format: hex, rgb, rgba, named colors)
 * @param {string} [strokeColor='#fff'] - The stroke (border) color of the circle
 * @param {number} [width=0] - The radius of the circle in pixels
 * @param {number} [strokeWidth=1] - The width of the stroke (border) in pixels. Set to 0 to disable stroke
 * @returns {void} This function does not return a value
 * @example
 * // Basic filled circle without stroke
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 * drawPoint(ctx, { x: 50, y: 50 }, '#ff0000', '#ffffff', 10, 0);
 *
 * @example
 * // Circle with both fill and stroke
 * drawPoint(ctx, { x: 100, y: 100 }, '#0066cc', '#ffffff', 15, 2);
 *
 * @example
 * // Creating data points for a scatter plot
 * const dataPoints = [
 *   { x: 20, y: 30 },
 *   { x: 40, y: 60 },
 *   { x: 80, y: 45 }
 * ];
 * dataPoints.forEach(point => {
 *   drawPoint(ctx, point, '#ff6600', '#333333', 8, 1);
 * });
 *
 * @since 1.0.0
 */
export function drawPoint(
  ctx: CanvasRenderingContext2D,
  centerPoint: PointPosition,
  color: string,
  strokeColor = '#fff',
  width = 0,
  strokeWidth = 1
): void {
  const { x, y } = centerPoint;
  ctx.beginPath();

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.arc(x, y, width, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeWidth) {
    ctx.stroke();
  }
}

/**
 * @function drawRotateText
 * @description 绘制旋转文字。Draws rotated text at a specified point with a given rotation angle. The function uses canvas transformation to rotate the text around the specified rotation point, then restores the original canvas state.
 * @param {CanvasRenderingContext2D} ctx - 画布。The 2D rendering context of the canvas element
 * @param {PointPosition} rotatePoint - 切换中心点的坐标。The center point for rotation with x and y coordinates
 * @param {number} degree - 旋转角度。The rotation angle in degrees (positive values rotate clockwise)
 * @param {string | number} text - 文字内容。The text content to be drawn (numbers will be converted to strings)
 * @returns {void} This function does not return a value
 * @example
 * // Basic rotated text
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 * ctx.font = '16px Arial';
 * ctx.fillStyle = '#333333';
 * drawRotateText(ctx, { x: 100, y: 100 }, 45, 'Rotated Text');
 *
 * @example
 * // Creating rotated labels for chart axes
 * const labels = ['Jan', 'Feb', 'Mar', 'Apr'];
 * labels.forEach((label, index) => {
 *   const x = 50 + index * 40;
 *   const y = 200;
 *   drawRotateText(ctx, { x, y }, -45, label);
 * });
 *
 * @example
 * // Rotating numeric values
 * ctx.font = '14px monospace';
 * ctx.fillStyle = '#0066cc';
 * drawRotateText(ctx, { x: 150, y: 150 }, 90, 42.5);
 *
 * @since 1.0.0
 */
export function drawRotateText(
  ctx: CanvasRenderingContext2D,
  rotatePoint: PointPosition,
  degree: number,
  text: string | number
) {
  ctx.save();

  ctx.translate(rotatePoint.x, rotatePoint.y);
  ctx.rotate((degree * Math.PI) / 180);
  ctx.fillText(String(text), 0, 0);

  ctx.restore();
}

/**
 * @function clearArc
 * @description 实现圆形清除。Clears a circular area on the canvas by progressively clearing rectangular sections that approximate a circle. This creates a circular "eraser" effect by removing all drawn content within the specified circular area.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas element
 * @param {PointPosition} point - The center point of the circular area to clear with x and y coordinates
 * @param {number} width - The radius of the circular area to clear in pixels
 * @returns {void} This function does not return a value
 * @example
 * // Clear a circular area to create a "hole" effect
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 *
 * // First draw something
 * ctx.fillStyle = '#ff6600';
 * ctx.fillRect(0, 0, 200, 200);
 *
 * // Then clear a circular area
 * clearArc(ctx, { x: 100, y: 100 }, 50);
 *
 * @example
 * // Creating multiple circular cutouts
 * ctx.fillStyle = '#0066cc';
 * ctx.fillRect(0, 0, 300, 200);
 *
 * const holes = [
 *   { x: 75, y: 100, radius: 30 },
 *   { x: 150, y: 100, radius: 25 },
 *   { x: 225, y: 100, radius: 35 }
 * ];
 *
 * holes.forEach(hole => {
 *   clearArc(ctx, { x: hole.x, y: hole.y }, hole.radius);
 * });
 *
 * @since 1.0.0
 */
export function clearArc(ctx: CanvasRenderingContext2D, point: PointPosition, width: number): void {
  const ox = point.x;
  const oy = point.y;

  let step = 0.1;
  function _clearArc(x: number, y: number, radius: number) {
    const calcWidth = radius - step;
    const calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);

    const posX = x - calcWidth;
    const posY = y - calcHeight;

    const widthX = 2 * calcWidth;
    const heightY = 2 * calcHeight;

    if (step <= radius) {
      ctx.clearRect(posX, posY, widthX, heightY);
      step += 0.1;
      _clearArc(x, y, radius);
    }
  }

  _clearArc(ox, oy, width);
}

/**
 * @function retinaScale
 * @description Canvas元素适配移动端机型，for web。Adapts canvas elements for high-DPI (Retina) displays by scaling the canvas resolution while maintaining the display size. This ensures crisp rendering on devices with pixel ratios greater than 1.
 * @param {HTMLCanvasElement} canvas - The HTML canvas element to scale
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas element
 * @returns {number} The device pixel ratio that was applied (1 for standard displays, >1 for high-DPI displays)
 * @example
 * // Basic retina scaling setup
 * const canvas = document.getElementById('myCanvas');
 * const ctx = canvas.getContext('2d');
 *
 * // Set initial canvas size
 * canvas.width = 400;
 * canvas.height = 300;
 *
 * // Apply retina scaling
 * const pixelRatio = retinaScale(canvas, ctx);
 * console.log(`Applied pixel ratio: ${pixelRatio}`);
 *
 * @example
 * // Complete setup for high-DPI canvas
 * function setupCanvas(canvasId) {
 *   const canvas = document.getElementById(canvasId);
 *   const ctx = canvas.getContext('2d');
 *
 *   // Set desired display size
 *   canvas.width = 500;
 *   canvas.height = 400;
 *
 *   // Apply retina scaling
 *   const ratio = retinaScale(canvas, ctx);
 *
 *   // Now draw with normal coordinates
 *   ctx.fillStyle = '#0066cc';
 *   ctx.fillRect(10, 10, 100, 100); // Will be crisp on all displays
 *
 *   return { canvas, ctx, ratio };
 * }
 *
 * @since 1.0.0
 */
export function retinaScale(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): number {
  const pixelRatio = window.devicePixelRatio || 1;

  if (pixelRatio === 1) {
    return pixelRatio;
  }
  const { width, height } = canvas;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  return pixelRatio;
}
