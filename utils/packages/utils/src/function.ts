/**
 * @module Function
 * @description Function utility functions for composition, execution control, and performance
 * @author Wayne
 * @createTime 2022-03-12 14:44:00
 * @LastEditTime 2025-09-07 20:34:55
 */

/**
 * @function NOOP
 * @description 无操作函数，返回空字符串（用作默认回调函数）。No-operation function that returns an empty string (useful as default callback)
 * @returns {string} 空字符串。Empty string
 * @example
 * ```ts
 * // Using as default callback
 * function processData(data, callback = NOOP) {
 *   // Process data...
 *   callback();
 * }
 *
 * ```
 * @example
 * ```ts
 * // Placeholder for event handlers
 * const button = { onClick: NOOP };
 * button.onClick(); // -> ''
 *
 * ```
 * @example
 * ```ts
 * // Array operations
 * [1, 2, 3].forEach(NOOP); // Does nothing for each element
 * ```
 */
export const NOOP = () => '';

/**
 * @function attempt
 * @description 安全地执行函数并返回结果或发生的任何错误。Safely executes a function and returns either the result or any error that occurred
 * @param {Function} fn - 要执行的函数。Function to execute
 * @param {...any} args - 传递给函数的参数。Arguments to pass to the function
 * @returns {any|Error} 函数结果或错误对象。Either the function result or an Error object
 * @throws {never} 永不抛出 - 所有错误都被捕获并返回。Never throws - all errors are caught and returned
 * @example
 * ```ts
 * // Successful execution
 * attempt((a, b) => a + b, 1, 2); // -> 3
 * attempt(() => 'success'); // -> 'success'
 *
 * ```
 * @example
 * ```ts
 * // Error handling
 * attempt(() => { throw new Error('Something went wrong'); }); // -> Error: Something went wrong
 * attempt(JSON.parse, 'invalid json'); // -> SyntaxError: Unexpected token i in JSON
 *
 * ```
 * @example
 * ```ts
 * // Division by zero
 * attempt((a, b) => {
 *   if (b === 0) throw new Error('Division by zero');
 *   return a / b;
 * }, 10, 0); // -> Error: Division by zero
 *
 * ```
 * @example
 * ```ts
 * // Type checking results
 * const result = attempt(() => Math.random());
 * if (result instanceof Error) {
 *   console.log('Error occurred:', result.message);
 * } else {
 *   console.log('Result:', result);
 * }
 * ```
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
 * @description 将函数的执行延迟到事件循环的下一个时钟周期。Defers execution of a function to the next tick of the event loop
 * @param {Function} fn - 要延迟执行的函数。Function to defer
 * @param {...any} args - 传递给函数的参数。Arguments to pass to the function
 * @returns {Promise<void>} 当函数执行完成时解析的 Promise。Promise that resolves when the function has been executed
 * @example
 * ```ts
 * // Basic deferral
 * function printHello() {
 *   console.log('Hello, world!');
 * }
 *
 * defer(printHello);
 * console.log('This is printed first.');
 * // Output:
 * // This is printed first.
 * // Hello, world!
 *
 * ```
 * @example
 * ```ts
 * // With arguments
 * defer(console.log, 'Deferred message', 123);
 * console.log('Immediate message');
 * // Output:
 * // Immediate message
 * // Deferred message 123
 *
 * ```
 * @example
 * ```ts
 * // Awaiting deferred execution
 * async function example() {
 *   console.log('Before defer');
 *   await defer(() => console.log('Deferred'));
 *   console.log('After defer');
 * }
 *
 * ```
 * @example
 * ```ts
 * // Breaking up long-running tasks
 * async function processLargeArray(items) {
 *   for (let i = 0; i < items.length; i++) {
 *     processItem(items[i]);
 *     if (i % 100 === 0) {
 *       await defer(() => {}); // Yield control periodically
 *     }
 *   }
 * }
 * ```
 */
export async function defer(fn: (...arg: unknown[]) => unknown, ...args: unknown[]): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0));
  fn(...args);
}

