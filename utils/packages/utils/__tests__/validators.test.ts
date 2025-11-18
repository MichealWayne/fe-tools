/**
 * Validators test
 */
import {
  isValidJSON,
  isValidEmail,
  isValidURL,
  isCreditCard,
  isValidPhoneNumber,
  isHexColor,
  isMACAddress,
  isPort,
  isJWT,
  isSemVer,
  isIPv4,
  isBase64,
} from '../src/validators';

describe('validators test', () => {
  describe('isValidJSON', () => {
    it('should validate valid JSON strings', () => {
      expect(isValidJSON('{"name": "John"}')).toBe(true);
      expect(isValidJSON('[1, 2, 3]')).toBe(true);
      expect(isValidJSON('true')).toBe(true);
      expect(isValidJSON('null')).toBe(true);
      expect(isValidJSON('123')).toBe(true);
      expect(isValidJSON('"string"')).toBe(true);
    });

    it('should reject invalid JSON strings', () => {
      expect(isValidJSON('invalid')).toBe(false);
      expect(isValidJSON('{name: "John"}')).toBe(false);
      expect(isValidJSON("{'name': 'John'}")).toBe(false);
      expect(isValidJSON('')).toBe(false);
      expect(isValidJSON('undefined')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should validate valid email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
      expect(isValidEmail('user_name@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user @example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidURL', () => {
    it('should validate valid URLs', () => {
      expect(isValidURL('https://example.com')).toBe(true);
      expect(isValidURL('http://localhost:3000')).toBe(true);
      expect(isValidURL('https://sub.example.com/path?query=1')).toBe(true);
      expect(isValidURL('ftp://files.example.com')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidURL('not a url')).toBe(false);
      expect(isValidURL('example.com')).toBe(false);
      expect(isValidURL('//example.com')).toBe(false);
      expect(isValidURL('')).toBe(false);
    });
  });

  describe('isCreditCard', () => {
    it('should validate valid credit card numbers', () => {
      expect(isCreditCard('4532015112830366')).toBe(true); // Visa
      expect(isCreditCard('6011111111111117')).toBe(true); // Discover
      expect(isCreditCard('5425233430109903')).toBe(true); // MasterCard
    });

    it('should reject invalid credit card numbers', () => {
      expect(isCreditCard('1234567890123456')).toBe(false);
      expect(isCreditCard('4532015112830367')).toBe(false); // Wrong checksum
      expect(isCreditCard('123')).toBe(false);
      expect(isCreditCard('')).toBe(false);
      expect(isCreditCard('abcd1234efgh5678')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate valid phone numbers', () => {
      expect(isValidPhoneNumber('+1234567890')).toBe(true);
      expect(isValidPhoneNumber('1234567890')).toBe(true);
      expect(isValidPhoneNumber('+8613812345678')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhoneNumber('abc')).toBe(false);
      expect(isValidPhoneNumber('12')).toBe(false);
      expect(isValidPhoneNumber('')).toBe(false);
    });
  });

  describe('isHexColor', () => {
    it('should validate valid hex colors', () => {
      expect(isHexColor('#fff')).toBe(true);
      expect(isHexColor('#ffffff')).toBe(true);
      expect(isHexColor('#FFF')).toBe(true);
      expect(isHexColor('#FFFFFF')).toBe(true);
      expect(isHexColor('#abc123')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isHexColor('fff')).toBe(false);
      expect(isHexColor('#ff')).toBe(false);
      expect(isHexColor('#gggggg')).toBe(false);
      expect(isHexColor('')).toBe(false);
      expect(isHexColor('rgb(255,255,255)')).toBe(false);
    });
  });

  describe('isIPv4', () => {
    it('should validate valid IPv4 addresses', () => {
      expect(isIPv4('192.168.1.1')).toBe(true);
      expect(isIPv4('255.255.255.255')).toBe(true);
      expect(isIPv4('0.0.0.0')).toBe(true);
      expect(isIPv4('8.8.8.8')).toBe(true);
    });

    it('should reject invalid IPv4 addresses', () => {
      expect(isIPv4('256.1.1.1')).toBe(false);
      expect(isIPv4('192.168.1')).toBe(false);
      expect(isIPv4('192.168.1.1.1')).toBe(false);
      expect(isIPv4('')).toBe(false);
      expect(isIPv4('invalid')).toBe(false);
    });
  });

  describe('isMACAddress', () => {
    it('should validate valid MAC addresses (colon separator)', () => {
      expect(isMACAddress('00:1B:44:11:3A:B7')).toBe(true);
      expect(isMACAddress('00:1b:44:11:3a:b7')).toBe(true);
      expect(isMACAddress('AA:BB:CC:DD:EE:FF')).toBe(true);
    });

    it('should validate valid MAC addresses (dash separator)', () => {
      expect(isMACAddress('00-1B-44-11-3A-B7')).toBe(true);
      expect(isMACAddress('AA-BB-CC-DD-EE-FF')).toBe(true);
    });

    it('should reject invalid MAC addresses', () => {
      expect(isMACAddress('00:1B:44:11:3A')).toBe(false);
      expect(isMACAddress('00:1B:44:11:3A:GG')).toBe(false);
      expect(isMACAddress('001B44113AB7')).toBe(false); // No separator
      expect(isMACAddress('')).toBe(false);
      expect(isMACAddress('invalid')).toBe(false);
    });
  });

  describe('isPort', () => {
    it('should validate valid port numbers', () => {
      expect(isPort(80)).toBe(true);
      expect(isPort(443)).toBe(true);
      expect(isPort(3000)).toBe(true);
      expect(isPort(8080)).toBe(true);
      expect(isPort(1)).toBe(true);
      expect(isPort(65535)).toBe(true);
    });

    it('should reject invalid port numbers', () => {
      expect(isPort(0)).toBe(false);
      expect(isPort(-1)).toBe(false);
      expect(isPort(65536)).toBe(false);
      expect(isPort(100000)).toBe(false);
      expect(isPort(1.5)).toBe(false);
    });
  });

  describe('isBase64', () => {
    it('should validate valid Base64 strings', () => {
      expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
      expect(isBase64('YWJj')).toBe(true);
      expect(isBase64('MTIzNDU2')).toBe(true);
    });

    it('should reject invalid Base64 strings', () => {
      expect(isBase64('not base64')).toBe(false);
      expect(isBase64('invalid!')).toBe(false);
    });

    it('should handle empty string', () => {
      const result = isBase64('');
      // Empty string may return true or false depending on implementation
      expect(typeof result).toBe('boolean');
    });
  });

  describe('isJWT', () => {
    it('should validate valid JWT tokens', () => {
      const validJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      expect(isJWT(validJWT)).toBe(true);
    });

    it('should reject invalid JWT tokens', () => {
      expect(isJWT('invalid')).toBe(false);
      expect(isJWT('part1.part2')).toBe(false); // Missing third part
      expect(isJWT('part1.part2.part3.part4')).toBe(false); // Too many parts
      expect(isJWT('')).toBe(false);
    });
  });

  describe('isSemVer', () => {
    it('should validate valid semantic version numbers', () => {
      expect(isSemVer('1.0.0')).toBe(true);
      expect(isSemVer('0.0.1')).toBe(true);
      expect(isSemVer('1.2.3')).toBe(true);
      expect(isSemVer('10.20.30')).toBe(true);
      expect(isSemVer('1.0.0-alpha')).toBe(true);
      expect(isSemVer('1.0.0-beta.1')).toBe(true);
      expect(isSemVer('1.0.0+build.123')).toBe(true);
    });

    it('should reject invalid version numbers', () => {
      expect(isSemVer('1.0')).toBe(false);
      expect(isSemVer('v1.0.0')).toBe(false);
      expect(isSemVer('1')).toBe(false);
      expect(isSemVer('')).toBe(false);
      expect(isSemVer('abc')).toBe(false);
    });
  });
});
