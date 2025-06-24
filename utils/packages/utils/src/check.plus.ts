/* eslint-disable no-useless-escape */
/**
 * @module Check.plus
 * @description check password functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-06-15 19:27:39
 */

/**
 * @function validatePassport
 * @description (中国)护照号码校验
 * @param {string} passport 护照号码
 * @returns {boolean} 是否为护照号码
 * @example
 * validatePassport('G12345678'); // false
 * validatePassport('D012345678'); // true
 * validatePassport('140123456'); // true
 * validatePassport('A12345678'); // false
 * validatePassport('111234567'); // false
 * validatePassport('G1234567'); // false
 * validatePassport('G1234567A'); // false
 */
export function validatePassport(passport: string) {
  const reg =
    /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
  return reg.test(passport);
}

/**
 * @function validateLicensePlate
 * @description (中国)车牌号校验
 * @param {string} licensePlate 车牌号
 * @returns {boolean} 是否为车牌号
 * @example
 * validateLicensePlate('A12345X'); // true
 * validateLicensePlate('京A12345'); // true
 * validateLicensePlate('A12345'); // false
 * validateLicensePlate('浙123456'); // false
 */
export function validateLicensePlate(licensePlate: string) {
  const reg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
  return reg.test(licensePlate);
}

type PwdStrengthTips = {
  formatErr: string;
  allnumberErr: string;
  allwordErr: string;
  allsymbolErr: string;
  samesymbolErr: string;
  illegalityErr: string;
};

const DEFAULT_PWD_STRENGTH_TIPS: PwdStrengthTips = {
  formatErr: '密码长度必须在6-12位之间',
  allnumberErr: '密码不能使用全数字',
  allwordErr: '密码不能使用全字母',
  allsymbolErr: '密码不能使用全符号',
  samesymbolErr: '密码不能使用全部相同字符',
  illegalityErr: '密码不能包含非法字符，如双引号等',
};

enum PwdStrengthTypes {
  weak = 1,
  average,
  strong,
}

const isAllSameChar = (pwd: string) => /(^.)\1+$/.test(pwd);
const hasNumber = (pwd: string) => /\d/.test(pwd);
const hasLetter = (pwd: string) => /[a-zA-Z]/.test(pwd);
const hasSymbol = (pwd: string) => /[\W_]/.test(pwd);

/**
 * @function checkPwdStrength
 * @description 检验密码强度（数字+字母+符号）
 * @param {string} pwd 待检查的密码
 * @param {PwdStrengthTips} tips 自定义密码强度提示信息
 * @return {PwdStrengthTypes | string} 密码强度类型或提示信息
 */
export function checkPwdStrength(
  pwd: string,
  tips: PwdStrengthTips = DEFAULT_PWD_STRENGTH_TIPS
): PwdStrengthTypes | string {
  const { formatErr, allnumberErr, allwordErr, allsymbolErr, samesymbolErr, illegalityErr } = tips;

  if (!pwd || pwd.length < 6 || pwd.length > 12) {
    return formatErr;
  }

  if (isAllSameChar(pwd)) {
    return samesymbolErr;
  }

  const hasNum = hasNumber(pwd);
  const hasLtr = hasLetter(pwd);
  const hasSym = hasSymbol(pwd);

  if (!hasNum || !hasLtr || !hasSym) {
    return illegalityErr;
  }

  if (hasNum && !hasLtr && !hasSym) {
    return allnumberErr;
  }

  if (!hasNum && hasLtr && !hasSym) {
    return allwordErr;
  }

  if (!hasNum && !hasLtr && hasSym) {
    return allsymbolErr;
  }

  return hasSym && hasNum && hasLtr ? PwdStrengthTypes.strong : PwdStrengthTypes.average;
}

enum DefaultIdcardTips {
  success = '身份证验证通过',
  fail = '请填写正确的身份证号码',
  not18 = '未满18岁暂不支持开户',
}

/**
 * @function checkIdcard
 * @param {string} idcard
 * @return {DefaultIdcardTips}
 */
const AREA_MAP = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};

