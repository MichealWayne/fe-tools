/**
 * @module Screen
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2025-06-21 11:51:41
 */

/**
 * @function getClientHeight
 * @description 获取可视窗口的高度。Gets the height of the visible window
 * @returns {number} 可视窗口的高度。The height of the visible window
 * @example
 * const height = getClientHeight();
 */
export const getClientHeight = (): number =>
  Math.min(document.body.clientHeight, document.documentElement.clientHeight);

/**
 * @function getClientWidth
 * @description 获取可视窗口的宽度。Gets the width of the visible window
 * @returns {number} 可视窗口的宽度。The width of the visible window
 * @example
 * const clientW = getClientWidth();
 */
export const getClientWidth = (): number =>
  (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;

/**
 * @function isFullScreen
 * @description 检查是否在全屏状态。Checks whether it is in full screen mode
 * @returns {boolean} 是否在全屏状态。Whether it is in full screen mode
 */
export function isFullScreen() {
  return (
    document.fullscreenElement ||
    (document as any).webkitFullScreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullScreenElement
  );
}

/**
 * @function isFullScreenEnabled
 * @description 检查当前浏览器环境是否支持全屏操作。Checks whether the current browser environment supports full screen operations
 * @returns {boolean} 是否支持全屏操作。Whether full screen operations are supported
 */
export function isFullScreenEnabled() {
  return (
    (document as Document).fullscreenEnabled ||
    (document as any).webkitFullscreenEnabled ||
    (document as any).mozFullScreenEnabled ||
    (document as any).msFullscreenEnabled
  );
}

/**
 * @function enterFullscreen
 * @description 使浏览器进入全屏模式
 * @tips MAC、IOS下的Safari浏览器不支持非交互全屏
 * @param {HTMLElement} element 进入全屏的元素，默认为document.body
 */
export function enterFullscreen(element: HTMLElement = document.body) {
  if (!isFullScreenEnabled()) {
    return Promise.reject(new Error('全屏模式被禁用'));
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    (element as any).mozRequestFullScreen();
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullScreen();
  } else {
    return Promise.reject(new Error('浏览器不支持全屏操作'));
  }
}

/**
 * @function exitFullscreen
 * @description 退出全屏
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  }
}

/**
 * @function wakeScreenLock
 * @description 唤醒屏幕锁定、保持屏幕常亮(IE和iOS18以下兼容性不好)
 * @docs https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/wakeLock
 * @returns {Promise<void>} 唤醒屏幕锁定的Promise
 * @example
 * const wakeScreenLock = wakeScreenLock();
 * wakeScreenLock.then(() => {
 *   console.log('屏幕锁定');
 * }).catch((error) => {
 *   console.error(error);
 */
export function wakeScreenLock() {
  if (typeof navigator.wakeLock === 'undefined') {
    return Promise.reject(new Error('浏览器不支持屏幕锁定API'));
  }
  return navigator.wakeLock.request('screen');
}

/**
 * @function keepScreenOn
 * @description 保持屏幕常亮
 * @returns {Promise<void>} 保持屏幕常亮的Promise
 * @example
 * const keepScreenOn = keepScreenOn();
 * keepScreenOn.then(() => {
 *   console.log('屏幕常亮');
 * }).catch((error) => {
 *   console.error(error);
 * });
 */
export function keepScreenOn() {
  if (typeof navigator.wakeLock === 'undefined') {
    return new Error('浏览器不支持屏幕锁定API');
  }
  document.addEventListener('visibilitychange', wakeScreenLock);
  return () => {
    document.removeEventListener('visibilitychange', wakeScreenLock);
  };
}
