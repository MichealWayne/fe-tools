/**
 * @author Wayne
 * @Date 2024-02-20 11:05:50
 * @LastEditTime 2024-02-18 11:06:04
 */
import {
  dayOfYear,
  getColonTimeFromDate,
  getDaysDiffBetweenDates,
  isAfterDate,
  isBeforeDate,
  daysLater,
  getFormattedRemainTime,
} from '../src/date';

describe('dayOfYear', () => {
  it('should calculate day of year', () => {
    const date = new Date(2023, 1, 15);
    expect(dayOfYear(date)).toBe(46);
  });
});

describe('getColonTimeFromDate', () => {
  it('should format time string', () => {
    const date = new Date('2023-02-20T14:30:00');
    expect(getColonTimeFromDate(date)).toBe('14:30:00');
  });
});

describe('getDaysDiffBetweenDates', () => {
  it('should get days difference', () => {
    const date1 = new Date('2023-02-15');
    const date2 = new Date('2023-02-20');
    expect(getDaysDiffBetweenDates(date1, date2)).toBe(5);
  });
});

describe('isAfterDate', () => {
  it('should work properly', () => {
    const date1 = new Date('2023-02-15');
    const date2 = new Date('2023-02-20');
    expect(isAfterDate(date2, date1)).toBe(true);
    expect(isAfterDate(date1, date2)).toBe(false);
  });
});

describe('daysLater', () => {
  it('should get days later properly', () => {
    const date = new Date('2023-02-15');
    expect(daysLater(date, 5)).toBe('2023-02-20');
  });
});

describe('getFormattedRemainTime', () => {
  it('should format correctly', () => {
    const date1 = new Date('2023-02-15T14:30');
    const date2 = new Date('2023-02-17T11:00');
    expect(getFormattedRemainTime(date1, date2)).toStrictEqual({
      day: 1,
      hour: 20,
      minute: 30,
      second: 0,
    });
  });
});
