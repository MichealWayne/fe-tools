/**
 * @module Color
 * @description handle color format
 */

/**
 * @function randomHexColor
 * @return {String}
 */
export function randomHexColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * @function getColorRgb
 * @param {string} color : hexadecimal number color
 * @return {array} 255色彩数组
 */
export function getColorRgb(color: string) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  let sColor = color.toLowerCase();

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }

    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`, 10));
    }
    return sColorChange;
  }

  return sColor;
}
