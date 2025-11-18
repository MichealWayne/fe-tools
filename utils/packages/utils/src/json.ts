/**
 * @module JSON
 * @description Advanced JSON processing utilities
 * @author Wayne
 * @Date 2025-11-16
 * @LastEditTime 2025-11-18 11:27:32
 */

/**
 * @function safeJSONParse
 * @description 安全地解析JSON字符串,失败时返回默认值。Safely parses JSON string, returns default value on failure
 * @param {string} str - 要解析的JSON字符串。JSON string to parse
 * @param {any} defaultValue - 解析失败时的默认值。Default value on parse failure
 * @returns {any} 解析后的对象或默认值。Parsed object or default value
 * @example
 * safeJSONParse('{"name": "John"}'); // -> { name: 'John' }
 * safeJSONParse('invalid json', {}); // -> {}
 * safeJSONParse('invalid', []); // -> []
 */
export function safeJSONParse<T = any>(str: string, defaultValue: T = null as T): T {
  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
}

/**
 * @function flattenJSON
 * @description 将嵌套的JSON对象扁平化为单层对象。Flattens nested JSON object to single level
 * @param {object} obj - 要扁平化的对象。Object to flatten
 * @param {string} prefix - 键名前缀(默认: '')。Key prefix (default: '')
 * @returns {object} 扁平化后的对象。Flattened object
 * @example
 * const nested = {
 *   user: {
 *     name: 'John',
 *     address: {
 *       city: 'NYC',
 *       zip: '10001'
 *     }
 *   }
 * };
 * flattenJSON(nested);
 * // -> { 'user.name': 'John', 'user.address.city': 'NYC', 'user.address.zip': '10001' }
 */
export function flattenJSON(obj: any, prefix = ''): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenJSON(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {});
}

/**
 * @function unflattenJSON
 * @description 将扁平化的对象还原为嵌套结构。Unflattens a flat object to nested structure
 * @param {object} obj - 扁平化的对象。Flattened object
 * @returns {object} 嵌套的对象。Nested object
 * @example
 * const flat = { 'user.name': 'John', 'user.address.city': 'NYC' };
 * unflattenJSON(flat);
 * // -> { user: { name: 'John', address: { city: 'NYC' } } }
 */
export function unflattenJSON(obj: Record<string, any>): any {
  const result: any = {};
  for (const key in obj) {
    const keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = obj[key];
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, result);
  }
  return result;
}

/**
 * @function compareJSON
 * @description 深度比较两个JSON对象的差异。Deep compares two JSON objects for differences
 * @param {any} obj1 - 第一个对象。First object
 * @param {any} obj2 - 第二个对象。Second object
 * @returns {object} 差异对象。Difference object
 * @example
 * const obj1 = { a: 1, b: 2, c: { d: 3 } };
 * const obj2 = { a: 1, b: 3, c: { d: 4 } };
 * compareJSON(obj1, obj2); // -> { b: { old: 2, new: 3 }, 'c.d': { old: 3, new: 4 } }
 */
export function compareJSON(obj1: any, obj2: any): Record<string, { old: any; new: any }> {
  const diff: Record<string, { old: any; new: any }> = {};
  const flat1 = flattenJSON(obj1);
  const flat2 = flattenJSON(obj2);

  const allKeys = new Set([...Object.keys(flat1), ...Object.keys(flat2)]);
  allKeys.forEach(key => {
    if (flat1[key] !== flat2[key]) {
      diff[key] = { old: flat1[key], new: flat2[key] };
    }
  });

  return diff;
}

/**
 * @function mergeJSON
 * @description 深度合并多个JSON对象。Deep merges multiple JSON objects
 * @param {...object} objects - 要合并的对象。Objects to merge
 * @returns {object} 合并后的对象。Merged object
 * @example
 * const obj1 = { a: 1, b: { c: 2 } };
 * const obj2 = { b: { d: 3 }, e: 4 };
 * mergeJSON(obj1, obj2); // -> { a: 1, b: { c: 2, d: 3 }, e: 4 }
 */
export function mergeJSON(...objects: any[]): any {
  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        acc[key] = mergeJSON(acc[key] || {}, obj[key]);
      } else {
        acc[key] = obj[key];
      }
    });
    return acc;
  }, {});
}

/**
 * @function cloneJSON
 * @description 深度克隆JSON对象。Deep clones a JSON object
 * @param {any} obj - 要克隆的对象。Object to clone
 * @returns {any} 克隆的对象。Cloned object
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = cloneJSON(original);
 * cloned.b.c = 3;
 * console.log(original.b.c); // -> 2 (unchanged)
 */
export function cloneJSON<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
