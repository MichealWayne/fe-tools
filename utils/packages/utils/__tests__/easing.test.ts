/**
 * @author Wayne
 * @Date 2024-02-20 11:16:08
 * @LastEditTime 2024-07-22 19:42:50
 */
import Easing from '../src/Easing';

describe('Easing', () => {
  it('Linear works', () => {
    expect(Easing.Linear.None(0.5)).toBe(0.5);
  });

  it('Quadratic works', () => {
    expect(Easing.Quadratic.In(0.5)).toBeCloseTo(0.25);
    expect(Easing.Quadratic.Out(0.5)).toBeCloseTo(0.75);
    expect(Easing.Quadratic.InOut(0.5)).toBeCloseTo(0.5);
  });

  it('Cubic works', () => {
    expect(Easing.Cubic.In(0.5)).toBeCloseTo(0.125);
    expect(Easing.Cubic.Out(0.5)).toBeCloseTo(0.875);
    expect(Easing.Cubic.InOut(0.5)).toBeCloseTo(0.5);
  });

  it('Quintic works', () => {
    expect(Easing.Quintic.In(0.5)).toBeCloseTo(0.03125);
    expect(Easing.Quintic.Out(0.5)).toBeCloseTo(0.96875);
    expect(Easing.Quintic.InOut(0.5)).toBeCloseTo(0.5);
  });

  it('Circular works', () => {
    expect(Easing.Circular.In(0.75)).toBeCloseTo(0.33856);
    expect(Easing.Circular.Out(0.25)).toBeCloseTo(0.505);
    expect(Easing.Circular.InOut(0.5)).toBeCloseTo(0.5);
  });

  describe('Linear', () => {
    it('should return the same amount', () => {
      expect(Easing.Linear.None(0)).toEqual(0);
      expect(Easing.Linear.None(0.5)).toEqual(0.5);
      expect(Easing.Linear.None(1)).toEqual(1);
    });
  });

  describe('Quadratic', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Quadratic.In(0)).toEqual(0);
      expect(Easing.Quadratic.In(0.5)).toEqual(0.25);
      expect(Easing.Quadratic.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Quadratic.Out(0)).toEqual(0);
      expect(Easing.Quadratic.Out(0.5)).toEqual(0.75);
      expect(Easing.Quadratic.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Quadratic.InOut(0)).toEqual(0);
      expect(Easing.Quadratic.InOut(0.25)).toEqual(0.0625);
      expect(Easing.Quadratic.InOut(0.5)).toEqual(0.5);
      expect(Easing.Quadratic.InOut(0.75)).toEqual(0.9375);
      expect(Easing.Quadratic.InOut(1)).toEqual(1);
    });
  });
});