/**
 * @function runPromisesInSeries
 * @description 按顺序执行返回 Promise 的函数数组（一个接一个）。Executes an array of promise-returning functions sequentially (one after another)
 * @param {Array<Function>} ps - 返回 Promise 的函数数组。Array of functions that return promises
 * @returns {Promise<any>} 使用最后一个函数的结果解析的 Promise。Promise that resolves with the result of the last function
 * @throws {Error} 如果序列中的任何 Promise 被拒绝。If any promise in the sequence rejects
 * @example
 * ```ts
 * // Sequential API calls
 * async function fetchData(url: string) {
 *   const response = await fetch(url);
 *   return response.json();
 * }
 *
 * const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
 * runPromisesInSeries(urls.map(url => () => fetchData(url)))
 *   .then(result => console.log('Final result:', result))
 *   .catch(error => console.error('Error:', error));
 *
 * ```
 * @example
 * ```ts
 * // Sequential processing with delays
 * const tasks = [
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000)),
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 500)),
 *   () => new Promise(resolve => setTimeout(() => resolve('Task 3'), 200))
 * ];
 *
 * runPromisesInSeries(tasks); // Takes ~1.7 seconds total (sequential)
 *
 * ```
 * @example
 * ```ts
 * // Database operations in sequence
 * const dbOperations = [
 *   () => createUser({ name: 'John' }),
 *   () => createProfile({ userId: 1 }),
 *   () => sendWelcomeEmail({ userId: 1 })
 * ];
 *
 * runPromisesInSeries(dbOperations);
 * ```
 */
export function runPromisesInSeries(ps: Array<(...args: unknown[]) => Promise<any>>) {
  // reduce 初值为 Promise.resolve()，p 永远是 Promise，旧写法 p?.then 的 ?. 多余，去掉更清晰。
  // The reduce initial value is Promise.resolve(), so p is always a Promise;
  // the old p?.then optional chaining was redundant.
  return ps.reduce((p, next) => p.then(next), Promise.resolve());
}

/**
 * @function timeTaken
 * @description 测量并记录函数的执行时间。Measures and logs the execution time of a function
 * @param {Function} fn - 要测量的函数。Function to measure
 * @param {...any} args - 传递给函数的参数。Arguments to pass to the function
 * @returns {any} 函数执行的结果。The result of the function execution
 * @example
 * ```ts
 * // Measuring a simple function
 * function slowCalculation(n) {
 *   let result = 0;
 *   for (let i = 0; i < n; i++) {
 *     result += Math.sqrt(i);
 *   }
 *   return result;
 * }
 *
 * const result = timeTaken(slowCalculation, 1000000);
 * // Console output: timeTaken: 45.123ms
 * // Returns: calculated result
 *
 * ```
 * @example
 * ```ts
 * // Measuring async functions
 * async function fetchData(url) {
 *   const response = await fetch(url);
 *   return response.json();
 * }
 *
 * await timeTaken(fetchData, 'https://api.example.com/data');
 * // Console output: timeTaken: 234.567ms
 *
 * ```
 * @example
 * ```ts
 * // Measuring multiple operations
 * const operations = [
 *   () => timeTaken(Array.from, { length: 10000 }, (_, i) => i * 2),
 *   () => timeTaken(JSON.stringify, { large: 'object' }),
 *   () => timeTaken(Math.random)
 * ];
 * ```
 */
export function timeTaken(fn: (...ks: unknown[]) => unknown, ...args: unknown[]) {
  console.time('timeTaken');
  const res = fn(...args);
  console.timeEnd('timeTaken');
  return res;
}

/**
 * @function memoize
 * @description 创建函数的记忆化版本，基于第一个参数缓存结果。Creates a memoized version of a function that caches results based on the first argument
 * @param {Function} fn - 要记忆化的函数。Function to memoize
 * @returns {Function} 带有缓存属性的记忆化函数。Memoized function with a cache property
 * @example
 * ```ts
 * // Expensive calculation
 * function expensiveCalculation(n: number) {
 *   console.log('Calculating...');
 *   let result = 0;
 *   for (let i = 0; i < n; i++) {
 *     result += Math.sqrt(i);
 *   }
 *   return result;
 * }
 *
 * const cachedCalculation = memoize(expensiveCalculation);
 * console.log(cachedCalculation(1000)); // Output: "Calculating..." then result
 * console.log(cachedCalculation(1000)); // Output: result (no "Calculating...")
 *
 * ```
 * @example
 * ```ts
 * // Fibonacci with memoization
 * const fibonacci = memoize((n) => {
 *   if (n < 2) return n;
 *   return fibonacci(n - 1) + fibonacci(n - 2);
 * });
 *
 * console.log(fibonacci(40)); // Much faster than non-memoized version
 *
 * ```
 * @example
 * ```ts
 * // Accessing the cache
 * const memoizedFn = memoize((x) => x * 2);
 * memoizedFn(5); // -> 10
 * console.log(memoizedFn.cache); // -> Map { 5 => 10 }
 * memoizedFn.cache.clear(); // Clear the cache
 * ```
 */
