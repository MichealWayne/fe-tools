/**
 * @module Function
 * @author Wayne
 * @createTime 2022-03-12 14:44:00
 * @LastEditTime 2023-03-01 19:21:19
 */

export const NOOP = () => '';

const DEFAULT_INTERVAL = 500;

/**
 * @funciton attempt
 * @description 试执行传入的函数 fn，并返回其执行结果。
 * @param {Function} fn
 * @param {Unknown} args
 * @return {Unknown}
 */
export function attempt<T extends unknown[], R>(fn: (...fnArgs: T) => R, ...args: T): Error | R {
  try {
    return fn(...args);
  } catch (err) {
    return err instanceof Error ? err : new Error(String(err));
  }
}

/**
 * @function defer
 * @description 延迟执行函数
 * @param {function} fn
 * @param  {...any} args
 * @return {number}
 */
export function defer(fn: (...ks: unknown[]) => unknown, ...args: unknown[]) {
  return setTimeout(fn, 1, ...args);
}

/**
 * @function runPromisesInSeries
 * @description 队列执行promise
 * @param {promise array} ps
 * @return {Promise}
 */
export function runPromisesInSeries(ps: Array<(...args: unknown[]) => Promise<any>>) {
  return ps.reduce((p, next) => p?.then(next), Promise.resolve());
}

/**
 * @function timeTaken
 * @description 记录执行时间
 * @param {function} fn
 * @return {any}
 */
export function timeTaken(fn: (...ks: unknown[]) => unknown, ...args: unknown[]) {
  console.time('timeTaken');
  const res = fn(...args);
  console.timeEnd('timeTaken');
  return res;
}

/**
 * @function memoize
 * @description 缓存函数
 * @param {function} fn
 * @return {any}
 */
export function memoize(fn: (...args: unknown[]) => unknown) {
  const cache = new Map();
  const cached = function (val: unknown) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn(val)) && cache.get(val);
  };
  cached.cache = cache;
  return cached;
}

/**
 * @function once
 * @description 单例执行函数
 * @param {function} fn
 * @return {function}
 */
export function once(fn: (...args: unknown[]) => unknown) {
  let _called = false;
  return function (...argus: unknown[]) {
    if (!_called) {
      _called = true;
      fn(...argus);
    }
  };
}

/**
 * @function chainAsync
 * @description 链式执行函数
 * @param {function array} fns
 * @example chainAsync([next => { console.log(1); setTimeout(next, 1000)}, next => { console.log(2);} ])
 */
export function chainAsync(fns: Array<(...args: unknown[]) => unknown>) {
  let curr = 0;
  const next = () => fns[curr++](next);
  next();
}

/**
 * @function compose
 * @description 组合函数
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = compose(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return fns.reduce((f, g) => arg => f(g(arg)));
}

/**
 * @function pipe
 * @description 管道执行函数
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = pipe(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
export function pipe<T extends unknown[]>(...fns: Array<(arg: T) => T>) {
  return fns.reduce((f, g) => (arg: T) => g(f(arg)));
}

/**
 * @function curry
 * @description 柯里化
 * @param {function} fn
 * @param {number} arity
 * @param  {...any} args
 * @example
 * curry(Math.pow)(2)(10)
 */
export function curry<T extends unknown[], R>(
  fn: (...fnArgs: T) => R,
  arity: number = fn.length,
  ...args: T
) {
  return arity <= args.length ? fn(...args) : (curry as any).bind(null, fn, arity, ...args);
}

/**
 * @function functionName
 * @description 打印函数名称
 * @param {function} fn
 */
export function functionName<T extends (...ks: unknown[]) => unknown>(fn: T): void {
  return console.debug(fn.name, fn);
}

/**
 * @function promisify
 * @description 函数执行promise化
 * @param {function} fn
 */
export function promisify<T extends unknown[], R>(
  fn: (...args: [args: T, errHandler?: (err: Error | null, result?: R) => void]) => void
): (...args: T) => Promise<R> {
  return (...args: T) =>
    new Promise((resolve, reject) => {
      fn(args, (err: Error | null, result?: R) => {
        err ? reject(err) : resolve(result as R);
      });
    });
}

/**
 * @function sleep
 * @description 延迟ms执行
 * @param {number} ms
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @function throttle
 * @description 节流函数
 * @param {Function} fn
 * @param {Number} intervalTime
 * @returns {Function}
 */
export function throttle<F extends (...args: any[]) => any>(
  fn: F,
  intervalTime = DEFAULT_INTERVAL
): (...args: Parameters<F>) => void {
  let flag = true;
  return function (this: any, ...args: Parameters<F>) {
    if (flag) {
      fn.apply(this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, intervalTime);
    }
  };
}

type DebouncedFn<T extends unknown[]> = (...args: T) => void;

/**
 * @function debounce
 * @description 防抖函数
 * @param {Function} fn
 * @param {Number} intervalTime
 * @returns {Function}
 */
export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  intervalTime = DEFAULT_INTERVAL
): DebouncedFn<T> {
  let timeId: ReturnType<typeof setTimeout> | null = null;
  return function debouncedFn(this: unknown, ...args: T) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      timeId = null;
      fn.apply(this, args);
    }, intervalTime);
  };
}
