/**
 * @author Wayne
 * @Date 2024-02-20 11:03:19
 * @LastEditTime 2024-02-18 11:03:28
 */
import { factorial, gcd, isDivisible, lcm } from '../src/math';

describe('factorial', () => {
  it('should calculate factorial correctly', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(3)).toBe(6);
    expect(factorial(4)).toBe(24);
  });

  it('should return 1 for 0 and 1', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it('should throw error for non-integer input', () => {
    // Per JSDoc: factorial is only defined for integers.
    expect(() => factorial(2.5)).toThrow(TypeError);
    expect(() => factorial(3.14)).toThrow(TypeError);
  });

  it('should throw error if n < 0', () => {
    expect(() => factorial(-1)).toThrow(TypeError);
    expect(() => factorial(-5)).toThrow(TypeError);
    expect(() => factorial(-10)).toThrow('Negative numbers are not allowed!');
  });

  it('should handle large factorials', () => {
    expect(factorial(6)).toBe(720);
    expect(factorial(7)).toBe(5040);
  });
});

describe('gcd', () => {
  it('should calculate gcd correctly', () => {
    expect(gcd(12, 18)).toBe(6);
    expect(gcd(48, 18)).toBe(6);
    expect(gcd(17, 13)).toBe(1); // coprime numbers
  });

  it('should work if y is 0', () => {
    expect(gcd(10, 0)).toBe(10);
    expect(gcd(0, 18)).toBe(18);
    expect(gcd(0, 0)).toBe(0);
  });

  it('should work with negative numbers', () => {
    // GCD is always non-negative; fixed from previously returning a negative value.
    expect(gcd(-12, 18)).toBe(6);
    expect(gcd(12, -18)).toBe(6);
    expect(gcd(-12, -18)).toBe(6);
  });

  it('should handle edge cases', () => {
    expect(gcd(1, 1)).toBe(1);
    expect(gcd(100, 50)).toBe(50);
  });

  it('should throw for non-number inputs (per JSDoc)', () => {
    // @ts-expect-error - intentionally passing non-number
    expect(() => gcd('12', 18)).toThrow(TypeError);
    // @ts-expect-error - intentionally passing non-number
    expect(() => gcd(12, null)).toThrow(TypeError);
  });

  it('should throw for NaN / Infinity (avoid infinite recursion)', () => {
    // Regression: the abs()-based impl infinite-looped on NaN/Infinity because
    // (NaN % x) and (Infinity % x) never reach 0.
    expect(() => gcd(NaN, 5)).toThrow(TypeError);
    expect(() => gcd(5, NaN)).toThrow(TypeError);
    expect(() => gcd(Infinity, 5)).toThrow(TypeError);
    expect(() => gcd(5, Infinity)).toThrow(TypeError);
  });
});

describe('isDivisible', () => {
  it('should work correctly', () => {
    expect(isDivisible(10, 2)).toBe(true);
    expect(isDivisible(7, 3)).toBe(false);
    expect(isDivisible(12, 3)).toBe(true);
    expect(isDivisible(15, 3)).toBe(true);
  });

  it('should test for even/odd numbers', () => {
    expect(isDivisible(8, 2)).toBe(true); // even
    expect(isDivisible(7, 2)).toBe(false); // odd
  });

  it('should test multiples', () => {
    expect(isDivisible(100, 10)).toBe(true);
    expect(isDivisible(101, 10)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(isDivisible(0, 5)).toBe(true); // 0 is divisible by any non-zero number
    expect(isDivisible(5, 1)).toBe(true); // any number is divisible by 1
  });

  it('should throw when divisor is 0 (per JSDoc)', () => {
    expect(() => isDivisible(5, 0)).toThrow('Division by zero!');
    expect(() => isDivisible(0, 0)).toThrow();
  });

  it('should throw for non-number inputs (per JSDoc)', () => {
    // @ts-expect-error - intentionally passing non-number
    expect(() => isDivisible('12', 3)).toThrow(TypeError);
    // @ts-expect-error - intentionally passing non-number
    expect(() => isDivisible(12, null)).toThrow(TypeError);
  });

  it('should work with negative numbers', () => {
    expect(isDivisible(-12, 3)).toBe(true);
    expect(isDivisible(12, -3)).toBe(true);
    expect(isDivisible(-12, -3)).toBe(true);
  });
});

describe('lcm', () => {
  it('should calculate lcm correctly', () => {
    expect(lcm(12, 18)).toBe(36);
    expect(lcm(4, 6)).toBe(12);
    expect(lcm(7, 5)).toBe(35); // coprime numbers
  });

  it('should handle edge cases', () => {
    expect(lcm(12, 0)).toBe(0); // LCM with 0 is 0
    expect(lcm(0, 18)).toBe(0);
    expect(lcm(5, 1)).toBe(5); // LCM with 1 is the number itself
  });

  it('should return 0 for lcm(0, 0)', () => {
    // Fixed from previously returning NaN (0/0).
    expect(lcm(0, 0)).toBe(0);
  });

  it('should work with negative numbers (always non-negative result)', () => {
    expect(lcm(-12, 18)).toBe(36);
    expect(lcm(-12, -18)).toBe(36);
  });

  it('should handle identical numbers', () => {
    expect(lcm(8, 8)).toBe(8);
    expect(lcm(10, 10)).toBe(10);
  });

  it('should verify LCM × GCD = |x × y| relationship', () => {
    const x = 12, y = 18;
    const lcmResult = lcm(x, y);
    const gcdResult = gcd(x, y);
    expect(lcmResult * gcdResult).toBe(Math.abs(x * y));
  });

  it('should throw for non-number inputs (per JSDoc)', () => {
    // @ts-expect-error - intentionally passing non-number
    expect(() => lcm('12', 18)).toThrow(TypeError);
    // @ts-expect-error - intentionally passing non-number
    expect(() => lcm(12, undefined)).toThrow(TypeError);
  });

  it('should throw for NaN / Infinity', () => {
    expect(() => lcm(NaN, 5)).toThrow(TypeError);
    expect(() => lcm(5, Infinity)).toThrow(TypeError);
  });
});
