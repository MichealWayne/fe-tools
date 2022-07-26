/**
 * @module Drawer
 * @description canvas draw functions
 * @notice 注意draw方法要保持第一个传参为ctx（canvas context），以提供给Context处理类进行函数调用
 * @author Wayne
 * @createTime 2019-07-15
 * @lastModified 2019-09-16
 */

import { PointPosition } from '../types';

/**
 * @function drawLine
 * @description 画直线
 * @param {canvas object} ctx canvas context
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  point1: PointPosition,
  point2: PointPosition
): void {
  const x1 = point1.x;
  const y1 = point1.y;
  const x2 = point2.x;
  const y2 = point2.y;

  ctx.beginPath();

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);

  ctx.closePath();
  ctx.stroke();
}

/**
 * @function _getBeveling
 * @description 求斜边长度，drawDashLine方法有用到
 * @param {number} x x's width
 * @param {number} y y's width
 * @return {number}
 * @private
 */
function _getBeveling(x: number, y: number) {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * @function drawDashLine
 * @description 画虚线
 * @param {canvas object} ctx canvas context
 * @param {PointPosition} point1
 * @param {PointPosition} point2
 * @param {number} dashLen dash line width
 */
export function drawDashLine(
  ctx: CanvasRenderingContext2D,
  point1: PointPosition,
  point2: PointPosition,
  dashLen = 5
): void {
  const x1 = point1.x;
  const y1 = point1.y;
  const x2 = point2.x;
  const y2 = point2.y;

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
 * @description 画圆点
 * @param {canvas object} ctx canvas context
 * @param {PointPosition} centerPoint
 * @param {string} color fill color
 * @param {string} strokeColor circle side color
 * @param {number} width radius
 * @param {number} strokeWidth circle side width
 */
export function drawPoint(
  ctx: CanvasRenderingContext2D,
  centerPoint: PointPosition,
  color: string,
  strokeColor: string,
  width: number,
  strokeWidth: number
): void {
  const { x, y } = centerPoint;
  ctx.beginPath();

  ctx.strokeStyle = strokeColor || '#fff';
  ctx.lineWidth = strokeWidth !== undefined ? strokeWidth : 1;
  ctx.arc(x, y, width, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  if (strokeWidth) {
    ctx.stroke();
  }
}

/**
 * @function clearArc
 * @description 实现圆形清除
 * @param {canvas object} ctx canvas context
 * @param {PointPosition} point
 * @param {number} width radius
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
 * @description 适配移动端机型，for web
 * @param {canvas object} canvas
 * @param {object|null} ctx canvas context
 * @return {number} retina pixel ratio
 */
export function retinaScale(canvas: any, ctx: CanvasRenderingContext2D): number {
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
