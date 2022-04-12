"use strict";
/**
 * @model CSS
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyle = exports.getPrefix = void 0;
/**
 * @function getPrefix
 * @return {string} css前缀
 * @return {string}
 */
function getPrefix() {
    var vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o',
    };
    var testEl = document.createElement('div');
    if (testEl.style.transform === undefined) {
        for (var i in vendors) {
            if (testEl.style["".concat(i, "TransitionProperty")] !== undefined) {
                return vendors[i];
            }
        }
    }
    return '';
}
exports.getPrefix = getPrefix;
/**
 * @function getStyle
 * @description **getStyle(el, property)** get DOM style
 * @param {DOM Object} el element
 * @param {String} property css property
 * @return {Number | Undefined}
 */
function getStyle(el, property) {
    var _a;
    var value = el.currentStyle
        ? el.currentStyle[property]
        : (_a = document.defaultView) === null || _a === void 0 ? void 0 : _a.getComputedStyle(el, null).getPropertyValue(property);
    var matches = value && value.match(/^(\d+)(\.\d+)?px$/);
    return matches ? +matches[1] : undefined;
}
exports.getStyle = getStyle;
