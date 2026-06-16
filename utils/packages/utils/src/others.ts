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
 * @description 版本比较。Compares version strings
 * @param {string} v1Str - 版本1。Version 1
 * @param {string} v2Str - 版本2。Version 2
 * @return {1|0|-1} 比较结果，1: v1 > v2, 0: v1 = v2, -1: v1 < v2。Comparison result, 1: v1 > v2, 0: v1 = v2, -1: v1 < v2
 * @example
 * ```ts
 * compareVersion('1.1.8', '1.0.4'); // -> 1
 * compareVersion('1.0.2', '1.0.2'); // -> 0
 * compareVersion('2.0', '2.0.0'); // -> 0
 * compareVersion('3.0.1', '3.0.0.2'); // -> 1
 * compareVersion('1.1.1', '1.2.3'); // -> -1
 * ```
 */
export function compareVersion(v1Str: string, v2Str: string) {
  const v1 = v1Str.split('.');
  const v2 = v2Str.split('.');

  const len = Math.max(v1.length, v2.length);

  for (let i = 0; i < len; i++) {
    // 旧实现对缺段直接 parseInt(undefined) 得 NaN，靠 NaN 比较恒为 false 侥幸把缺段当 0。
    // 这里显式把缺段/非法段当作 0，语义清晰且避免依赖 NaN 比较的隐式行为。
    // The old impl relied on NaN comparison (always false) to treat missing segments as 0.
    // Normalize missing/invalid segments to 0 explicitly for clarity.
    const num1 = parseInt(v1[i], 10) || 0;
    const num2 = parseInt(v2[i], 10) || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

/**
 * @function digitUppercase
 * @description 数字金额转中文。Converts numeric amount to Chinese uppercase
 * @param {number} num - 数字金额。Numeric amount
 * @return {string} 中文金额。Chinese uppercase amount
 * @example
 * ```ts
 * digitUppercase(1000); // '壹仟元整'
 * digitUppercase(-123.45); // '欠壹佰贰拾叁元肆角伍分'
 * ```
 */
export function digitUppercase(num: number): string {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ];
  const head = num < 0 ? '欠' : '';
  // 旧实现直接 mutate 入参 num（num = Math.abs(num)），调用方复用该变量会受副作用影响。
  // 修复：用局部变量 n 替代。
  // The old impl mutated the input num directly (num = Math.abs(num)), causing side effects
  // for callers that reuse the variable. Fix: use a local variable n instead.
  let n = Math.abs(num);

  let resStr = '';
  if (n === 0) return `${head}零元整`;

  // 处理小数部分
  const cents = Math.round((n - Math.floor(n)) * 100); // 取小数点后两位
  if (cents > 0) {
    const jiao = Math.floor(cents / 10);
    const fen = cents % 10;
    resStr +=
      (jiao > 0 ? digit[jiao] + fraction[0] : '') + (fen > 0 ? digit[fen] + fraction[1] : '');
  } else {
    resStr = '整';
  }

  // 处理整数部分
  n = Math.floor(n); // 只保留整数部分
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let tempStr = '';
    let needZero = false;
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      const digitIndex = n % 10;
      n = Math.floor(n / 10);
      tempStr = digit[digitIndex] + unit[1][j] + (digitIndex > 0 ? tempStr : needZero ? '零' : '');
      needZero = digitIndex === 0;
    }
    resStr = tempStr.replace(/零+$/, '') + unit[0][i] + resStr;
  }

  return head + resStr.replace(/零+/g, '零').replace(/零元/, '元').replace(/^元/, '零元');
}
