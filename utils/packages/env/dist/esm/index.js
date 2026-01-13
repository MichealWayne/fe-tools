/**
 * @constants hostEnv
 * @author Wayne
 * @createTime 2022-03-11 10:01:22
 * @LastEditTime 2025-06-09 19:40:22
 */
/* eslint-disable no-undef */
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
export var GLOBAL = _GLOBAL || {};
// 全局环境信息
export var ENV_MAP = _ENV_MAP;
// dev 模式，也可用webpack.DefinePlugin
export var __DEV__ = NODE_ENV === 'development';
// web app
export var isWeb = typeof window !== 'undefined' && 'onload' in window;
// 字节小程序
export var isByteDanceMicroApp = typeof tt !== 'undefined' && tt !== null && typeof tt.showToast !== 'undefined';
// In wechat mini program, wx.login is a function
// In wechat mini propgram webview, there is no wx.login, but exist wx.miniProgram
// In bytedance maicro app, there is wx variable.
// 微信小程序
export var isWeChatMiniProgram = !isByteDanceMicroApp &&
    typeof wx !== 'undefined' &&
    wx !== null &&
    (typeof wx.request !== 'undefined' || typeof wx.miniProgram !== 'undefined');
// 阿里小程序
export var isAliPayMiniApp = typeof my !== 'undefined' && my !== null && typeof my.alert !== 'undefined';
// 百度小程序
export var isBaiduSmartProgram = typeof swan !== 'undefined' && swan !== null && typeof swan.showToast !== 'undefined';
// 快手小程序
export var isKuaiShouMiniProgram = typeof ks !== 'undefined' && ks !== null && typeof ks.showToast !== 'undefined';
// Weex
var isWeex = typeof GLOBAL.WXEnvironment !== 'undefined' && Boolean(GLOBAL.WXEnvironment.platform);
// React Native
export var isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
/** node */
// nodejs 环境
export var isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
export var RunTimeIdMap;
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
})(RunTimeIdMap || (RunTimeIdMap = {}));
// 环境标识
export var RUNTIME_NAME = (isWeb && RunTimeIdMap.WEB) ||
    (isByteDanceMicroApp && RunTimeIdMap.BYTEDANCE_MINIAPP) ||
    (isWeChatMiniProgram && RunTimeIdMap.WECHAT_MINIAPP) ||
    (isAliPayMiniApp && RunTimeIdMap.ALIPAY_MINIAPP) ||
    (isBaiduSmartProgram && RunTimeIdMap.BAIDU_MINIAPP) ||
    (isKuaiShouMiniProgram && RunTimeIdMap.KUAISHOU_MINIAPP) ||
    (isNode && RunTimeIdMap.NODEJS) ||
    (isWeex && RunTimeIdMap.WEEX) ||
    (isReactNative && RunTimeIdMap.REACT_NATIVE) ||
    RunTimeIdMap.JS_RUNTIME;
export default {
    GLOBAL: GLOBAL,
    __DEV__: __DEV__,
    isWeb: isWeb,
    isByteDanceMicroApp: isByteDanceMicroApp,
    isWeChatMiniProgram: isWeChatMiniProgram,
    isAliPayMiniApp: isAliPayMiniApp,
    isBaiduSmartProgram: isBaiduSmartProgram,
    isKuaiShouMiniProgram: isKuaiShouMiniProgram,
    isNode: isNode,
    isWeex: isWeex,
    isReactNative: isReactNative,
    ENV_MAP: ENV_MAP,
    RunTimeIdMap: RunTimeIdMap,
    RUNTIME_NAME: RUNTIME_NAME,
};
