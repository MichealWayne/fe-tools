/**
 * @jest-environment node
 */

describe('dom SSR fallbacks', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.resetModules();
  });

  it('requestAnimFrame should use global setTimeout when window is unavailable', () => {
    jest.useFakeTimers();
    const { requestAnimFrame } = require('../src/dom') as typeof import('../src/dom');
    const callback = jest.fn();

    requestAnimFrame(callback);
    jest.advanceTimersByTime(17);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
