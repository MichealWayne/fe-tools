/**
 * @model Stroage
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-02-18 13:10:05
 */

import { PlainObject } from 'utils';

/**
 * @function deserialize
 * @param value
 * @return {JSON | undefined}
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
          }
    ) {
      if (typeof value === 'object') value = JSON.stringify(value);
      _controller.setItem(key, value);
    },

    /**
     * Storage.getLocal 获取Storage
     * @param {String|undefined} key Storage key
     */
    get(key?: string) {
      if (key) {
        const _val = _controller.getItem(key);

        return deserialize(_val);
      } else {
        const _obj: PlainObject = {};
        for (const i in _controller) {
          if (i && typeof _controller[i] === 'string') {
            _obj[i] = deserialize(_controller[i]);
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
