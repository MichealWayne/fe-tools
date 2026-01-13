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
 * @function getCurvePoints
 * @description 生成用于创建平滑曲线的控制点。Generates control points for creating smooth curves through a series of path points. Uses vector mathematics to calculate intermediate control points that create natural-looking curved lines when used with canvas quadratic or bezier curve functions.
 * @param {PointPosition[]} paths - 用于创建曲线的路径点数组（至少需要3个点）。Array of path points to create curves through (minimum 3 points required)
 * @returns {PointPosition[]} 用于平滑曲线生成的控制点坐标数组。Array of control point positions for smooth curve generation
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
export declare function getCurvePoints(paths: PointPosition[]): PointPosition[];
