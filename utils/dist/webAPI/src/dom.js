"use strict";
/**
 * @module dom
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableCP = exports.smoothScroll = exports.animateScrollTo = exports.requestAnimFrame = exports.setScrollTop = exports.getScrollPosition = exports.getScrollTop = exports.getOffsetPos = exports.escapeHTML = exports.setAttribute = exports.nodeListToArray = exports.hide = exports.elementContains = exports.insertBefore = exports.insertAfter = exports.removeClass = exports.addClass = exports.hasClass = exports.isBrowserTab = exports.isBrowser = void 0;
/**
 * @function isBrowser
 * @description 是否在浏览器环境下
 * @return {boolean}
 */
function isBrowser() {
    return ![typeof window, typeof document].includes('undefined');
}
exports.isBrowser = isBrowser;
/**
 * @function isBrowserTab
 * @description 当前页面是否显示
 * @return {boolean}
 */
function isBrowserTab() {
    return !document.hidden;
}
exports.isBrowserTab = isBrowserTab;
/**
 * @function hasClass
 * @param {Element} element
 * @param {string} className
 * @return {boolean}
 */
function hasClass(element, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(element.className);
}
exports.hasClass = hasClass;
/**
 * @function addClass
 * @param {Element} element
 * @param {string} className
 */
function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className += ' ' + className;
    }
}
exports.addClass = addClass;
/**
 * @function removeClass
 * @param {Element} element
 * @param {string} className
 */
function removeClass(element, className) {
    if (hasClass(element, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        element.className = element.className.replace(reg, ' ');
    }
}
exports.removeClass = removeClass;
/**
 * @function insertAfter
 * @description 在指定元素之后插入新元素
 * @param {dom element} el
 * @param {string} htmlString
 */
function insertAfter(el, htmlString) {
    return el.insertAdjacentHTML('afterend', htmlString);
}
exports.insertAfter = insertAfter;
/**
 * @function insertBefore
 * @description 在指定元素之前插入新元素
 * @param {dom element} el
 * @param {string} htmlString
 */
function insertBefore(el, htmlString) {
    return el.insertAdjacentHTML('beforebegin', htmlString);
}
exports.insertBefore = insertBefore;
/**
 * @function elementContains
 * @description 检查是否包含子元素
 * @param {dom element} parent
 * @param {dom element} child
 */
function elementContains(parent, child) {
    return parent !== child && parent.contains(child);
}
exports.elementContains = elementContains;
/**
 * @function hide
 * @description 隐藏元素
 * @param  {...dom element} el
 */
function hide() {
    var el = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        el[_i] = arguments[_i];
    }
    __spreadArray([], __read(el), false).forEach(function (e) { return (e.style.display = 'none'); });
}
exports.hide = hide;
/**
 * @function nodeListToArray
 * @description dom列表伪数组转为数组
 * @param {dom element list} nodeList
 */
function nodeListToArray(nodeList) {
    return __spreadArray([], __read(nodeList), false);
}
exports.nodeListToArray = nodeListToArray;
/**
 * @function setAttribute
 * @param {Element} node
 * @param {string} key
 * @param {string} value
 */
function setAttribute(node, key, value) {
    var tagName = node.tagName;
    switch (key) {
        case 'style':
            node.style.cssText = value;
            break;
        case 'value':
            tagName = (tagName || '').toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') {
                node.value = value;
            }
            else {
                // if it is not a input or textarea, use `setAttribute` to set
                node.setAttribute(key, value);
            }
            break;
        default:
            node.setAttribute(key, value);
            break;
    }
}
exports.setAttribute = setAttribute;
/**
 * @function escapeHTML
 * @param {string} str
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function (tag) {
        return ({
            '&': '&amp;',
            '<': '%lt;',
            '>': '%gt;',
            "'": '&#39;',
            '"': '&quot;',
        }[tag] || tag);
    });
}
exports.escapeHTML = escapeHTML;
/* scorll */
/**
 * @function getOffsetPos
 * @description 获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {DOMelement} element: 父节点
 * @returns { {left: number, top: number} }
 */
function getOffsetPos(element) {
    var pos = {
        left: 0,
        top: 0,
    };
    while (element) {
        pos.left += element.offsetLeft;
        pos.top += element.offsetTop;
        element = element.offsetParent;
    }
    return pos;
}
exports.getOffsetPos = getOffsetPos;
/**
 * @function getScrollTop
 * @description 获取滚动条距顶部的距离
 * @return {Number} 滚动高度
 */
function getScrollTop() {
    return ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
}
exports.getScrollTop = getScrollTop;
/**
 * @function getScrollPosition
 * @param {Element} el
 * @returns { {x: number, y: number} }
 */
function getScrollPosition(el) {
    if (el === void 0) { el = window; }
    return {
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.screenLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.screenTop,
    };
}
exports.getScrollPosition = getScrollPosition;
/**
 * @function setScrollTop
 * @description 设置滚动条距顶部的距离
 * @param {number} height: 滚动高度;
 * @return {number} value
 */
function setScrollTop(height) {
    window.scrollTo(0, height);
    return height;
}
exports.setScrollTop = setScrollTop;
exports.requestAnimFrame = (function () {
    if (typeof window !== 'undefined') {
        return (window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window['webkitRequestAnimationFrame']);
    }
    return function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
/**
 * @function animateScrollTo
 * @description 在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * (need getScrollTop, setScrollTop,requestAnimFrame)
 * @param {Number} to: 滚动高度
 * @param {Number} duration: 滚动时间
 */
function animateScrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return;
    }
    var diff = to - getScrollTop();
    if (diff === 0)
        return;
    var step = (diff / duration) * 10;
    requestAnimationFrame(function () {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTop(getScrollTop() + diff);
            return;
        }
        setScrollTop(getScrollTop() + step);
        if ((diff > 0 && getScrollTop() >= to) || (diff < 0 && getScrollTop() <= to)) {
            return;
        }
        animateScrollTo(to, duration - 16);
    });
}
exports.animateScrollTo = animateScrollTo;
/**
 * @function smoothScroll
 * @description 指定元素滚动到可视区域
 * @param {dom element} elemSelector
 */
function smoothScroll(elemSelector) {
    var _a;
    (_a = document.querySelector(elemSelector)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: 'smooth',
    });
}
exports.smoothScroll = smoothScroll;
/**
 * @function disableCP
 * @description 禁止网页复制粘贴
 */
function disableCP() {
    var html = document.querySelector('html');
    html.oncopy = function () { return false; };
    html.onpaste = function () { return false; };
}
exports.disableCP = disableCP;
