/**
 * @module Others
 * @author Wayne
 * @Date 2023-02-06 21:17:44
 * @LastEditTime 2024-12-22 11:19:14
 */
/**
 * @function compareVersion
 * @description 版本比较。Compares version strings
 * @param {string} v1Str - 版本1。Version 1
 * @param {string} v2Str - 版本2。Version 2
 * @return {1|0|-1} 比较结果，1: v1 > v2, 0: v1 = v2, -1: v1 < v2。Comparison result, 1: v1 > v2, 0: v1 = v2, -1: v1 < v2
 * @example
 * compareVersion('1.1.8', '1.0.4'); // -> 1
 * compareVersion('1.0.2', '1.0.2'); // -> 0
 * compareVersion('2.0', '2.0.0'); // -> 0
 * compareVersion('3.0.1', '3.0.0.2'); // -> 1
 * compareVersion('1.1.1', '1.2.3'); // -> -1
 */
export declare function compareVersion(v1Str: string, v2Str: string): 1 | 0 | -1;
/**
 * @function digitUppercase
 * @description 数字金额转中文。Converts numeric amount to Chinese uppercase
 * @param {number} num - 数字金额。Numeric amount
 * @return {string} 中文金额。Chinese uppercase amount
 * @example
 * digitUppercase(1000); // '壹仟元整'
 * digitUppercase(-123.45); // '欠壹佰贰拾叁元肆角伍分'
 */
export declare function digitUppercase(num: number): string;
