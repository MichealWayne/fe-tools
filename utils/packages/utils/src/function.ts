/**
 * @module Function
 * @description function handler functions
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2022-08-30 10:44:35
 */

const DEFAULT_INTERVAL = 500;

/**
 * @funciton attempt
 * @param {function} fn
 * @param  {...any} args
 */
export function attempt(fn: (...ks: unknown[]) => unknown, ...args: unknown[]) {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(String(e));
  }
}

/**
 * @function defer
 * @param {function} fn
 * @param  {...any} args
 * @return {number}
 */
export function defer(fn: (...ks: unknown[]) => unknown, ...args: unknown[]) {
  return setTimeout(fn, 1, ...args);
}

/**
 * @function runPromisesInSeries
 * @param {promise array} ps
 * @return {Promise}
 */
export function runPromisesInSeries(ps: any[]) {
  return ps.reduce((p, next) => p?.then(next), Promise.resolve());
}

/**
 * @function timeTaken
 * @param {function} callback
 * @return {any}
 */
export function timeTaken(callback: (...args: unknown[]) => unknown) {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
}

/**
 * @function memoize
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
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = compose(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
export function compose(...fns: Array<(...args: unknown[]) => unknown>) {
  return fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
}

/**
 * @function pipe
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = pipe(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
export function pipe(...fns: Array<(...args: unknown[]) => unknown>) {
  return fns.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  );
}

/**
 * @function curry
 * @param {function} fn
 * @param {number} arity
 * @param  {...any} args
 * @example
 * curry(Math.pow)(2)(10)
 */
export function curry(
  fn: (...ks: unknown[]) => unknown,
  arity = fn.length,
  ...args: unknown[]
): unknown {
  return arity <= args.length ? fn(...args) : (curry as any).bind(null, fn, arity, ...args);
}

/**
 * @function functionName
 * @param {function} fn
 */
export function functionName(fn: (...ks: unknown[]) => unknown) {
  return console.debug(fn.name, fn);
}

/**
 * @function promisify
 * @param {function} func
 */
export function promisify(func: (...ks: unknown[]) => unknown) {
  return (...args: unknown[]) =>
    new Promise((resolve, reject) => {
      func(...args, (err: Error, result: unknown) => {
        err ? reject(err) : resolve(result);
      });
    });
}

/**
 * @function sleep
 * @param {number} ms
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * @function throttle
 * @param {Function} func
 * @param {Number} intervalTime
 * @returns {Function}
 */
export function throttle(
  func: {
    apply: (arg0: unknown, ...arg1: unknown[]) => void;
  },
  intervalTime = DEFAULT_INTERVAL
) {
  let flag = true;
  return function (_this: unknown, ...args: unknown[]) {
    if (flag) {
      func.apply(_this, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, intervalTime);
    }
  };
}

/**
 * @function debounce
 * @param {Function} func
 * @param {Number} intervalTime
 * @returns {Function}
 */
export function debounce(
  func: {
    apply: (arg0: unknown, arg1: unknown[]) => void;
  },
  intervalTime = DEFAULT_INTERVAL
) {
  let timeId: null | ReturnType<typeof setTimeout> = null;
  return function (_this: unknown, ...args: unknown[]) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      timeId = null;
      func.apply(_this, args);
    }, intervalTime);
  };
}
