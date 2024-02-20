/**
 * @module Screen
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2024-02-18 13:20:14
 */

/**
 * @func getClientHeight
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example
 * const height = getClientHeight();
 */
export const getClientHeight = (): number =>
  Math.min(document.body.clientHeight, document.documentElement.clientHeight);

/**
 * @func getClientWidth
 * @returns {number}
 * @desc 📝 获取可视窗口的高度
 * @example
 * const clientW = getClientWidth();
 */
export const getClientWidth = (): number =>
  (document.compatMode === 'BackCompat' ? document.body : document.documentElement).clientWidth;

/**
 * @function isFullScreen
 * @description 是否在全屏状态
 * @returns {boolean}
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
 * @description 是否支持全屏操作
 * @returns {boolean}
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
 * @description 进入全屏
 * @tips MAC、IOS下的Safari浏览器不支持非交互全屏
 * @param {HTMLElement} element
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
