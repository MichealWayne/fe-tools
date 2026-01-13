import { onPageLoad, onPageUnload, onBeforeUnload } from '../src/lifecycle';

describe('lifecycle utils', () => {
  it('onPageLoad should run immediately when already loaded', () => {
    const originalState = document.readyState;
    Object.defineProperty(document, 'readyState', { value: 'complete', configurable: true });

    jest.useFakeTimers();
    const callback = jest.fn();
    onPageLoad(callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();

    Object.defineProperty(document, 'readyState', { value: originalState, configurable: true });
    jest.useRealTimers();
  });

  it('onPageLoad should attach and remove listener', () => {
    const originalState = document.readyState;
    Object.defineProperty(document, 'readyState', { value: 'loading', configurable: true });

    const callback = jest.fn();
    const remove = onPageLoad(callback);
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(callback).toHaveBeenCalled();

    remove();
    Object.defineProperty(document, 'readyState', { value: originalState, configurable: true });
  });

  it('onPageUnload should attach and remove listener', () => {
    const callback = jest.fn();
    const remove = onPageUnload(callback);
    window.dispatchEvent(new Event('unload'));
    expect(callback).toHaveBeenCalled();
    remove();
  });

  it('onBeforeUnload should attach and remove listener', () => {
    const callback = jest.fn();
    const remove = onBeforeUnload(callback);
    window.dispatchEvent(new Event('beforeunload'));
    expect(callback).toHaveBeenCalled();
    remove();
  });
});
