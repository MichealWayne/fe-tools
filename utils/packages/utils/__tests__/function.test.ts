/**
 * @author Wayne
 * @Date 2023-02-18 10:28:42
 * @LastEditTime 2025-06-09 19:18:36
 */

import {
  NOOP,
  attempt,
  runPromisesInSeries,
  once,
  pipe,
  throttle,
  debounce,
  functionName,
  memoize,
  curry,
  sleep,
  defer,
  timeTaken,
  chainAsync,
  compose,
  promisify,
} from '../src/function';

describe('functionName', () => {
  it('empty function', () => {
    expect(functionName(() => '')).toEqual('');
  });
});

describe('memoize', () => {
  it('should return a function', () => {
    const result = memoize(() => '');
    expect(typeof result).toEqual('function');
  });

  it('should return the same value for the same argument', () => {
    const fn = jest.fn(x => x * 2);
    const memoizedFn = memoize(fn);

    const result1 = memoizedFn(5);
    const result2 = memoizedFn(5);

    expect(result1).toEqual(10);
    expect(result2).toEqual(10);
    expect(fn).toBeCalledTimes(1);
  });

  it('should call the original function if the argument is not in the cache', () => {
    const fn = jest.fn(x => x * 3);
    const memoizedFn = memoize(fn);

    const result = memoizedFn(7);

    expect(result).toEqual(21);
    expect(fn).toBeCalledWith(7);
  });
});

