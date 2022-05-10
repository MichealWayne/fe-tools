"use strict";
/**
 * @module Function
 * @description function handler functions
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.throttle = exports.sleep = exports.promisify = exports.functionName = exports.curry = exports.pipe = exports.compose = exports.chainAsync = exports.once = exports.memoize = exports.timeTaken = exports.runPromisesInSeries = exports.defer = exports.attempt = void 0;
/**
 * @funciton attempt
 * @param {function} fn
 * @param  {...any} args
 */
function attempt(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    try {
        return fn.apply(void 0, __spreadArray([], __read(args), false));
    }
    catch (e) {
        return e instanceof Error ? e : new Error(String(e));
    }
}
exports.attempt = attempt;
/**
 * @function defer
 * @param {function} fn
 * @param  {...any} args
 * @return {number}
 */
function defer(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return setTimeout.apply(void 0, __spreadArray([fn, 1], __read(args), false));
}
exports.defer = defer;
/**
 * @function runPromisesInSeries
 * @param {promise array} ps
 * @return {Promise}
 */
function runPromisesInSeries(ps) {
    return ps.reduce(function (p, next) { return p === null || p === void 0 ? void 0 : p.then(next); }, Promise.resolve());
}
exports.runPromisesInSeries = runPromisesInSeries;
/**
 * @function timeTaken
 * @param {function} callback
 * @return {any}
 */
function timeTaken(callback) {
    console.time('timeTaken');
    var r = callback();
    console.timeEnd('timeTaken');
    return r;
}
exports.timeTaken = timeTaken;
/**
 * @function memoize
 * @param {function} fn
 * @return {any}
 */
function memoize(fn) {
    var cache = new Map();
    var cached = function (val) {
        return cache.has(val) ? cache.get(val) : cache.set(val, fn(val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
}
exports.memoize = memoize;
/**
 * @function once
 * @param {function} fn
 * @return {function}
 */
function once(fn) {
    var _called = false;
    return function () {
        var argus = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argus[_i] = arguments[_i];
        }
        if (!_called) {
            _called = true;
            fn.apply(void 0, __spreadArray([], __read(argus), false));
        }
    };
}
exports.once = once;
/**
 * @function chainAsync
 * @param {function array} fns
 * @example chainAsync([next => { console.log(1); setTimeout(next, 1000)}, next => { console.log(2);} ])
 */
function chainAsync(fns) {
    var curr = 0;
    var next = function () { return fns[curr++](next); };
    next();
}
exports.chainAsync = chainAsync;
/**
 * @function compose
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = compose(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return f(g.apply(void 0, __spreadArray([], __read(args), false)));
        };
    });
}
exports.compose = compose;
/**
 * @function pipe
 * @param  {...function} fns
 * @example
 * const add5 = x => x + 5;
 * const multiply = (x, y) => x * y;
 * const multiplyAndAdd5 = pipe(add5, multiply);
 * multiplyAndAdd5(5, 2);
 */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return g(f.apply(void 0, __spreadArray([], __read(args), false)));
        };
    });
}
exports.pipe = pipe;
/**
 * @function curry
 * @param {function} fn
 * @param {number} arity
 * @param  {...any} args
 * @example
 * curry(Math.pow)(2)(10)
 */
function curry(fn, arity) {
    var _a;
    if (arity === void 0) { arity = fn.length; }
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return arity <= args.length ? fn.apply(void 0, __spreadArray([], __read(args), false)) : (_a = curry).bind.apply(_a, __spreadArray([null, fn, arity], __read(args), false));
}
exports.curry = curry;
/**
 * @function functionName
 * @param {function} fn
 */
function functionName(fn) {
    return console.debug(fn.name, fn);
}
exports.functionName = functionName;
/**
 * @function promisify
 * @param {function} func
 */
function promisify(func) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            func.apply(void 0, __spreadArray(__spreadArray([], __read(args), false), [function (err, result) {
                    err ? reject(err) : resolve(result);
                }], false));
        });
    };
}
exports.promisify = promisify;
/**
 * @function sleep
 * @param {number} ms
 */
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
/**
 * @function throttle
 * @param {Function} func
 * @param {Number} intervalTime
 * @returns {Function}
 */
function throttle(func, intervalTime) {
    if (intervalTime === void 0) { intervalTime = 500; }
    var flag = true;
    return function (_this) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (flag) {
            func.apply(_this, args);
            flag = false;
            setTimeout(function () {
                flag = true;
            }, intervalTime);
        }
    };
}
exports.throttle = throttle;
/**
 * @function debounce
 * @param {Function} func
 * @param {Number} intervalTime
 * @returns {Function}
 */
function debounce(func, intervalTime) {
    if (intervalTime === void 0) { intervalTime = 500; }
    var timeId = null;
    return function (_this) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (timeId) {
            clearTimeout(timeId);
        }
        timeId = setTimeout(function () {
            timeId = null;
            func.apply(_this, args);
        }, intervalTime);
    };
}
exports.debounce = debounce;
