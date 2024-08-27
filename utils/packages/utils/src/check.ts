/* eslint-disable no-useless-escape */
/**
 * @module Check
 * @description check functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:23:11
 */

/**
 * @function isEmail
 * @description 验证电子邮件地址的格式
 * @param {string} str 电子邮件地址
 * @return {boolean} 是否为电子邮件地址
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
 * @param {string} str 身份证号码
 * @return {boolean} 是否为身份证号码
 * @example
 * isIdCard('610527199201015209'); // true
 * isIdCard('11010519491231002X'); // true
 * isIdCard('1101051949123100'); // false
 * isIdCard('11010519490231123X'); // false
 * isIdCard('11010519491231002A'); // false
 * isIdCard('123456789012345'); // false
 */
export function isIdCard(str: string) {
  return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
    str
  );
}

/**
 * @function isUrl
 * @description 检查是否能够正确地验证 URL 的格式
 * @param {string} str url地址
 * @return {boolean} 是否为url地址
 * @example
 * isUrl('https://www.example.com');  // true
 * isUrl('https://subdomain.example.com/path/page.html?query=string'); // true
 * isUrl('ftp://ftp.example.com'); // true
 * isUrl('example.com'); // true
 * isUrl('http://example'); // false
 */
export function isUrl(str: string) {
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 * @function isPhoneNumber
 * @description 中国大陆手机号验证。（如果要国际通用请用三方库或/^\+?\d+$/）
 * @param {string} str 手机号码
 * @return {boolean} 是否为手机号码
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
 * @param {string} postalCode 邮政编码
 * @returns {boolean} 是否为邮政编码
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
 * @param {string} bankCard 银行卡号
 * @returns {boolean} 是否为银行卡号
 * @example
 * isBankCard('6222600584855931'); // true
 * isBankCard('023456789012345'); // false
 * isBankCard('1234567890123456'); // true
 * isBankCard('12345678901234'); // false
 */
export function isBankCard(bankCard: string) {
  return /^[1-9]([0-9]{15}|[0-9]{18})$/.test(bankCard);
}