export function memoize(fn: (...args: unknown[]) => unknown) {
  const cache = new Map();
  const cached = function (val: unknown) {
    // 旧实现 `cache.set(val, fn(val)) && cache.get(val)` 依赖 && 的短路返回，可读性差；
    // 且当 val 为 undefined 时，Map.has(undefined) 行为与 cache.set(undefined, ...) 冲突边界含糊。
    // 这里改为显式三段：未命中→计算→缓存→返回。
    // The old `cache.set(val, fn(val)) && cache.get(val)` form relied on && short-circuit
    // for its return value and was hard to read. Use explicit has/compute/store/return.
    if (cache.has(val)) {
      return cache.get(val);
    }
    const result = fn(val);
    cache.set(val, result);
    return result;
  };
  cached.cache = cache;
  return cached;
}

/**
 * @function once
 * @description 创建一个只能执行一次的函数，后续调用将被忽略。Creates a function that can only be executed once, subsequent calls are ignored
 * @param {Function} fn - 只执行一次的函数。Function to execute only once
 * @returns {Function} 只在第一次调用时执行的函数。Function that executes only on first call
 * @example
 * ```ts
 * // Basic usage
 * function log() {
 *   console.log('This will only log once');
 * }
 *
 * const logOnce = once(log);
 * logOnce(); // -> 'This will only log once'
 * logOnce(); // -> (no output)
 * logOnce(); // -> (no output)
 *
 * ```
 * @example
 * ```ts
 * // Initialization function
 * const initialize = once(() => {
 *   console.log('App initialized');
 *   // Setup code here...
 * });
 *
 * initialize(); // Runs initialization
 * initialize(); // Does nothing
 *
 * ```
 * @example
 * ```ts
 * // Event handler that should only run once
 * const handleFirstClick = once((event) => {
 *   console.log('First click detected!', event.target);
 * });
 *
 * button.addEventListener('click', handleFirstClick);
 *
 * ```
 * @example
 * ```ts
 * // API call that should only happen once
 * const fetchUserData = once(async (userId) => {
 *   const response = await fetch(`/api/users/${userId}`);
 *   return response.json();
 * });
 * ```
 */
export function once(fn: (...args: unknown[]) => unknown) {
  // 旧实现丢弃 fn 返回值，导致 `const r = once(() => 42)()` 得到 undefined。
  // JSDoc 示例 logOnce() => 'This will only log once' 隐含应返回首次结果。
  // The old impl discarded fn's return value; now cache and return the first result
  // so `const r = once(() => 42)()` yields 42 instead of undefined.
  let _called = false;
  let _result: unknown;
  return function (...argus: unknown[]) {
    if (!_called) {
      _called = true;
      _result = fn(...argus);
    }
    return _result;
  };
}
/**
 * @function chainAsync
 * @description 在链中执行函数，每个函数调用下一个函数。Executes functions in a chain where each function calls the next one
 * @param {Array<Function>} fns - 接受 'next' 回调作为第一个参数的函数数组。Array of functions that accept a 'next' callback as their first parameter
 * @returns {void}
 * @example
 * ```ts
 * // Basic chain execution
 * chainAsync([
 *   next => {
 *     console.log('Step 1');
 *     setTimeout(next, 1000);
 *   },
 *   next => {
 *     console.log('Step 2');
 *     next();
 *   },
 *   next => {
 *     console.log('Step 3 (final)');
 *   }
 * ]);
 *
 * ```
 * @example
 * ```ts
 * // Middleware pattern
 * const middleware = [
 *   (next) => {
 *     console.log('Authentication check');
 *     // Simulate async auth
 *     setTimeout(() => {
 *       console.log('User authenticated');
 *       next();
 *     }, 100);
 *   },
 *   (next) => {
 *     console.log('Authorization check');
 *     next();
 *   },
 *   (next) => {
 *     console.log('Request processed');
 *   }
 * ];
 *
 * chainAsync(middleware);
 * ```
 */
