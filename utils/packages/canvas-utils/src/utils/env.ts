/**
 * @author Wayne
 * @Date 2022-06-04 19:13:04
 * @LastEditTime 2022-06-06 21:17:12
 */

const { NODE_ENV } = (global?.process || {}).env;

// dev 模式，也可用webpack.DefinePlugin
export const __DEV__ = NODE_ENV === 'development';

// 微信小程序
export const isWeapp = typeof wx !== 'undefined' && typeof wx.getSystemInfoSync !== 'undefined';

// web
export const isWeb = typeof window !== 'undefined' && !isWeapp;

// nodejs 环境
export const isNode =
  typeof process !== 'undefined' && !!(process.versions && process.versions.node);
