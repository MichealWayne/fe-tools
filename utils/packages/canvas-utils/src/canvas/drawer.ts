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
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} point1 起点
 * @param {PointPosition} point2 终点
 * @example
 *  drawLine(ctx, { x: 10, y: 10 }, { x: 100, y: 100 });
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
 * @description 求斜边长度，勾股定理。drawDashLine方法有用到
 * @param {number} x x's width
 * @param {number} y y's width
 * @return {number} 斜边长度
 * @private
 * @example
 * _getBeveling(3, 4); // -> 5
 */
function _getBeveling(x: number, y: number): number {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * @function drawDashLine
 * @description 画虚线，可控制虚线宽度
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @param {PointPosition} point1 起点
 * @param {PointPosition} point2 终点
 * @param {number} dashLen dash line width
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
 * @description 画圆点
 * @param {CanvasRenderingContext2D} ctx canvas context
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
 * @description 绘制旋转文字
 * @param {CanvasRenderingContext2D} ctx 画布
 * @param {Number} x 切换中心点的x坐标
 * @param {Number} y 切换中心点的y坐标
 * @param {Number} degree 旋转角度
 * @param {Number|String} text 文字内容
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
 * @description 实现圆形清除
 * @param {CanvasRenderingContext2D} ctx canvas context
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
 * @description Canvas元素适配移动端机型，for web
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx canvas context
 * @return {Number} retina pixel ratio
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
