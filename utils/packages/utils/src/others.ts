/**
 * @module Others
 * @author Wayne
 * @Date 2023-02-06 21:17:44
 * @LastEditTime 2024-12-22 11:19:14
 */

// 复杂比较请见https://github.com/omichelsen/compare-versions
/* Compare version strings.
 *
 * |Name  |Desc              |
 * |------|------------------|
 * |v1    |Version to compare|
 * |v2    |Version to compare|
 * |return|Comparison result |
 */

/**
 * @function compareVersion
 * @description 版本比较
 * @param {string} v1Str 版本1
 * @param {string} v2Str 版本2
 * @return {1|0|-1} 比较结果，1: v1 > v2, 0: v1 = v2, -1: v1 < v2
 * @example
 * compareVersion('1.1.8', '1.0.4'); // -> 1
 * compareVersion('1.0.2', '1.0.2'); // -> 0
 * compareVersion('2.0', '2.0.0'); // -> 0
 * compareVersion('3.0.1', '3.0.0.2'); // -> 1
 * compareVersion('1.1.1', '1.2.3'); // -> -1
 */
export function compareVersion(v1Str: string, v2Str: string) {
  const v1 = v1Str.split('.');
  const v2 = v2Str.split('.');

  const len = Math.max(v1.length, v2.length);

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

/**
 * @function digitUppercase
 * @description 数字金额转中文
 * @param  {number} num 数字金额
 * @return {string} 中文金额
 * @example
 * digitUppercase(1000); // '壹仟元整'
 * digitUppercase(-123.45); // '欠壹佰贰拾叁元肆角伍分'
 */
export function digitUppercase(num: number): string {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = num < 0 ? '欠' : '';
  num = Math.abs(num);

  let resStr = '';

  // 处理小数部分
  const cents = Math.round((num - Math.floor(num)) * 100); // 取小数点后两位
  if (cents > 0) {
    const jiao = Math.floor(cents / 10);
    const fen = cents % 10;
    resStr +=
      (jiao > 0 ? digit[jiao] + fraction[0] : '') + (fen > 0 ? digit[fen] + fraction[1] : '');
  } else {
    resStr = '整';
  }

  // 处理整数部分
  num = Math.floor(num); // 只保留整数部分
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let tempStr = '';
    let needZero = false;
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      const digitIndex = num % 10;
      num = Math.floor(num / 10);
      tempStr = digit[digitIndex] + unit[1][j] + (digitIndex > 0 ? tempStr : needZero ? '零' : '');
      needZero = digitIndex === 0;
    }
    resStr = tempStr.replace(/零+$/, '') + unit[0][i] + resStr;
  }

  return head + resStr.replace(/零+/g, '零').replace(/零元/, '元').replace(/^元/, '零元');
}
