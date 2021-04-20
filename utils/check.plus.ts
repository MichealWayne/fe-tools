/**
 * @module Check.plus
 * @description check functions
 */


export enum DefaultPwdStrengthTips {
    formatErr = '密码长度必须在6-12位之间',
    allnumberErr = '密码不能使用全数字',
    allwordErr = '密码不能使用全字母',
    allsymbolErr = '密码不能使用全符号',
    samesymbolErr = '密码不能使用全部相同符号',
    illegalityErr = '密码不能包含非法字符，如双引号等',
}

export enum PwdStrengthTypes {
    weak = 1,
    average = 2,
    strong = 3,
}

/**
 * @function checkPwdStrength
 * @param {string} pwd 
 * @return {PwdStrengthTypes | string}
 */
export function checkPwdStrength(pwd, TipEnum = DefaultPwdStrengthTips) {
    if (!pwd || pwd.length < 6 || pwd.length > 12) {
        return TipEnum.formatErr;
    }
    let pattern1 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:<>?]){6,12}$/i);
    let pattern2 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:"<>?])\1{5,11}$/i);
    let pattern3 = pwd.match(/^[a-zA-Z]*$/);
    let pattern4 = pwd.match(/^\d*$/);
    let pattern5 = pwd.match(/^[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]*$/);
    let pattern6 = pwd.match(/[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]/);
    let pattern7 = pwd.match(/\d/);
    let pattern8 = pwd.match(/[a-zA-Z]/);
    if (pattern1 !== null) {
        if (pattern2 === null) {
            if (pattern4 !== null) {
                return TipEnum.allnumberErr;
            } else {
                if (pattern3 !== null) {
                    return TipEnum.allwordErr;
                } else {
                    if (pattern5 !== null) {
                        return TipEnum.allsymbolErr;
                    } else {
                        if (pattern6 !== null &&
                            pattern7 !== null &&
                            pattern8 !== null) {
                            return PwdStrengthTypes.strong;

                        } else if (
                            (pattern6 !== null && pattern7 !== null) 
                            || (pattern6 !== null && pattern8 !== null) 
                            || (pattern7 !== null && pattern8 !== null)) {
                            return PwdStrengthTypes.average;
                        } else {
                            return PwdStrengthTypes.weak;
                        }
                    }
                }
            }
        } else {
            return TipEnum.samesymbolErr;
        }
    } else {
        return TipEnum.illegalityErr;
    }
}

export enum DefaultIdcardTips {
    success = '身份证验证通过',
    fail = '请填写正确的身份证号码',
    not18 = '未满18岁暂不支持开户',
}

/**
 * @function checkIdcard
 * @param {string} idcard 
 * @return {DefaultIdcardTips}
 */
export function checkIdcard(idcard: string, TipEnum = DefaultIdcardTips) {
    const area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    let t = new Date();
    let y = t.getFullYear() + '';
    // 获取当前月份(0-11,0代表1月)
    let mo = t.getMonth() + 1 + '';
    let d = t.getDate() + '';
    if (mo.length < 2) {
        mo = '0' + mo;
    }
    if (d.length < 2) {
        d = '0' + d;
    }
    let checkFullGrownDate = (parseInt(y) - 18) + mo + d;
    let birthdayValue;
    
    let Y,
        JYM;
    let S,
        M;
    let ereg;
    let idcard_array = idcard.split('');

    // 地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null)
        return TipEnum.fail;
    // 身份号码位数及格式检验
    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
            }
            if (ereg.test(idcard)) {
                birthdayValue = idcard.charAt(6) + idcard.charAt(7);
                if (parseInt(birthdayValue) < 10) {
                    birthdayValue = '20' + birthdayValue;
                } else {
                    birthdayValue = '19' + birthdayValue;
                }
                birthdayValue = birthdayValue + idcard.charAt(8) + idcard.charAt(9) + idcard.charAt(10) + idcard.charAt(11);
                if (birthdayValue > checkFullGrownDate) {
                    return TipEnum.not18;
                } else {
                    return TipEnum.success;
                }

            } else {
                return TipEnum.fail;
            }

            break;
        case 18:
            //18位身份号码检测
            //出生日期的合法性检查
            //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
            //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
            } else {
                ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
            }
            if (ereg.test(idcard)) { //测试出生日期的合法性
                //计算校验位
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 +
                    (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 +
                    (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 +
                    (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 +
                    (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 +
                    (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 +
                    (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 +
                    parseInt(idcard_array[7]) * 1 +
                    parseInt(idcard_array[8]) * 6 +
                    parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1); //判断校验位
                if (M == idcard_array[17]) {
                    birthdayValue = idcard.charAt(6) + idcard.charAt(7) + idcard.charAt(8) + idcard.charAt(9) + idcard.charAt(10) + idcard.charAt(11) + idcard.charAt(12) + idcard.charAt(13);
                    if (birthdayValue > checkFullGrownDate) {
                        return TipEnum.not18;
                    } else {
                        return TipEnum.success;
                    }

                } else {
                    return TipEnum.fail;
                }

            } else
                return TipEnum.fail;
            break;
        default:
            return TipEnum.fail;
            break;
    }
}