/**
 * @author Wayne
 * @Date 2024-02-20 11:08:25
 * @LastEditTime 2024-02-18 11:08:32
 */
import { randomHexColor, getColorRgbArr, getColorRgba, isTransparentColor } from '../src/color';

describe('randomHexColor', () => {
  it('should generate random hex color', () => {
    expect(randomHexColor()).toMatch(/^#([0-9a-f]{6})$/i);
  });

  it('should generate different colors on multiple calls', () => {
    const color1 = randomHexColor();
    const color2 = randomHexColor();
    const color3 = randomHexColor();

    // There's a very small chance these might be the same by random chance,
    // but it's extremely unlikely all three would match
    expect(color1 === color2 && color2 === color3).toBe(false);
  });
});

describe('getColorRgbArr', () => {
  it('should convert hex to rgb array', () => {
    expect(getColorRgbArr('#ff0000')).toEqual([255, 0, 0]);
    expect(getColorRgbArr('#123')).toEqual([17, 34, 51]);
  });

  it('should handle shorthand hex colors correctly', () => {
    expect(getColorRgbArr('#f00')).toEqual([255, 0, 0]);
    expect(getColorRgbArr('#0f0')).toEqual([0, 255, 0]);
    expect(getColorRgbArr('#00f')).toEqual([0, 0, 255]);
    expect(getColorRgbArr('#fff')).toEqual([255, 255, 255]);
    expect(getColorRgbArr('#000')).toEqual([0, 0, 0]);
  });

  it('should handle full hex colors correctly', () => {
    expect(getColorRgbArr('#ff0000')).toEqual([255, 0, 0]);
    expect(getColorRgbArr('#00ff00')).toEqual([0, 255, 0]);
    expect(getColorRgbArr('#0000ff')).toEqual([0, 0, 255]);
    expect(getColorRgbArr('#ffffff')).toEqual([255, 255, 255]);
    expect(getColorRgbArr('#000000')).toEqual([0, 0, 0]);
    expect(getColorRgbArr('#123456')).toEqual([18, 52, 86]);
  });

  it('should be case-insensitive', () => {
    expect(getColorRgbArr('#FFF')).toEqual([255, 255, 255]);
    expect(getColorRgbArr('#FFFFFF')).toEqual([255, 255, 255]);
    expect(getColorRgbArr('#aBcDeF')).toEqual([171, 205, 239]);
  });

  it('should return empty arr for invalid values', () => {
    expect(getColorRgbArr('')).toEqual([]);
    expect(getColorRgbArr('#1234X5')).toEqual([]);
    expect(getColorRgbArr('#12')).toEqual([]);
    expect(getColorRgbArr('#1234567')).toEqual([]);
    expect(getColorRgbArr('rgb(255,0,0)')).toEqual([]);
    expect(getColorRgbArr('red')).toEqual([]);
  });
});

describe('getColorRgba', () => {
  it('should convert hex to rgba', () => {
    expect(getColorRgba('#00ff00', 0.5)).toBe('rgba(0,255,0,0.5)');
  });

  it('should handle different opacity values', () => {
    expect(getColorRgba('#ff0000', 0)).toBe('rgba(255,0,0,0)');
    expect(getColorRgba('#ff0000', 0.25)).toBe('rgba(255,0,0,0.25)');
    expect(getColorRgba('#ff0000', 0.75)).toBe('rgba(255,0,0,0.75)');
    expect(getColorRgba('#ff0000', 1)).toBe('rgba(255,0,0,1)');
  });

  it('should use default opacity of 1 when not provided', () => {
    expect(getColorRgba('#ff0000')).toBe('rgba(255,0,0,1)');
  });

  it('should handle shorthand hex colors', () => {
    expect(getColorRgba('#f00', 0.5)).toBe('rgba(255,0,0,0.5)');
    expect(getColorRgba('#0f0', 0.5)).toBe('rgba(0,255,0,0.5)');
  });

  it('should handle invalid color', () => {
    expect(getColorRgba('invalid', 0.5)).toBe('rgba(0,0,0,0)');
    expect(getColorRgba('#12', 0.5)).toBe('rgba(0,0,0,0)');
    expect(getColorRgba('', 0.5)).toBe('rgba(0,0,0,0)');
  });
});

describe('isTransparentColor', () => {
  it('should identify transparent colors', () => {
    expect(isTransparentColor('rgba(0,0,0,0)')).toBe(true);
    expect(isTransparentColor('rgba(255,255,255,0)')).toBe(true);
    expect(isTransparentColor('rgba(125,125,125,0)')).toBe(true);
  });

  it('should work with spaces in the color string', () => {
    expect(isTransparentColor('rgba(0, 0, 0, 0)')).toBe(true);
    expect(isTransparentColor('rgba(255, 255, 255, 0)')).toBe(true);
    expect(isTransparentColor('rgba( 125, 125, 125, 0 )')).toBe(true);
  });

  it('should identify non-transparent colors', () => {
    expect(isTransparentColor('rgba(0,0,0,0.1)')).toBe(false);
    expect(isTransparentColor('rgba(0,0,0,1)')).toBe(false);
    expect(isTransparentColor('rgb(255,255,255)')).toBe(false);
    expect(isTransparentColor('rgb(0,0,0)')).toBe(false);
  });

  it('should handle invalid input', () => {
    expect(isTransparentColor('')).toBe(false);
    expect(isTransparentColor('#ffffff')).toBe(false);
    expect(isTransparentColor('transparent')).toBe(false);
    expect(isTransparentColor('rgbx(0,0,0,0)')).toBe(false);
  });
});
