/**
 * @constants hostEnv
 * @author Wayne
 * @createTime 2022-03-11 10:01:22
 * @LastEditTime 2024-04-09 14:21:20
 */
/* eslint-disable no-undef */

declare const my: any;
declare const wx: any;
declare const tt: any;
declare const swan: any;
declare const ks: any;

let _ENV_MAP = null;

let NODE_ENV = 'development';

let _GLOBAL: any = null;

try {
  _GLOBAL =
    (typeof process !== 'undefined' && { process }) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    // eslint-disable-next-line no-invalid-this
    this ||
    {};

  // Set up process
  _GLOBAL.process = _GLOBAL.process || {};
  _ENV_MAP = _GLOBAL.process.env = _GLOBAL.process.env || {};
  if (!_GLOBAL.__GLOBAL__) _GLOBAL.__GLOBAL__ = _GLOBAL;

  NODE_ENV = _GLOBAL.process.env.NODE_ENV;
} catch (err) {
  NODE_ENV = 'production';
}

// 全局变量
export const GLOBAL = _GLOBAL || {};

// 全局环境信息
export const ENV_MAP = _ENV_MAP;

// dev 模式，也可用webpack.DefinePlugin
export const __DEV__ = NODE_ENV === 'development';

// web app
export const isWeb = typeof window !== 'undefined' && 'onload' in window;

// 字节小程序
export const isByteDanceMicroApp =
  typeof tt !== 'undefined' && tt !== null && typeof tt.showToast !== 'undefined';

// In wechat mini program, wx.login is a function
// In wechat mini propgram webview, there is no wx.login, but exist wx.miniProgram
// In bytedance maicro app, there is wx variable.

// 微信小程序
export const isWeChatMiniProgram =
  !isByteDanceMicroApp &&
  typeof wx !== 'undefined' &&
  wx !== null &&
  (typeof wx.request !== 'undefined' || typeof wx.miniProgram !== 'undefined');

// 阿里小程序
export const isAliPayMiniApp =
  typeof my !== 'undefined' && my !== null && typeof my.alert !== 'undefined';

// 百度小程序
export const isBaiduSmartProgram =
  typeof swan !== 'undefined' && swan !== null && typeof swan.showToast !== 'undefined';

// 快手小程序
export const isKuaiShouMiniProgram =
  typeof ks !== 'undefined' && ks !== null && typeof ks.showToast !== 'undefined';

/** node */

// nodejs 环境
export const isNode =
  typeof process !== 'undefined' && !!(process.versions && process.versions.node);

export enum RunTimeIdMap {
  WEB = 'web',
  BYTEDANCE_MINIAPP = 'bytedance_miniapp',
  WECHAT_MINIAPP = 'wechat_miniapp',
  ALIPAY_MINIAPP = 'alipay_miniapp',
  BAIDU_MINIAPP = 'baidu_miniapp',
  KUAISHOU_MINIAPP = 'kuaishou_miniapp',
  NODEJS = 'node',
  JS_RUNTIME = 'js_runtime',
}

// 环境标识
export const RUNTIME_NAME =
  (isWeb && RunTimeIdMap.WEB) ||
  (isByteDanceMicroApp && RunTimeIdMap.BYTEDANCE_MINIAPP) ||
  (isWeChatMiniProgram && RunTimeIdMap.WECHAT_MINIAPP) ||
  (isAliPayMiniApp && RunTimeIdMap.ALIPAY_MINIAPP) ||
  (isBaiduSmartProgram && RunTimeIdMap.BAIDU_MINIAPP) ||
  (isKuaiShouMiniProgram && RunTimeIdMap.KUAISHOU_MINIAPP) ||
  (isNode && RunTimeIdMap.NODEJS) ||
  RunTimeIdMap.JS_RUNTIME;

export default {
  GLOBAL,
  __DEV__,
  isWeb,
  isByteDanceMicroApp,
  isWeChatMiniProgram,
  isAliPayMiniApp,
  isBaiduSmartProgram,
  isKuaiShouMiniProgram,
  isNode,
  ENV_MAP,
  RunTimeIdMap,
  RUNTIME_NAME,
};
