/**
 * @author Wayne
 * @Date 2023-02-15 14:14:38
 * @LastEditTime 2024-03-26 09:50:32
 */
import {
  isInt,
  isOdd,
  isFloat,
  average,
  isValidNumber,
  sum,
  clamp,
  round,
  randomIntArrayInRange,
  isApproximatelyEqual,
  randomIntegerInRange,
  randomNumberInRange,
} from '../src/number';

describe('number test', () => {
  it('randomIntArrayInRange', async () => {
    const res = randomIntArrayInRange(1, 10, 2);
    expect(res[0] < 10).toBe(true);
    expect(res[1] >= 1).toBe(true);
  });

  it('should return true when given an integer', () => {
    expect(isInt(42)).toBe(true);
  });
  it('should return false when given a non-integer number', () => {
    expect(isInt(3.14)).toBe(false);
  });

  it('isOdd()', () => {
    expect(isOdd(2)).toBe(true);
    expect(isOdd(0)).toBe(true);
    expect(isOdd(1)).toBe(false);
    expect(isOdd(-2)).toBe(true);
  });

  it('should return true when given a float number', () => {
    const result = isFloat(3.14);
    expect(result).toEqual(true);
  });

  it('should return false when given an integer number', () => {
    const result = isFloat(5);
    expect(result).toEqual(false);
  });

  it('should return false when given a string', () => {
    const result = isFloat('hello');
    expect(result).toEqual(false);
  });

  it('should return false when given null', () => {
    const result = isFloat(null);
    expect(result).toEqual(false);
  });

  it('should calculate the average of an array of numbers', () => {
    const result = average(1, 2, 3);
    expect(result).toEqual(2);
  });
  it('should handle negative numbers in the input array', () => {
    const result = average(-1, -2, -3);
    expect(result).toEqual(-2);
  });

  it('should return the sum of all numbers in an array', () => {
    const result = sum(1, 2, 3);
    expect(result).toEqual(6);
  });

  it('should return 0 if no arguments are passed', () => {
    const result = sum();
    expect(result).toEqual(0);
  });

  it('should handle negative numbers correctly', () => {
    const result = sum(-1, -2, -3);
    expect(result).toEqual(-6);
  });

  it('should return the input number when it is between the minimum and maximum values', () => {
    const result = clamp(5, 0, 10);
    expect(result).toEqual(5);
  });
  it('should return the minimum value when the input number is less than the minimum value', () => {
    const result = clamp(-3, 0, 10);
    expect(result).toEqual(0);
  });

  it('should round a positive number with default decimal places to an integer', () => {
    expect(round(3.14)).toEqual(3);
  });

  it('should round a negative number with default decimal places to an integer', () => {
    expect(round(-5.67)).toEqual(-6);
  });

  it('should round a positive number with specified decimal places', () => {
    expect(round(2.5689, 2)).toEqual(2.57);
  });

  it('should round a negative number with specified decimal places', () => {
    expect(round(-4.321, 1)).toEqual(-4.3);
  });

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
