/**
 * @author Wayne
 * @Date 2022-03-23 16:50:26
 * @LastEditTime 2022-05-12 15:30:06
 */

export interface SimpleObj {
  [key: string]: any;
}

export interface Ext {
  wechatMiniProgram?: SimpleObj;
  aliMiniApp?: SimpleObj;
  bytedanceMicroApp?: SimpleObj;
  web?: SimpleObj;
  baiduSmartProgram?: SimpleObj;
  kuaishouMiniProgram?: SimpleObj;
}

export declare namespace King {
  interface COptions {
    _ext?: Ext;
  }
}
