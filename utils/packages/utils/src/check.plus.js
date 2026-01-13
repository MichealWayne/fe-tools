/* eslint-disable no-useless-escape */
/**
 * @module Check.plus
 * @description check password functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-06-15 19:27:39
 */
/**
 * @function validatePassport
 * @description (中国)护照号码校验。Chinese passport number validation
 * @param {string} passport - 护照号码。The passport number to validate
 * @returns {boolean} 是否为护照号码。Whether it is a valid passport number
 * @example
 * validatePassport('G12345678'); // false
 * validatePassport('D012345678'); // true
 * validatePassport('140123456'); // true
 * validatePassport('A12345678'); // false
 * validatePassport('111234567'); // false
 * validatePassport('G1234567'); // false
 * validatePassport('G1234567A'); // false
 */
export function validatePassport(passport) {
    var reg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
    return reg.test(passport);
}
/**
 * @function validateLicensePlate
 * @description (中国)车牌号校验。Chinese license plate validation
 * @param {string} licensePlate - 车牌号。The license plate number to validate
 * @returns {boolean} 是否为车牌号。Whether it is a valid license plate number
 * @example
 * validateLicensePlate('A12345X'); // true
 * validateLicensePlate('京A12345'); // true
 * validateLicensePlate('A12345'); // false
 * validateLicensePlate('浙123456'); // false
 */
export function validateLicensePlate(licensePlate) {
    var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
    return reg.test(licensePlate);
}
var DEFAULT_PWD_STRENGTH_TIPS = {
    formatErr: '密码长度必须在6-12位之间',
    allnumberErr: '密码不能使用全数字',
    allwordErr: '密码不能使用全字母',
    allsymbolErr: '密码不能使用全符号',
    samesymbolErr: '密码不能使用全部相同字符',
    illegalityErr: '密码不能包含非法字符，如双引号等',
};
var PwdStrengthTypes;
(function (PwdStrengthTypes) {
    PwdStrengthTypes[PwdStrengthTypes["weak"] = 1] = "weak";
    PwdStrengthTypes[PwdStrengthTypes["average"] = 2] = "average";
    PwdStrengthTypes[PwdStrengthTypes["strong"] = 3] = "strong";
})(PwdStrengthTypes || (PwdStrengthTypes = {}));
var isAllSameChar = function (pwd) { return /(^.)\1+$/.test(pwd); };
var hasNumber = function (pwd) { return /\d/.test(pwd); };
var hasLetter = function (pwd) { return /[a-zA-Z]/.test(pwd); };
var hasSymbol = function (pwd) { return /[\W_]/.test(pwd); };
/**
 * @function checkPwdStrength
 * @description 检验密码强度（数字+字母+符号）。Validates password strength (numbers + letters + symbols)
 * @param {string} pwd - 待检查的密码。The password to check
 * @param {PwdStrengthTips} tips - 自定义密码强度提示信息。Custom password strength tip messages
 * @return {PwdStrengthTypes | string} 密码强度类型或提示信息。Password strength type or tip message
 */
