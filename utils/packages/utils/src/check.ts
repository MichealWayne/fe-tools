/* eslint-disable no-useless-escape */
/**
 * @module Check
 * @description check functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-02-05 16:01:41
 */

/**
 * @function isEmail
 * @description 验证电子邮件地址的格式
 * @param {string} str
 * @return {boolean}
 * @example
 * isEmail('example@domain.com'); // true
 * isEmail('example@');  // false
 * isEmail('example@domain'); // false
 * isEmail('example@domain.'); // false
 * isEmail('example@domain..com'); // false
 */
export function isEmail(str: string) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}

/**
 * @function isIdCard
 * @description 中国大陆身份证验证。简单验证，如仔细验证可用check.plus.ts/checkIdcard()
 * @param {string} str
 * @return {boolean}
 */
export function isIdCard(str: string) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  );
}

/**
 * @function isUrl
 * @description 检查是否能够正确地验证 URL 的格式
 * @param {string} str
 * @return {boolean}
 * @example
 * isUrl('https://www.example.com');  // true
 * isUrl('https://subdomain.example.com/path/page.html?query=string'); // true
 * isUrl('ftp://ftp.example.com'); // true
 * isUrl('example.com'); // false
 * isUrl('http://example'); // false
 */
export function isUrl(str: string) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @function isPhoneNumber
 * @description 中国大陆手机号验证。（如果要国际通用请用三方库或/^\+?\d+$/）
 * @param {string} str
 * @return {boolean}
 * @example
 * isPhoneNumber('08613812345678'); // true
 * isPhoneNumber('8613812345678'); // true
 * isPhoneNumber('013812345678'); // true
 * isPhoneNumber('13812345678'); // true
 * isPhoneNumber('008613812345678'); // true
 * isPhoneNumber('086138123456789'); //false
 * isPhoneNumber('86-13812345678'); // false
 * isPhoneNumber('13812345'); //false
 */
export function isPhoneNumber(str: string) {
  return /^0*(86)*(1)\d{10}$/.test(str);
}

/**
 * @function isPostalCode
 * @description 校验(中国)邮政编码
 * @param {string} postalCode
 * @returns {boolean}
 * @example
 * isPostalCode('311100'); // true
 * isPostalCode('31110'); // false
 * isPostalCode('3111000'); // false
 * isPostalCode('031110'); // false
 */
export function isPostalCode(postalCode: string) {
  return /^[1-9]\d{5}(?!\d)$/.test(postalCode);
}

/**
 * @function isBankCard
 * @description 校验银行卡号
 * @param {string} bankCard
 * @returns {boolean}
 * @example
 * isBankCard('123456789012345'); // true
 * isBankCard('023456789012345'); // false
 * isBankCard('1234567890123456'); // false
 * isBankCard('12345678901234'); // false
 */
export function isBankCard(bankCard: string) {
  return /^[1-9]([0-9]{15}|[0-9]{18})$/.test(bankCard);
}
