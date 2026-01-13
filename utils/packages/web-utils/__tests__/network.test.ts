import {
  isOnline,
  getNetworkType,
  getNetworkInfo,
  onNetworkChange,
  retryRequest,
  requestIdleCallbackPolyfill,
  cancelIdleCallbackPolyfill,
} from '../src/network';

describe('network utils', () => {
  it('should detect online status', () => {
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    expect(isOnline()).toBe(true);
  });

  it('should get network type and info', () => {
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false },
      configurable: true,
    });
    expect(getNetworkType()).toBe('4g');
    expect(getNetworkInfo()).toEqual({
      online: navigator.onLine,
      type: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
    });
  });

  it('should handle network change events', () => {
    const callback = jest.fn();
    const remove = onNetworkChange(callback);

    window.dispatchEvent(new Event('online'));
    window.dispatchEvent(new Event('offline'));

    expect(callback).toHaveBeenCalledWith(true);
    expect(callback).toHaveBeenCalledWith(false);

    remove();
  });

  it('should retry requests with backoff', async () => {
    const requestFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('ok');

    await expect(retryRequest(requestFn, 2, 1)).resolves.toBe('ok');
    expect(requestFn).toHaveBeenCalledTimes(3);
  });

  it('should schedule idle callback when native API missing', () => {
    const originalIdle = (window as any).requestIdleCallback;
    delete (window as any).requestIdleCallback;

    jest.useFakeTimers();
    const callback = jest.fn();
    const id = requestIdleCallbackPolyfill(callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();

    const clearSpy = jest.spyOn(window, 'clearTimeout');
    cancelIdleCallbackPolyfill(id);
    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
    (window as any).requestIdleCallback = originalIdle;
    jest.useRealTimers();
  });
});
