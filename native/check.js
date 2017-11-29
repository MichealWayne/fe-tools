/*
 * 信息验证
 * @author: Micheal Wang
 * @build time: 2017.10.10
 */

/*
* 简单验证身份证
* @param {String} str: 身份证字符串
* @return {Boolean}
*/
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/*
* 身份证校验
* @params {String} idcard: 身份证；
* @return {String} 验证信息
*/
function checkIdcard(idcard) {
    var Errors2 = [
        "身份证验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!",
        "未满18岁暂不支持开户!"
    ];
    var Errors = [
        "身份证验证通过!",
        "请填写正确的身份证号码",
        "请填写正确的身份证号码",
        "请填写正确的身份证号码",
        "请填写正确的身份证号码",
        "未满18岁暂不支持开户!"
    ];
    var t = new Date();
    var y = t.getFullYear() + '';
    //获取当前月份(0-11,0代表1月)
    var mo = t.getMonth() + 1 + '';
    var d = t.getDate() + '';
    if (mo.length < 2) {
        mo = '0' + mo;
    }
    if (d.length < 2) {
        d = '0' + d;
    }
    var checkFullGrownDate = y - 18 + mo + d;
    var birthdayValue;
    var area = {
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
    var idcard,
        Y,
        JYM;
    var S,
        M;
    var ereg;
    var idcard_array = [];
    idcard_array = idcard.split('');
    //地区检验
    if (area[parseInt(idcard.substr(0, 2))] == null)
        return Errors[4];
    //身份号码位数及格式检验
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
                    return Errors[5];
                } else {
                    return Errors[0];
                }

            } else {
                return Errors[2];
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
                        return Errors[5];
                    } else {
                        return Errors[0];
                    }

                } else {
                    return Errors[3];
                }

            } else
                return Errors[2];
            break;
        default:
            return Errors[1];
            break;
    }
}

/*
* 校验证件有效期
* @params {String} certValidDate: 证件有效期；
* @return {String} 错误信息或字符串‘true’
*/
function checkCertValidDate(certValidDate) {
    if (certValidDate == null || certValidDate == "") {
        return '证件有效期不能为空'
    }
    var t = new Date();
    var y = t.getFullYear() + '';
    var m = t.getMonth() + 1 + '';

    if (m.length < 2) {
        m = '0' + m;
    }
    var d = t.getDate() + '';
    if (d.length < 2) {
        d = '0' + d;
    }
    var cTime = y + '-' + m + '-' + d;
    if (opinionTimeNoEqual(cTime, certValidDate)) {
        return '证件有效期无效,必须大于当前时间';
    }
    return 'true';

}

/*
* 邮箱校验
* @params {String} strEmail: 邮箱；
* @return {String} 错误信息或字符串‘true’
*/
function checkEmail(strEmail) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/*
* 校验(国内)邮政编码
* @params {String} postcode: 邮政编码；
* @return {String} 错误信息或字符串‘true’
*/
function checkPostalCode(postcode) {
    if (postcode == null || postcode == "") {
        return '邮政编码不能为空'
    }
    var pattern = /^[0-9]{6}$/;
    if (!pattern.exec(postcode)) {
        return '邮政编码格式不正确'
    }
    return 'true';

}

/*
* 校验手机，电话号码，必须2选1
* @params {String} vcMobiletelno: 手机号码；
* @params {String} vcHometelno: 电话号码；
* @return {String} 错误信息或字符串‘true’
*/
function checkHometelnoAndMobiletelno(vcHometelno, vcMobiletelno) {
    var checkvcHometelnoFlag = 'false';
    var checkvcMobiletelnoFlag = 'false';
    if (vcHometelno != null && vcHometelno != "") {
        checkvcHometelnoFlag = 'true';
    }
    if (vcMobiletelno != null && vcMobiletelno != "") {
        checkvcMobiletelnoFlag = 'true';
    }
    if (checkvcHometelnoFlag == 'false' && checkvcMobiletelnoFlag == 'false') {
        return '电话号码和手机号码必须填写一项';
    }
    var pattern = /^[0-9]*$/;
    if (checkvcHometelnoFlag == 'true') {
        if (!pattern.exec(vcHometelno)) {
            return '电话号码格式不正确'
        }
    }
    if (checkvcMobiletelnoFlag == 'true') {
        if (!pattern.exec(vcMobiletelno)) {
            return '手机号码格式不正确'
        }
    }
    return 'true';
}

