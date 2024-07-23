import { getTimeStr } from '../src/lib/util/util';

describe('getTimeStr', () => {
  it('should return the current time in the correct format', () => {
    const result = getTimeStr();
    const regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
    expect(result).toMatch(regex);
  });

  it('should return the time in the correct format when a time string is provided', () => {
    const timeStr = '2022-01-01T12:00:00Z';
    const result = getTimeStr(timeStr);
    expect(result).toEqual('2022/01/01 12:00:00');
  });
});
