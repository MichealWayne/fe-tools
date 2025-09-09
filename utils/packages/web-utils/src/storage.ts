/**
 * @model Stroage
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:20:04
 */

import { PlainObject } from 'utils';

const DEFAULT_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 days

/**
 * @function deserialize
 * @description 尝试将字符串转换为JSON对象，进行反序列化。Attempts to convert a string to a JSON object, performing deserialization
 * @param {unknown} value - 需要反序列化的值。The value to deserialize
 * @return {JSON | undefined} 反序列化后的JSON对象或undefined。The deserialized JSON object or undefined
 */
function deserialize(value: unknown) {
  if (typeof value !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

const STORAGE_CONST_ROLER = {
  local: localStorage,
  session: sessionStorage,
};

/**
 * Storage
 * @param {string} type storage type, default: 'local'
 * @example:
 *      Storage('local').set(a, [1, 2, 3]);
 *      Storage('session').get('a');
 */
function Storage(type = 'local') {
  const _controller = STORAGE_CONST_ROLER[type as keyof typeof STORAGE_CONST_ROLER];

  return {
    /**
     * Storage.setLocal 设置Storage
     * @param {String} key Storage key
     * @param {String|Object} value Storage value
     */
    set(
      key: string,
      value:
        | string
        | {
            [key: string]: unknown;
          },
      expiration: number = DEFAULT_EXPIRATION
    ) {
      const item = {
        value: typeof value === 'object' ? JSON.stringify(value) : value,
        expiration: expiration === 0 ? 0 : Date.now() + expiration * 1000,
      };
      _controller.setItem(key, JSON.stringify(item));
    },

    /**
     * Storage.getLocal 获取Storage
     * @param {String|undefined} key Storage key
     */
    get(key?: string) {
      if (key) {
        const itemStr = _controller.getItem(key);
        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        if (item.expiration !== 0 && Date.now() > item.expiration) {
          _controller.removeItem(key);
          return null;
        }

        return deserialize(item.value);
      } else {
        const _obj: PlainObject = {};
        for (const i in _controller) {
          if (i && typeof _controller[i] === 'string') {
            const item = JSON.parse(_controller[i]);
            if (item.expiration !== 0 && Date.now() > item.expiration) {
              _controller.removeItem(i);
              continue;
            }

            _obj[i] = deserialize(item.value);
          }
        }
        return _obj;
      }
    },

    /**
     * Storage.removeLocal 删除Storage
     * @param {String|undefined} key Storage key
     */
    remove(key: string) {
      if (key) _controller.removeItem(key);
      else _controller.clear();
    },
  };
}

export default Storage;
