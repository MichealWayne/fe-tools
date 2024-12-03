/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/**
 * @module Platform
 * @notice 存在复杂的判断场景可以直接使用ua-parser-js / mobile-detect.js
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-12-01 11:06:34
 */

/**
 * @description 全小写的浏览器用户代理字符串（User Agent String，简称 UA），即navigator.userAgent的小写转换字符串
 */
export const ua = navigator.userAgent.toLowerCase();

/**
 * @function isPC
 * @description 判断当前页面是否处于PC环境下（主要通过判断是否存在移动设备的关键字）
 * @return {boolean} 是否是PC环境
 * @example
 * if (isPC()) {
 *    console.log('当前处在PC环境下')
 * }
 */
export function isPC() {
  return [
    'android',
    'iphone',
    'symbianos',
    'windows phone',
    'windows mobile',
    'windows ce',
    'ipad',
    'ipod',
    'mobile', // 通用移动设备关键字
  ].every(agent => ua.indexOf(agent) < 0);
}

/**
 * @function getPcExplore
 * @description 获取当前PC浏览器标识
 * @return {string} 浏览器标识，如：'IE: 11.0'、'Chrome: 83.0.4103.116'、'Firefox: 77.0'、'Opera: 69.0.3686.77'、'Safari: 13.1.1'
 */
export function getPcExplore() {
  const sys: {
    [propKey: string]: string | null;
  } = {
    ie: null,
    edge: null,
    firefox: null,
    chrome: null,
    opera: null,
    safari: null,
  };
  let s: RegExpMatchArray | null = null;

  (s = ua.match(/rv:([\d.]+)\) like gecko/))
    ? (sys.ie = s[1])
    : (s = ua.match(/msie ([\d\.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/edge\/([\d\.]+)/))
    ? (sys.edge = s[1])
    : (s = ua.match(/firefox\/([\d\.]+)/))
    ? (sys.firefox = s[1])
    : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
    ? (sys.opera = s[1])
    : (s = ua.match(/chrome\/([\d\.]+)/))
    ? (sys.chrome = s[1])
    : (s = ua.match(/version\/([\d\.]+).*safari/))
    ? (sys.safari = s[1])
    : 0;

  if (sys.ie) return `IE: ${sys.ie}`;
  if (sys.edge) return `EDGE: ${sys.edge}`;
  if (sys.firefox) return `Firefox: ${sys.firefox}`;
  if (sys.chrome) return `Chrome: ${sys.chrome}`;
  if (sys.opera) return `Opera: ${sys.opera}`;
  if (sys.safari) return `Safari: ${sys.safari}`;
  return 'unkonwn';
}

/**
 * @function getSystemOS
 * @description 获取当前页面所在的系统标识
 * @return {string} 系统标识，如：'mac'、'windows'、'linux'、'ios'、'android'、'harmony'、'unknown'
 */
export function getSystemOS() {
  const appVersion = navigator?.appVersion.toLowerCase() || '';

  if (/mac/i.test(appVersion)) return 'mac';
  if (/win/i.test(appVersion)) {
    if (/phone/i.test(ua)) return 'windowsPhone'; // 合并windows和windowsPhone的检查
    return 'windows';
  }
  if (/linux/i.test(appVersion)) return 'linux';
  if (/iphone/i.test(ua) || /ipad/i.test(ua) || /ipod/i.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  if (/harmony/i.test(ua)) return 'harmony'; // 华为鸿蒙系统: HarmonyOS/OpenHarmony
  return 'unknown';
}

/**
 * @function getMobilePlatform
 * @description 获取当前页面所处的移动设备标识（适用于纯移动端业务进行简单的iPhone还是安卓手机判断）
 * @return {string} 移动设备标识，如：'iphone'、'gphone'
 * @example
 * getMobilePlatform(); // 'iphone' or 'gphone'
 */
export function getMobilePlatform() {
  const info = {
    versions: {
      iPhone: ua.includes('iphone') || ua.includes('mac'),
      iPad: ua.includes('ipad'),
    },
  };

  return info.versions.iPhone || info.versions.iPad ? 'iphone' : 'gphone';
}

/**
 * @function getMobileOS
 * @description 获取当前页面所处的移动设备系统
 * @return {string} 移动设备系统，如：{'android': 0, 'ios': 11.2}
 */
export function getMobileOS() {
  const os = {
    android: 0,
    ios: 0,
  };

  try {
    // eslint-disable-next-line no-useless-escape
    const android = ua.match(/(android);?[\s\/]+([\d.]+)?/);
    const ios = ua.match(/([ipad,ipod,iphone]).*os\s([\d_]+)/);

    if (android) os.android = +android[2] || 0;
    if (ios) os.ios = +ios[2].replace(/_/g, '.') || 0;
  } catch (e) {
    return os;
  }
  return os;
}

/**
 * @function getMobileBrandIdentify
 * @description 获取当前移动设备的品牌标识（部分手机）
 * @returns {string} 手机品牌标识，如：'iphone'、'huawei'、'oppo'、'vivo'、'xiaomi'、'samsung'、'unknown'
 */
export function getMobileBrandIdentify() {
  const brandMatchers = [
    { regex: /iphone/, brand: 'iphone' },
    { regex: /huawei|honor/, brand: 'huawei' },
    { regex: /oppo|pacm00/, brand: 'oppo' },
    { regex: /vivo/, brand: 'vivo' },
    { regex: /mi\s|redmi|mix\s/, brand: 'xiaomi' },
    { regex: /sm-/, brand: 'samsung' },
  ];

  for (const matcher of brandMatchers) {
    if (ua.match(matcher.regex)) {
      return matcher.brand;
    }
  }

  return 'unknown';
}
