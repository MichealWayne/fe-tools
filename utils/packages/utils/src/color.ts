/**
 * @module Color
 * @description handle color format
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-05-31 15:56:53
 */

/**
 * @function randomHexColor
 * @description 生成随机十六进制颜色
 * @return {String}
 */
export function randomHexColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];
 * @param {string} color hexadecimal number color
 * @return {number[]} rgb array
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
  } else {
    return [];
  }
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
 * @description 是否为透色
 * @param {String} colorStr
 * @return {boolean}
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  return colorStr.replace(' ', '').indexOf('0)') > -1;
}
