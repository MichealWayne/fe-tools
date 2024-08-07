/**
 * @author Wayne
 * @Date 2022-07-11 13:32:33
 * @LastEditTime 2024-07-21 09:18:33
 */

export declare const GLOBAL: {
  [key: string]: any;
};
export declare const __DEV__: boolean;
export declare const isWeb: boolean;
export declare const isNode: boolean;
export declare const isAliPayMiniApp: boolean;
export declare const isByteDanceMicroApp: boolean;
export declare const isBaiduSmartProgram: boolean;
export declare const isKuaiShouMiniProgram: boolean;
export declare const isWeChatMiniProgram: boolean;
export declare const isWeex: boolean;

declare enum RunTimeIdMap {
  WEB = 'web',
  BYTEDANCE_MINIAPP = 'bytedance_miniapp',
  WECHAT_MINIAPP = 'wechat_miniapp',
  ALIPAY_MINIAPP = 'alipay_miniapp',
  BAIDU_MINIAPP = 'baidu_miniapp',
  KUAISHOU_MINIAPP = 'kuaishou_miniapp',
  NODEJS = 'node',
}

declare const RUNTIME_NAME: RunTimeIdMap;

declare const _default: {
  GLOBAL: {
    [key: string]: any;
  };
  __DEV__: boolean;
  isWeb: boolean;
  isNode: boolean;
  isAliPayMiniApp: boolean;
  isByteDanceMicroApp: boolean;
  isBaiduSmartProgram: boolean;
  isKuaiShouMiniProgram: boolean;
  isWeChatMiniProgram: boolean;
  isWeex: boolean;
  RunTimeIdMap: typeof RunTimeIdMap;
  RUNTIME_NAME: RunTimeIdMap;
};
export default _default;
