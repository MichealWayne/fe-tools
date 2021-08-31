/**
 * @module Function
 * @description function handler functions
 */

/**
 * @funciton attempt
 * @param {function} fn
 * @param  {...any} args
 */
export function attempt(fn, ...args) {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
}

/**
 * @function defer
 * @param {function} fn
 * @param  {...any} args
 * @return {number}
 */
export function defer(fn, ...args) {
  return setTimeout(fn, 1, ...args);
}

/**
 * @function runPromisesInSeries
 * @param {promise array} ps
 * @return {Promise}
 */
export function runPromisesInSeries(ps) {
  return ps.reduce((p, next) => p.then(next), Promise.resolve());
}

/**
 * @function timeTaken
 * @param {function} callback
 * @return {any}
 */
export function timeTaken(callback) {
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
export function memoize(fn) {
  const cache = new Map();
  const cached = function (val) {
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
export function once(fn) {
  let _called = false;
  return function (...argus) {
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
export function chainAsync(fns) {
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
export function compose(...fns) {
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
export function pipe(...fns) {
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
export function curry(fn, arity = fn.length, ...args) {
  return arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);
}

/**
 * @function functionName
 * @param {function} fn
 */
export function functionName(fn) {
  return console.debug(fn.name, fn);
}

/**
 * @function promisify
 * @param {function} func
 */
export function promisify(func) {
  return (...args) =>
    new Promise((resolve, reject) => {
      func(...args, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
}

/**
 * @function sleep
 * @param {number} ms
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
