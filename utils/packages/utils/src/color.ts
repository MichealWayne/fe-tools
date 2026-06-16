/**
 * @module Color
 * @description handle color format
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:24:54
 */

/**
 * @function randomHexColor
 * @description 生成随机十六进制颜色。Generates random hexadecimal color
 * @return {string} 随机颜色值。Random color value
 * @example
 * ```ts
 * randomHexColor(); // '#ff0000'(randomly)
 * ```
 */
export function randomHexColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];。Color format conversion. Converts hexadecimal color to RGB array
 * @param {string} color - 原始十六进制颜色值。The original hexadecimal color value
 * @return {number[]} 转换后的颜色值。The converted RGB color array
 * @example
 * ```ts
 * getColorRgbArr('#ff0000'); // [255,0,0]
 * getColorRgbArr('#f00'); // [255,0,0]
 * ```
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
 * @description hexadecimal color string -> rgba。Converts hexadecimal color string to rgba format
 * @param {string} str - 原始十六进制颜色值。The original hexadecimal color value
 * @param {number} rate - 透明度,默认为1,取值范围[0,1]。Opacity, default is 1, range [0,1]
 * @return {string} rgba颜色值，如'rgba(255,0,0,0.5)'。RGBA color value, e.g. 'rgba(255,0,0,0.5)'
 * @need getColorRgb
 * @example
 * ```ts
 * getColorRgba('#ff0000', 0.5); // 'rgba(255,0,0,0.5)'
 * getColorRgba('#ff0000'); // 'rgba(255,0,0,1)'
 * ```
 */
export function getColorRgba(str: string, rate = 1): string {
  const rgbStr = getColorRgbArr(str).join(',');
  const isLegalColor = rgbStr !== '';
  // rate 应在 [0,1] 范围内。旧实现不校验，getColorRgba('#ff0000', 5) 会返回 rgba(255,0,0,5)。
  // 这里将 rate clamp 到 [0,1] 范围。
  // rate should be in [0,1]. The old impl did not validate; clamp to valid range.
  const clampedRate = Math.max(0, Math.min(1, rate));
  return `rgba(${isLegalColor ? rgbStr : '0,0,0'},${isLegalColor ? clampedRate : 0})`;
}

/**
 * @function isTransparentColor
 * @description rgb/rgba色值是否为透明色。Checks if rgb/rgba color value is transparent
 * @param {string} colorStr - 颜色值。The color value to check
 * @return {boolean} 是否为透明色。Whether it is a transparent color
 * @example
 * ```ts
 * isTransparentColor('rgba(0, 0, 0, 0)'); // true
 * isTransparentColor('rgba(255, 255, 255, 1)'); // false
 * isTransparentColor('rgba(255, 255, 255, 0)'); // true
 * ```
 */
export function isTransparentColor(colorStr: string): boolean {
  if (!colorStr) return false;
  // 旧实现用废弃的 RegExp.$4 静态属性读取捕获组，依赖"最近一次"正则匹配，跨调用会污染；
  // 且正则第 4 组 [0-9]+ 不匹配小数点，导致 alpha=0.1 时只捕获到 '0' 被误判为透明。
  // 这里改用 exec 取捕获组，并把第 4 组改为 [0-9.]+ 以正确匹配小数 alpha。
  // The old impl used the deprecated RegExp.$4 static property (cross-call state pollution),
  // and the 4th capture group [0-9]+ did not match the decimal point, so alpha=0.1 was
  // mis-detected as transparent (only '0' was captured). Use exec() and match full alpha.
  const normalized = colorStr.replace(/\s/g, '');
  const match = /^rgba\(\d+,\d+,\d+,([0-9.]+)/i.exec(normalized);
  return match !== null && parseFloat(match[1]) === 0;
}
