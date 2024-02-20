/**
 * @util Vector
 * @description curve functions.
 * @author Wayne
 * @Date 2022-06-06 10:06:08
 * @LastEditTime 2024-02-18 13:24:52
 */

import { PointPosition } from '../types';

/**
 * @class Vector
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
 * @description get points to draw curve line
 * @param {Array} paths origin path points
 * @return {Array}
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
