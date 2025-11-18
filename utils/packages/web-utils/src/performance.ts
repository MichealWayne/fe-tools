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
export function measureFPS(callback: (fps: number) => void, duration = 1000): () => void {
  let frames = 0;
  let lastTime = performance.now();
  let animationId: number;

  function countFrame() {
    frames++;
    animationId = requestAnimationFrame(countFrame);
  }

  const intervalId = window.setInterval(() => {
    const currentTime = performance.now();
    const fps = Math.round((frames * 1000) / (currentTime - lastTime));
    callback(fps);
    frames = 0;
    lastTime = currentTime;
  }, duration);

  countFrame();

  return () => {
    cancelAnimationFrame(animationId);
    clearInterval(intervalId);
  };
}

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
export function getWebVitals(
  callback: (metrics: {
    LCP?: number;
    FID?: number;
    CLS?: number;
    FCP?: number;
    TTFB?: number;
  }) => void
): void {
  const metrics: any = {};

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        metrics.LCP = lastEntry.renderTime || lastEntry.loadTime;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // PerformanceObserver not supported
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          metrics.FID = (entry as any).processingStart - entry.startTime;
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // Not supported
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver(list => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            metrics.CLS = clsValue;
          }
        });
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Not supported
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver(list => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            metrics.FCP = entry.startTime;
          }
        });
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      // Not supported
    }
  }

  // Time to First Byte (TTFB)
  const navigationTiming = performance.getEntriesByType('navigation')[0] as any;
  if (navigationTiming) {
    metrics.TTFB = navigationTiming.responseStart - navigationTiming.requestStart;
  }

  // Send metrics after a delay to allow collection
  setTimeout(() => callback(metrics), 3000);
}

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
export function measureMemory(): {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
} | null {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }
  return null;
}

/**
 * @function measureLoadTime
 * @description 测量页面加载时间。Measures page load time
 * @returns {object} 加载时间详情。Load time details
 * @example
 * const loadTime = measureLoadTime();
 * console.log(`DOM Ready: ${loadTime.domReady}ms`);
 * console.log(`Full Load: ${loadTime.fullLoad}ms`);
 */
export function measureLoadTime(): {
  domReady: number;
  fullLoad: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
} {
  const timing = performance.timing;
  const result = {
    domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
    fullLoad: timing.loadEventEnd - timing.navigationStart,
  };

  // Get paint timings if available
  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach(entry => {
    if (entry.name === 'first-paint') {
      (result as any).firstPaint = entry.startTime;
    } else if (entry.name === 'first-contentful-paint') {
      (result as any).firstContentfulPaint = entry.startTime;
    }
  });

  return result;
}

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
export function createPerformanceObserver(
  entryTypes: string[],
  callback: (entries: PerformanceEntry[]) => void
): PerformanceObserver | null {
  if (!('PerformanceObserver' in window)) {
    return null;
  }

  try {
    const observer = new PerformanceObserver(list => {
      callback(list.getEntries());
    });

    observer.observe({ entryTypes });
    return observer;
  } catch (e) {
    console.error('Failed to create PerformanceObserver:', e);
    return null;
  }
}

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
export function resourceTiming(resourceUrl?: string): any[] {
  const resources = performance.getEntriesByType('resource');
  const filtered = resourceUrl ? resources.filter(r => r.name.includes(resourceUrl)) : resources;

  return filtered.map((entry: any) => ({
    name: entry.name,
    type: entry.initiatorType,
    duration: entry.duration,
    size: entry.transferSize || entry.encodedBodySize,
    startTime: entry.startTime,
    responseEnd: entry.responseEnd,
  }));
}