export function chainAsync(fns: Array<(...args: unknown[]) => unknown>) {
  // 旧实现 next = () => fns[curr++](next)，当链末函数仍调用 next() 时 fns[curr] 为 undefined，
  // 执行 undefined(next) 抛 TypeError。这里加边界守卫，越界时直接结束链。
  // The old form threw TypeError when the last function still invoked next(), because
  // fns[curr] was undefined. Guard the bound so out-of-range calls simply stop the chain.
  let curr = 0;
  const next = () => {
    if (curr >= fns.length) return;
    fns[curr++](next);
  };
  next();
}

/**
 * @function compose
 * @description 从右到左组合函数（数学组合）。Composes functions from right to left (mathematical composition)
 * @param {...Function} fns - 要组合的函数。Functions to compose
 * @returns {Function} 从右到左应用函数的组合函数。Composed function that applies functions from right to left
 * @example
 * ```ts
 * // Basic composition
 * const add5 = x => x + 5;
 * const multiply2 = x => x * 2;
 * const subtract1 = x => x - 1;
 *
 * const composed = compose(add5, multiply2, subtract1);
 * composed(10); // -> subtract1(10) -> multiply2(9) -> add5(18) -> 23
 *
 * ```
 * @example
 * ```ts
 * // String transformations
 * const toUpperCase = str => str.toUpperCase();
 * const addExclamation = str => str + '!';
 * const trim = str => str.trim();
 *
 * const transform = compose(toUpperCase, addExclamation, trim);
 * transform('  hello world  '); // -> 'HELLO WORLD!'
 *
 * ```
 * @example
 * ```ts
 * // Mathematical operations
 * const square = x => x * x;
 * const double = x => x * 2;
 * const addOne = x => x + 1;
 *
 * const calculate = compose(square, double, addOne);
 * calculate(3); // -> addOne(3) -> double(4) -> square(8) -> 64
 * ```
 */
export function compose<T>(...fns: Array<(...arg: T[]) => T>): (arg: T) => T {
  // 提供恒等函数作为 reduce 初值，避免 compose()（零函数）抛 "Reduce of empty array with no initial value"。
  // Provide an identity initial value so compose() (zero functions) does not throw.
  return fns.reduce(
    (f, g) =>
      (...arg) =>
        f(g(...arg)),
    (arg: T) => arg
  );
}

/**
 * @function pipe
 * @description 从左到右管道函数（Unix 管道风格）。Pipes functions from left to right (Unix pipe style)
 * @param {...Function} fns - 要管道的函数。Functions to pipe
 * @returns {Function} 从左到右应用函数的管道函数。Piped function that applies functions from left to right
 * @example
 * ```ts
 * // Basic piping
 * const add = (x, y) => x + y;
 * const multiply2 = x => x * 2;
 * const subtract1 = x => x - 1;
 *
 * const piped = pipe(add, multiply2, subtract1);
 * piped(5, 3); // -> add(5,3) -> multiply2(8) -> subtract1(16) -> 15
 *
 * ```
 * @example
 * ```ts
 * // Data processing pipeline
 * const parseJSON = str => JSON.parse(str);
 * const extractUsers = data => data.users;
 * const filterActive = users => users.filter(u => u.active);
 * const mapNames = users => users.map(u => u.name);
 *
 * const processUserData = pipe(parseJSON, extractUsers, filterActive, mapNames);
 * const result = processUserData('{"users":[{"name":"John","active":true},{"name":"Jane","active":false}]}');
 * // -> ['John']
 *
 * ```
 * @example
 * ```ts
 * // String processing
 * const toLowerCase = str => str.toLowerCase();
 * const removeSpaces = str => str.replace(/\s+/g, '');
 * const reverse = str => str.split('').reverse().join('');
 *
 * const processString = pipe(toLowerCase, removeSpaces, reverse);
 * processString('Hello World'); // -> 'dlrowolleh'
 * ```
 */
export function pipe<T extends unknown[]>(...fns: Array<(...arg: any[]) => any>) {
  // 空数组时返回恒等透传函数（原版 reduce 无初值会抛 TypeError）。
  // 非空数组时保持原版 reduce 无初值形式——因为 reduce 初值会吞掉首函数的多参数，
  // 例如 pipe((x,y)=>x+y, x=>x*2)(3,4) 会被初值破坏成 NaN。
  // For zero functions return a pass-through (the old reduce without initial value threw).
  // For non-empty input keep the original no-initial-value form: an initial value would
  // consume the first function's extra args, e.g. pipe((x,y)=>x+y, x=>x*2)(3,4) => NaN.
  if (fns.length === 0) {
    return (...arg: T[]) => arg[0];
  }
  return fns.reduce(
    (f, g) =>
      (...arg: T[]) =>
        g(f(...arg))
  );
}

