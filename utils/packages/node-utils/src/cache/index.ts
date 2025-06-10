/**
 * @module nodeStore
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2025-06-09 19:18:32
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import path from 'path';
import fs from 'fs';

import { writeJson, readJsonFile, writeFile, readFileSync } from '../fs/fsFuncs';

function isAsync(fn: any) {
  return fn[Symbol.toStringTag] === 'AsyncFunction';
}

// Define specific function types
type OriginalFunction = (...args: unknown[]) => any;
type IdentityFunction = (...args: unknown[]) => { key: string; ext: string };

/**
 * @class Cache
 * @description 缓存类, 用于缓存数据, 支持异步和同步
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
   * @function computeCacheDir
   * @description 计算缓存目录
   * @param {string} base 基础目录
   * @returns {string} 缓存目录
   */
  computeCacheDir(base: string) {
    return path.join(base, '.ncu', 'cache');
  }

  /**
   * @function disable
   * @description 禁用缓存
   */
  disable() {
    this.disabled = true;
  }

  /**
   * @function enable
   * @description 启用缓存
   */
  enable() {
    this.disabled = false;
  }

  /**
   * @function getFilename
   * @description 获取缓存文件名
   * @param {string} key 缓存键
   * @param {string} ext 文件扩展名
   * @returns {string} 缓存文件名
   */
  getFilename(key: string, ext: string) {
    return path.join(this.dir, key) + ext;
  }

  /**
   * @function has
   * @description 检查缓存是否存在
   * @param {string} key 缓存键
   * @param {string} ext 文件扩展名
   * @returns {boolean} 是否存在
   */
  has(key: string, ext: string) {
    if (this.disabled) {
      return false;
    }

    return fs.existsSync(this.getFilename(key, ext));
  }

  /**
   * @function get
   * @description 获取缓存
   * @param {string} key 缓存键
   * @param {string} ext 文件扩展名
   * @returns {any} 缓存数据
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
   * @function write
   * @description 写入缓存
   * @param {string} key 缓存键
   * @param {string} ext 文件扩展名
   * @param {string} content 缓存内容
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
   * @function wrapAsync
   * @description 包装异步函数
   * @param {OriginalFunction} original 原始函数
   * @param {IdentityFunction} identity 标识函数
   * @returns {Function} 包装后的函数
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
   * @function wrapNormal
   * @description 包装同步函数
   * @param {OriginalFunction} original 原始函数
   * @param {IdentityFunction} identity 标识函数
   * @returns {Function} 包装后的函数
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
   * @function wrap
   * @description 包装类
   * @param {ClassDecorator} Class 类
   * @param {any} identities 标识函数
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
