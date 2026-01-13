/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/**
 * @module Platform
 * @notice 存在复杂的判断场景可以直接使用ua-parser-js / mobile-detect.js
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-12-13 19:47:45
 */
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * @description 全小写的浏览器用户代理字符串（User Agent String，简称 UA），即navigator.userAgent的小写转换字符串
 */
export var ua = navigator.userAgent.toLowerCase();
/**
 * @function isBrowser
 * @description 检测代码是否在浏览器环境中运行（相对于Node.js/服务器端）。Detects if the code is running in a browser environment (vs Node.js/server-side)
 * @returns {boolean} 如果在浏览器中运行则为true，如果在Node.js或其他非浏览器环境中则为false。True if running in browser, false if in Node.js or other non-browser environment
 * @example
 * // Conditional code execution based on environment
 * if (isBrowser()) {
 *   // Browser-specific code
 *   document.addEventListener('DOMContentLoaded', initializeApp);
 *   localStorage.setItem('app_version', '1.0.0');
 * } else {
 *   // Node.js/server-side code
 *   const fs = require('fs');
 *   console.log('Running in Node.js environment');
 * }
 *
 * @example
 * // Universal/isomorphic code pattern
 * function getStorageValue(key, defaultValue) {
 *   if (isBrowser()) {
 *     return localStorage.getItem(key) || defaultValue;
 *   } else {
 *     // Server-side fallback or different storage mechanism
 *     return process.env[key] || defaultValue;
 *   }
 * }
 *
 * @example
 * // Feature detection with environment check
 * function initializeAnalytics() {
 *   if (!isBrowser()) {
 *     console.log('Analytics not available in server environment');
 *     return;
 *   }
 *
 *   // Browser-only analytics initialization
 *   if (window.gtag) {
 *     gtag('config', 'GA_MEASUREMENT_ID');
 *   }
 * }
 *
 * @since 1.0.0
 * @see {@link isPC} - Detect PC vs mobile environment
 * @see {@link getSystemOS} - Get operating system information
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window} - Browser Window object
 * @see {@link https://nodejs.org/api/globals.html} - Node.js global objects
 */
export function isBrowser() {
    return ![typeof window, typeof document].includes('undefined');
}
/**
 * @function isPC
 * @description 判断当前页面是否处于PC环境下（主要通过判断是否存在移动设备的关键字）。Determines whether the current page is in a PC environment (mainly by checking for mobile device keywords)
 * @return {boolean} 是否是PC环境。Whether it is a PC environment
 * @example
 * if (isPC()) {
 *    console.log('当前处在PC环境下')
 * }
 */
export function isPC() {
    return [
        'android',
        'iphone',
        'symbianos',
        'windows phone',
        'windows mobile',
        'windows ce',
        'ipad',
        'ipod',
        'mobile', // 通用移动设备关键字
    ].every(function (agent) { return ua.indexOf(agent) < 0; });
}
/**
 * @function isOpenHarmony
 * @description 判断当前页面是否处于OpenHarmony环境下。Determines whether the current page is in an OpenHarmony environment
 * @returns
 */
export function isOpenHarmony() {
    return ua.includes('openharmony');
}
/**
 * @function getPcExplore
 * @description 获取当前PC浏览器标识。Gets the current PC browser identifier
 * @return {string} 浏览器标识，如：'IE: 11.0'、'Chrome: 83.0.4103.116'、'Firefox: 77.0'、'Opera: 69.0.3686.77'、'Safari: 13.1.1'。Browser identifier, such as: 'IE: 11.0', 'Chrome: 83.0.4103.116', 'Firefox: 77.0', 'Opera: 69.0.3686.77', 'Safari: 13.1.1'
 */