/**
 * 接受单个参数的柯里化函数接口。
 * Curried function interface that accepts a single argument.
 * @param t1 - 第一个参数 / first argument
 * @returns 返回最终结果 R / final result R
 * @example
 * const add1: Curry1<number, number> = curry((a: number) => a + 1);
 * add1()(5); // -> 6
 * add1(5);   // -> 6
 */
export interface Curry1<T1, R> {
  (): Curry1<T1, R>;
  (t1: T1): R;
}

/**
 * 接受两个参数的柯里化函数接口，支持逐步传参。
 * Curried function interface that accepts two arguments, supporting step-by-step application.
 * @param t1 - 第一个参数 / first argument
 * @param t2 - 第二个参数 / second argument
 * @returns 返回最终结果 R 或下一步柯里化函数 / final result R or next curried function
 * @example
 * const add: Curry2<number, number, number> = curry((a: number, b: number) => a + b);
 * add(1)(2); // -> 3
 * add(1, 2); // -> 3
 */
export interface Curry2<T1, T2, R> {
  (): Curry2<T1, T2, R>;
  (t1: T1): Curry1<T2, R>;
  (t1: T1, t2: T2): R;
}

/**
 * 接受三个参数的柯里化函数接口，支持逐步传参。
 * Curried function interface that accepts three arguments, supporting step-by-step application.
 * @param t1 - 第一个参数 / first argument
 * @param t2 - 第二个参数 / second argument
 * @param t3 - 第三个参数 / third argument
 * @returns 返回最终结果 R 或下一步柯里化函数 / final result R or next curried function
 * @example
 * const volume: Curry3<number, number, number, number> = curry((a: number, b: number, c: number) => a * b * c);
 * volume(2)(3)(4); // -> 24
 * volume(2, 3, 4); // -> 24
 */
export interface Curry3<T1, T2, T3, R> {
  (): Curry3<T1, T2, T3, R>;
  (t1: T1): Curry2<T2, T3, R>;
  (t1: T1, t2: T2): Curry1<T3, R>;
  (t1: T1, t2: T2, t3: T3): R;
}

/**
 * 柯里化工厂函数接口，根据原函数参数个数返回对应的 Curry1/Curry2/Curry3 类型。
 * Curry factory interface that returns Curry1/Curry2/Curry3 based on the arity of the original function.
 * @param fn - 要柯里化的原始函数 / original function to curry
 * @returns 对应参数数量的柯里化函数 / curried function matching the arity
 * @example
 * const curriedAdd: Curry2<number, number, number> = curry((a: number, b: number) => a + b);
 * curriedAdd(1)(2); // -> 3
 * @example
 * const greet: Curry1<string, string> = curry((name: string) => `Hello, ${name}!`);
 * greet('World'); // -> 'Hello, World!'
 */
export interface Curry {
  <T1, R>(fn: (t1: T1) => R): Curry1<T1, R>;
  <T1, T2, R>(fn: (t1: T1, t2: T2) => R): Curry2<T1, T2, R>;
  <T1, T2, T3, R>(fn: (t1: T1, t2: T2, t3: T3) => R): Curry3<T1, T2, T3, R>;
}

