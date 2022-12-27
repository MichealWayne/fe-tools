/**
 * @author Wayne
 * @Date 2022-06-07 11:21:34
 * @LastEditTime 2022-12-27 11:28:33
 */

/**
 * @function getColorRgbList
 * @description hexadecimal color to 255.#ff0000 -> [255, 0, 0];
 * @param {string} color hexadecimal number color
 * @return {number[]} rgb array
 */
export function getColorRgbList(color: string): number[] {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
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
  const rgbStr = getColorRgbList(str).join(',');
  const isLegalColor = rgbStr !== '';
  return `rgba(${isLegalColor ? rgbStr : '0,0,0'},${isLegalColor ? rate : 0})`;
}

/**
 * @function isTransparentColor
 * @param colorStr
 * @return {boolean}
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  return colorStr.replace(' ', '').indexOf('0)') > -1;
}

/**
 * @function getLightfulRgbList
 * @description light rgb color
 * @param {string} color hexadecimal number color
 * @param {number} weight lighting weight
 * @return {number[]}
 */
export function getLightfulRgbList(color: string, weight = 0): number[] {
  return getColorRgbList(color).map(data => {
    const colorData = ~~(data + data * weight);
    return colorData > 255 ? 255 : colorData;
  });
}
