/**
 * @module nodeStore
 * @author Wayne
 * @Date 2022-08-31 16:05:14
 * @LastEditTime 2024-02-18 13:20:20
 */

/* eslint-disable @typescript-eslint/no-this-alias */
import path from 'path';
import fs from 'fs';

import { writeJson, readJson, writeFile, readFile } from '../fs/fsFuncs';

function isAsync(fn: any) {
  return fn[Symbol.toStringTag] === 'AsyncFunction';
}
/**
 * @class Cache
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

  computeCacheDir(base: string) {
    return path.join(base, '.ncu', 'cache');
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false;
  }

  getFilename(key: string, ext: string) {
    return path.join(this.dir, key) + ext;
  }

  has(key: string, ext: string) {
    if (this.disabled) {
      return false;
    }

    return fs.existsSync(this.getFilename(key, ext));
  }

  get(key: string, ext: string) {
    if (!this.has(key, ext)) {
      return undefined;
    }
    if (ext === '.json') {
      return readJson(this.getFilename(key, ext));
    }
    return readFile(this.getFilename(key, ext));
  }

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

  wrapAsync(original: Function, identity: Function) {
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

  wrapNormal(original: Function, identity: Function) {
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