/**
 * @function curry
 * @description 将函数转换为一次接受一个参数（柯里化）。Transforms a function to accept arguments one at a time (currying)
 * @param {Function} fn - 要柯里化的函数。Function to curry
 * @returns {Function} 可以用部分参数调用的柯里化函数。Curried function that can be called with partial arguments
 * @example
 * ```ts
 * // Basic currying
 * const add = (a, b) => a + b;
 * const curriedAdd = curry(add);
 *
 * curriedAdd(2)(3); // -> 5
 * curriedAdd(2, 3); // -> 5 (can still call with all args)
 *
 * ```
 * @example
 * ```ts
 * // Partial application
 * const multiply = (a, b, c) => a * b * c;
 * const curriedMultiply = curry(multiply);
 *
 * const multiplyBy2 = curriedMultiply(2);
 * const multiplyBy2And3 = multiplyBy2(3);
 *
 * multiplyBy2And3(4); // -> 24
 * multiplyBy2(3, 4); // -> 24 (same result)
 *
 * ```
 * @example
 * ```ts
 * // Functional programming patterns
 * const filter = curry((predicate, array) => array.filter(predicate));
 * const map = curry((fn, array) => array.map(fn));
 *
 * const isEven = x => x % 2 === 0;
 * const double = x => x * 2;
 *
 * const filterEvens = filter(isEven);
 * const doubleAll = map(double);
 *
 * const numbers = [1, 2, 3, 4, 5, 6];
 * const result = pipe(filterEvens, doubleAll)(numbers); // -> [4, 8, 12]
 *
 * ```
 * @example
 * ```ts
 * // Math operations
 * curry(Math.pow)(2)(10); // -> 1024
 * curry(Math.pow)(2, 10); // -> 1024
 * ```
 */
export const curry: Curry = (callback: any) => {
  return (...args: any) => {
    if (args.length < callback.length) {
      return curry(callback.bind(null, ...args));
    }

    return callback(...args);
  };
};

/**
 * @function functionName
 * @description 记录并返回函数的名称（用于调试）。Logs and returns the name of a function (useful for debugging)
 * @param {Function} fn - 要获取名称的函数。Function to get the name of
 * @returns {string} 函数的名称，如果是匿名函数则为空字符串。The function's name or empty string if anonymous
 * @example
 * ```ts
 * // Named function
 * function add(a: number, b: number) {
 *   return a + b;
 * }
 *
 * functionName(add); // -> Logs: "add [Function: add]", Returns: "add"
 *
 * ```
 * @example
 * ```ts
 * // Anonymous function
 * const anonymous = function() { return 42; };
 * functionName(anonymous); // -> Logs: "" [Function: anonymous], Returns: ""
 *
 * ```
 * @example
 * ```ts
 * // Arrow function
 * const arrow = () => 'hello';
 * functionName(arrow); // -> Logs: "arrow [Function: arrow]", Returns: "arrow"
 *
 * ```
 * @example
 * ```ts
 * // Built-in functions
 * functionName(Math.max); // -> Logs: "max [Function: max]", Returns: "max"
 * functionName(console.log); // -> Logs: "log [Function: log]", Returns: "log"
 * ```
 */
export function functionName<T extends (...ks: unknown[]) => unknown>(fn: T) {
  console.debug(fn.name, fn);
  return fn.name;
}

/**
 * @function promisify
 * @description 将基于回调的函数转换为返回 Promise。Converts a callback-based function to return a Promise
 * @param {Function} fn - 使用错误优先回调模式的函数。Function that uses error-first callback pattern
 * @returns {Function} 函数的 Promise 版本。Promise-based version of the function
 * @example
 * ```ts
 * // Node.js fs module
 * import fs from 'fs';
 * const readFileAsync = promisify(fs.readFile);
 *
 * async function main() {
 *   try {
 *     const data = await readFileAsync('file.txt', 'utf8');
 *     console.log(data);
 *   } catch (error) {
 *     console.error('Error reading file:', error);
 *   }
 * }
 *
 * ```
 * @example
 * ```ts
 * // Custom callback function
 * function fetchData(url, callback) {
 *   setTimeout(() => {
 *     if (url.includes('error')) {
 *       callback(new Error('Failed to fetch'));
 *     } else {
 *       callback(null, { data: 'success' });
 *     }
 *   }, 1000);
 * }
 *
 * const fetchDataAsync = promisify(fetchData);
 *
 * fetchDataAsync('https://api.example.com/data')
 *   .then(result => console.log(result))
 *   .catch(error => console.error(error));
 * ```
 */
export function promisify<T extends unknown[], R>(
  fn: (...args: [...T, (err: Error | null, result?: R) => void]) => void
): (...args: T) => Promise<R> {
  return (...args: T) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: Error | null, result?: R) => {
        err ? reject(err) : resolve(result as R);
      });
    });
}

