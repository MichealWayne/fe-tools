/**
 * @author Wayne
 * @Date 2024-07-23 10:06:50
 * @LastEditTime 2024-07-23 10:07:00
 */
import {
  getListExtremum,
  getAxisLimit,
  getPointsAngle,
  getPointsDistance,
} from '../src/utils/calculate';

describe('getListExtremum', () => {
  it('should return the minimum and maximum values from the array', () => {
    const result = getListExtremum([1, 3, 5, 2, 2, 4, 5, 7]);
    expect(result).toEqual({ min: 1, max: 7 });
  });
});

describe('getAxisLimit', () => {
  it('should return 1 if range is not provided', () => {
    const result = getAxisLimit();
    expect(result).toEqual(1);
  });

  it('should return the ceiling value of range divided by 4 multiplied by 4 if range is greater than 2', () => {
    const result = getAxisLimit(6);
    expect(result).toEqual(8);
  });

  it('should return range multiplied by 1.2 if range is less than or equal to 2', () => {
    const result = getAxisLimit(1.5);
    expect(result).toEqual(1.8);
  });
});

describe('getPointsAngle', () => {
  it('should return the angle between two points', () => {
    const result = getPointsAngle({ x: 0, y: 0 }, { x: 1, y: 1 });
    expect(result).toBeCloseTo(0.7853981633974483);
  });
});

describe('getPointsDistance', () => {
  it('should return the distance between two points', () => {
    const result = getPointsDistance({ x: 0, y: 0 }, { x: 1, y: 1 });
    expect(result).toBeCloseTo(1.4142135623730951);
  });
});
