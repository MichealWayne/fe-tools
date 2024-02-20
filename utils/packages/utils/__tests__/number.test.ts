/**
 * @author Wayne
 * @Date 2023-02-15 14:14:38
 * @LastEditTime 2024-02-20 11:26:07
 */
import {
  isValidNumber,
  isApproximatelyEqual,
  randomIntegerInRange,
  randomNumberInRange,
} from '../src/number';

describe('number test', () => {
  it('isValidNumber()', async () => {
    expect(isValidNumber(1)).toBe(true);
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);
  });

  it('isApproximatelyEqual()', async () => {
    expect(isApproximatelyEqual(+0, -0)).toBe(true);
    expect(isApproximatelyEqual(0.1 + 0.2, 0.3)).toBe(true);
    expect(isApproximatelyEqual(0.1 + 0.201, 0.3, 0.01)).toBe(true);
    expect(isApproximatelyEqual(0.1 + 0.201, 0.3)).toBe(false);
  });

  it('randomIntegerInRange()', async () => {
    expect(randomIntegerInRange(1, 5) < 5.1).toBe(true);

    const randomNum1 = randomIntegerInRange(1, 8);
    expect(parseInt(String(randomNum1)) === randomNum1).toBe(true);
  });

  it('randomNumberInRange()', async () => {
    expect(randomNumberInRange(1, 5) < 5).toBe(true);
  });
});
