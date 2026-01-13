/**
 * @module LifeCycle
 * @author Wayne
 * @Date 2025-04-20 10:53:56
 * @LastEditTime 2025-04-22 14:06:07
 */
/**
 * @function onPageLoad
 * @description 注册页面加载完成事件（DOMContentLoaded）。Registers page load completion event (DOMContentLoaded)
 * @param {function} fn - 页面加载完成时执行的回调。Callback function to execute when page loading is complete
 * @returns {function} 移除监听的函数。Function to remove the event listener
 * @example
onPageLoad(() => {
  console.log('Page loaded');
});
 */
export declare function onPageLoad(fn: () => void): () => void;
/**
 * @function onPageUnload
 * @description 注册页面卸载事件（unload）。Registers page unload event (unload)
 * @param {function} fn - 页面卸载时执行的回调。Callback function to execute when page is unloaded
 * @returns {function} 移除监听的函数。Function to remove the event listener
 * @example
onPageUnload(() => {
  console.log('Page unloaded');
});
 */
export declare function onPageUnload(fn: () => void): () => void;
/**
 * @function onBeforeUnload
 * @description 注册页面关闭前挽留事件（beforeunload）。Registers page before unload retention event (beforeunload)
 * @param {function} fn - 页面关闭前执行的回调，可用于弹窗挽留。Callback function executed before page closes, can be used for retention popups
 * @returns {function} 移除监听的函数。Function to remove the event listener
 * @example
onBeforeUnload((event) => {
  // 可以弹窗挽留，阻止页面关闭
  const message = 'You have unsaved changes.\r\nAre you sure you want to leave this page?';
  event.returnValue = message;
  return message;
});
 */
export declare function onBeforeUnload(fn: (event: BeforeUnloadEvent) => void): () => void;
