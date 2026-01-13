/**
 * @module Platform
 * @notice 存在复杂的判断场景可以直接使用ua-parser-js / mobile-detect.js
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2025-12-13 19:47:45
 */
/**
 * @description 全小写的浏览器用户代理字符串（User Agent String，简称 UA），即navigator.userAgent的小写转换字符串
 */
export declare const ua: string;
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
export declare function isBrowser(): boolean;
/**
 * @function isPC
 * @description 判断当前页面是否处于PC环境下（主要通过判断是否存在移动设备的关键字）。Determines whether the current page is in a PC environment (mainly by checking for mobile device keywords)
 * @return {boolean} 是否是PC环境。Whether it is a PC environment
 * @example
 * if (isPC()) {
 *    console.log('当前处在PC环境下')
 * }
 */
export declare function isPC(): boolean;
/**
 * @function isOpenHarmony
 * @description 判断当前页面是否处于OpenHarmony环境下。Determines whether the current page is in an OpenHarmony environment
 * @returns
 */
export declare function isOpenHarmony(): boolean;
/**
 * @function getPcExplore
 * @description 获取当前PC浏览器标识。Gets the current PC browser identifier
 * @return {string} 浏览器标识，如：'IE: 11.0'、'Chrome: 83.0.4103.116'、'Firefox: 77.0'、'Opera: 69.0.3686.77'、'Safari: 13.1.1'。Browser identifier, such as: 'IE: 11.0', 'Chrome: 83.0.4103.116', 'Firefox: 77.0', 'Opera: 69.0.3686.77', 'Safari: 13.1.1'
 */
export declare function getPcExplore(): string;
/**
 * @function getSystemOS
 * @description 获取当前页面所在的系统标识
 * @return {string} 系统标识，如：'mac'、'windows'、'linux'、'ios'、'android'、'harmony'、'unknown'
 */
export declare function getSystemOS(): "android" | "mac" | "windowsPhone" | "windows" | "linux" | "ios" | "harmony" | "unknown";
/**
 * @function getMobilePlatform
 * @description 获取当前页面所处的移动设备标识（适用于纯移动端业务进行简单的iPhone还是安卓手机判断）
 * @return {string} 移动设备标识，如：'iphone'、'gphone'
 * @example
 * getMobilePlatform(); // 'iphone' or 'gphone'
 */
export declare function getMobilePlatform(): "iphone" | "gphone";
/**
 * @function getMobileOS
 * @description 获取当前页面所处的移动设备系统
 * @return {string} 移动设备系统，如：{'android': 0, 'ios': 11.2}
 */
export declare function getMobileOS(): {
    android: number;
    ios: number;
};
/**
 * @function getMobileBrandIdentify
 * @description 获取当前移动设备的品牌标识（部分手机）
 * @returns {string} 手机品牌标识，如：'iphone'、'huawei'、'oppo'、'vivo'、'xiaomi'、'samsung'、'unknown'
 */
export declare function getMobileBrandIdentify(): string;