export function checkPwdStrength(pwd, tips) {
    if (tips === void 0) { tips = DEFAULT_PWD_STRENGTH_TIPS; }
    var formatErr = tips.formatErr, allnumberErr = tips.allnumberErr, allwordErr = tips.allwordErr, allsymbolErr = tips.allsymbolErr, samesymbolErr = tips.samesymbolErr, illegalityErr = tips.illegalityErr;
    if (!pwd || pwd.length < 6 || pwd.length > 12) {
        return formatErr;
    }
    if (isAllSameChar(pwd)) {
        return samesymbolErr;
    }
    var hasNum = hasNumber(pwd);
    var hasLtr = hasLetter(pwd);
    var hasSym = hasSymbol(pwd);
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
var DefaultIdcardTips;
(function (DefaultIdcardTips) {
    DefaultIdcardTips["success"] = "\u8EAB\u4EFD\u8BC1\u9A8C\u8BC1\u901A\u8FC7";
    DefaultIdcardTips["fail"] = "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801";
    DefaultIdcardTips["not18"] = "\u672A\u6EE118\u5C81\u6682\u4E0D\u652F\u6301\u5F00\u6237";
})(DefaultIdcardTips || (DefaultIdcardTips = {}));
/**
 * @function checkIdcard
 * @param {string} idcard
 * @return {DefaultIdcardTips}
 */
var AREA_MAP = {
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
var IDCARD_REGEX = {
    // 15位身份证正则
    LEAP_YEAR_15: /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/,
    NORMAL_YEAR_15: /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/,
    // 18位身份证正则
    LEAP_YEAR_18: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/,
    NORMAL_YEAR_18: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/,
};
// 校验位权重
var CHECK_CODE_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
var CHECK_CODE_MAP = '10X98765432';
/**
 * @function isLeapYear
 * @description 检查是否为闰年。Checks if a year is a leap year
 * @param {number} year - 要检查的年份。The year to check
 * @returns {boolean} 如果是闰年则返回true，否则返回false。Returns true if the year is a leap year, otherwise false
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * @function getFullGrownDate
 * @description 获取18岁生日日期字符串。Gets the date string for 18 years ago
 * @returns {string} 18岁生日日期字符串。The date string for 18 years ago
 */
function getFullGrownDate() {
    var now = new Date();
    var year = now.getFullYear() - 18;
    var month = String(now.getMonth() + 1).length === 1 ? "0".concat(now.getMonth() + 1) : String(now.getMonth() + 1);
    var day = String(now.getDate()).length === 1 ? "0".concat(now.getDate()) : String(now.getDate());
    return "".concat(year).concat(month).concat(day);
}
/**
 * @function validate15DigitIdcard
 * @description 验证15位身份证。Validates 15-digit ID card
 * @param {string} idcard - 身份证号码。The ID card number to validate
 * @param {string} checkFullGrownDate - 18岁生日日期字符串。The date string for 18 years ago
 * @param {typeof DefaultIdcardTips} TipEnum - 提示信息枚举。Tip messages enum
 * @returns {DefaultIdcardTips} 身份证验证结果。ID card validation result
 */
function validate15DigitIdcard(idcard, checkFullGrownDate, TipEnum) {
    var year = parseInt(idcard.substring(6, 8), 10) + 1900;
    var regex = isLeapYear(year) ? IDCARD_REGEX.LEAP_YEAR_15 : IDCARD_REGEX.NORMAL_YEAR_15;
    if (!regex.test(idcard)) {
        return TipEnum.fail;
    }
    var birthdayValue = idcard.substring(6, 12);
    var fullBirthday = parseInt(birthdayValue, 10) < 10 ? "20".concat(birthdayValue) : "19".concat(birthdayValue);
    return fullBirthday > checkFullGrownDate ? TipEnum.not18 : TipEnum.success;
}
/**
 * @function validate18DigitIdcard
 * @description 验证18位身份证。Validates 18-digit ID card
 * @param {string} idcard - 身份证号码。The ID card number to validate
 * @param {string} checkFullGrownDate - 18岁生日日期字符串。The date string for 18 years ago
 * @param {typeof DefaultIdcardTips} TipEnum - 提示信息枚举。Tip messages enum
 * @returns {DefaultIdcardTips} 身份证验证结果。ID card validation result
 */
function validate18DigitIdcard(idcard, checkFullGrownDate, TipEnum) {
    var year = parseInt(idcard.substring(6, 10), 10);
    var regex = isLeapYear(year) ? IDCARD_REGEX.LEAP_YEAR_18 : IDCARD_REGEX.NORMAL_YEAR_18;
    if (!regex.test(idcard)) {
        return TipEnum.fail;
    }
    // 计算校验位
    var idcardList = idcard.split('');
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        sum += parseInt(idcardList[i], 10) * CHECK_CODE_WEIGHTS[i];
    }
    var checkCode = CHECK_CODE_MAP[sum % 11];
    if (checkCode.toUpperCase() !== idcardList[17].toUpperCase()) {
        return TipEnum.fail;
    }
    var birthdayValue = idcard.substring(6, 14);
    return birthdayValue > checkFullGrownDate ? TipEnum.not18 : TipEnum.success;
}
/**
 * @function checkIdcard
 * @description 身份证正确性校验。ID card validation
 * @param {string} idcard - 身份证号码。The ID card number to validate
 * @param {object} TipEnum - 提示信息。Tip messages for validation results
 * @returns {DefaultIdcardTips} 身份证验证结果。ID card validation result
 * @example
 * checkIdcard('11010519491231002X'); // '身份证验证通过'
 * checkIdcard('11010519491231002'); // '请填写正确的身份证号码'
 * checkIdcard('11010519491231002X', {
 *   success: '身份证验证通过',
 *   fail: '请填写正确的身份证号码',
 *   not18: '未满18岁暂不支持开户',
 * });
 */
export function checkIdcard(idcard, TipEnum) {
    if (TipEnum === void 0) { TipEnum = DefaultIdcardTips; }
    // 地区检验
    if (!AREA_MAP[parseInt(idcard.substring(0, 2), 10)]) {
        return TipEnum.fail;
    }
    var checkFullGrownDate = getFullGrownDate();
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
