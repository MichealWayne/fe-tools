/**
 * @author Wayne
 * @Date 2025-06-08 11:00:00
 * @LastEditTime 2025-06-08 19:13:50
 */
import { getKeyName } from '../src/keyboard';

describe('keyboard module', () => {
  describe('getKeyName', () => {
    test('should return correct key name for common keys', () => {
      expect(getKeyName(13)).toBe('Enter');
      expect(getKeyName(27)).toBe('Escape');
      expect(getKeyName(32)).toBe('Space');
      expect(getKeyName(65)).toBe('A');
      expect(getKeyName(90)).toBe('Z');
    });

    test('should return correct key name for number keys', () => {
      expect(getKeyName(48)).toBe('0');
      expect(getKeyName(49)).toBe('1');
      expect(getKeyName(57)).toBe('9');
    });

    test('should return correct key name for function keys', () => {
      expect(getKeyName(112)).toBe('F1');
      expect(getKeyName(116)).toBe('F5');
      expect(getKeyName(123)).toBe('F12');
    });

    test('should return correct key name for special characters', () => {
      expect(getKeyName(186)).toBe(';');
      expect(getKeyName(187)).toBe('=');
      expect(getKeyName(189)).toBe('-');
      expect(getKeyName(191)).toBe('/');
    });

    test('should return empty string and log warning for unknown key code', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      expect(getKeyName(999 as any)).toBe('');
      expect(consoleSpy).toHaveBeenCalledWith('Unknow Key(Key Code:999)');
      consoleSpy.mockRestore();
    });
  });
});
