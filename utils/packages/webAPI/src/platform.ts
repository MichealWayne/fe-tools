/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
/**
 * @module Platform
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-05-31 15:29:42
 */

export const ua = navigator.userAgent.toLowerCase();

/**
 * @function isPC
 * @description 当前页面是否处于PC环境下
 * @return {Boolean}
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
  ].every(agent => ua.indexOf(agent) < 0);
}

/**
 * @function getPcExplore
 * @description 获取当前PC浏览器标识
 * @return {String}
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

  if (sys.ie) return 'IE: ' + sys.ie;
  if (sys.edge) return 'EDGE: ' + sys.edge;
  if (sys.firefox) return 'Firefox: ' + sys.firefox;
  if (sys.chrome) return 'Chrome: ' + sys.chrome;
  if (sys.opera) return 'Opera: ' + sys.opera;
  if (sys.safari) return 'Safari: ' + sys.safari;
  return 'Unkonwn';
}

/**
 * @function getSystemOS
 * @description 获取当前页面所在的系统标识
 * @return {String}
 */
export function getSystemOS() {
  const userAgent =
    ('navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase()) || '';
  const appVersion =
    ('navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase()) ||
    '';

  if (/mac/i.test(appVersion)) return 'MacOSX';
  if (/win/i.test(appVersion)) return 'windows';
  if (/linux/i.test(appVersion)) return 'linux';
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios';
  if (/android/i.test(userAgent)) return 'android';
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
  return 'Unkonwn';
}

/**
 * @function getPlatform
 * @description 获取当前页面所处的移动设备标识
 * @return {String}
 */
export function getPlatform() {
  const info = {
    versions: (function () {
      return {
        iPhone: ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1,
        iPad: ua.indexOf('iPad') > -1,
      };
    })(),
    language: navigator.language.toLowerCase(),
  };

  return info.versions.iPhone || info.versions.iPad ? 'iphone' : 'gphone';
}

/**
 * @function getMobileOS
 * @description 获取当前页面所处的移动设备系统
 * @return {String}
 */
export function getMobileOS() {
  const os = {
    android: 0,
    ios: 0,
  };

  try {
    // eslint-disable-next-line no-useless-escape
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    const ios = ua.match(/([iPad,iPod,iPhone]).*OS\s([\d_]+)/);

    if (android) os.android = +android[2] || 0;
    if (ios) os.ios = +ios[2].replace(/_/g, '.') || 0;
  } catch (e) {
    return os;
  }
  return os;
}
