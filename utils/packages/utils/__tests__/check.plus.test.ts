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

  it('should validate new energy vehicle license plates', () => {
    expect(validateLicensePlate('京AD12345')).toBe(true);
    expect(validateLicensePlate('京AF23456')).toBe(true);
    expect(validateLicensePlate('粤BF12345')).toBe(true);
    expect(validateLicensePlate('沪DD98765')).toBe(true);
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
    // Password must contain all three types: letters, numbers, and symbols
    // Only missing symbols or numbers will trigger illegalityErr
    expect(checkPwdStrength('abc123')).toBe('密码不能包含非法字符，如双引号等');
    expect(checkPwdStrength('abc!@#')).toBe('密码不能包含非法字符，如双引号等');
    expect(checkPwdStrength('123!@#')).toBe('密码不能包含非法字符，如双引号等');
  });

  it('should detect password strength correctly', () => {
    // Strong password (letters + numbers + symbols)
    expect(checkPwdStrength('abc123!@#')).toBe(3);
    expect(checkPwdStrength('P@ssw0rd')).toBe(3);
    expect(checkPwdStrength('Secret!2')).toBe(3);
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
  // Helper function to calculate check digit for 18-digit ID card
  function calculateCheckDigit(idcard17: string): string {
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const checkCodes = '10X98765432';
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(idcard17[i], 10) * weights[i];
    }
    return checkCodes[sum % 11];
  }

  it('should reject invalid format ID cards', () => {
    expect(checkIdcard('')).toBe('请填写正确的身份证号码');
    expect(checkIdcard('1234')).toBe('请填写正确的身份证号码');
    expect(checkIdcard('12345678901234567')).toBe('请填写正确的身份证号码'); // 17 digits
    expect(checkIdcard('123456789012345678')).toBe('请填写正确的身份证号码'); // wrong check digit
    expect(checkIdcard('99010119900101001X')).toBe('请填写正确的身份证号码'); // invalid area code
  });

  it('should validate 18-digit ID cards', () => {
    // Valid Beijing ID card for someone born in 1990-03-07
    const validId1 = '11010119900307' + '773';
    const checkDigit1 = calculateCheckDigit(validId1);
    expect(checkIdcard(validId1 + checkDigit1)).toBe('身份证验证通过');

    // Valid Guangdong ID card for someone born in 1990-01-01
    const validId2 = '44010119900101' + '001';
    const checkDigit2 = calculateCheckDigit(validId2);
    expect(checkIdcard(validId2 + checkDigit2)).toBe('身份证验证通过');
  });

  it('should detect underage ID cards', () => {
    // Create an ID for someone born recently (under 18)
    const currentDate = new Date();
    const underageYear = currentDate.getFullYear() - 10; // 10 years old
    const month = '06';
    const day = '15';
    const underageId = `110101${underageYear}${month}${day}001`;
    const checkDigit = calculateCheckDigit(underageId);

    expect(checkIdcard(underageId + checkDigit)).toBe('未满18岁暂不支持开户');
  });

  it('should validate area codes', () => {
    // Valid area code (Beijing - 11)
    const validBeijingId = '11010119900307' + '773';
    const checkDigit = calculateCheckDigit(validBeijingId);
    expect(checkIdcard(validBeijingId + checkDigit)).toBe('身份证验证通过');

    // Invalid area code (99)
    expect(checkIdcard('990101199003077736')).toBe('请填写正确的身份证号码');
  });

  it('should handle leap year dates correctly', () => {
    // Feb 29 in a leap year (2000)
    const leapYearId = '11010120000229' + '001';
    const checkDigit = calculateCheckDigit(leapYearId);
    expect(checkIdcard(leapYearId + checkDigit)).toBe('身份证验证通过');
  });

  it('should reject invalid dates', () => {
    // Feb 30 (invalid date)
    const invalidDateId = '11010119900230001X';
    expect(checkIdcard(invalidDateId)).toBe('请填写正确的身份证号码');

    // Invalid month
    const invalidMonthId = '11010119901301001X';
    expect(checkIdcard(invalidMonthId)).toBe('请填写正确的身份证号码');
  });
});
