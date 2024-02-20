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
});

describe('getColorRgbArr', () => {
  it('should convert hex to rgb array', () => {
    expect(getColorRgbArr('#ff0000')).toEqual([255, 0, 0]);
    expect(getColorRgbArr('#123')).toEqual([17, 34, 51]);
  });

  it('should return empty arr for invalid values', () => {
    expect(getColorRgbArr('')).toEqual([]);
    expect(getColorRgbArr('#1234X5')).toEqual([]);
  });
});

describe('getColorRgba', () => {
  it('should convert hex to rgba', () => {
    expect(getColorRgba('#00ff00', 0.5)).toBe('rgba(0,255,0,0.5)');
  });

  it('should handle invalid color', () => {
    expect(getColorRgba('invalid', 0.5)).toBe('rgba(0,0,0,0)');
  });
});

describe('isTransparentColor', () => {
  it('should work properly', () => {
    expect(isTransparentColor('rgba(0,0,0,0)')).toBe(true);
    expect(isTransparentColor('rgb(255,255,255)')).toBe(false);
  });
});