describe('function test', () => {
  it('should return a function if the number of arguments is less than the arity', () => {
    const add = (a: number, b: number): number => a + b;
    const curriedAdd = curry(add);
    expect(typeof curriedAdd).toEqual('function');
  });

  it('should return the result if the number of arguments is equal to the arity', () => {
    const add = (a: number, b: number): number => a + b;
    const curriedAdd = curry(add);
    expect(curriedAdd(1)(2)).toEqual(3);
  });

  it('should return a new function with additional arguments if the number of arguments is greater than the arity', () => {
    const add = (a: number, b: number): number => a + b;
    const curriedAdd = curry(add);
    const curriedAddWithAdditionalArg = curriedAdd(1);
    expect(typeof curriedAddWithAdditionalArg).toEqual('function');
    expect(curriedAddWithAdditionalArg(2)).toEqual(3);
  });

  it('NOOP()', async () => {
    expect(NOOP()).toEqual('');
  });

  it('attempt()', async () => {
    const fn1 = (a: number, b: number) => a + b;
    expect(attempt(fn1, 2, 3)).toBe(5);
    expect(attempt(fn1, 2, 3)).toBe(5);

    // const fn2 = () => {
    //   throw 'error message';
    // };
    // expect(attempt(fn2)).toThrowError();

    expect(attempt(() => '')).toBe('');
  });

  it('pipe', async () => {
    // 定义一个处理函数
    function addOne(n: number): number {
      return n + 1;
    }

    // 定义一个函数管道
    const pipeline = pipe(addOne, addOne, addOne);

    // 使用函数管道处理数据
    const result = pipeline(1);

    expect(result).toBe(4);
  });

  it('(runPromisesInSeries)Empty array as argument', async () => {
    const result = await runPromisesInSeries([]);
    expect(await result).toBeUndefined();
  });

  it('(runPromisesInSeries)Array with one function as argument', async () => {
    const fn = jest.fn(async () => 2);
    const result = await runPromisesInSeries([fn]);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(await result).toBe(2);
  });

  it('(runPromisesInSeries)Array with multiple functions as argument', async () => {
    const fns = [jest.fn(async () => 2), jest.fn(async x => x + 1), jest.fn(async x => x - 3)];
    const result = await runPromisesInSeries(fns);
    expect(fns[0]).toHaveBeenCalledTimes(1);
    expect(fns[1]).toHaveBeenCalledTimes(1);
    expect(fns[1]).toHaveBeenCalledWith(2);
    expect(fns[2]).toHaveBeenCalledTimes(1);
    expect(fns[2]).toHaveBeenCalledWith(3);
    expect(await result).toBe(0);
  });

  it('(runPromisesInSeries)Functions in the array return different types of Promise', async () => {
    const fns = [
      jest.fn(async () => 2),
      jest.fn(async x => `${x + 1}`),
      jest.fn(async x => ({ message: x })),
    ];
    const result = await runPromisesInSeries(fns);
    expect(fns[0]).toHaveBeenCalledTimes(1);
    expect(fns[1]).toHaveBeenCalledTimes(1);
    expect(fns[1]).toHaveBeenCalledWith(2);
    expect(fns[2]).toHaveBeenCalledTimes(1);
    expect(fns[2]).toHaveBeenCalledWith('3');
    expect(await result).toEqual({ message: '3' });
  });

  it('once()', async () => {
    const _tempObj = {
      index: 0,
    };
    const _tempFunc = () => _tempObj.index++;
    const resTempFunc = once(_tempFunc);
    const resTempFunc2 = once(_tempFunc);

    resTempFunc();
    expect(_tempObj.index).toEqual(1);
    resTempFunc();
    expect(_tempObj.index).toEqual(1);
    resTempFunc();
    expect(_tempObj.index).toEqual(1);

    resTempFunc2();
    expect(_tempObj.index).toEqual(2);
    resTempFunc2();
    expect(_tempObj.index).toEqual(2);
    resTempFunc2();
    expect(_tempObj.index).toEqual(2);
  });

  it('throttle()', done => {
    const mockFn = jest.fn();
    const fn = throttle(mockFn, 10);

    fn(1);
    fn(2);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 50);
  });

  it('throttle() default', done => {
    const mockFn = jest.fn();
    const fn = throttle(mockFn);

    fn(1);
    setTimeout(() => fn(2), 100);
    setTimeout(() => fn(3), 200);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 1000);
  });

  it('debounce()', done => {
    const mockFn = jest.fn();
    const fn = debounce(mockFn, 10);

    fn(1);
    fn(2);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 50);
  });

  it('debounce() default', done => {
    const mockFn = jest.fn();
    const fn = debounce(mockFn);

    fn(1);

    setTimeout(() => fn(2), 100);
    setTimeout(() => fn(3), 200);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      done();
    }, 1000);
  });

  it('defer()', async () => {
    const mockFn = jest.fn();
    await defer(mockFn, 'test');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('sleep()', async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45); // Allow a small margin of error
  });

  it('timeTaken()', () => {
    const consoleSpy = jest.spyOn(console, 'time');
    const consoleEndSpy = jest.spyOn(console, 'timeEnd');
    const mockFn = jest.fn(() => 'result');

    const result = timeTaken(mockFn, 'test');

    expect(consoleSpy).toHaveBeenCalledWith('timeTaken');
    expect(consoleEndSpy).toHaveBeenCalledWith('timeTaken');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test');
    expect(result).toBe('result');

    consoleSpy.mockRestore();
    consoleEndSpy.mockRestore();
  });

  it('chainAsync()', done => {
    let count = 0;

    // Define a specific type for the next function
    type NextFn = () => void;

    const fn1 = jest.fn(function (this: unknown, ...args: unknown[]) {
      count++;
      setTimeout(() => {
        expect(count).toBe(1);
        (args[0] as NextFn)();
      }, 10);
    });

    const fn2 = jest.fn(function (this: unknown, ...args: unknown[]) {
      count++;
      setTimeout(() => {
        expect(count).toBe(2);
        (args[0] as NextFn)();
      }, 10);
    });

    const fn3 = jest.fn(function () {
      count++;
      setTimeout(() => {
        expect(count).toBe(3);
        done();
      }, 10);
    });

    chainAsync([fn1, fn2, fn3]);
  });

  it('compose()', () => {
    const add2 = (x: number) => x + 2;
    const multiply3 = (x: number) => x * 3;
    const divideBy2 = (x: number) => x / 2;

    // (5 / 2) * 3 + 2 = 9.5
    const composed = compose(add2, multiply3, divideBy2);
    expect(composed(5)).toBe(9.5);
  });

  it('promisify()', async () => {
    // Create a mock Node.js-style function
    type NodeCallback = (err: Error | null, result?: number) => void;

    const mockNodeFn = jest.fn(function (args: unknown[], callback?: NodeCallback) {
      setTimeout(() => {
        if (typeof args[0] === 'number' && args[0] < 0) {
          callback && callback(new Error('Value must be positive'));
        } else {
          callback && callback(null, typeof args[0] === 'number' ? args[0] * 2 : 0);
        }
      }, 10);
    });

    const promisified = promisify(mockNodeFn);

    // Test success case
    const result = await promisified([5]);
    expect(result).toBe(10);

    // Test error case
    try {
      await promisified([-1]);
      fail('Expected promisified function to throw an error');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Value must be positive');
    }
  });
});
