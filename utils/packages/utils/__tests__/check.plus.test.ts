/**
 * @author Wayne
 * @Date 2024-02-20 11:12:02
 * @LastEditTime 2024-03-26 10:04:56
 */
import {
  validatePassport,
  validateLicensePlate,
  checkPwdStrength,
  checkIdcard,
} from '../src/check.plus';

describe('validatePassport', () => {
  it('should validate passport', () => {
    expect(validatePassport('140123456')).toBe(true);
    expect(validatePassport('G1234567')).toBe(false);
    expect(validatePassport('H1234567')).toBe(false);
  });
});

describe('validateLicensePlate', () => {
  it('should validate license plate', () => {
    expect(validateLicensePlate('京A12345X')).toBe(true);
    expect(validateLicensePlate('京A12345')).toBe(false);
    expect(validateLicensePlate('粤B1234D')).toBe(true);
    expect(validateLicensePlate('1234')).toBe(false);
  });
});

describe('checkPwdStrength', () => {
  it('should check password strength', () => {
    expect(checkPwdStrength('1234abc')).toBe('密码不能包含非法字符，如双引号等');
    expect(checkPwdStrength('abc123!@#')).toBe(3);
    expect(checkPwdStrength('123!@#xyz')).toBe(2);
  });

  it('should validate password rules', () => {
    expect(checkPwdStrength('123')).toBe('密码长度必须在6-12位之间');
    expect(checkPwdStrength('abcabc')).toBe('密码不能使用全字母');
  });

  it('should validate id card rule', () => {
    expect(checkIdcard('123456789012345678')).toBe('请填写正确的身份证号码');
    expect(checkIdcard('12345678901234567X')).toBe('请填写正确的身份证号码');
  });
});
