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
function isAsync(fn: any) {
  return fn[Symbol.toStringTag] === 'AsyncFunction';
}

// Define specific function types
type OriginalFunction = (...args: unknown[]) => any;
type IdentityFunction = (...args: unknown[]) => { key: string; ext: string };

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
export default class Cache {
  dir: string;
  originals: any;
  disabled: boolean;

  constructor(dir: string) {
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
  computeCacheDir(base: string) {
    return path.join(base, '.ncu', 'cache');
  }

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
  disable() {
    this.disabled = true;
  }

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
  enable() {
    this.disabled = false;
  }

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
  getFilename(key: string, ext: string) {
    return path.join(this.dir, key) + ext;
  }

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
  has(key: string, ext: string) {
    if (this.disabled) {
      return false;
    }

    return fs.existsSync(this.getFilename(key, ext));
  }

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
  get(key: string, ext: string) {
    if (!this.has(key, ext)) {
      return undefined;
    }
    if (ext === '.json') {
      return readJsonFile(this.getFilename(key, ext));
    }
    return readFileSync(this.getFilename(key, ext));
  }

  /**
   * @description Writes data to cache on disk
   * @param {string} key - Cache key identifier
   * @param {string} ext - File extension ('.json' for JSON serialization, others as text)
   * @param {any} content - Content to cache (objects for .json, strings for others)
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
  write(key: string, ext: string, content: string) {
    if (this.disabled) {
      return;
    }
    const filename = this.getFilename(key, ext);
    if (ext === '.json') {
      return writeJson(filename, content as any);
    }
    return writeFile(filename, content);
  }

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
  wrapAsync(original: OriginalFunction, identity: IdentityFunction) {
    const cache = this;
    return async function (this: any, ...args: unknown[]) {
      const { key, ext } = identity.call(this, ...args);
      const cached = cache.get(key, ext);
      if (cached) {
        return cached;
      }
      const result = await original.call(this, ...args);
      cache.write(key, ext, result);
      return result;
    };
  }

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
  wrapNormal(original: OriginalFunction, identity: IdentityFunction) {
    const cache = this;
    return function (this: any, ...args: unknown[]) {
      const { key, ext } = identity.call(this, ...args);
      const cached = cache.get(key, ext);
      if (cached) {
        return cached;
      }
      const result = original.call(this, ...args);
      cache.write(key, ext, result);
      return result;
    };
  }

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
  wrap(Class: ClassDecorator, identities: any) {
    for (const method of Object.keys(identities)) {
      const original = Class.prototype[method];
      const identity = identities[method];
      this.originals[method] = original;
      if (isAsync(original)) {
        Class.prototype[method] = this.wrapAsync(original, identity);
      } else {
        Class.prototype[method] = this.wrapNormal(original, identity);
      }
    }
  }
}
