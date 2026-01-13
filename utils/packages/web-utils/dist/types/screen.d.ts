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
export declare const getClientHeight: () => number;
/**
 * @function getClientWidth
 * @description 获取可视窗口的宽度。Gets the width of the visible window
 * @returns {number} 可视窗口的宽度。The width of the visible window
 * @example
 * const clientW = getClientWidth();
 */
export declare const getClientWidth: () => number;
/**
 * @function isFullScreen
 * @description 检查是否在全屏状态。Checks whether it is in full screen mode
 * @returns {boolean} 是否在全屏状态。Whether it is in full screen mode
 */
export declare function isFullScreen(): any;
/**
 * @function isFullScreenEnabled
 * @description 检查当前浏览器环境是否支持全屏操作。Checks whether the current browser environment supports full screen operations
 * @returns {boolean} 是否支持全屏操作。Whether full screen operations are supported
 */
export declare function isFullScreenEnabled(): any;
/**
 * @function enterFullscreen
 * @description 使浏览器进入全屏模式
 * @tips MAC、IOS下的Safari浏览器不支持非交互全屏
 * @param {HTMLElement} element 进入全屏的元素，默认为document.body
 */
export declare function enterFullscreen(element?: HTMLElement): Promise<void>;
/**
 * @function exitFullscreen
 * @description 退出全屏
 */
export declare function exitFullscreen(): void;
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
export declare function wakeScreenLock(): Promise<unknown>;
/**
 * @function keepScreenOn
 * @description 保持屏幕常亮
 * @returns {Function} 移除监听器的函数
 * @example
 * const cleanup = keepScreenOn();
 * // Later cleanup
 * cleanup();
 */
export declare function keepScreenOn(): () => void;
