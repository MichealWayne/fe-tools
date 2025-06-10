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
  it('should validate passport correctly', () => {
    // Valid passports
    expect(validatePassport('140123456')).toBe(true);
    expect(validatePassport('141234567')).toBe(true);
    expect(validatePassport('E12345678')).toBe(true);
    expect(validatePassport('EA1234567')).toBe(true);
    expect(validatePassport('K12345678')).toBe(true);
    expect(validatePassport('P12345678')).toBe(true);
    expect(validatePassport('S12345678')).toBe(true);
    expect(validatePassport('D12345678')).toBe(true);
    expect(validatePassport('SE1234567')).toBe(true);
    expect(validatePassport('PE1234567')).toBe(true);
    expect(validatePassport('DE1234567')).toBe(true);
    expect(validatePassport('MA1234567')).toBe(true);

    // Invalid passports
    expect(validatePassport('G1234567')).toBe(false);
    expect(validatePassport('H1234567')).toBe(false);
    expect(validatePassport('A12345678')).toBe(false);
    expect(validatePassport('Z12345678')).toBe(false);
    expect(validatePassport('1401234567')).toBe(false); // too long
    expect(validatePassport('14012345')).toBe(false); // too short
    expect(validatePassport('E1234567X')).toBe(false); // wrong format
    expect(validatePassport('')).toBe(false); // empty string
  });
});

describe('validateLicensePlate', () => {
  it('should validate standard license plates', () => {
    expect(validateLicensePlate('京A12345D')).toBe(true);
    expect(validateLicensePlate('沪B12345F')).toBe(true);
    expect(validateLicensePlate('粤C12345D')).toBe(true);
    expect(validateLicensePlate('津D12345F')).toBe(true);
    expect(validateLicensePlate('冀E12345D')).toBe(true);
    expect(validateLicensePlate('豫F12345F')).toBe(true);
  });

  it('should validate special characters in license plates', () => {
    expect(validateLicensePlate('京A12345D')).toBe(true);
    expect(validateLicensePlate('京B12345F')).toBe(true);
    expect(validateLicensePlate('京A12345X')).toBe(true);
    expect(validateLicensePlate('粤B1234D')).toBe(true);
  });

  it('should reject invalid license plates', () => {
    expect(validateLicensePlate('京A12345')).toBe(false); // missing last character
    expect(validateLicensePlate('A12345D')).toBe(false); // missing province
    expect(validateLicensePlate('1234')).toBe(false); // too short
    expect(validateLicensePlate('京A1234567')).toBe(false); // too long
    expect(validateLicensePlate('京O12345D')).toBe(false); // invalid letter (O not allowed)
    expect(validateLicensePlate('XX12345D')).toBe(false); // invalid province
    expect(validateLicensePlate('')).toBe(false); // empty string
  });

  it('should validate all province codes', () => {
    const provinces = [
      '京',
      '津',
      '沪',
      '渝',
      '冀',
      '豫',
      '云',
      '辽',
      '黑',
      '湘',
      '皖',
      '鲁',
      '新',
      '苏',
      '浙',
      '赣',
      '鄂',
      '桂',
      '甘',
      '晋',
      '蒙',
      '陕',
      '吉',
      '闽',
      '贵',
      '粤',
      '青',
      '藏',
      '川',
      '宁',
      '琼',
      '使',
      '领',
    ];

    for (const province of provinces) {
      expect(validateLicensePlate(`${province}A12345D`)).toBe(true);
    }
  });
});

describe('checkPwdStrength', () => {
  it('should validate password length', () => {
    expect(checkPwdStrength('')).toBe('密码长度必须在6-12位之间');
    expect(checkPwdStrength('12345')).toBe('密码长度必须在6-12位之间');
    expect(checkPwdStrength('1234567890123')).toBe('密码长度必须在6-12位之间');
  });

  it('should reject passwords with all same characters', () => {
    expect(checkPwdStrength('aaaaaa')).toBe('密码不能使用全部相同字符');
    expect(checkPwdStrength('111111')).toBe('密码不能使用全部相同字符');
    expect(checkPwdStrength('######')).toBe('密码不能使用全部相同字符');
  });

  it('should validate password content requirements', () => {
    // Must contain letters, numbers, and symbols
    expect(checkPwdStrength('abcabc')).toBe('密码不能使用全字母');
    expect(checkPwdStrength('123456')).toBe('密码不能包含非法字符，如双引号等');
    expect(checkPwdStrength('!@#$%^')).toBe('密码不能包含非法字符，如双引号等');

    // Just letters and numbers
    expect(checkPwdStrength('abc123')).toBe('密码不能包含非法字符，如双引号等');
    // Just letters and symbols
    expect(checkPwdStrength('abc!@#')).toBe('密码不能包含非法字符，如双引号等');
    // Just numbers and symbols
    expect(checkPwdStrength('123!@#')).toBe('密码不能包含非法字符，如双引号等');
  });

  it('should detect password strength correctly', () => {
    // Strong password (letters + numbers + symbols)
    expect(checkPwdStrength('abc123!@#')).toBe(3);
    expect(checkPwdStrength('P@ssw0rd')).toBe(3);
    expect(checkPwdStrength('Secret!2')).toBe(3);

    // Average password (letters + numbers or letters + symbols)
    expect(checkPwdStrength('123!@#xyz')).toBe(2);
  });

  it('should accept custom error messages', () => {
    const customTips = {
      formatErr: 'Custom format error',
      allnumberErr: 'Custom all number error',
      allwordErr: 'Custom all word error',
      allsymbolErr: 'Custom all symbol error',
      samesymbolErr: 'Custom same symbol error',
      illegalityErr: 'Custom illegality error',
    };

    expect(checkPwdStrength('123', customTips)).toBe('Custom format error');
    expect(checkPwdStrength('aaaaaa', customTips)).toBe('Custom same symbol error');
    expect(checkPwdStrength('abcdef', customTips)).toBe('Custom illegality error');
  });
});

describe('checkIdcard', () => {
  it('should reject invalid format ID cards', () => {
    expect(checkIdcard('')).toBe('请填写正确的身份证号码');
    expect(checkIdcard('1234')).toBe('请填写正确的身份证号码');
    expect(checkIdcard('123456789012345')).toBe('请填写正确的身份证号码'); // 15 digits but invalid
    expect(checkIdcard('12345678901234567')).toBe('请填写正确的身份证号码'); // 17 digits
    expect(checkIdcard('123456789012345678')).toBe('请填写正确的身份证号码'); // 18 digits but invalid
    expect(checkIdcard('12345678901234567X')).toBe('请填写正确的身份证号码'); // invalid check digit
  });

  it('should validate 18-digit ID cards', () => {
    // These are fake IDs for testing - they pass the algorithm but are not real
    expect(checkIdcard('110101199003077734')).toBe('身份证验证通过');
    expect(checkIdcard('440101199001010010')).toBe('身份证验证通过');

    // ID with X as check digit
    expect(checkIdcard('11010119900307773X')).toBe('身份证验证通过');
  });

  it('should detect underage ID cards', () => {
    // Create an ID for someone born this year (underage)
    const currentYear = new Date().getFullYear();
    const recentIDCard = `11010${currentYear}0101000X`;

    expect(checkIdcard(recentIDCard)).toBe('未满18岁暂不支持开户');
  });

  it('should validate area codes', () => {
    // Valid area code (Beijing)
    expect(checkIdcard('110101199003077734')).toBe('身份证验证通过');

    // Invalid area code (99)
    expect(checkIdcard('990101199003077736')).toBe('请填写正确的身份证号码');
  });
});
