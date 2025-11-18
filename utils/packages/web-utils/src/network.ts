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
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * @function getNetworkType
 * @description 获取网络连接类型(4G, 5G, WiFi等)。Gets network connection type (4G, 5G, WiFi, etc.)
 * @returns {string} 网络类型或'unknown'。Network type or 'unknown'
 * @example
 * const networkType = getNetworkType();
 * console.log(`Connection type: ${networkType}`); // -> '4g', 'wifi', etc.
 */
export function getNetworkType(): string {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!connection) return 'unknown';

  return connection.effectiveType || connection.type || 'unknown';
}

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
export function getNetworkInfo(): {
  online: boolean;
  type: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
} {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  const info: any = {
    online: navigator.onLine,
    type: getNetworkType(),
  };

  if (connection) {
    if (connection.downlink) info.downlink = connection.downlink;
    if (connection.rtt) info.rtt = connection.rtt;
    if (typeof connection.saveData !== 'undefined') info.saveData = connection.saveData;
  }

  return info;
}

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
export function onNetworkChange(callback: (online: boolean) => void): () => void {
  const onlineHandler = () => callback(true);
  const offlineHandler = () => callback(false);

  window.addEventListener('online', onlineHandler);
  window.addEventListener('offline', offlineHandler);

  return () => {
    window.removeEventListener('online', onlineHandler);
    window.removeEventListener('offline', offlineHandler);
  };
}

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
export async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError || new Error('Request failed');
}

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
export function requestIdleCallbackPolyfill(
  callback: (deadline: any) => void,
  options?: { timeout?: number }
): number {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }

  const start = Date.now();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalObj = (typeof window !== 'undefined' ? window : global) as any;
  const timeoutId = globalObj.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
    });
  }, 1);

  return timeoutId;
}

/**
 * @function cancelIdleCallbackPolyfill
 * @description cancelIdleCallback的polyfill实现。Polyfill for cancelIdleCallback
 * @param {number} id - 回调ID。Callback ID
 * @example
 * const id = requestIdleCallbackPolyfill(() => {});
 * cancelIdleCallbackPolyfill(id);
 */
export function cancelIdleCallbackPolyfill(id: number): void {
  if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalObj = (typeof window !== 'undefined' ? window : global) as any;
    globalObj.clearTimeout(id);
  }
}
