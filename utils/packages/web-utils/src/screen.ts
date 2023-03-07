/**
 * @module Screen
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2023-03-02 19:32:58
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
