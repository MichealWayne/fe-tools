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
export declare function validatePassport(passport: string): boolean;
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
export declare function validateLicensePlate(licensePlate: string): boolean;
type PwdStrengthTips = {
    formatErr: string;
    allnumberErr: string;
    allwordErr: string;
    allsymbolErr: string;
    samesymbolErr: string;
    illegalityErr: string;
};
declare enum PwdStrengthTypes {
    weak = 1,
    average = 2,
    strong = 3
}
/**
 * @function checkPwdStrength
 * @description 检验密码强度（数字+字母+符号）。Validates password strength (numbers + letters + symbols)
 * @param {string} pwd - 待检查的密码。The password to check
 * @param {PwdStrengthTips} tips - 自定义密码强度提示信息。Custom password strength tip messages
 * @return {PwdStrengthTypes | string} 密码强度类型或提示信息。Password strength type or tip message
 */
export declare function checkPwdStrength(pwd: string, tips?: PwdStrengthTips): PwdStrengthTypes | string;
declare enum DefaultIdcardTips {
    success = "\u8EAB\u4EFD\u8BC1\u9A8C\u8BC1\u901A\u8FC7",
    fail = "\u8BF7\u586B\u5199\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1\u53F7\u7801",
    not18 = "\u672A\u6EE118\u5C81\u6682\u4E0D\u652F\u6301\u5F00\u6237"
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
export declare function checkIdcard(idcard: string, TipEnum?: typeof DefaultIdcardTips): DefaultIdcardTips;
export {};
