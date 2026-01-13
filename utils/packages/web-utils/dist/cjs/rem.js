"use strict";
/**
 * @model rem
 * @desc 单位1rem = 75px(mobile)；1rem = 54px(pc)。（当window.norem存在时，则不设置rem单位）
 * @alias window.flexible
 * @property {Number} dpr 设备屏幕分辨率
 * @property {Number} rem rem比例
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-02-21 11:12:35
 */
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("./platform");
var remRate = 1;
(function (win) {
    // no rem set
    if (window.norem)
        return false;
    var doc = win.document;
    var docEl = doc.documentElement;
    var dpr = 1;
    var tid;
    var flexible = {};
    if ((0, platform_1.isPC)()) {
        docEl.style.fontSize = '54px';
        return false;
    }
    /**
     * @function refreshRem
     * @description 重新根据屏幕调整rem单位。Re-adjusts rem units based on screen size
     * @example
     * window.flexible.refreshRem();
     */
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        width = width > 540 ? 540 : width;
        var rem = (width / 10) * remRate;
        docEl.style.fontSize = "".concat(rem, "px");
        flexible.rem = rem;
        flexible.oriRem = width / 10;
    }
    win.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = win.setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = win.setTimeout(refreshRem, 300);
        }
    }, false);
    if (doc.readyState === 'complete') {
        refreshRem();
    }
    else {
        doc.addEventListener('DOMContentLoaded', function () {
            refreshRem();
        }, false);
    }
    refreshRem();
    flexible.dpr = dpr;
    flexible.refreshRem = refreshRem;
    /**
     * @function rem2px
     * @description **window.flexible.rem2px(d)**。rem单位转px
     * @param  {Number | String} remVal rem值
     * @return {String}   转换后px值
     * @example
     * window.flexible.rem2px('1rem');  // '75px'
     */
    flexible.rem2px = function (remVal) {
        var val = parseFloat(remVal) * (Number(flexible.rem) || 0);
        if (typeof remVal === 'string' && remVal.match(/rem$/)) {
            val = "".concat(val, "px");
        }
        return val;
    };
    /**
     * @function px2rem
     * @description **window.flexible.px2rem(d)**。rem单位转px
     * @param  {Number | String} pxVal px值
     * @return {String}   转换后rem值
     * @example
     * window.flexible.rem2px('75px');  // '1rem'
     */
    flexible.px2rem = function (pxVal) {
        var val = parseFloat(pxVal) / (Number(flexible.rem) || 0);
        if (typeof pxVal === 'string' && pxVal.match(/px$/)) {
            val = "".concat(val, "rem");
        }
        return val;
    };
    win.flexible = flexible;
})(window);
