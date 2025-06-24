/**
 * @author Wayne
 * @Date 2022-04-27 14:13:26
 * @LastEditTime 2022-06-07 13:16:02
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare const WXEnvironment: any;
// declare const process: any;
// declare const global: any;
declare const my: any;
declare const wx: any;
declare const tt: any;
declare const dd: any;
declare const ks: any;
declare const swan: any;
declare const getApp: any;
declare const getCurrentPages: any;
declare const getLaunchOptionsSync: any;

// Wake Lock API type declarations
interface WakeLockSentinel {
  released: boolean;
  addEventListener(type: 'release', listener: EventListener): void;
  removeEventListener(type: 'release', listener: EventListener): void;
  release(): Promise<void>;
}

interface WakeLock {
  request(type: 'screen'): Promise<WakeLockSentinel>;
}

interface Navigator {
  wakeLock?: WakeLock;
}
