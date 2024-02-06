/**
 * @module Color
 * @description handle color format
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-02-04 16:21:16
 */

/**
 * @function randomHexColor
 * @description 生成随机十六进制颜色
 * @return {String}
 * @example
 * const color = randomHexColor(); // 随机的十六进制颜色
 */
export function randomHexColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];
 * @param {string} color hexadecimal number color
 * @return {number[]} rgb array
 * @example
 * getColorRgbArr('#ff0000'); // [255,0,0]
 */
export function getColorRgbArr(color: string): number[] {
  const reg = /^#[\da-f]{3}([\da-f]{3})?$/i;

  let sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i++) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }

    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 16));
    }
    return sColorChange;
  }
  return [];
}

/**
 * @function getColorRgba
 * @description hexadecimal color string -> rgba
 * @param {string} str hex color string
 * @param {number} rate
 * @return {string}
 * @need getColorRgb
 */
export function getColorRgba(str: string, rate = 1): string {
  const rgbStr = getColorRgbArr(str).join(',');
  const isLegalColor = rgbStr !== '';
  return `rgba(${isLegalColor ? rgbStr : '0,0,0'},${isLegalColor ? rate : 0})`;
}

/**
 * @function isTransparentColor
 * @description rgb/rgba色值是否为透明色
 * @param {string} colorStr
 * @return {boolean}
 * @example
 * console.log(isTransparentColor('rgba(0, 0, 0, 0)')); // true
 * console.log(isTransparentColor('rgba(255, 255, 255, 1)')); // false
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  const regex = /^rgba\((\d+),(\d+),(\d+),([0-9]+)/i;
  return regex.test(colorStr.replace(/\s/g, '')) && parseFloat(RegExp.$4) === 0;
}
