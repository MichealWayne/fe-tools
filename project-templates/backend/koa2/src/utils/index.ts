/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2024-05-17 09:50:22
 */

/**
 * @function objectToArray
 * @description 对象转键值对数组。{} -> []
 * @param {Object} obj 对象
 * @return {Array}
 */
export function objectToArray<T extends Record<string, unknown>>(
  obj: T
): { name: string; value: unknown }[] {
  if (!obj || typeof obj !== 'object') return [];

  return Object.entries(obj).map(([name, value]) => ({ name, value }));
}
