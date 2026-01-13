/**
 * @author Wayne
 * @Date 2024-07-23 10:06:50
 */
import { getCurvePoints } from '../src/utils/curve';

function isFinitePoint(point: { x: number; y: number }): boolean {
  return Number.isFinite(point.x) && Number.isFinite(point.y);
}

describe('getCurvePoints', () => {
  it('should return point positions with finite values', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 10, y: 10 },
    ];

    const controlPoints = getCurvePoints(points);

    expect(controlPoints.length).toBe(2);
    controlPoints.forEach(point => {
      expect(isFinitePoint(point)).toBe(true);
    });
  });
});
