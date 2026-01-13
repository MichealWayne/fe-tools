/**
 * @module Network
 * @description Network utilities and connection helpers
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:34
 */
/**
 * @function isOnline
 * @description 检查网络连接状态。Checks network connection status
 * @returns {boolean} 如果在线则返回true。True if online
 * @example
 * if (isOnline()) {
 *   console.log('Connected to internet');
 * } else {
 *   console.log('Offline mode');
 * }
 */
export declare function isOnline(): boolean;
/**
 * @function getNetworkType
 * @description 获取网络连接类型(4G, 5G, WiFi等)。Gets network connection type (4G, 5G, WiFi, etc.)
 * @returns {string} 网络类型或'unknown'。Network type or 'unknown'
 * @example
 * const networkType = getNetworkType();
 * console.log(`Connection type: ${networkType}`); // -> '4g', 'wifi', etc.
 */
export declare function getNetworkType(): string;
/**
 * @function getNetworkInfo
 * @description 获取详细的网络信息。Gets detailed network information
 * @returns {object} 网络信息对象。Network information object
 * @example
 * const info = getNetworkInfo();
 * console.log(info);
 * // {
 * //   online: true,
 * //   type: '4g',
 * //   downlink: 10,
 * //   rtt: 50,
 * //   saveData: false
 * // }
 */
export declare function getNetworkInfo(): {
    online: boolean;
    type: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
};
/**
 * @function onNetworkChange
 * @description 监听网络状态变化。Listens to network status changes
 * @param {Function} callback - 网络状态变化时的回调函数。Callback on network status change
 * @returns {Function} 移除监听器的函数。Function to remove listener
 * @example
 * const removeListener = onNetworkChange((online) => {
 *   console.log(online ? 'Connected' : 'Disconnected');
 * });
 *
 * // Later, remove listener
 * removeListener();
 */
export declare function onNetworkChange(callback: (online: boolean) => void): () => void;
/**
 * @function retryRequest
 * @description 失败时自动重试的请求函数。Request function with automatic retry on failure
 * @param {Function} requestFn - 执行请求的函数。Function to execute request
 * @param {number} maxRetries - 最大重试次数(默认: 3)。Maximum retry attempts (default: 3)
 * @param {number} delay - 重试间隔(毫秒,默认: 1000)。Retry delay in ms (default: 1000)
 * @returns {Promise} 请求结果的Promise。Promise of request result
 * @example
 * const fetchData = () => fetch('https://api.example.com/data');
 * retryRequest(fetchData, 3, 1000)
 *   .then(response => response.json())
 *   .then(data => console.log(data))
 *   .catch(error => console.error('Failed after retries:', error));
 */
export declare function retryRequest<T>(requestFn: () => Promise<T>, maxRetries?: number, delay?: number): Promise<T>;
/**
 * @function requestIdleCallbackPolyfill
 * @description requestIdleCallback的polyfill实现。Polyfill for requestIdleCallback
 * @param {Function} callback - 在空闲时执行的回调。Callback to execute when idle
 * @param {object} options - 选项对象。Options object
 * @returns {number} 回调ID。Callback ID
 * @example
 * requestIdleCallbackPolyfill(() => {
 *   console.log('Executing during idle time');
 * });
 */
export declare function requestIdleCallbackPolyfill(callback: (deadline: any) => void, options?: {
    timeout?: number;
}): number;
/**
 * @function cancelIdleCallbackPolyfill
 * @description cancelIdleCallback的polyfill实现。Polyfill for cancelIdleCallback
 * @param {number} id - 回调ID。Callback ID
 * @example
 * const id = requestIdleCallbackPolyfill(() => {});
 * cancelIdleCallbackPolyfill(id);
 */
export declare function cancelIdleCallbackPolyfill(id: number): void;
