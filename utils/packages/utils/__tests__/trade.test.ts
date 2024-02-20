/**
 * @author Wayne
 * @Date 2024-02-20 11:10:14
 * @LastEditTime 2024-02-20 11:26:21
 */
import { luhnCheck, toCurrency } from '../src/trade';

describe('luhnCheck', () => {
  it('should validate credit card numbers', () => {
    expect(luhnCheck(79927398713)).toBe(true);
    expect(luhnCheck(79927398716)).toBe(false);
  });
});

describe('toCurrency', () => {
  it('should format number to currency string', () => {
    expect(toCurrency(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
    expect(toCurrency(1234.56, 'CNY', 'zh-CN')).toBe('¥1,234.56');
  });

  it('should work with defaults', () => {
    expect(toCurrency(1234.56, 'EUR')).toMatch(/^€/);
  });
});
