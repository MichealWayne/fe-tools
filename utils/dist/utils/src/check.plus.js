"use strict";
/* eslint-disable no-useless-escape */
/**
 * @module Check.plus
 * @description check password functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdcard = exports.checkPwdStrength = void 0;
// todo 优化代码
var DefaultPwdStrengthTips;
(function (DefaultPwdStrengthTips) {
    DefaultPwdStrengthTips["formatErr"] = "\u5BC6\u7801\u957F\u5EA6\u5FC5\u987B\u57286-12\u4F4D\u4E4B\u95F4";
    DefaultPwdStrengthTips["allnumberErr"] = "\u5BC6\u7801\u4E0D\u80FD\u4F7F\u7528\u5168\u6570\u5B57";
    DefaultPwdStrengthTips["allwordErr"] = "\u5BC6\u7801\u4E0D\u80FD\u4F7F\u7528\u5168\u5B57\u6BCD";
    DefaultPwdStrengthTips["allsymbolErr"] = "\u5BC6\u7801\u4E0D\u80FD\u4F7F\u7528\u5168\u7B26\u53F7";
    DefaultPwdStrengthTips["samesymbolErr"] = "\u5BC6\u7801\u4E0D\u80FD\u4F7F\u7528\u5168\u90E8\u76F8\u540C\u7B26\u53F7";
    DefaultPwdStrengthTips["illegalityErr"] = "\u5BC6\u7801\u4E0D\u80FD\u5305\u542B\u975E\u6CD5\u5B57\u7B26\uFF0C\u5982\u53CC\u5F15\u53F7\u7B49";
})(DefaultPwdStrengthTips || (DefaultPwdStrengthTips = {}));
var PwdStrengthTypes;
(function (PwdStrengthTypes) {
    PwdStrengthTypes[PwdStrengthTypes["weak"] = 1] = "weak";
    PwdStrengthTypes[PwdStrengthTypes["average"] = 2] = "average";
    PwdStrengthTypes[PwdStrengthTypes["strong"] = 3] = "strong";
})(PwdStrengthTypes || (PwdStrengthTypes = {}));
/**
 * @function checkPwdStrength
 * @param {string} pwd
 * @return {PwdStrengthTypes | string}
 */
// eslint-disable-next-line complexity
function checkPwdStrength(pwd, TipEnum) {
    if (TipEnum === void 0) { TipEnum = DefaultPwdStrengthTips; }
    if (!pwd || pwd.length < 6 || pwd.length > 12) {
        return TipEnum.formatErr;
    }
    var pattern1 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:<>?]){6,12}$/i);
    var pattern2 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:"<>?])\1{5,11}$/i);
    var pattern3 = pwd.match(/^[a-zA-Z]*$/);
    var pattern4 = pwd.match(/^\d*$/);
    var pattern5 = pwd.match(/^[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]*$/);
    var pattern6 = pwd.match(/[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]/);
    var pattern7 = pwd.match(/\d/);
    var pattern8 = pwd.match(/[a-zA-Z]/);
    if (!pattern1) {
        return TipEnum.illegalityErr;
    }
    if (!pattern2) {
        return TipEnum.samesymbolErr;
    }
    if (pattern4) {
        return TipEnum.allnumberErr;
    }
    if (pattern3) {
        return TipEnum.allwordErr;
    }
    if (pattern5) {
        return TipEnum.allsymbolErr;
    }
    if (pattern6 !== null && pattern7 !== null && pattern8 !== null) {
        return PwdStrengthTypes.strong;
    }
    else if ((pattern6 !== null && pattern7 !== null) ||
        (pattern6 !== null && pattern8 !== null) ||
        (pattern7 !== null && pattern8 !== null)) {
        return PwdStrengthTypes.average;
    }
    else {
        return PwdStrengthTypes.weak;
    }
}
exports.checkPwdStrength = checkPwdStrength;
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
// eslint-disable-next-line complexity
function checkIdcard(idcard, TipEnum) {
    if (TipEnum === void 0) { TipEnum = DefaultIdcardTips; }
    var now = new Date();
    var y = String(now.getFullYear());
    var mo = String(now.getMonth());
    var d = String(now.getDate());
    if (mo.length < 2) {
        mo = "0".concat(mo);
    }
    if (d.length < 2) {
        d = "0".concat(d);
    }
    var checkFullGrownDate = parseInt(y, 10) - 18 + mo + d;
    var birthdayValue;
    var Y, JYM;
    var S, M;
    var ereg;
    var idcardList = idcard.split('');
    // 地区检验
    if (!AREA_MAP[parseInt(idcard.substring(0, 2), 10)])
        return TipEnum.fail;
    // 身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substring(6, 2), 10) + 1900) % 4 === 0 ||
                ((parseInt(idcard.substring(6, 2), 10) + 1900) % 100 === 0 &&
                    (parseInt(idcard.substring(6, 2), 10) + 1900) % 4 === 0)) {
                ereg =
                    /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            }
            else {
                ereg =
                    /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                birthdayValue = idcard.charAt(6) + idcard.charAt(7);
                if (parseInt(birthdayValue, 10) < 10) {
                    birthdayValue = "20".concat(birthdayValue);
                }
                else {
                    birthdayValue = "19".concat(birthdayValue);
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
                else {
                    return TipEnum.success;
                }
            }
            else {
                return TipEnum.fail;
            }
            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substring(6, 4), 10) % 4 === 0 ||
                (parseInt(idcard.substring(6, 4), 10) % 100 === 0 &&
                    parseInt(idcard.substring(6, 4), 10) % 4 === 0)) {
                ereg =
                    /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            }
            else {
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
                else {
                    return TipEnum.fail;
                }
            }
            else
                return TipEnum.fail;
            break;
        default:
            return TipEnum.fail;
    }
}
exports.checkIdcard = checkIdcard;
