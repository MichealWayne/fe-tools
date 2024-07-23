/**
 * @author Wayne
 * @Date 2024-07-23 11:31:33
 * @LastEditTime 2024-07-21 11:31:36
 */
import {
  getColorRgbList,
  getColorRgba,
  isTransparentColor,
  getLightfulRgbList,
} from '../src/utils/colors';

describe('getColorRgbList', () => {
  it('should return the correct RGB array for a given hexadecimal color', () => {
    expect(getColorRgbList('#f00')).toEqual([255, 0, 0]);
    expect(getColorRgbList('#0000FF')).toEqual([0, 0, 255]);
    expect(getColorRgbList('#aaBB99')).toEqual([170, 187, 153]);
  });

  it('should return an empty array for an invalid hexadecimal color', () => {
    expect(getColorRgbList('#12345')).toEqual([]);
    expect(getColorRgbList('invalid')).toEqual([]);
  });
});

describe('getColorRgba', () => {
  it('should return the correct RGBA string for a given hexadecimal color and opacity', () => {
    expect(getColorRgba('#f00')).toEqual('rgba(255,0,0,1)');
    expect(getColorRgba('#f00', 0.5)).toEqual('rgba(255,0,0,0.5)');
    expect(getColorRgba('#0000FF')).toEqual('rgba(0,0,255,1)');
    expect(getColorRgba('#0000FF', 0.1)).toEqual('rgba(0,0,255,0.1)');
  });
});

describe('isTransparentColor', () => {
  it('should return true if the given color string represents a transparent color', () => {
    expect(isTransparentColor('rgba(255,0,0,0)')).toBe(true);
  });

  it('should return false if the given color string does not represent a transparent color', () => {
    expect(isTransparentColor('rgba(255,0,0,1)')).toBe(false);
    expect(isTransparentColor(getColorRgba('#f00'))).toBe(false);
  });

  it('should return false if the given color string is empty', () => {
    expect(isTransparentColor('')).toBe(false);
  });
});

describe('getLightfulRgbList', () => {
  it('should return the correct RGB array for a given hexadecimal color and lighting weight', () => {
    expect(getLightfulRgbList('#f00')).toEqual([255, 0, 0]);
    expect(getLightfulRgbList('#f00', 0.5)).toEqual([255, 128, 128]);
    expect(getLightfulRgbList('#0000FF')).toEqual([0, 0, 255]);
    expect(getLightfulRgbList('#0000FF', 0.5)).toEqual([0, 0, 128]);
    expect(getLightfulRgbList('#aaBB99')).toEqual([170, 187, 153]);
    expect(getLightfulRgbList('#aaBB99', 0.5)).toEqual([170, 187, 153]);
  });
});
