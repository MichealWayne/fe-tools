/**
 * @author Wayne
 * @Date 2023-02-18 10:28:42
 * @LastEditTime 2024-03-25 20:18:43
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
  curry,
} from '../src/function';

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

  it('should log the name and function of a given function', () => {
    const mockFn = jest.fn();
    const result = functionName(mockFn);
    expect(console.debug).toHaveBeenCalledWith(mockFn.name, mockFn);
    expect(result).toBe(mockFn.name);
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

  //   it('(runPromisesInSeries)Array with one function as argument', async () => {
  //     const fn = jest.fn(async (x: number) => x * 2);
  //     const result = await runPromisesInSeries([fn]);
  //     expect(fn).toHaveBeenCalledTimes(1);
  //     expect(fn).toHaveBeenCalledWith(undefined);
  //     expect(result).toBeInstanceOf(Promise);
  //     expect(await result).toBeUndefined();
  //   });

  //   it('(runPromisesInSeries)Array with multiple functions as argument', async () => {
  //     const fns = [
  //       jest.fn(async (x: number) => x * 2),
  //       jest.fn(async (x: number) => x + 1),
  //       jest.fn(async (x: number) => x - 3),
  //     ];
  //     const result = await runPromisesInSeries(fns);
  //     expect(fns[0]).toHaveBeenCalledTimes(1);
  //     expect(fns[0]).toHaveBeenCalledWith(undefined);
  //     expect(fns[1]).toHaveBeenCalledTimes(1);
  //     expect(fns[1]).toHaveBeenCalledWith(2);
  //     expect(fns[2]).toHaveBeenCalledTimes(1);
  //     expect(fns[2]).toHaveBeenCalledWith(3);
  //     expect(result).toBeInstanceOf(Promise);
  //     expect(await result).toBeUndefined();
  //   });

  //   it('(runPromisesInSeries)Functions in the array return different types of Promise', async () => {
  //     const fns = [
  //       jest.fn(async (x: number) => x * 2),
  //       jest.fn(async (x: number) => `${x + 1}`),
  //       jest.fn(async () => ({ message: 'Hello' })),
  //     ];
  //     const result = await runPromisesInSeries(fns);
  //     expect(fns[0]).toHaveBeenCalledTimes(1);
  //     expect(fns[0]).toHaveBeenCalledWith(undefined);
  //     expect(fns[1]).toHaveBeenCalledTimes(1);
  //     expect(fns[1]).toHaveBeenCalledWith(2);
  //     expect(fns[2]).toHaveBeenCalledTimes(1);
  //     expect(fns[2]).toHaveBeenCalledWith('3');
  //     expect(result).toBeInstanceOf(Promise);
  //     expect(await result).toBeUndefined();
  //   });

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
});
