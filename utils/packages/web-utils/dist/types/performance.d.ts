/**
 * @module Performance
 * @description Performance monitoring and optimization utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:29:32
 */
/**
 * @function measureFPS
 * @description 测量当前帧率(FPS)。Measures current frames per second (FPS)
 * @param {Function} callback - 接收FPS值的回调函数。Callback function receiving FPS value
 * @param {number} duration - 测量持续时间(毫秒,默认: 1000)。Measurement duration in ms (default: 1000)
 * @returns {Function} 停止测量的函数。Function to stop measurement
 * @example
 * const stopMeasuring = measureFPS((fps) => {
 *   console.log(`Current FPS: ${fps}`);
 * });
 *
 * // Later, stop measuring
 * setTimeout(stopMeasuring, 5000);
 */
export declare function measureFPS(callback: (fps: number) => void, duration?: number): () => void;
/**
 * @function getWebVitals
 * @description 获取Web Vitals性能指标(LCP, FID, CLS)。Gets Web Vitals performance metrics (LCP, FID, CLS)
 * @param {Function} callback - 接收性能指标的回调函数。Callback receiving performance metrics
 * @example
 * getWebVitals((metrics) => {
 *   console.log('Web Vitals:', metrics);
 *   // { LCP: 2500, FID: 100, CLS: 0.1, FCP: 1800, TTFB: 800 }
 * });
 */
export declare function getWebVitals(callback: (metrics: {
    LCP?: number;
    FID?: number;
    CLS?: number;
    FCP?: number;
    TTFB?: number;
}) => void): void;
/**
 * @function measureMemory
 * @description 测量当前内存使用情况(Chrome/Edge支持)。Measures current memory usage (Chrome/Edge support)
 * @returns {object | null} 内存使用信息或null。Memory usage info or null
 * @example
 * const memory = measureMemory();
 * if (memory) {
 *   console.log(`JS Heap: ${memory.usedJSHeapSize / 1048576} MB`);
 *   console.log(`Total: ${memory.totalJSHeapSize / 1048576} MB`);
 * }
 */
export declare function measureMemory(): {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
} | null;
/**
 * @function measureLoadTime
 * @description 测量页面加载时间。Measures page load time
 * @returns {object} 加载时间详情。Load time details
 * @example
 * const loadTime = measureLoadTime();
 * console.log(`DOM Ready: ${loadTime.domReady}ms`);
 * console.log(`Full Load: ${loadTime.fullLoad}ms`);
 */
export declare function measureLoadTime(): {
    domReady: number;
    fullLoad: number;
    firstPaint?: number;
    firstContentfulPaint?: number;
};
/**
 * @function createPerformanceObserver
 * @description 创建性能观察器监听特定类型的性能条目。Creates performance observer for specific entry types
 * @param {string[]} entryTypes - 要观察的条目类型。Entry types to observe
 * @param {Function} callback - 接收性能条目的回调。Callback receiving performance entries
 * @returns {PerformanceObserver | null} 性能观察器实例或null。Performance observer instance or null
 * @example
 * const observer = createPerformanceObserver(['resource'], (entries) => {
 *   entries.forEach(entry => {
 *     console.log(`${entry.name}: ${entry.duration}ms`);
 *   });
 * });
 */
export declare function createPerformanceObserver(entryTypes: string[], callback: (entries: PerformanceEntry[]) => void): PerformanceObserver | null;
/**
 * @function resourceTiming
 * @description 获取资源加载时间分析。Gets resource loading time analysis
 * @param {string} resourceUrl - 资源URL(可选,不提供则返回所有资源)。Resource URL (optional, returns all if not provided)
 * @returns {object[]} 资源时间信息数组。Array of resource timing info
 * @example
 * const resources = resourceTiming();
 * resources.forEach(r => {
 *   console.log(`${r.name}: ${r.duration}ms`);
 * });
 *
 * // Get specific resource
 * const scriptTiming = resourceTiming('app.js');
 */
export declare function resourceTiming(resourceUrl?: string): any[];
