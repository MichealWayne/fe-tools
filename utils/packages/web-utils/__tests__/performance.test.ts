import {
  measureFPS,
  getWebVitals,
  measureMemory,
  measureLoadTime,
  createPerformanceObserver,
  resourceTiming,
} from '../src/performance';

describe('performance utils', () => {
  it('measureFPS should invoke callback and stop', () => {
    jest.useFakeTimers();
    let now = 0;
    const nowSpy = jest.spyOn(performance, 'now').mockImplementation(() => now);
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = (cb: FrameRequestCallback) =>
      window.setTimeout(() => {
        now += 16;
        cb(performance.now());
      }, 16) as any;

    const callback = jest.fn();
    const stop = measureFPS(callback, 100);

    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalled();

    stop();

    window.requestAnimationFrame = originalRAF;
    nowSpy.mockRestore();
    jest.useRealTimers();
  });

  it('getWebVitals should collect metrics', () => {
    jest.useFakeTimers();

    const originalObserver = (window as any).PerformanceObserver;
    const originalGetEntriesByType = performance.getEntriesByType;
    const entriesForType = (type?: string) => {
      if (type === 'largest-contentful-paint') {
        return [{ renderTime: 2500 }];
      }
      if (type === 'first-input') {
        return [{ processingStart: 120, startTime: 100 }];
      }
      if (type === 'layout-shift') {
        return [{ value: 0.1, hadRecentInput: false }];
      }
      if (type === 'paint') {
        return [{ name: 'first-contentful-paint', startTime: 1800 }];
      }
      return [];
    };

    (window as any).PerformanceObserver = class {
      private callback: (list: any) => void;
      constructor(callback: (list: any) => void) {
        this.callback = callback;
      }
      observe(options: { type?: string; entryTypes?: string[] }) {
        const type = options.type || options.entryTypes?.[0];
        this.callback({ getEntries: () => entriesForType(type) });
      }
    };

    Object.defineProperty(performance, 'getEntriesByType', {
      value: (type: any) =>
        type === 'navigation' ? ([{ requestStart: 0, responseStart: 800 }] as any) : ([] as any),
      configurable: true,
    });

    const callback = jest.fn();
    getWebVitals(callback);

    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledWith(
      expect.objectContaining({ LCP: 2500, FID: 20, CLS: 0.1, FCP: 1800, TTFB: 800 })
    );

    (window as any).PerformanceObserver = originalObserver;
    Object.defineProperty(performance, 'getEntriesByType', {
      value: originalGetEntriesByType,
      configurable: true,
    });
    jest.useRealTimers();
  });

  it('measureMemory should return memory info when available', () => {
    const originalMemory = (performance as any).memory;
    (performance as any).memory = { usedJSHeapSize: 1, totalJSHeapSize: 2, jsHeapSizeLimit: 3 };
    expect(measureMemory()).toEqual({ usedJSHeapSize: 1, totalJSHeapSize: 2, jsHeapSizeLimit: 3 });
    (performance as any).memory = originalMemory;
  });

  it('measureLoadTime should return timings', () => {
    const originalTiming = performance.timing;
    const originalGetEntries = performance.getEntriesByType;
    (performance as any).timing = {
      navigationStart: 0,
      domContentLoadedEventEnd: 50,
      loadEventEnd: 120,
    };
    Object.defineProperty(performance, 'getEntriesByType', {
      value: (type: any) =>
        type === 'paint'
          ? [
              { name: 'first-paint', startTime: 30 },
              { name: 'first-contentful-paint', startTime: 40 },
            ]
          : [],
      configurable: true,
    });

    expect(measureLoadTime()).toEqual({
      domReady: 50,
      fullLoad: 120,
      firstPaint: 30,
      firstContentfulPaint: 40,
    });

    (performance as any).timing = originalTiming;
    Object.defineProperty(performance, 'getEntriesByType', {
      value: originalGetEntries,
      configurable: true,
    });
  });

  it('createPerformanceObserver should return observer when supported', () => {
    const originalObserver = (window as any).PerformanceObserver;
    (window as any).PerformanceObserver = class {
      observe() {}
    };
    const observer = createPerformanceObserver(['resource'], () => {});
    expect(observer).not.toBeNull();
    (window as any).PerformanceObserver = originalObserver;
  });

  it('resourceTiming should filter resources', () => {
    const originalGetEntries = performance.getEntriesByType;
    Object.defineProperty(performance, 'getEntriesByType', {
      value: (type: any) =>
        type === 'resource'
          ? [
              {
                name: 'app.js',
                initiatorType: 'script',
                duration: 10,
                transferSize: 100,
                startTime: 0,
                responseEnd: 10,
              },
              {
                name: 'style.css',
                initiatorType: 'link',
                duration: 5,
                transferSize: 50,
                startTime: 0,
                responseEnd: 5,
              },
            ]
          : [],
      configurable: true,
    });

    const filtered = resourceTiming('app.js');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('app.js');

    Object.defineProperty(performance, 'getEntriesByType', {
      value: originalGetEntries,
      configurable: true,
    });
  });
});