/**
 * @function sleep
 * @description 创建在指定延迟后解析的Promise。Creates a Promise that resolves after a specified delay
 * @param {number} ms - 延迟的毫秒数。Number of milliseconds to delay
 * @returns {Promise<void>} 在延迟后解析的Promise。Promise that resolves after the delay
 * @example
 * ```ts
 * // Basic delay
 * async function main() {
 *   console.log("Starting...");
 *   await sleep(2000); // Wait 2 seconds
 *   console.log("Done waiting!");
 * }
 *
 * ```
 * @example
 * ```ts
 * // Simulating API delays in tests
 * async function simulateApiCall() {
 *   await sleep(100); // Simulate network delay
 *   return { data: 'response' };
 * }
 *
 * ```
 * @example
 * ```ts
 * // Rate limiting
 * async function processItems(items) {
 *   for (const item of items) {
 *     await processItem(item);
 *     await sleep(1000); // Wait 1 second between items
 *   }
 * }
 *
 * ```
 * @example
 * ```ts
 * // Retry with backoff
 * async function retryWithDelay(fn, maxRetries = 3) {
 *   for (let i = 0; i < maxRetries; i++) {
 *     try {
 *       return await fn();
 *     } catch (error) {
 *     if (i === maxRetries - 1) throw error;
 *       await sleep(1000 * Math.pow(2, i)); // Exponential backoff
 *     }
 *   }
 * }
 * ```
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const DEFAULT_INTERVAL = 500;

/**
 * @function throttle
 * @description 创建限制执行频率的节流函数，每个间隔只能执行一次。Creates a throttled function that limits execution to once per interval
 * @param {Function} fn - 要节流的函数。Function to throttle
 * @param {number} intervalTime - 执行之间的最小时间间隔（毫秒）（默认：500）。Minimum time between executions in milliseconds (default: 500)
 * @returns {Function} 节流函数。Throttled function
 * @example
 * ```ts
 * // Basic throttling
 * function log(message: string) {
 *   console.log(new Date().toISOString(), message);
 * }
 *
 * const logThrottled = throttle(log, 1000);
 *
 * // Rapid calls - only first one executes immediately, others are ignored
 * logThrottled('Message 1'); // Executes immediately
 * logThrottled('Message 2'); // Ignored
 * logThrottled('Message 3'); // Ignored
 *
 * setTimeout(() => logThrottled('Message 4'), 1100); // Executes after interval
 *
 * ```
 * @example
 * ```ts
 * // Scroll event throttling
 * const handleScroll = throttle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 *
 * window.addEventListener('scroll', handleScroll);
 *
 * ```
 * @example
 * ```ts
 * // API call throttling
 * const searchAPI = throttle(async (query) => {
 *   const response = await fetch(`/api/search?q=${query}`);
 *   return response.json();
 * }, 300);
 * ```
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

export type DebouncedFn<T extends unknown[]> = (...args: T) => void;

/**
 * @function debounce
 * @description 创建防抖函数，延迟执行直到调用停止。Creates a debounced function that delays execution until after calls have stopped
 * @param {Function} fn - 要防抖的函数。Function to debounce
 * @param {number} intervalTime - 最后一次调用后的延迟时间（毫秒）（默认：500）。Delay in milliseconds after last call (default: 500)
 * @returns {Function} 防抖函数。Debounced function
 * @example
 * ```ts
 * // Search input debouncing
 * function search(query: string) {
 *   console.log(`Searching for "${query}"...`);
 *   // API call here
 * }
 *
 * const searchDebounced = debounce(search, 300);
 *
 * // User types rapidly - only last call executes
 * searchDebounced('J');        // Cancelled
 * searchDebounced('Ja');       // Cancelled
 * searchDebounced('Jav');      // Cancelled
 * searchDebounced('Java');     // Executes after 300ms delay
 *
 * ```
 * @example
 * ```ts
 * // Window resize handling
 * const handleResize = debounce(() => {
 *   console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
 * }, 250);
 *
 * window.addEventListener('resize', handleResize);
 *
 * ```
 * @example
 * ```ts
 * // Form validation
 * const validateInput = debounce((value) => {
 *   // Expensive validation logic
 *   console.log('Validating:', value);
 * }, 500);
 *
 * inputElement.addEventListener('input', (e) => {
 *   validateInput(e.target.value);
 * });
 *
 * ```
 * @example
 * ```ts
 * // Auto-save functionality
 * const autoSave = debounce((data) => {
 *   console.log('Auto-saving...', data);
 *   // Save to server
 * }, 2000);
 *
 * // Called on every keystroke, but only saves 2 seconds after user stops typing
 * textArea.addEventListener('input', (e) => {
 *   autoSave(e.target.value);
 * });
 * ```
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
