/**
 * @author Wayne
 * @Date 2024-07-23 10:06:50
 */

describe('env', () => {
  it('should default __DEV__ to false when NODE_ENV is unavailable', () => {
    const originalProcess = (globalThis as any).process;
    (globalThis as any).process = undefined;

    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { __DEV__ } = require('../src/utils/env');

    expect(__DEV__).toBe(false);

    (globalThis as any).process = originalProcess;
  });

  it('should detect web/node/weapp environments correctly', () => {
    const originalWx = (globalThis as any).wx;

    (globalThis as any).wx = { getSystemInfoSync: () => ({}) };
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const weappEnv = require('../src/utils/env');
    expect(weappEnv.isWeapp).toBe(true);
    expect(weappEnv.isWeb).toBe(false);

    delete (globalThis as any).wx;
    jest.resetModules();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const webEnv = require('../src/utils/env');
    expect(webEnv.isWeb).toBe(true);
    expect(webEnv.isNode).toBe(true);

    (globalThis as any).wx = originalWx;
  });
});

describe('setEnvContext', () => {
  it('should initialize canvas and context on method call', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setEnvContext } = require('../src/utils/decorators');

    class TestChart {
      $el: HTMLCanvasElement;
      opts: { width?: number; height?: number; id?: string };
      canvas?: any;
      ctx?: any;
      _chart?: { width: number; height: number };

      constructor(opts: { width?: number; height?: number; id?: string }) {
        this.opts = opts;
        this.$el = document.createElement('canvas');
        this.$el.width = 500;
        this.$el.height = 500;
        (this.$el as any).getContext = jest.fn(() => ({}));
      }

      init() {
        return { canvas: this.canvas, ctx: this.ctx, chart: this._chart };
      }
    }

    const descriptor = Object.getOwnPropertyDescriptor(TestChart.prototype, 'init') as PropertyDescriptor;
    setEnvContext(TestChart.prototype, 'init', descriptor);
    Object.defineProperty(TestChart.prototype, 'init', descriptor);

    const chart = new TestChart({});

    const result = chart.init();

    expect(result.canvas).toBeDefined();
    expect(result.ctx).toBeDefined();
    expect(result.chart).toEqual({ width: 500, height: 500 });
  });
});
