"use strict";
/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/**
 * @module Platform
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMobileOS = exports.getPlatform = exports.getSystemOS = exports.getPcExplore = exports.isPC = exports.ua = void 0;
exports.ua = navigator.userAgent.toLowerCase();
/**
 * @function isPC
 * @return {boolean}
 */
function isPC() {
    return [
        'android',
        'iphone',
        'symbianos',
        'windows phone',
        'windows mobile',
        'windows ce',
        'ipad',
        'ipod',
    ].every(function (agent) { return exports.ua.indexOf(agent) < 0; });
}
exports.isPC = isPC;
/**
 * @function getPcExplore
 * @return {string}
 */
function getPcExplore() {
    var sys = {
        ie: null,
        edge: null,
        firefox: null,
        chrome: null,
        opera: null,
        safari: null,
    };
    var s = null;
    (s = exports.ua.match(/rv:([\d.]+)\) like gecko/))
        ? (sys.ie = s[1])
        : (s = exports.ua.match(/msie ([\d\.]+)/))
            ? (sys.ie = s[1])
            : (s = exports.ua.match(/edge\/([\d\.]+)/))
                ? (sys.edge = s[1])
                : (s = exports.ua.match(/firefox\/([\d\.]+)/))
                    ? (sys.firefox = s[1])
                    : (s = exports.ua.match(/(?:opera|opr).([\d\.]+)/))
                        ? (sys.opera = s[1])
                        : (s = exports.ua.match(/chrome\/([\d\.]+)/))
                            ? (sys.chrome = s[1])
                            : (s = exports.ua.match(/version\/([\d\.]+).*safari/))
                                ? (sys.safari = s[1])
                                : 0;
    if (sys.ie)
        return 'IE: ' + sys.ie;
    if (sys.edge)
        return 'EDGE: ' + sys.edge;
    if (sys.firefox)
        return 'Firefox: ' + sys.firefox;
    if (sys.chrome)
        return 'Chrome: ' + sys.chrome;
    if (sys.opera)
        return 'Opera: ' + sys.opera;
    if (sys.safari)
        return 'Safari: ' + sys.safari;
    return 'Unkonwn';
}
exports.getPcExplore = getPcExplore;
/**
 * @function getSystemOS
 * @return {string | undefined}
 */
function getSystemOS() {
    var userAgent = ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || '';
    var appVersion = ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) ||
        '';
    if (/mac/i.test(appVersion))
        return 'MacOSX';
    if (/win/i.test(appVersion))
        return 'windows';
    if (/linux/i.test(appVersion))
        return 'linux';
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent))
        'ios';
    if (/android/i.test(userAgent))
        return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent))
        return 'windowsPhone';
}
exports.getSystemOS = getSystemOS;
/**
 * @function getPlatform
 * @return {string}
 */
function getPlatform() {
    var info = {
        versions: (function () {
            return {
                iPhone: exports.ua.indexOf('iPhone') > -1 || exports.ua.indexOf('Mac') > -1,
                iPad: exports.ua.indexOf('iPad') > -1,
            };
        })(),
        language: navigator.language.toLowerCase(),
    };
    return info.versions.iPhone || info.versions.iPad ? 'iphone' : 'gphone';
}
exports.getPlatform = getPlatform;
/**
 * @function getMobileOS
 * @return {string}
 */
function getMobileOS() {
    var _os = {
        android: 0,
        ios: 0,
    };
    try {
        // eslint-disable-next-line no-useless-escape
        var _android = exports.ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var _ios = exports.ua.match(/([iPad,iPod,iPhone]).*OS\s([\d_]+)/);
        if (_android)
            _os.android = +_android[2] || 0;
        if (_ios)
            _os.ios = +_ios[2].replace(/_/g, '.') || 0;
    }
    catch (e) {
        return _os;
    }
    return _os;
}
exports.getMobileOS = getMobileOS;
