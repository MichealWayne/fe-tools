/**
 * @author Wayne
 * @Date 2024-02-20 11:05:50
 * @LastEditTime 2025-06-09 19:18:35
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

  it('should handle leap years correctly', () => {
    const leapYearDate = new Date(2024, 11, 31); // December 31st of leap year 2024
    expect(dayOfYear(leapYearDate)).toBe(366);
  });

  it('should use current date when no argument is provided', () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const expectedDayOfYear = Math.floor(
      (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );

    expect(dayOfYear()).toBe(expectedDayOfYear);
  });
});

describe('getColonTimeFromDate', () => {
  it('should format time string', () => {
    const date = new Date('2023-02-20T14:30:00');
    expect(getColonTimeFromDate(date)).toBe('14:30:00');
  });

  it('should handle midnight correctly', () => {
    const midnight = new Date('2023-02-20T00:00:00');
    expect(getColonTimeFromDate(midnight)).toBe('00:00:00');
  });

  it('should use current time when no argument is provided', () => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 8);

    expect(getColonTimeFromDate()).toBe(timeString);
  });
});

describe('getDaysDiffBetweenDates', () => {
  it('should get days difference', () => {
    const date1 = new Date('2023-02-15');
    const date2 = new Date('2023-02-20');
    expect(getDaysDiffBetweenDates(date1, date2)).toBe(5);
  });

  it('should handle negative difference', () => {
    const date1 = new Date('2023-02-20');
    const date2 = new Date('2023-02-15');
    expect(getDaysDiffBetweenDates(date1, date2)).toBe(-5);
  });

  it('should handle time portion in dates', () => {
    const date1 = new Date('2023-02-15T10:00:00');
    const date2 = new Date('2023-02-16T10:00:00');
    expect(getDaysDiffBetweenDates(date1, date2)).toBe(1);
  });

  it('should handle fractional days', () => {
    const date1 = new Date('2023-02-15T10:00:00');
    const date2 = new Date('2023-02-16T22:00:00');
    expect(getDaysDiffBetweenDates(date1, date2)).toBe(1.5);
  });
});

describe('isAfterDate', () => {
  it('should work properly', () => {
    const date1 = new Date('2023-02-15');
    const date2 = new Date('2023-02-20');
    expect(isAfterDate(date2, date1)).toBe(true);
    expect(isAfterDate(date1, date2)).toBe(false);
  });

  it('should handle equal dates', () => {
    const date1 = new Date('2023-02-15T10:00:00');
    const date2 = new Date('2023-02-15T10:00:00');
    expect(isAfterDate(date1, date2)).toBe(false);
  });

  it('should use current date as default for second parameter', () => {
    const pastDate = new Date('2000-01-01');
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // Tomorrow

    expect(isAfterDate(pastDate)).toBe(false);
    expect(isAfterDate(futureDate)).toBe(true);
  });
});

describe('isBeforeDate', () => {
  it('should correctly identify if a date is before another', () => {
    const date1 = new Date('2023-02-15');
    const date2 = new Date('2023-02-20');
    expect(isBeforeDate(date1, date2)).toBe(true);
    expect(isBeforeDate(date2, date1)).toBe(false);
  });

  it('should handle equal dates', () => {
    const date1 = new Date('2023-02-15T10:00:00');
    const date2 = new Date('2023-02-15T10:00:00');
    expect(isBeforeDate(date1, date2)).toBe(false);
  });

  it('should use current date as default for second parameter', () => {
    const pastDate = new Date('2000-01-01');
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // Tomorrow

    expect(isBeforeDate(pastDate)).toBe(true);
    expect(isBeforeDate(futureDate)).toBe(false);
  });
});

describe('daysLater', () => {
  it('should get days later properly', () => {
    const date = new Date('2023-02-15');
    expect(daysLater(date, 5)).toBe('2023-02-20');
  });

  it('should handle negative days', () => {
    const date = new Date('2023-02-15');
    expect(daysLater(date, -5)).toBe('2023-02-10');
  });

  it('should handle month transitions', () => {
    const date = new Date('2023-01-28');
    expect(daysLater(date, 5)).toBe('2023-02-02');
  });

  it('should handle year transitions', () => {
    const date = new Date('2023-12-29');
    expect(daysLater(date, 5)).toBe('2024-01-03');
  });

  it('should use defaults when no arguments are provided', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    expect(daysLater()).toBe(tomorrow.toISOString().split('T')[0]);
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

  it('should handle exact day differences', () => {
    const date1 = new Date('2023-02-15T10:00');
    const date2 = new Date('2023-02-16T10:00');
    expect(getFormattedRemainTime(date1, date2)).toStrictEqual({
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
    });
  });

  it('should handle small time differences', () => {
    const date1 = new Date('2023-02-15T10:00:00');
    const date2 = new Date('2023-02-15T10:05:30');
    expect(getFormattedRemainTime(date1, date2)).toStrictEqual({
      day: 0,
      hour: 0,
      minute: 5,
      second: 30,
    });
  });

  it('should handle negative time differences', () => {
    const date1 = new Date('2023-02-15T10:00');
    const date2 = new Date('2023-02-14T10:00');
    expect(getFormattedRemainTime(date1, date2)).toStrictEqual({
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    });
  });
});
