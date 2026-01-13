"use strict";
/**
 * @module Color
 * @description handle color format
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 13:24:54
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransparentColor = exports.getColorRgba = exports.getColorRgbArr = exports.randomHexColor = void 0;
/**
 * @function randomHexColor
 * @description 生成随机十六进制颜色。Generates random hexadecimal color
 * @return {string} 随机颜色值。Random color value
 * @example
 * randomHexColor(); // '#ff0000'(randomly)
 */
function randomHexColor() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}
exports.randomHexColor = randomHexColor;
/**
 * @function getColorRgbArr
 * @description 颜色格式转换。hexadecimal color to 255.#ff0000 -> [255, 0, 0];。Color format conversion. Converts hexadecimal color to RGB array
 * @param {string} color - 原始十六进制颜色值。The original hexadecimal color value
 * @return {number[]} 转换后的颜色值。The converted RGB color array
 * @example
 * getColorRgbArr('#ff0000'); // [255,0,0]
 * getColorRgbArr('#f00'); // [255,0,0]
 */
function getColorRgbArr(color) {
    var reg = /^#[\da-f]{3}([\da-f]{3})?$/i;
    // 处理简写
    var normalizedColor = color.length === 4
        ? "#".concat(color[1]).concat(color[1]).concat(color[2]).concat(color[2]).concat(color[3]).concat(color[3])
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
exports.getColorRgbArr = getColorRgbArr;
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
function getColorRgba(str, rate) {
    if (rate === void 0) { rate = 1; }
    var rgbStr = getColorRgbArr(str).join(',');
    var isLegalColor = rgbStr !== '';
    return "rgba(".concat(isLegalColor ? rgbStr : '0,0,0', ",").concat(isLegalColor ? rate : 0, ")");
}
exports.getColorRgba = getColorRgba;
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
function isTransparentColor(colorStr) {
    if (!colorStr)
        return false;
    var regex = /^rgba\((\d+),(\d+),(\d+),([0-9]+)/i;
    return regex.test(colorStr.replace(/\s/g, '')) && parseFloat(RegExp.$4) === 0;
}
exports.isTransparentColor = isTransparentColor;
