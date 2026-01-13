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
 * randomHexColor(); // '#ff0000'(randomly)
 */
export declare function randomHexColor(): string;
/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];。Color format conversion. Converts hexadecimal color to RGB array
 * @param {string} color - 原始十六进制颜色值。The original hexadecimal color value
 * @return {number[]} 转换后的颜色值。The converted RGB color array
 * @example
 * getColorRgbArr('#ff0000'); // [255,0,0]
 * getColorRgbArr('#f00'); // [255,0,0]
 */
export declare function getColorRgbArr(color: string): number[];
/**
 * @function getColorRgba
 * @description hexadecimal color string -> rgba。Converts hexadecimal color string to rgba format
 * @param {string} str - 原始十六进制颜色值。The original hexadecimal color value
 * @param {number} rate - 透明度,默认为1,取值范围[0,1]。Opacity, default is 1, range [0,1]
 * @return {string} rgba颜色值，如'rgba(255,0,0,0.5)'。RGBA color value, e.g. 'rgba(255,0,0,0.5)'
 * @need getColorRgb
 * @example
 * getColorRgba('#ff0000', 0.5); // 'rgba(255,0,0,0.5)'
 * getColorRgba('#ff0000'); // 'rgba(255,0,0,1)'
 */
export declare function getColorRgba(str: string, rate?: number): string;
/**
 * @function isTransparentColor
 * @description rgb/rgba色值是否为透明色。Checks if rgb/rgba color value is transparent
 * @param {string} colorStr - 颜色值。The color value to check
 * @return {boolean} 是否为透明色。Whether it is a transparent color
 * @example
 * isTransparentColor('rgba(0, 0, 0, 0)'); // true
 * isTransparentColor('rgba(255, 255, 255, 1)'); // false
 * isTransparentColor('rgba(255, 255, 255, 0)'); // true
 */
export declare function isTransparentColor(colorStr: string): boolean;
