"use strict";
/**
 * @module Color
 * @description handle color format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorRgb = exports.randomHexColor = void 0;
/**
 * @function randomHexColor
 * @return {String}
 */
function randomHexColor() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}
exports.randomHexColor = randomHexColor;
/**
 * @function getColorRgb
 * @param {string} color : hexadecimal number color
 * @return {array} 255色彩数组
 */
function getColorRgb(color) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = color.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = '#';
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x".concat(sColor.slice(i, i + 2)), 10));
        }
        return sColorChange;
    }
    return sColor;
}
exports.getColorRgb = getColorRgb;
