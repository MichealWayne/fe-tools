/**
 * @module Screen
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2025-06-21 11:51:41
 */

export interface WakeScreenLockSentinel {
  released: boolean;
  addEventListener(type: 'release', listener: EventListener): void;
  removeEventListener(type: 'release', listener: EventListener): void;
  release(): Promise<void>;
}

/**
 * @function getClientHeight
 * @description 获取可视窗口的高度。Gets the height of the visible window
 * @returns {number} 可视窗口的高度。The height of the visible window
 * @example
 * ```ts
 * const height = getClientHeight();
 * ```
 */
export const getClientHeight = (): number =>
  Math.max(document.body.clientHeight, document.documentElement.clientHeight);

/**
 * @function getClientWidth
 * @description 获取可视窗口的宽度。Gets the width of the visible window
 * @returns {number} 可视窗口的宽度。The width of the visible window
 * @example
 * ```ts
 * const clientW = getClientWidth();
 * ```
 */
export const getClientWidth = (): number =>
  (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;

/**
 * @function isFullScreen
 * @description 检查是否在全屏状态。Checks whether it is in full screen mode
 * @returns {boolean} 是否在全屏状态。Whether it is in full screen mode
 * @example
 * ```ts
 * isFullScreen(); // -> null（非全屏）或全屏元素引用
 * ```
 * @example
 * ```ts
 * document.addEventListener('fullscreenchange', () => {
 *   console.log('Fullscreen:', !!isFullScreen());
 * });
 * ```
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
 * @example
 * ```ts
 * isFullScreenEnabled(); // -> true（现代浏览器）
 * ```
 * @example
 * ```ts
 * if (!isFullScreenEnabled()) {
 *   console.warn('Fullscreen not supported');
 * }
 * ```
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
 * @description 使浏览器进入全屏模式（注意：MAC/iOS 下的 Safari 不支持非交互全屏）。Makes the browser enter full screen mode (Note: Safari on Mac/iOS does not support non-interactive fullscreen)
 * @param {HTMLElement} element - 进入全屏的元素，默认为 document.body。Element to make fullscreen, defaults to document.body
 * @returns {Promise<void>} 进入全屏的 Promise，不支持时 reject。Promise that resolves when entering fullscreen, rejects if not supported
 * @example
 * ```ts
 * enterFullscreen(); // 默认使 document.body 全屏
 * ```
 * @example
 * ```ts
 * const video = document.querySelector('video');
 * enterFullscreen(video).catch(err => console.error('Fullscreen failed:', err));
 * ```
 */
export function enterFullscreen(element: HTMLElement = document.body) {
  if (!isFullScreenEnabled()) {
    return Promise.reject(new Error('全屏模式被禁用'));
  }
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) {
    (element as any).mozRequestFullScreen();
  } else if ((element as any).msRequestFullscreen) {
    (element as any).msRequestFullscreen();
  } else if ((element as any).webkitRequestFullscreen) {
    (element as any).webkitRequestFullscreen();
  } else {
    return Promise.reject(new Error('浏览器不支持全屏操作'));
  }

  return Promise.resolve();
}

/**
 * @function exitFullscreen
 * @description 退出全屏模式，兼容各主流浏览器前缀。Exits fullscreen mode with cross-browser prefix compatibility
 * @returns {void}
 * @example
 * ```ts
 * exitFullscreen(); // 退出全屏
 * ```
 * @example
 * ```ts
 * document.addEventListener('keydown', (e) => {
 *   if (e.key === 'Escape') exitFullscreen();
 * });
 * ```
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
 * @returns {Promise<WakeScreenLockSentinel>} 唤醒屏幕锁定的Promise
 * @example
 * ```ts
 * const wakeScreenLock = wakeScreenLock();
 * wakeScreenLock.then(() => {
 *   console.log('屏幕锁定');
 * }).catch((error) => {
 *   console.error(error);
 * ```
 */
export function wakeScreenLock(): Promise<WakeScreenLockSentinel> {
  if (typeof navigator.wakeLock === 'undefined') {
    return Promise.reject(new Error('浏览器不支持屏幕锁定API'));
  }
  return navigator.wakeLock.request('screen') as Promise<WakeScreenLockSentinel>;
}

/**
 * @function keepScreenOn
 * @description 保持屏幕常亮
 * @returns {Function} 移除监听器的函数
 * @example
 * ```ts
 * const cleanup = keepScreenOn();
 * // Later cleanup
 * cleanup();
 * ```
 */
export function keepScreenOn() {
  if (typeof navigator.wakeLock === 'undefined') {
    throw new Error('浏览器不支持屏幕锁定API');
  }
  document.addEventListener('visibilitychange', wakeScreenLock);
  return () => {
    document.removeEventListener('visibilitychange', wakeScreenLock);
  };
}
