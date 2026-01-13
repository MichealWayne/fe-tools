jest.mock('../src/utils/animate', () => ({
  animate: jest.fn(),
}));

import { mixins, setAnimationHooks } from '../src/utils/decorators';
import { animate } from '../src/utils/animate';

describe('decorators', () => {
  it('mixins should copy methods to target prototype', () => {
    const mixinA = { foo() { return 'foo'; } };
    const mixinB = { bar() { return 'bar'; } };

    class TestClass {}

    mixins(mixinA, mixinB)(TestClass);

    const instance: any = new TestClass();
    expect(instance.foo()).toBe('foo');
    expect(instance.bar()).toBe('bar');
  });

  it('setAnimationHooks should call animate with options', () => {
    class Chart {
      chartjs = { opts: { duration: 100, onFinish: jest.fn() } };
      setAnimation!: (onProcess: (rate: number) => void) => void;
    }

    setAnimationHooks(Chart);

    const chart = new Chart();
    const onProcess = jest.fn();
    chart.setAnimation(onProcess);

    expect(animate).toHaveBeenCalledWith({
      duration: 100,
      onProcess,
      onAnimationFinish: chart.chartjs.opts.onFinish,
    });
  });
});
