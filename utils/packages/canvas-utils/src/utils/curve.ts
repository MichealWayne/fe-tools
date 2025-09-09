/**
 * @fileoverview Vector mathematics and curve generation utilities for smooth line drawing in canvas applications.
 *
 * This module provides vector operations and curve generation functions for creating smooth,
 * curved lines from a series of points. It includes a Vector class for 2D vector mathematics
 * and functions for generating control points for smooth curve interpolation.
 *
 * @module Curve
 * @author Wayne
 * @since 1.0.0
 */

import { PointPosition } from '../types';

/**
 * @description A 2D vector class providing essential vector operations for curve calculations and geometric computations. Supports vector arithmetic, normalization, and angle calculations.
 * @class Vector
 * @example
 * // Basic vector creation and operations
 * const v1 = new Vector(3, 4);
 * const v2 = new Vector(1, 2);
 *
 * console.log(v1.length()); // 5 (magnitude)
 * const normalized = v1.normalize(); // Unit vector
 * const sum = v1.add(v2); // Vector addition
 * const scaled = v1.multiply(2); // Scalar multiplication
 *
 * @example
 * // Vector angle calculation
 * const v1 = new Vector(1, 0); // Points right
 * const v2 = new Vector(0, 1); // Points up
 * const angle = v1.angle(v2); // 90 degrees
 *
 * @since 1.0.0
 */
class Vector {
  x = 0;
  y = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  length = () => Math.sqrt(this.x * this.x + this.y * this.y);
  normalize = () => {
    const inv = 1 / this.length();
    return new Vector(this.x * inv, this.y * inv);
  };
  add = (v: PointPosition) => new Vector(this.x + v.x, this.y + v.y);
  multiply = (f: number) => new Vector(this.x * f, this.y * f);
  dot = (v: Vector) => this.x * v.x + this.y * v.y;
  angle = (v: Vector) => (Math.acos(this.dot(v) / (this.length() * v.length())) * 180) / Math.PI;
}

/**
 * @function getCurvePoints
 * @description 生成用于创建平滑曲线的控制点。Generates control points for creating smooth curves through a series of path points. Uses vector mathematics to calculate intermediate control points that create natural-looking curved lines when used with canvas quadratic or bezier curve functions.
 * @param {PointPosition[]} paths - 用于创建曲线的路径点数组（至少需要3个点）。Array of path points to create curves through (minimum 3 points required)
 * @returns {Vector[]} 用于平滑曲线生成的控制点向量数组。Array of control point vectors for smooth curve generation
 * @example
 * // Basic curve generation
 * const pathPoints = [
 *   { x: 10, y: 100 },
 *   { x: 50, y: 50 },
 *   { x: 100, y: 80 },
 *   { x: 150, y: 30 },
 *   { x: 200, y: 90 }
 * ];
 *
 * const controlPoints = getCurvePoints(pathPoints);
 *
 * // Draw smooth curve using control points
 * ctx.beginPath();
 * ctx.moveTo(pathPoints[0].x, pathPoints[0].y);
 *
 * for (let i = 0; i < controlPoints.length; i += 2) {
 *   const cp1 = controlPoints[i];
 *   const cp2 = controlPoints[i + 1];
 *   const endPoint = pathPoints[Math.floor(i / 2) + 2];
 *
 *   ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPoint.x, endPoint.y);
 * }
 *
 * ctx.stroke();
 *
 * @example
 * // Smooth line chart
 * function drawSmoothChart(ctx, dataPoints) {
 *   if (dataPoints.length < 3) {
 *     // Fall back to straight lines for insufficient points
 *     ctx.beginPath();
 *     ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
 *     dataPoints.slice(1).forEach(point => {
 *       ctx.lineTo(point.x, point.y);
 *     });
 *     ctx.stroke();
 *     return;
 *   }
 *
 *   const controlPoints = getCurvePoints(dataPoints);
 *
 *   ctx.beginPath();
 *   ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
 *
 *   // Create smooth curves between all points
 *   for (let i = 0; i < controlPoints.length; i += 2) {
 *     const cp1 = controlPoints[i];
 *     const cp2 = controlPoints[i + 1];
 *     const endPoint = dataPoints[Math.floor(i / 2) + 2];
 *
 *     ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, endPoint.x, endPoint.y);
 *   }
 *
 *   ctx.stroke();
 * }
 *
 * @example
 * // Interactive drawing with smooth curves
 * let drawingPoints = [];
 *
 * canvas.addEventListener('mousemove', (e) => {
 *   if (isDrawing) {
 *     drawingPoints.push({ x: e.offsetX, y: e.offsetY });
 *
 *     if (drawingPoints.length >= 3) {
 *       ctx.clearRect(0, 0, canvas.width, canvas.height);
 *
 *       const controlPoints = getCurvePoints(drawingPoints);
 *       // Redraw smooth curve with all points
 *       drawSmoothChart(ctx, drawingPoints);
 *     }
 *   }
 * });
 *
 * @since 1.0.0
 * @see {@link Vector} - The Vector class used for control point calculations
 */
export function getCurvePoints(paths: PointPosition[]): Vector[] {
  const rt = 0.3;
  const count = paths.length - 2;
  const arr = [];
  for (let i = 0; i < count; i++) {
    const pointStart = paths[i];
    const pointMiddle = paths[i + 1];
    const pointEnd = paths[i + 2];

    const v1 = new Vector(pointStart.x - pointMiddle.x, pointStart.y - pointMiddle.y);
    const v2 = new Vector(pointEnd.x - pointMiddle.x, pointEnd.y - pointMiddle.y);
    const v1Len = v1.length();
    const v2Len = v2.length();

    const centerV = v1.normalize().add(v2.normalize()).normalize();
    const ncp1 = new Vector(centerV.y, centerV.x * -1);
    const ncp2 = new Vector(centerV.y * -1, centerV.x);

    if (ncp1.angle(v1) < 90) {
      const p1 = ncp1.multiply(v1Len * rt).add(pointMiddle);
      const p2 = ncp2.multiply(v2Len * rt).add(pointMiddle);
      arr.push(p1, p2);
    } else {
      const p1 = ncp1.multiply(v2Len * rt).add(pointMiddle);
      const p2 = ncp2.multiply(v1Len * rt).add(pointMiddle);
      arr.push(p2, p1);
    }
  }

  return arr;
}
