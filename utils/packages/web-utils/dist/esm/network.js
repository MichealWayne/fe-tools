/**
 * @module Network
 * @description Network utilities and connection helpers
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:34
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
export function isOnline() {
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
export function getNetworkType() {
    var connection = navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
    if (!connection)
        return 'unknown';
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
export function getNetworkInfo() {
    var connection = navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
    var info = {
        online: navigator.onLine,
        type: getNetworkType(),
    };
    if (connection) {
        if (connection.downlink)
            info.downlink = connection.downlink;
        if (connection.rtt)
            info.rtt = connection.rtt;
        if (typeof connection.saveData !== 'undefined')
            info.saveData = connection.saveData;
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
export function onNetworkChange(callback) {
    var onlineHandler = function () { return callback(true); };
    var offlineHandler = function () { return callback(false); };
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    return function () {
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
export function retryRequest(requestFn, maxRetries, delay) {
    if (maxRetries === void 0) { maxRetries = 3; }
    if (delay === void 0) { delay = 1000; }
    return __awaiter(this, void 0, void 0, function () {
        var lastError, _loop_1, i, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
                        var _b, error_1;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 2, , 5]);
                                    _b = {};
                                    return [4 /*yield*/, requestFn()];
                                case 1: return [2 /*return*/, (_b.value = _c.sent(), _b)];
                                case 2:
                                    error_1 = _c.sent();
                                    lastError = error_1;
                                    if (!(i < maxRetries)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, delay * Math.pow(2, i)); })];
                                case 3:
                                    _c.sent();
                                    _c.label = 4;
                                case 4: return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= maxRetries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: throw lastError || new Error('Request failed');
            }
        });
    });
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
export function requestIdleCallbackPolyfill(callback, options) {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        return window.requestIdleCallback(callback, options);
    }
    var start = Date.now();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var globalObj = (typeof window !== 'undefined' ? window : global);
    var timeoutId = globalObj.setTimeout(function () {
        callback({
            didTimeout: false,
            timeRemaining: function () { return Math.max(0, 50 - (Date.now() - start)); },
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
export function cancelIdleCallbackPolyfill(id) {
    if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(id);
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var globalObj = (typeof window !== 'undefined' ? window : global);
        globalObj.clearTimeout(id);
    }
}
