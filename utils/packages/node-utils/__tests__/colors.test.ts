/**
 * @author Wayne
 * @Date 2024-07-22 19:50:07
 * @LastEditTime 2025-06-08 15:31:24
 */
import colors from '../src/logging/colors';

describe('COLORS_MAP', () => {
  it('should have the correct properties', () => {
    expect(colors.colors).toHaveProperty('Reset');
    expect(colors.colors).toHaveProperty('Bright');
    expect(colors.colors).toHaveProperty('Dim');
    expect(colors.colors).toHaveProperty('Underscore');
    expect(colors.colors).toHaveProperty('Blink');
    expect(colors.colors).toHaveProperty('Reverse');
    expect(colors.colors).toHaveProperty('Hidden');
    expect(colors.colors).toHaveProperty('FgBlack');
    expect(colors.colors).toHaveProperty('FgRed');
    expect(colors.colors).toHaveProperty('FgGreen');
    expect(colors.colors).toHaveProperty('FgYellow');
    expect(colors.colors).toHaveProperty('FgBlue');
    expect(colors.colors).toHaveProperty('FgMagenta');
    expect(colors.colors).toHaveProperty('FgCyan');
    expect(colors.colors).toHaveProperty('FgWhite');
    expect(colors.colors).toHaveProperty('BgBlack');
    expect(colors.colors).toHaveProperty('BgRed');
    expect(colors.colors).toHaveProperty('BgGreen');
    expect(colors.colors).toHaveProperty('BgYellow');
    expect(colors.colors).toHaveProperty('BgBlue');
    expect(colors.colors).toHaveProperty('BgMagenta');
    expect(colors.colors).toHaveProperty('BgCyan');
    expect(colors.colors).toHaveProperty('BgWhite');
  });

  it('should have the correct values', () => {
    expect(colors.colors.Reset).toEqual('\x1b[0m');
    expect(colors.colors.Bright).toEqual('\x1b[1m');
    expect(colors.colors.Dim).toEqual('\x1b[2m');
    expect(colors.colors.Underscore).toEqual('\x1b[4m');
    expect(colors.colors.Blink).toEqual('\x1b[5m');
    expect(colors.colors.Reverse).toEqual('\x1b[7m');
    expect(colors.colors.Hidden).toEqual('\x1b[8m');
    expect(colors.colors.FgBlack).toEqual('\x1b[30m');
    expect(colors.colors.FgRed).toEqual('\x1b[31m');
    expect(colors.colors.FgGreen).toEqual('\x1b[32m');
    expect(colors.colors.FgYellow).toEqual('\x1b[33m');
    expect(colors.colors.FgBlue).toEqual('\x1b[34m');
    expect(colors.colors.FgMagenta).toEqual('\x1b[35m');
    expect(colors.colors.FgCyan).toEqual('\x1b[36m');
    expect(colors.colors.FgWhite).toEqual('\x1b[37m');
    expect(colors.colors.BgBlack).toEqual('\x1b[40m');
    expect(colors.colors.BgRed).toEqual('\x1b[41m');
    expect(colors.colors.BgGreen).toEqual('\x1b[42m');
    expect(colors.colors.BgYellow).toEqual('\x1b[43m');
    expect(colors.colors.BgBlue).toEqual('\x1b[44m');
    expect(colors.colors.BgMagenta).toEqual('\x1b[45m');
    expect(colors.colors.BgCyan).toEqual('\x1b[46m');
    expect(colors.colors.BgWhite).toEqual('\x1b[47m');
  });
});
