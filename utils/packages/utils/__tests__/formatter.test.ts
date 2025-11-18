/**
 * Formatter utilities test
 */
import {
  formatFileSize,
  formatDuration,
  formatNumber,
  formatRelativeTime,
  formatPhone,
  formatCurrency,
  formatPercentage,
  formatOrdinal,
} from '../src/formatter';

describe('formatter test', () => {
  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    it('should respect decimal places', () => {
      expect(formatFileSize(1536, 0)).toBe('2 KB');
      expect(formatFileSize(1536, 1)).toBe('1.5 KB');
      expect(formatFileSize(1536, 2)).toBe('1.5 KB'); // parseFloat removes trailing zeros
    });

    it('should handle large files', () => {
      expect(formatFileSize(1099511627776)).toBe('1 TB');
      expect(formatFileSize(1125899906842624)).toBe('1 PB');
    });
  });

  describe('formatDuration', () => {
    it('should format milliseconds to duration string', () => {
      expect(formatDuration(1000)).toBe('1s');
      expect(formatDuration(60000)).toBe('1m');
      expect(formatDuration(3600000)).toBe('1h');
      expect(formatDuration(86400000)).toBe('1d');
    });

    it('should format complex durations', () => {
      expect(formatDuration(3661000)).toBe('1h 1m 1s');
      expect(formatDuration(90000)).toBe('1m 30s');
      expect(formatDuration(5400000)).toBe('1h 30m');
    });

    it('should handle zero and small values', () => {
      expect(formatDuration(0)).toBe('0ms');
      expect(formatDuration(500)).toBe('500ms');
      expect(formatDuration(999)).toBe('999ms');
    });
  });

  describe('formatNumber', () => {
    it('should format numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
      expect(formatNumber(1234567.89)).toBe('1,234,567.89');
    });

    it('should respect decimal places', () => {
      expect(formatNumber(1234.5678, 2)).toBe('1,234.57');
      expect(formatNumber(1234.5678, 0)).toBe('1,235');
      expect(formatNumber(1234.5, 3)).toBe('1,234.500');
    });

    it('should handle custom separator', () => {
      expect(formatNumber(1000, 2, ' ')).toBe('1 000.00');
      expect(formatNumber(1000000, undefined, '.')).toBe('1.000.000');
    });

    it('should handle negative numbers', () => {
      expect(formatNumber(-1234.56, 2)).toBe('-1,234.56');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format recent times', () => {
      const now = Date.now();
      expect(formatRelativeTime(now)).toBe('just now');
      expect(formatRelativeTime(now - 30000)).toBe('just now'); // 30 seconds ago
    });

    it('should format minutes ago', () => {
      const now = Date.now();
      expect(formatRelativeTime(now - 60000)).toBe('1 minute ago');
      expect(formatRelativeTime(now - 300000)).toBe('5 minutes ago');
    });

    it('should format hours ago', () => {
      const now = Date.now();
      expect(formatRelativeTime(now - 3600000)).toBe('1 hour ago');
      expect(formatRelativeTime(now - 7200000)).toBe('2 hours ago');
    });

    it('should format days ago', () => {
      const now = Date.now();
      expect(formatRelativeTime(now - 86400000)).toBe('1 day ago');
      expect(formatRelativeTime(now - 172800000)).toBe('2 days ago');
    });

    it('should format months and years', () => {
      const now = Date.now();
      expect(formatRelativeTime(now - 2592000000)).toBe('1 month ago'); // ~30 days
      expect(formatRelativeTime(now - 31536000000)).toBe('1 year ago'); // ~365 days
    });
  });

  describe('formatPhone', () => {
    it('should format phone numbers with default format', () => {
      expect(formatPhone('1234567890')).toBe('(123) 456-7890');
      expect(formatPhone('2345678901')).toBe('(234) 567-8901');
    });

    it('should format with custom format', () => {
      expect(formatPhone('1234567890', '###-###-####')).toBe('123-456-7890');
      expect(formatPhone('12345678901', '+# (###) ###-####')).toBe('+1 (234) 567-8901');
    });

    it('should handle partial input', () => {
      expect(formatPhone('123')).toContain('123');
      expect(formatPhone('123456')).toContain('123');
    });
  });

  describe('formatCurrency', () => {
    it('should format with default $ symbol', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format with custom currency symbol', () => {
      expect(formatCurrency(1234.56, '€')).toBe('€1,234.56');
      expect(formatCurrency(1234.56, '¥')).toBe('¥1,234.56');
    });

    it('should handle negative amounts', () => {
      expect(formatCurrency(-1234.56)).toBe('$-1,234.56');
    });

    it('should respect decimal places', () => {
      expect(formatCurrency(100, '$', 0)).toBe('$100');
      expect(formatCurrency(100.567, '$', 3)).toBe('$100.567');
    });
  });

  describe('formatPercentage', () => {
    it('should format percentages', () => {
      expect(formatPercentage(0.5)).toBe('50.00%');
      expect(formatPercentage(0.1234)).toBe('12.34%');
      expect(formatPercentage(1)).toBe('100.00%');
      expect(formatPercentage(0)).toBe('0.00%');
    });

    it('should respect decimal places', () => {
      expect(formatPercentage(0.12345, 0)).toBe('12%');
      expect(formatPercentage(0.12345, 1)).toBe('12.3%');
      expect(formatPercentage(0.12345, 3)).toBe('12.345%');
    });

    it('should handle values over 100%', () => {
      expect(formatPercentage(1.5)).toBe('150.00%');
    });
  });

  describe('formatOrdinal', () => {
    it('should format ordinal numbers', () => {
      expect(formatOrdinal(1)).toBe('1st');
      expect(formatOrdinal(2)).toBe('2nd');
      expect(formatOrdinal(3)).toBe('3rd');
      expect(formatOrdinal(4)).toBe('4th');
    });

    it('should handle special cases', () => {
      expect(formatOrdinal(11)).toBe('11th');
      expect(formatOrdinal(12)).toBe('12th');
      expect(formatOrdinal(13)).toBe('13th');
      expect(formatOrdinal(21)).toBe('21st');
      expect(formatOrdinal(22)).toBe('22nd');
      expect(formatOrdinal(23)).toBe('23rd');
      expect(formatOrdinal(100)).toBe('100th');
      expect(formatOrdinal(101)).toBe('101st');
    });
  });
});
