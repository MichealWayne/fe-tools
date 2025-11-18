/**
 * @author Wayne
 * @Date 2024-02-20 11:10:14
 * @LastEditTime 2024-02-20 11:26:21
 */
import { luhnCheck, toCurrency } from '../src/trade';

describe('luhnCheck', () => {
  it('should validate credit card numbers correctly', () => {
    expect(luhnCheck(79927398713)).toBe(true);
    expect(luhnCheck(79927398716)).toBe(false);
  });

  it('should validate common credit card formats', () => {
    // Valid test credit cards
    expect(luhnCheck(4532015112830366)).toBe(true); // Visa
    expect(luhnCheck(6011514433546201)).toBe(true); // Discover
    expect(luhnCheck(378282246310005)).toBe(true); // Amex
  });

  it('should reject invalid credit card numbers', () => {
    expect(luhnCheck(1234567890123456)).toBe(false);
    expect(luhnCheck(0)).toBe(false);
    expect(luhnCheck(123)).toBe(false);
  });

  it('should handle edge cases', () => {
    expect(luhnCheck(0)).toBe(true); // Single 0 passes Luhn
    expect(luhnCheck(18)).toBe(true); // Valid 2-digit number
  });
});

describe('toCurrency', () => {
  it('should format number to USD currency string', () => {
    expect(toCurrency(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
    expect(toCurrency(0, 'USD', 'en-US')).toBe('$0.00');
    expect(toCurrency(1000000, 'USD', 'en-US')).toBe('$1,000,000.00');
  });

  it('should format number to CNY currency string', () => {
    expect(toCurrency(1234.56, 'CNY', 'zh-CN')).toBe('¥1,234.56');
    expect(toCurrency(10000, 'CNY', 'zh-CN')).toBe('¥10,000.00');
  });

  it('should format number to EUR currency string', () => {
    const result = toCurrency(1234.56, 'EUR', 'en-US');
    expect(result).toMatch(/1,234\.56/);
    expect(result).toMatch(/€/);
  });

  it('should work with different locales', () => {
    expect(toCurrency(1234.56, 'EUR', 'de-DE')).toContain('1.234,56');
    expect(toCurrency(1234.56, 'EUR', 'fr-FR')).toContain('1 234,56');
  });

  it('should handle negative numbers', () => {
    const result = toCurrency(-1234.56, 'USD', 'en-US');
    expect(result).toContain('1,234.56');
    expect(result).toMatch(/-|\(.*\)/); // Either negative sign or parentheses
  });

  it('should handle decimal precision', () => {
    expect(toCurrency(1.5, 'USD', 'en-US')).toBe('$1.50');
    expect(toCurrency(1.005, 'USD', 'en-US')).toBe('$1.01'); // Rounds up
    expect(toCurrency(1.004, 'USD', 'en-US')).toBe('$1.00'); // Rounds down
  });

  it('should work with defaults when locale is not specified', () => {
    const result = toCurrency(1234.56, 'EUR');
    expect(result).toMatch(/€/);
    expect(result).toMatch(/1,?234\.56/); // May or may not have thousand separator depending on locale
  });
});
