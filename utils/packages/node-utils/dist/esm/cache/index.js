/**
 * @fileoverview File-based caching system for Node.js applications, providing automatic method wrapping and persistent storage for expensive operations.
 *
 * This module provides a comprehensive caching solution that supports both synchronous and asynchronous operations.
 * It includes automatic method wrapping, file-based persistence, and flexible cache key generation.
 * The cache system can significantly improve performance by storing results of expensive computations or API calls.
 *
 * @module Cache
 * @author Wayne
 * @since 1.0.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/* eslint-disable @typescript-eslint/no-this-alias */
import path from 'path';
import fs from 'fs';
import { writeJson, readJsonFile, writeFile, readFileSync } from '../fs/fsFuncs';
/**
 * @function isAsync
 * @description 检测函数是否为异步函数。Detects whether a function is asynchronous by checking its Symbol.toStringTag property.
 * @param {any} fn - 要检测的函数。The function to check for async nature
 * @returns {boolean} 如果是异步函数返回true。True if the function is async, false otherwise
 * @example
 * // Check different function types
 * async function asyncFn() { return 'async'; }
 * function syncFn() { return 'sync'; }
 *
 * console.log(isAsync(asyncFn)); // true
 * console.log(isAsync(syncFn));  // false
 */
function isAsync(fn) {
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}
/**
 * @description 基于文件的缓存系统，支持同步和异步操作。File-based caching system that supports both synchronous and asynchronous operations with automatic method wrapping and persistent storage.
 * @example
 * // Basic cache usage
 * const cache = new Cache('./cache-dir');
 * cache.enable();
 *
 * // Store and retrieve data
 * cache.write('user-123', '.json', { name: 'John', age: 30 });
 * const userData = cache.get('user-123', '.json');
 * console.log(userData); // { name: 'John', age: 30 }
 *
 * @example
 * // Method wrapping for automatic caching
 * class ApiClient {
 *   async fetchUser(id) {
 *     // Expensive API call
 *     return await fetch(`/api/users/${id}`).then(r => r.json());
 *   }
 * }
 *
 * const cache = new Cache('./api-cache');
 * cache.enable();
 * cache.wrap(ApiClient, {
 *   fetchUser: (id) => ({ key: `user-${id}`, ext: '.json' })
 * });
 *
 * @example
 * // Performance optimization for expensive calculations
 * class MathProcessor {
 *   calculatePrimes(limit) {
 *     // Expensive prime calculation
 *     const primes = [];
 *     for (let i = 2; i <= limit; i++) {
 *       if (this.isPrime(i)) primes.push(i);
 *     }
 *     return primes;
 *   }
 * }
 *
 * const cache = new Cache('./math-cache');
 * cache.enable();
 * cache.wrap(MathProcessor, {
 *   calculatePrimes: (limit) => ({ key: `primes-${limit}`, ext: '.json' })
 * });
 */