export function getPcExplore() {
    var sys = {
        ie: null,
        edge: null,
        firefox: null,
        chrome: null,
        opera: null,
        safari: null,
    };
    var s = null;
    (s = ua.match(/rv:([\d.]+)\) like gecko/))
        ? (sys.ie = s[1])
        : (s = ua.match(/msie ([\d\.]+)/))
            ? (sys.ie = s[1])
            : (s = ua.match(/edge\/([\d\.]+)/))
                ? (sys.edge = s[1])
                : (s = ua.match(/firefox\/([\d\.]+)/))
                    ? (sys.firefox = s[1])
                    : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
                        ? (sys.opera = s[1])
                        : (s = ua.match(/chrome\/([\d\.]+)/))
                            ? (sys.chrome = s[1])
                            : (s = ua.match(/version\/([\d\.]+).*safari/))
                                ? (sys.safari = s[1])
                                : 0;
    if (sys.ie)
        return "IE: ".concat(sys.ie);
    if (sys.edge)
        return "EDGE: ".concat(sys.edge);
    if (sys.firefox)
        return "Firefox: ".concat(sys.firefox);
    if (sys.chrome)
        return "Chrome: ".concat(sys.chrome);
    if (sys.opera)
        return "Opera: ".concat(sys.opera);
    if (sys.safari)
        return "Safari: ".concat(sys.safari);
    return 'unkonwn';
}
/**
 * @function getSystemOS
 * @description 获取当前页面所在的系统标识
 * @return {string} 系统标识，如：'mac'、'windows'、'linux'、'ios'、'android'、'harmony'、'unknown'
 */
export function getSystemOS() {
    var appVersion = (navigator === null || navigator === void 0 ? void 0 : navigator.appVersion.toLowerCase()) || '';
    if (/mac/i.test(appVersion))
        return 'mac';
    if (/win/i.test(appVersion)) {
        if (/phone/i.test(ua))
            return 'windowsPhone'; // 合并windows和windowsPhone的检查
        return 'windows';
    }
    if (/linux/i.test(appVersion))
        return 'linux';
    if (/iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua))
        return 'ios';
    if (/android/i.test(ua))
        return 'android';
    if (/harmony/i.test(ua))
        return 'harmony'; // 华为鸿蒙系统: HarmonyOS/OpenHarmony
    return 'unknown';
}
/**
 * @function getMobilePlatform
 * @description 获取当前页面所处的移动设备标识（适用于纯移动端业务进行简单的iPhone还是安卓手机判断）
 * @return {string} 移动设备标识，如：'iphone'、'gphone'
 * @example
 * getMobilePlatform(); // 'iphone' or 'gphone'
 */
export function getMobilePlatform() {
    var info = {
        versions: {
            iPhone: ua.includes('iphone') || ua.includes('mac'),
            iPad: ua.includes('ipad'),
        },
    };
    return info.versions.iPhone || info.versions.iPad ? 'iphone' : 'gphone';
}
/**
 * @function getMobileOS
 * @description 获取当前页面所处的移动设备系统
 * @return {string} 移动设备系统，如：{'android': 0, 'ios': 11.2}
 */
export function getMobileOS() {
    var os = {
        android: 0,
        ios: 0,
    };
    try {
        // eslint-disable-next-line no-useless-escape
        var android = ua.match(/(android);?[\s\/]+([\d.]+)?/);
        var ios = ua.match(/([ipad,ipod,iphone]).*os\s([\d_]+)/);
        if (android)
            os.android = +android[2] || 0;
        if (ios)
            os.ios = +ios[2].replace(/_/g, '.') || 0;
    }
    catch (e) {
        return os;
    }
    return os;
}
/**
 * @function getMobileBrandIdentify
 * @description 获取当前移动设备的品牌标识（部分手机）
 * @returns {string} 手机品牌标识，如：'iphone'、'huawei'、'oppo'、'vivo'、'xiaomi'、'samsung'、'unknown'
 */
export function getMobileBrandIdentify() {
    var e_1, _a;
    var brandMatchers = [
        { regex: /iphone/, brand: 'iphone' },
        { regex: /huawei|honor/, brand: 'huawei' },
        { regex: /oppo|pacm00/, brand: 'oppo' },
        { regex: /vivo/, brand: 'vivo' },
        { regex: /mi\s|redmi|mix\s/, brand: 'xiaomi' },
        { regex: /sm-/, brand: 'samsung' },
    ];
    try {
        for (var brandMatchers_1 = __values(brandMatchers), brandMatchers_1_1 = brandMatchers_1.next(); !brandMatchers_1_1.done; brandMatchers_1_1 = brandMatchers_1.next()) {
            var matcher = brandMatchers_1_1.value;
            if (ua.match(matcher.regex)) {
                return matcher.brand;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (brandMatchers_1_1 && !brandMatchers_1_1.done && (_a = brandMatchers_1.return)) _a.call(brandMatchers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return 'unknown';
}
