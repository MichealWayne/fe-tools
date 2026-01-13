import {
  getLocale,
  formatDateLocale,
  formatNumberLocale,
  formatCurrencyLocale,
  pluralize,
  getDirection,
  formatRelativeTime,
} from '../src/i18n';

describe('i18n utils', () => {
  it('should return browser locale', () => {
    expect(getLocale()).toBe(navigator.language || 'en-US');
  });

  it('should format dates with Intl', () => {
    const date = new Date('2025-01-18T00:00:00Z');
    expect(formatDateLocale(date, 'en-US')).toBe(new Intl.DateTimeFormat('en-US').format(date));
  });

  it('should format numbers with Intl', () => {
    expect(formatNumberLocale(1234.5, 'en-US')).toBe(
      new Intl.NumberFormat('en-US').format(1234.5)
    );
  });

  it('should format currency with Intl', () => {
    expect(formatCurrencyLocale(10, 'USD', 'en-US')).toBe(
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(10)
    );
  });

  it('should pluralize', () => {
    expect(pluralize(1, 'item')).toBe('item');
    expect(pluralize(2, 'item')).toBe('items');
    expect(pluralize(2, 'person', 'people')).toBe('people');
  });

  it('should detect direction', () => {
    expect(getDirection('en-US')).toBe('ltr');
    expect(getDirection('ar-SA')).toBe('rtl');
  });

  it('should format relative time', () => {
    const formatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
    expect(formatRelativeTime(-1, 'day', 'en-US')).toBe(formatter.format(-1, 'day'));
  });
});
