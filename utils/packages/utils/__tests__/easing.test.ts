/**
 * @author Wayne
 * @Date 2024-02-20 11:16:08
 * @LastEditTime 2025-06-09 19:18:35
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

  describe('Cubic', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Cubic.In(0)).toEqual(0);
      expect(Easing.Cubic.In(0.5)).toBeCloseTo(0.125);
      expect(Easing.Cubic.In(0.75)).toBeCloseTo(0.421875);
      expect(Easing.Cubic.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Cubic.Out(0)).toEqual(0);
      expect(Easing.Cubic.Out(0.5)).toBeCloseTo(0.875);
      expect(Easing.Cubic.Out(0.75)).toBeCloseTo(0.984375);
      expect(Easing.Cubic.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Cubic.InOut(0)).toEqual(0);
      expect(Easing.Cubic.InOut(0.25)).toBeCloseTo(0.03125);
      expect(Easing.Cubic.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Cubic.InOut(0.75)).toBeCloseTo(0.96875);
      expect(Easing.Cubic.InOut(1)).toEqual(1);
    });
  });

  describe('Quartic', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Quartic.In(0)).toEqual(0);
      expect(Easing.Quartic.In(0.5)).toBeCloseTo(0.0625);
      expect(Easing.Quartic.In(0.75)).toBeCloseTo(0.31640625);
      expect(Easing.Quartic.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Quartic.Out(0)).toEqual(0);
      expect(Easing.Quartic.Out(0.5)).toBeCloseTo(0.9375);
      expect(Easing.Quartic.Out(0.75)).toBeCloseTo(0.99609375);
      expect(Easing.Quartic.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Quartic.InOut(0)).toEqual(0);
      expect(Easing.Quartic.InOut(0.25)).toBeCloseTo(0.015625);
      expect(Easing.Quartic.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Quartic.InOut(0.75)).toBeCloseTo(0.984375);
      expect(Easing.Quartic.InOut(1)).toEqual(1);
    });
  });

  describe('Quintic', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Quintic.In(0)).toEqual(0);
      expect(Easing.Quintic.In(0.5)).toBeCloseTo(0.03125);
      expect(Easing.Quintic.In(0.75)).toBeCloseTo(0.2373046875);
      expect(Easing.Quintic.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Quintic.Out(0)).toEqual(0);
      expect(Easing.Quintic.Out(0.5)).toBeCloseTo(0.96875);
      expect(Easing.Quintic.Out(0.75)).toBeCloseTo(0.9990234375);
      expect(Easing.Quintic.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Quintic.InOut(0)).toEqual(0);
      expect(Easing.Quintic.InOut(0.25)).toBeCloseTo(0.0078125);
      expect(Easing.Quintic.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Quintic.InOut(0.75)).toBeCloseTo(0.9921875);
      expect(Easing.Quintic.InOut(1)).toEqual(1);
    });
  });

  describe('Sinusoidal', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Sinusoidal.In(0)).toEqual(0);
      expect(Easing.Sinusoidal.In(0.5)).toBeCloseTo(0.29289321881345254);
      expect(Easing.Sinusoidal.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Sinusoidal.Out(0)).toEqual(0);
      expect(Easing.Sinusoidal.Out(0.5)).toBeCloseTo(0.7071067811865475);
      expect(Easing.Sinusoidal.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Sinusoidal.InOut(0)).toEqual(0);
      expect(Easing.Sinusoidal.InOut(0.25)).toBeCloseTo(0.1464466094067262);
      expect(Easing.Sinusoidal.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Sinusoidal.InOut(0.75)).toBeCloseTo(0.8535533905932737);
      expect(Easing.Sinusoidal.InOut(1)).toEqual(1);
    });
  });

  describe('Exponential', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Exponential.In(0)).toEqual(0);
      expect(Easing.Exponential.In(0.5)).toBeCloseTo(0.03125);
      expect(Easing.Exponential.In(0.75)).toBeCloseTo(0.177978515625);
      expect(Easing.Exponential.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Exponential.Out(0)).toEqual(0);
      expect(Easing.Exponential.Out(0.5)).toBeCloseTo(0.96875);
      expect(Easing.Exponential.Out(0.75)).toBeCloseTo(0.998046875);
      expect(Easing.Exponential.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Exponential.InOut(0)).toEqual(0);
      expect(Easing.Exponential.InOut(0.25)).toBeCloseTo(0.015625);
      expect(Easing.Exponential.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Exponential.InOut(0.75)).toBeCloseTo(0.984375);
      expect(Easing.Exponential.InOut(1)).toEqual(1);
    });
  });

  describe('Circular', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Circular.In(0)).toEqual(0);
      expect(Easing.Circular.In(0.5)).toBeCloseTo(0.1339745962155614);
      expect(Easing.Circular.In(0.75)).toBeCloseTo(0.3385621722338523);
      expect(Easing.Circular.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Circular.Out(0)).toEqual(0);
      expect(Easing.Circular.Out(0.5)).toBeCloseTo(0.8660254037844386);
      expect(Easing.Circular.Out(0.75)).toBeCloseTo(0.9682458365518543);
      expect(Easing.Circular.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Circular.InOut(0)).toEqual(0);
      expect(Easing.Circular.InOut(0.25)).toBeCloseTo(0.06698729810778073);
      expect(Easing.Circular.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Circular.InOut(0.75)).toBeCloseTo(0.9330127018922193);
      expect(Easing.Circular.InOut(1)).toEqual(1);
    });
  });

  describe('Elastic', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Elastic.In(0)).toEqual(0);
      expect(Easing.Elastic.In(0.2)).toBeCloseTo(-0.009784339500115144);
      expect(Easing.Elastic.In(0.5)).toBeCloseTo(-0.06451752655206866);
      expect(Easing.Elastic.In(0.75)).toBeCloseTo(-0.12308153547910655);
      expect(Easing.Elastic.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Elastic.Out(0)).toEqual(0);
      expect(Easing.Elastic.Out(0.25)).toBeCloseTo(1.1230815354791065);
      expect(Easing.Elastic.Out(0.5)).toBeCloseTo(1.0645175265520688);
      expect(Easing.Elastic.Out(0.75)).toBeCloseTo(1.0097843395001151);
      expect(Easing.Elastic.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Elastic.InOut(0)).toEqual(0);
      expect(Easing.Elastic.InOut(0.25)).toBeCloseTo(-0.03225876327603433);
      expect(Easing.Elastic.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Elastic.InOut(0.75)).toBeCloseTo(1.0322587632760344);
      expect(Easing.Elastic.InOut(1)).toEqual(1);
    });
  });

  describe('Back', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Back.In(0)).toEqual(0);
      expect(Easing.Back.In(0.5)).toBeCloseTo(-0.0876975);
      expect(Easing.Back.In(0.75)).toBeCloseTo(0.3732084375);
      expect(Easing.Back.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Back.Out(0)).toEqual(0);
      expect(Easing.Back.Out(0.5)).toBeCloseTo(1.0876975);
      expect(Easing.Back.Out(0.75)).toBeCloseTo(1.1267915625);
      expect(Easing.Back.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Back.InOut(0)).toEqual(0);
      expect(Easing.Back.InOut(0.25)).toBeCloseTo(-0.08584812890625);
      expect(Easing.Back.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Back.InOut(0.75)).toBeCloseTo(1.08584812890625);
      expect(Easing.Back.InOut(1)).toEqual(1);
    });
  });

  describe('Bounce', () => {
    it('should return the correct values for In', () => {
      expect(Easing.Bounce.In(0)).toEqual(0);
      expect(Easing.Bounce.In(0.2)).toBeCloseTo(0.12);
      expect(Easing.Bounce.In(0.5)).toBeCloseTo(0.5);
      expect(Easing.Bounce.In(0.8)).toBeCloseTo(0.788);
      expect(Easing.Bounce.In(1)).toEqual(1);
    });

    it('should return the correct values for Out', () => {
      expect(Easing.Bounce.Out(0)).toEqual(0);
      expect(Easing.Bounce.Out(0.2)).toBeCloseTo(0.212);
      expect(Easing.Bounce.Out(0.5)).toBeCloseTo(0.5);
      expect(Easing.Bounce.Out(0.8)).toBeCloseTo(0.88);
      expect(Easing.Bounce.Out(1)).toEqual(1);
    });

    it('should return the correct values for InOut', () => {
      expect(Easing.Bounce.InOut(0)).toEqual(0);
      expect(Easing.Bounce.InOut(0.25)).toBeCloseTo(0.25);
      expect(Easing.Bounce.InOut(0.5)).toBeCloseTo(0.5);
      expect(Easing.Bounce.InOut(0.75)).toBeCloseTo(0.75);
      expect(Easing.Bounce.InOut(1)).toEqual(1);
    });
  });
});
