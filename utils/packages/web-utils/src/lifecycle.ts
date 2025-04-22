/**
 * @module LifeCycle
 * @author Wayne
 * @Date 2025-04-20 10:53:56
 * @LastEditTime 2025-04-22 14:06:07
 */

/**
 * @function onPageLoad
 * @description 注册页面加载完成事件（DOMContentLoaded）
 * @param {function} fn 页面加载完成时执行的回调
 * @returns {function} 移除监听的函数
 * @example
onPageLoad(() => {
  console.log('Page loaded');
});
 */
export function onPageLoad(fn: () => void): () => void {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // 已经加载完成，直接执行
    setTimeout(fn, 0);
    return () => {};
  }
  document.addEventListener('DOMContentLoaded', fn);
  return () => document.removeEventListener('DOMContentLoaded', fn);
}

/**
 * @function onPageUnload
 * @description 注册页面卸载事件（unload）
 * @param {function} fn 页面卸载时执行的回调
 * @returns {function} 移除监听的函数
 * @example
onPageUnload(() => {
  console.log('Page unloaded');
});
 */
export function onPageUnload(fn: () => void): () => void {
  window.addEventListener('unload', fn);
  return () => window.removeEventListener('unload', fn);
}

/**
 * @function onBeforeUnload
 * @description 注册页面关闭前挽留事件（beforeunload）
 * @param {function} fn 页面关闭前执行的回调，可用于弹窗挽留
 * @returns {function} 移除监听的函数
 * @example
onBeforeUnload((event) => {
  // 可以弹窗挽留，阻止页面关闭
  const message = 'You have unsaved changes.\r\nAre you sure you want to leave this page?';
  event.returnValue = message;
  return message;
});
 */
export function onBeforeUnload(fn: (event: BeforeUnloadEvent) => void): () => void {
  window.addEventListener('beforeunload', fn);
  return () => window.removeEventListener('beforeunload', fn);
}
