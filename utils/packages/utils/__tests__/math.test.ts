/**
 * @author Wayne
 * @Date 2024-02-20 11:03:19
 * @LastEditTime 2024-02-18 11:03:28
 */
import { factorial, gcd, isDivisible, lcm } from '../src/math';

describe('factorial', () => {
  it('should calculate factorial correctly', () => {
    expect(factorial(5)).toBe(120);
  });

  it('should throw error if n < 0', () => {
    expect(() => factorial(-1)).toThrow(TypeError);
  });
});

describe('gcd', () => {
  it('should calculate gcd correctly', () => {
    expect(gcd(12, 18)).toBe(6);
  });

  it('should work if y is 0', () => {
    expect(gcd(10, 0)).toBe(10);
  });
});

describe('isDivisible', () => {
  it('should work correctly', () => {
    expect(isDivisible(10, 2)).toBe(true);
    expect(isDivisible(7, 3)).toBe(false);
  });
});

describe('lcm', () => {
  it('should calculate lcm correctly', () => {
    expect(lcm(12, 18)).toBe(36);
  });
});