var Cache = /** @class */ (function () {
    function Cache(dir) {
        this.dir = dir;
        this.originals = {};
        this.disabled = true;
    }
    /**
     * @description Computes the cache directory path based on a base directory
     * @param {string} base - Base directory path
     * @returns {string} Computed cache directory path (.ncu/cache subdirectory)
     * @example
     * const cache = new Cache('./temp');
     * const cacheDir = cache.computeCacheDir('./project');
     * console.log(cacheDir); // './project/.ncu/cache'
     */
    Cache.prototype.computeCacheDir = function (base) {
        return path.join(base, '.ncu', 'cache');
    };
    /**
     * @description Disables caching - all cache operations will be bypassed
     * @example
     * const cache = new Cache('./cache');
     * cache.disable();
     *
     * // These operations will be bypassed
     * cache.write('key', '.json', data); // No-op
     * const result = cache.get('key', '.json'); // Returns undefined
     *
     * @see {@link enable} - Re-enable caching
     */
    Cache.prototype.disable = function () {
        this.disabled = true;
    };
    /**
     * @description Enables caching - cache operations will function normally
     * @example
     * const cache = new Cache('./cache');
     * cache.enable();
     *
     * // Cache operations now work
     * cache.write('config', '.json', { theme: 'dark' });
     * const config = cache.get('config', '.json'); // Returns cached data
     *
     * @see {@link disable} - Disable caching
     */
    Cache.prototype.enable = function () {
        this.disabled = false;
    };
    /**
     * @description Constructs the full file path for a cache entry
     * @param {string} key - Cache key identifier
     * @param {string} ext - File extension (e.g., '.json', '.txt')
     * @returns {string} Complete file path for the cache entry
     * @example
     * const cache = new Cache('./cache');
     * const filename = cache.getFilename('user-123', '.json');
     * console.log(filename); // './cache/user-123.json'
     */
    Cache.prototype.getFilename = function (key, ext) {
        return path.join(this.dir, key) + ext;
    };
    /**
     * @description Checks if a cache entry exists on disk
     * @param {string} key - Cache key identifier
     * @param {string} ext - File extension
     * @returns {boolean} True if cache entry exists and caching is enabled, false otherwise
     * @example
     * const cache = new Cache('./cache');
     * cache.enable();
     *
     * if (cache.has('expensive-calculation', '.json')) {
     *   console.log('Using cached result');
     *   return cache.get('expensive-calculation', '.json');
     * } else {
     *   console.log('Computing new result');
     *   const result = performExpensiveCalculation();
     *   cache.write('expensive-calculation', '.json', result);
     *   return result;
     * }
     */
    Cache.prototype.has = function (key, ext) {
        if (this.disabled) {
            return false;
        }
        return fs.existsSync(this.getFilename(key, ext));
    };
    /**
     * @description Retrieves cached data from disk
     * @param {string} key - Cache key identifier
     * @param {string} ext - File extension ('.json' for JSON parsing, others as text)
     * @returns {any} Cached data (parsed JSON for .json files, string for others), or undefined if not found
     * @example
     * // Get JSON data
     * const userData = cache.get('user-123', '.json');
     * console.log(userData?.name); // 'John'
     *
     * @example
     * // Get text data
     * const htmlTemplate = cache.get('email-template', '.html');
     * console.log(typeof htmlTemplate); // 'string'
     *
     * @example
     * // Handle missing cache
     * const config = cache.get('app-config', '.json');
     * if (!config) {
     *   console.log('Cache miss - loading from source');
     * }
     */
    Cache.prototype.get = function (key, ext) {
        if (!this.has(key, ext)) {
            return undefined;
        }
        if (ext === '.json') {
            return readJsonFile(this.getFilename(key, ext));
        }
        return readFileSync(this.getFilename(key, ext));
    };
    /**
     * @description Writes data to cache on disk
     * @param {string} key - Cache key identifier
     * @param {string} ext - File extension ('.json' for JSON serialization, others as text)
     * @param {any} content - Content to cache (objects for .json, strings for others)
     * @returns {Promise<void | boolean>} Promise that resolves when the cache write completes
     * @example
     * // Cache JSON data
     * const userData = { id: 123, name: 'John', preferences: { theme: 'dark' } };
     * cache.write('user-123', '.json', userData);
     *
     * @example
     * // Cache text data
     * const htmlContent = '<html><body>Hello World</body></html>';
     * cache.write('page-home', '.html', htmlContent);
     *
     * @example
     * // Cache API response
     * const apiResponse = await fetch('/api/data').then(r => r.json());
     * cache.write(`api-data-${Date.now()}`, '.json', apiResponse);
     */
    Cache.prototype.write = function (key, ext, content) {
        return __awaiter(this, void 0, void 0, function () {
            var filename;
            return __generator(this, function (_a) {
                if (this.disabled) {
                    return [2 /*return*/];
                }
                filename = this.getFilename(key, ext);
                if (ext === '.json') {
                    return [2 /*return*/, writeJson(filename, content)];
                }
                return [2 /*return*/, writeFile(filename, String(content))];
            });
        });
    };
    /**
     * @description Wraps an async function with caching functionality
     * @param {OriginalFunction} original - The original async function to wrap
     * @param {IdentityFunction} identity - Function that generates cache key and extension from arguments
     * @returns {Function} Wrapped function that checks cache before calling original
     * @example
     * // Wrap an expensive async operation
     * async function fetchUserData(userId) {
     *   const response = await fetch(`/api/users/${userId}`);
     *   return response.json();
     * }
     *
     * const cachedFetch = cache.wrapAsync(
     *   fetchUserData,
     *   (userId) => ({ key: `user-${userId}`, ext: '.json' })
     * );
     *
     * // First call hits API, subsequent calls use cache
     * const user1 = await cachedFetch(123); // API call
     * const user2 = await cachedFetch(123); // Cache hit
     */
    Cache.prototype.wrapAsync = function (original, identity) {
        var cache = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, key, ext, cached, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = identity.call.apply(identity, __spreadArray([this], __read(args), false)), key = _a.key, ext = _a.ext;
                            cached = cache.get(key, ext);
                            if (cached !== undefined) {
                                return [2 /*return*/, cached];
                            }
                            return [4 /*yield*/, original.call.apply(original, __spreadArray([this], __read(args), false))];
                        case 1:
                            result = _b.sent();
                            return [4 /*yield*/, cache.write(key, ext, result)];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
    };
    /**
     * @description Wraps a synchronous function with caching functionality
     * @param {OriginalFunction} original - The original sync function to wrap
     * @param {IdentityFunction} identity - Function that generates cache key and extension from arguments
     * @returns {Function} Wrapped function that checks cache before calling original
     * @example
     * // Wrap an expensive sync computation
     * function calculatePrimes(limit) {
     *   // Expensive prime calculation
     *   const primes = [];
     *   for (let i = 2; i <= limit; i++) {
     *     if (isPrime(i)) primes.push(i);
     *   }
     *   return primes;
     * }
     *
     * const cachedCalculation = cache.wrapNormal(
     *   calculatePrimes,
     *   (limit) => ({ key: `primes-${limit}`, ext: '.json' })
     * );
     *
     * // First call computes, subsequent calls use cache
     * const primes1 = cachedCalculation(1000); // Computation
     * const primes2 = cachedCalculation(1000); // Cache hit
     */
    Cache.prototype.wrapNormal = function (original, identity) {
        var cache = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _a = identity.call.apply(identity, __spreadArray([this], __read(args), false)), key = _a.key, ext = _a.ext;
            var cached = cache.get(key, ext);
            if (cached !== undefined) {
                return cached;
            }
            var result = original.call.apply(original, __spreadArray([this], __read(args), false));
            cache.write(key, ext, result);
            return result;
        };
    };
    /**
     * @description Wraps multiple methods of a class with caching functionality
     * @param {any} Class - The class constructor to modify
     * @param {Record<string, IdentityFunction>} identities - Map of method names to identity functions
     * @example
     * class DataProcessor {
     *   async processLargeDataset(datasetId) {
     *     // Expensive data processing
     *     return await heavyProcessing(datasetId);
     *   }
     *
     *   calculateStatistics(data) {
     *     // Expensive sync calculation
     *     return computeStats(data);
     *   }
     * }
     *
     * const cache = new Cache('./processing-cache');
     * cache.wrap(DataProcessor, {
     *   processLargeDataset: (id) => ({ key: `dataset-${id}`, ext: '.json' }),
     *   calculateStatistics: (data) => ({ key: `stats-${data.hash}`, ext: '.json' })
     * });
     *
     * // Now all instances use caching automatically
     * const processor = new DataProcessor();
     * const result = await processor.processLargeDataset('dataset-1'); // Cached
     */
    Cache.prototype.wrap = function (Class, identities) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(identities)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var method = _c.value;
                var original = Class.prototype[method];
                var identity = identities[method];
                this.originals[method] = original;
                if (isAsync(original)) {
                    Class.prototype[method] = this.wrapAsync(original, identity);
                }
                else {
                    Class.prototype[method] = this.wrapNormal(original, identity);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return Cache;
}());
export default Cache;
