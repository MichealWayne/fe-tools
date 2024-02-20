/**
 * @author Wayne
 * @Date 2024-02-20 11:16:08
 * @LastEditTime 2024-02-20 11:26:59
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
});
