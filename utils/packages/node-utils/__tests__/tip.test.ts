import Tip from '../src/lib/util/tip';

describe('tipFunHoc', () => {
  it('should log the info string without time if timeFlag is not provided', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const info = 'This is a test';
    const tip = Tip.safe;
    tip(info);
    expect(consoleSpy).toHaveBeenCalledWith(info);
    consoleSpy.mockRestore();
  });

  it('should log the info string with time if timeFlag is true', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const info = 'This is a test';
    const tip = Tip.safe;
    const timeFlag = true;
    tip(info, timeFlag);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(info));
    consoleSpy.mockRestore();
  });

  it('should log the info string with the specified color if available', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const info = 'This is a test';
    const tip = Tip.error;
    tip(info);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(info));
    consoleSpy.mockRestore();
  });

  it('should not log anything if info is falsy', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const info = '';
    const tip = Tip.warn;
    tip(info);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
