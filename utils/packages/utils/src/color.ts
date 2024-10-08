/**
 * @module Color
 * @description handle color format
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:24:54
 */

/**
 * @function randomHexColor
 * @description 生成随机十六进制颜色
 * @return {string} 随机颜色值
 * @example
 * randomHexColor(); // '#ff0000'(randomly)
 */
export function randomHexColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];
 * @param {string} color 原始十六进制颜色值
 * @return {number[]} 转换后的颜色值
 * @example
 * getColorRgbArr('#ff0000'); // [255,0,0]
 * getColorRgbArr('#f00'); // [255,0,0]
 */
export function getColorRgbArr(color: string): number[] {
  const reg = /^#[\da-f]{3}([\da-f]{3})?$/i;

  // 处理简写
  const normalizedColor =
    color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
      : color;

  if (reg.test(normalizedColor)) {
    return [
      parseInt(normalizedColor.slice(1, 3), 16),
      parseInt(normalizedColor.slice(3, 5), 16),
      parseInt(normalizedColor.slice(5, 7), 16),
    ];
  }

  return [];
}

/**
 * @function getColorRgba
 * @description hexadecimal color string -> rgba
 * @param {string} str 原始十六进制颜色值
 * @param {number} rate 透明度,默认为1,取值范围[0,1]
 * @return {string} rgba颜色值，如'rgba(255,0,0,0.5)'
 * @need getColorRgb
 * @example
 * getColorRgba('#ff0000', 0.5); // 'rgba(255,0,0,0.5)'
 * getColorRgba('#ff0000'); // 'rgba(255,0,0,1)'
 */
export function getColorRgba(str: string, rate = 1): string {
  const rgbStr = getColorRgbArr(str).join(',');
  const isLegalColor = rgbStr !== '';
  return `rgba(${isLegalColor ? rgbStr : '0,0,0'},${isLegalColor ? rate : 0})`;
}

/**
 * @function isTransparentColor
 * @description rgb/rgba色值是否为透明色
 * @param {string} colorStr 颜色值
 * @return {boolean} 是否为透明色
 * @example
 * isTransparentColor('rgba(0, 0, 0, 0)'); // true
 * isTransparentColor('rgba(255, 255, 255, 1)'); // false
 * isTransparentColor('rgba(255, 255, 255, 0)'); // true
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  const regex = /^rgba\((\d+),(\d+),(\d+),([0-9]+)/i;
  return regex.test(colorStr.replace(/\s/g, '')) && parseFloat(RegExp.$4) === 0;
}
