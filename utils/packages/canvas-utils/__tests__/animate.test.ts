describe('animate', () => {
  it('should call onProcess and onAnimationFinish using fallback timer', () => {
    const originalRAF = (globalThis as any).requestAnimationFrame;
    delete (globalThis as any).requestAnimationFrame;
    jest.resetModules();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { animate } = require('../src/utils/animate');

    jest.useFakeTimers();
    const onProcess = jest.fn();
    const onFinish = jest.fn();

    animate({ duration: 50, onProcess, onAnimationFinish: onFinish });

    jest.runAllTimers();

    expect(onProcess).toHaveBeenCalled();
    expect(onFinish).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
    (globalThis as any).requestAnimationFrame = originalRAF;
  });
});
