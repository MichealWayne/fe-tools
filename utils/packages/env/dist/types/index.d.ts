/**
 * @constants hostEnv
 * @author Wayne
 * @createTime 2022-03-11 10:01:22
 * @LastEditTime 2025-06-09 19:40:22
 */
export declare const GLOBAL: any;
export declare const ENV_MAP: any;
export declare const __DEV__: boolean;
export declare const isWeb: boolean;
export declare const isByteDanceMicroApp: boolean;
export declare const isWeChatMiniProgram: boolean;
export declare const isAliPayMiniApp: boolean;
export declare const isBaiduSmartProgram: boolean;
export declare const isKuaiShouMiniProgram: boolean;
export declare const isReactNative: boolean;
/** node */
export declare const isNode: boolean;
export declare enum RunTimeIdMap {
    WEB = "web",
    BYTEDANCE_MINIAPP = "bytedance_miniapp",
    WECHAT_MINIAPP = "wechat_miniapp",
    ALIPAY_MINIAPP = "alipay_miniapp",
    BAIDU_MINIAPP = "baidu_miniapp",
    KUAISHOU_MINIAPP = "kuaishou_miniapp",
    NODEJS = "node",
    JS_RUNTIME = "js_runtime",
    WEEX = "weex",
    REACT_NATIVE = "react_native"
}
export declare const RUNTIME_NAME: RunTimeIdMap;
declare const _default: {
    GLOBAL: any;
    __DEV__: boolean;
    isWeb: boolean;
    isByteDanceMicroApp: boolean;
    isWeChatMiniProgram: boolean;
    isAliPayMiniApp: boolean;
    isBaiduSmartProgram: boolean;
    isKuaiShouMiniProgram: boolean;
    isNode: boolean;
    isWeex: boolean;
    isReactNative: boolean;
    ENV_MAP: any;
    RunTimeIdMap: typeof RunTimeIdMap;
    RUNTIME_NAME: RunTimeIdMap;
};
export default _default;
