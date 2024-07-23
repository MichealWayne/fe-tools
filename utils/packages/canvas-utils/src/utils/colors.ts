/**
 * @module Colors
 * @author Wayne
 * @Date 2022-06-07 11:21:34
 * @LastEditTime 2022-12-27 11:28:33
 */

/**
 * @function getColorRgbList
 * @description hexadecimal color to 255.#ff0000 -> [255, 0, 0];支持标准（#RRGGBB）和简写（#RGB）格式。
 * @param {String} color hexadecimal number color
 * @return {Number[]} rgb array
 * @example
 * getColorRgbList('#f00') => [255, 0, 0]
 * getColorRgbList('#0000FF') => [0, 0, 255]
 * getColorRgbList('#aaBB99') => [170, 187, 153]
 */
export function getColorRgbList(color: string): number[] {
  // 校验并处理颜色代码的正则表达式，支持简写形式
  const reg = /^#([0-9a-fA-F]{3}){1,2}$/;
  if (!reg.test(color)) {
    return [];
  }

  // 如果是简写形式，将其转换为完整形式
  const colorFormatted = color.length === 4 ? color.replace(/([0-9a-fA-F])/g, '$1$1') : color;

  // 提取并转换颜色值
  return (
    colorFormatted
      .substring(1)
      .match(/.{2}/g)
      ?.map(hex => parseInt(hex, 16)) || []
  );
}

/**
 * @function getColorRgba
 * @description 十六进制颜色转rgba。hexadecimal color string -> rgba
 * @param {String} str hex color string
 * @param {Number} opacity
 * @return {String}
 * @need getColorRgb
 * @example
 * getColorRgba('#f00') => 'rgba(255,0,0,1)'
 * getColorRgba('#f00', 0.5) => 'rgba(255,0,0,0.5)'
 * getColorRgba('#0000FF') => 'rgba(0,0,255,1)'
 * getColorRgba('#0000FF', 0.1) => 'rgba(0,0,255,0.1)'
 */
export function getColorRgba(str: string, opacity = 1): string {
  const colorList = getColorRgbList(str);
  const isLegalColor = colorList.length === 3;

  return `rgba(${isLegalColor ? colorList.join(',') : '0,0,0'},${isLegalColor ? opacity : 0})`;
}

/**
 * @function isTransparentColor
 * @description 是否为透明色
 * @param {String} colorStr
 * @return {Boolean}
 * @example
 * isTransparentColor('') => false
 * isTransparentColor('rgba(255,0,0,0)') => true
 * isTransparentColor('rgba(255,0,0,1)') => false
 * isTransparentColor(getColorRgba('#f00').toString()) => false
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  return colorStr.replace(/\s/g, '').slice(-2) === '0)';
}

/**
 * @function getLightfulRgbList
 * @description 十六进制颜色变浅（亮色）
 * @param {String} color hexadecimal number color
 * @param {Number} weight lighting weight
 * @return {[Red, Green, Blue]}
 * @example
 * getLightfulRgbList('#f00') => [255, 0, 0]
 * getLightfulRgbList('#f00', 0.5) => [255, 128, 128]
 * getLightfulRgbList('#0000FF') => [0, 0, 255]
 * getLightfulRgbList('#0000FF', 0.5) => [0, 0, 128]
 * getLightfulRgbList('#aaBB99') => [170, 187, 153]
 * getLightfulRgbList('#aaBB99', 0.5) => [170, 187, 153]
 */
export function getLightfulRgbList(color: string, weight = 0): number[] {
  return getColorRgbList(color).map(data => Math.min(255, data + Math.round(data * weight)));
}
