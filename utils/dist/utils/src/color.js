"use strict";
/**
 * @module Color
 * @description handle color format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTransparentColor = exports.getColorRgba = exports.getColorRgbArr = exports.randomHexColor = void 0;
/**
 * @function randomHexColor
 * @return {String}
 */
function randomHexColor() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}
exports.randomHexColor = randomHexColor;
/**
 * @function getColorRgbArr
 * @description hexadecimal color to 255.#ff0000 -> [255, 0, 0];
 * @param {string} color hexadecimal number color
 * @return {number[]} rgb array
 */
function getColorRgbArr(color) {
    var reg = /^#[\da-f]{3}([\da-f]{3})?$/i;
    var sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i++) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x".concat(sColor.slice(i, i + 2)), 16));
        }
        return sColorChange;
    }
    else {
        return [];
    }
}
exports.getColorRgbArr = getColorRgbArr;
/**
 * @function getColorRgba
 * @description hexadecimal color string -> rgba
 * @param {string} str hex color string
 * @param {number} rate
 * @return {string}
 * @need getColorRgb
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
 * @param colorStr
 * @return {boolean}
 */
function isTransparentColor(colorStr) {
    if (!colorStr)
        return false;
    return colorStr.replace(' ', '').indexOf('0)') > -1;
}
exports.isTransparentColor = isTransparentColor;
