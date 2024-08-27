/* eslint-disable no-useless-escape */
/**
 * @module Check.plus
 * @description check password functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:22:23
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
// eslint-disable-next-line complexity
/**
 * @function checkIdcard
 * @description 身份证正确性校验
 * @param {string} idcard 身份证号码
 * @param {object} TipEnum 提示信息
 * @returns {DefaultIdcardTips} 身份证验证结果
 */
export function checkIdcard(idcard: string, TipEnum = DefaultIdcardTips) {
  const now = new Date();
  const y = String(now.getFullYear());
  let mo = String(now.getMonth());
  let d = String(now.getDate());
  if (mo.length < 2) {
    mo = `0${mo}`;
  }
  if (d.length < 2) {
    d = `0${d}`;
  }
  const checkFullGrownDate = parseInt(y, 10) - 18 + mo + d;
  let birthdayValue;
  let Y, JYM;
  let S, M;
  let ereg;

  const idcardList = idcard.split('');

  // 地区检验
  if (!AREA_MAP[parseInt(idcard.substring(0, 2), 10) as keyof typeof AREA_MAP]) return TipEnum.fail;
  // 身份号码位数及格式检验
  switch (idcard.length) {
    case 15:
      if (
        (parseInt(idcard.substring(6, 2), 10) + 1900) % 4 === 0 ||
        ((parseInt(idcard.substring(6, 2), 10) + 1900) % 100 === 0 &&
          (parseInt(idcard.substring(6, 2), 10) + 1900) % 4 === 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
      } else {
        ereg =
          /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        birthdayValue = idcard.charAt(6) + idcard.charAt(7);
        if (parseInt(birthdayValue, 10) < 10) {
          birthdayValue = `20${birthdayValue}`;
        } else {
          birthdayValue = `19${birthdayValue}`;
        }
        birthdayValue =
          birthdayValue +
          idcard.charAt(8) +
          idcard.charAt(9) +
          idcard.charAt(10) +
          idcard.charAt(11);
        if (birthdayValue > checkFullGrownDate) {
          return TipEnum.not18;
        }
        return TipEnum.success;
      }
      return TipEnum.fail;
    case 18:
      //18位身份号码检测
      //出生日期的合法性检查
      //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
      //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
      if (
        parseInt(idcard.substring(6, 4), 10) % 4 === 0 ||
        (parseInt(idcard.substring(6, 4), 10) % 100 === 0 &&
          parseInt(idcard.substring(6, 4), 10) % 4 === 0)
      ) {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
      } else {
        ereg =
          /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        // 测试出生日期的合法性, 计算校验位
        S =
          (parseInt(idcardList[0]) + parseInt(idcardList[10])) * 7 +
          (parseInt(idcardList[1]) + parseInt(idcardList[11])) * 9 +
          (parseInt(idcardList[2]) + parseInt(idcardList[12])) * 10 +
          (parseInt(idcardList[3]) + parseInt(idcardList[13])) * 5 +
          (parseInt(idcardList[4]) + parseInt(idcardList[14])) * 8 +
          (parseInt(idcardList[5]) + parseInt(idcardList[15])) * 4 +
          (parseInt(idcardList[6]) + parseInt(idcardList[16])) * 2 +
          parseInt(idcardList[7]) * 1 +
          parseInt(idcardList[8]) * 6 +
          parseInt(idcardList[9]) * 3;
        Y = S % 11;
        M = 'F';
        JYM = '10X98765432';
        // 判断校验位
        M = JYM.substring(Y, 1);
        if (M === idcardList[17]) {
          birthdayValue =
            idcard.charAt(6) +
            idcard.charAt(7) +
            idcard.charAt(8) +
            idcard.charAt(9) +
            idcard.charAt(10) +
            idcard.charAt(11) +
            idcard.charAt(12) +
            idcard.charAt(13);

          return birthdayValue > checkFullGrownDate ? TipEnum.not18 : TipEnum.success;
        }
        return TipEnum.fail;
      }
      return TipEnum.fail;
    default:
      return TipEnum.fail;
  }
}