// 身份证验证相关的常量
const IDCARD_REGEX = {
  // 15位身份证正则
  LEAP_YEAR_15:
    /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/,
  NORMAL_YEAR_15:
    /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,
  // 18位身份证正则
  LEAP_YEAR_18:
    /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/,
  NORMAL_YEAR_18:
    /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/,
};

// 校验位权重
const CHECK_CODE_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
const CHECK_CODE_MAP = '10X98765432';

/**
 * 检查是否为闰年
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 获取18岁生日日期字符串
 */
function getFullGrownDate(): string {
  const now = new Date();
  const year = now.getFullYear() - 18;
  const month =
    String(now.getMonth() + 1).length === 1 ? `0${now.getMonth() + 1}` : String(now.getMonth() + 1);
  const day = String(now.getDate()).length === 1 ? `0${now.getDate()}` : String(now.getDate());
  return `${year}${month}${day}`;
}

/**
 * 验证15位身份证
 */
function validate15DigitIdcard(
  idcard: string,
  checkFullGrownDate: string,
  TipEnum: typeof DefaultIdcardTips
): DefaultIdcardTips {
  const year = parseInt(idcard.substring(6, 8), 10) + 1900;
  const regex = isLeapYear(year) ? IDCARD_REGEX.LEAP_YEAR_15 : IDCARD_REGEX.NORMAL_YEAR_15;

  if (!regex.test(idcard)) {
    return TipEnum.fail;
  }

  const birthdayValue = idcard.substring(6, 12);
  const fullBirthday =
    parseInt(birthdayValue, 10) < 10 ? `20${birthdayValue}` : `19${birthdayValue}`;

  return fullBirthday > checkFullGrownDate ? TipEnum.not18 : TipEnum.success;
}

/**
 * 验证18位身份证
 */
function validate18DigitIdcard(
  idcard: string,
  checkFullGrownDate: string,
  TipEnum: typeof DefaultIdcardTips
): DefaultIdcardTips {
  const year = parseInt(idcard.substring(6, 10), 10);
  const regex = isLeapYear(year) ? IDCARD_REGEX.LEAP_YEAR_18 : IDCARD_REGEX.NORMAL_YEAR_18;

  if (!regex.test(idcard)) {
    return TipEnum.fail;
  }

  // 计算校验位
  const idcardList = idcard.split('');
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idcardList[i], 10) * CHECK_CODE_WEIGHTS[i];
  }
  const checkCode = CHECK_CODE_MAP[sum % 11];

  if (checkCode.toUpperCase() !== idcardList[17].toUpperCase()) {
    return TipEnum.fail;
  }

  const birthdayValue = idcard.substring(6, 14);
  return birthdayValue > checkFullGrownDate ? TipEnum.not18 : TipEnum.success;
}

/**
 * @function checkIdcard
 * @description 身份证正确性校验
 * @param {string} idcard 身份证号码
 * @param {object} TipEnum 提示信息
 * @returns {DefaultIdcardTips} 身份证验证结果
 * @example
 * checkIdcard('11010519491231002X'); // '身份证验证通过'
 * checkIdcard('11010519491231002'); // '请填写正确的身份证号码'
 * checkIdcard('11010519491231002X', {
 *   success: '身份证验证通过',
 *   fail: '请填写正确的身份证号码',
 *   not18: '未满18岁暂不支持开户',
 * });
 */
export function checkIdcard(idcard: string, TipEnum = DefaultIdcardTips): DefaultIdcardTips {
  // 地区检验
  if (!AREA_MAP[parseInt(idcard.substring(0, 2), 10) as keyof typeof AREA_MAP]) {
    return TipEnum.fail;
  }

  const checkFullGrownDate = getFullGrownDate();

  // 根据身份证长度选择验证方法
  switch (idcard.length) {
    case 15:
      return validate15DigitIdcard(idcard, checkFullGrownDate, TipEnum);
    case 18:
      return validate18DigitIdcard(idcard, checkFullGrownDate, TipEnum);
    default:
      return TipEnum.fail;
  }
}
