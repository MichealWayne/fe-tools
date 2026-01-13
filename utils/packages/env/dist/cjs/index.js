"use strict";
/**
 * @constants hostEnv
 * @author Wayne
 * @createTime 2022-03-11 10:01:22
 * @LastEditTime 2025-06-09 19:40:22
 */
/* eslint-disable no-undef */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RUNTIME_NAME = exports.RunTimeIdMap = exports.isNode = exports.isReactNative = exports.isKuaiShouMiniProgram = exports.isBaiduSmartProgram = exports.isAliPayMiniApp = exports.isWeChatMiniProgram = exports.isByteDanceMicroApp = exports.isWeb = exports.__DEV__ = exports.ENV_MAP = exports.GLOBAL = void 0;
var _ENV_MAP = null;
var NODE_ENV = 'development';
var _GLOBAL = null;
try {
    _GLOBAL =
        (typeof process !== 'undefined' && { process: process }) ||
            (typeof window !== 'undefined' && window) ||
            (typeof global !== 'undefined' && global) ||
            // eslint-disable-next-line no-invalid-this
            this ||
            {};
    // Set up process
    _GLOBAL.process = _GLOBAL.process || {};
    _ENV_MAP = _GLOBAL.process.env = _GLOBAL.process.env || {};
    if (!_GLOBAL.__GLOBAL__)
        _GLOBAL.__GLOBAL__ = _GLOBAL;
    NODE_ENV = _GLOBAL.process.env.NODE_ENV;
}
catch (err) {
    NODE_ENV = 'production';
}
// 全局变量
exports.GLOBAL = _GLOBAL || {};
// 全局环境信息
exports.ENV_MAP = _ENV_MAP;
// dev 模式，也可用webpack.DefinePlugin
exports.__DEV__ = NODE_ENV === 'development';
// web app
exports.isWeb = typeof window !== 'undefined' && 'onload' in window;
// 字节小程序
exports.isByteDanceMicroApp = typeof tt !== 'undefined' && tt !== null && typeof tt.showToast !== 'undefined';
// In wechat mini program, wx.login is a function
// In wechat mini propgram webview, there is no wx.login, but exist wx.miniProgram
// In bytedance maicro app, there is wx variable.
// 微信小程序
exports.isWeChatMiniProgram = !exports.isByteDanceMicroApp &&
    typeof wx !== 'undefined' &&
    wx !== null &&
    (typeof wx.request !== 'undefined' || typeof wx.miniProgram !== 'undefined');
// 阿里小程序
exports.isAliPayMiniApp = typeof my !== 'undefined' && my !== null && typeof my.alert !== 'undefined';
// 百度小程序
exports.isBaiduSmartProgram = typeof swan !== 'undefined' && swan !== null && typeof swan.showToast !== 'undefined';
// 快手小程序
exports.isKuaiShouMiniProgram = typeof ks !== 'undefined' && ks !== null && typeof ks.showToast !== 'undefined';
// Weex
var isWeex = typeof exports.GLOBAL.WXEnvironment !== 'undefined' && Boolean(exports.GLOBAL.WXEnvironment.platform);
// React Native
exports.isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
/** node */
// nodejs 环境
exports.isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
var RunTimeIdMap;
(function (RunTimeIdMap) {
    RunTimeIdMap["WEB"] = "web";
    RunTimeIdMap["BYTEDANCE_MINIAPP"] = "bytedance_miniapp";
    RunTimeIdMap["WECHAT_MINIAPP"] = "wechat_miniapp";
    RunTimeIdMap["ALIPAY_MINIAPP"] = "alipay_miniapp";
    RunTimeIdMap["BAIDU_MINIAPP"] = "baidu_miniapp";
    RunTimeIdMap["KUAISHOU_MINIAPP"] = "kuaishou_miniapp";
    RunTimeIdMap["NODEJS"] = "node";
    RunTimeIdMap["JS_RUNTIME"] = "js_runtime";
    RunTimeIdMap["WEEX"] = "weex";
    RunTimeIdMap["REACT_NATIVE"] = "react_native";
})(RunTimeIdMap = exports.RunTimeIdMap || (exports.RunTimeIdMap = {}));
// 环境标识
exports.RUNTIME_NAME = (exports.isWeb && RunTimeIdMap.WEB) ||
    (exports.isByteDanceMicroApp && RunTimeIdMap.BYTEDANCE_MINIAPP) ||
    (exports.isWeChatMiniProgram && RunTimeIdMap.WECHAT_MINIAPP) ||
    (exports.isAliPayMiniApp && RunTimeIdMap.ALIPAY_MINIAPP) ||
    (exports.isBaiduSmartProgram && RunTimeIdMap.BAIDU_MINIAPP) ||
    (exports.isKuaiShouMiniProgram && RunTimeIdMap.KUAISHOU_MINIAPP) ||
    (exports.isNode && RunTimeIdMap.NODEJS) ||
    (isWeex && RunTimeIdMap.WEEX) ||
    (exports.isReactNative && RunTimeIdMap.REACT_NATIVE) ||
    RunTimeIdMap.JS_RUNTIME;
exports.default = {
    GLOBAL: exports.GLOBAL,
    __DEV__: exports.__DEV__,
    isWeb: exports.isWeb,
    isByteDanceMicroApp: exports.isByteDanceMicroApp,
    isWeChatMiniProgram: exports.isWeChatMiniProgram,
    isAliPayMiniApp: exports.isAliPayMiniApp,
    isBaiduSmartProgram: exports.isBaiduSmartProgram,
    isKuaiShouMiniProgram: exports.isKuaiShouMiniProgram,
    isNode: exports.isNode,
    isWeex: isWeex,
    isReactNative: exports.isReactNative,
    ENV_MAP: exports.ENV_MAP,
    RunTimeIdMap: RunTimeIdMap,
    RUNTIME_NAME: exports.RUNTIME_NAME,
};