/*
* 校验手机号码（双重判断）
* (need getPhoneNumberType)
* @params {String} vcMobiletelno: 手机号码；
* @return {String} 错误信息或字符串‘true’
*/
function checkMobiletelno(vcMobiletelno) {
    if (vcMobiletelno == null || vcMobiletelno == "") {
        return '手机号码不能为空'
    }
    var pattern = /^1+[0-9]{10}$/;
    if (!pattern.exec(vcMobiletelno) || getPhoneNumberType(vcMobiletelno) < 0) {
        return '手机号码格式不正确'
    }
    return 'true';

}
/*
* 校验手机号码
* @params {String} vcMobiletelno: 手机号码；
* @return {String} 运营商或-1
*/
function getPhoneNumberType(number) {
    if(number.length != 11 || parseInt(number) != number) return -1;
    var yidong = "134|135|136|137|138|139|147|150|151|152|157|158|159|178|182|183|184|187|188";
    var liantong = "130|131|132|155|156|176|185|186|145|166";
    var dianxin = "133|153|177|180|181|189|199";
    var xuni = "170";
    
    var prefix = number.substr(0,3);
    if(yidong.indexOf(prefix) != -1){
        return 0;//移动
    } else if(liantong.indexOf(prefix) != -1) {
        return 1;//联通
    } else if(dianxin.indexOf(prefix) != -1) {
        return 2;//电信
    } else if (xuni.indexOf(prefix) != -1) {
        return 3;//虚拟运营商
    } else {
        return -1;
    }
}


/*
* 校验电话号码
* @params {String} vcHometelno: 电话号码；
* @return {String} 错误信息或字符串‘true’
*/
function checkHometelno(vcHometelno) {
    if (vcHometelno == null || vcHometelno == "") {
        return '电话号码不能为空'
    }

    var pattern = /^[0-9]*$/;
    if (!pattern.exec(vcHometelno)) {
        return '电话号码格式不正确'
    }
    return 'true';
}

/*
* 判断是否为URL地址
* @param  {String}: url字符串 
* @return {Boolean}
*/ 
function isUrl(str) { 
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str); 
}

/*
* 前端校验密码
* @params {String} pwd: 密码；
* @return {String || Number} 错误信息或密码强弱程度
*/
function checkpwdstrength(pwd) {
    if (pwd == null || pwd == '' || pwd.length < 6 || pwd.length > 12) {
        return '密码长度必须在6-12位之间';
    }
    var pattern1 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:<>?]){6,12}$/i);
    var pattern2 = pwd.match(/^([\w`=\\\[\];\',.\/~!@#$%^&*()_+|{}:"<>?])\1{5,11}$/i);
    var pattern3 = pwd.match(/^[a-zA-Z]*$/);
    var pattern4 = pwd.match(/^\d*$/);
    var pattern5 = pwd.match(/^[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]*$/);
    var pattern6 = pwd.match(/[-`=\\\[\];',.\/~!@#$%^&*()_+|{}:\"<>?]/);
    var pattern7 = pwd.match(/\d/);
    var pattern8 = pwd.match(/[a-zA-Z]/);
    if (pattern1 != null) {
        if (pattern2 == null) {
            if (pattern4 != null) {
                return '密码不能使用全数字';
            } else {
                if (pattern3 != null) {
                    return '密码不能使用全字母';
                } else {
                    if (pattern5 != null) {
                        return '密码不能使用全符号';
                    } else {
                        //这里是强度,好像我们的规矩不允许为弱密码
                        if (pattern6 != null &&
                            pattern7 != null &&
                            pattern8 != null) {
                            return 3; //强

                        } else if ((pattern6 != null && pattern7 != null) || (pattern6 != null && pattern8 != null) || (pattern7 != null && pattern8 != null)) {
                            return 2; //中
                        } else {
                            return 1; //弱
                        }
                    }
                }
            }
        } else {
            return '密码不能使用全部相同符号';
        }
    } else {
        return '密码不能包含非法字符，如双引号等';
    }
}