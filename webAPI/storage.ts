/**
 * @model Stroage
 */

/**
 * @function isObjJSON
 * @param {any} obj
 * @return {boolean}
 */
function isObjJSON(obj) {
  return /^\{[\s\S]*\}$/.test(JSON.stringify(obj));
}

/**
 * deserialize() 解析值
 * @param {String} value
 * @return {String|Object|Array}
 */

/**
 * @function deserialize
 * @param value
 * @return {JSON | undefined}
 */
function deserialize(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

const STORAGE_CONSTROLER = {
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
  const _controller = STORAGE_CONSTROLER[type];

  return {
    /**
     * Storage.setLocal 设置Storage
     * @param {String|Object} key Storage key
     * @param {String|Object} value Storage value
     */
    set(key, value) {
      if (!isObjJSON(key)) {
        if (typeof value === 'object') value = JSON.stringify(value);
        _controller.setItem(key, value);
      } else {
        for (const i in key) {
          if (key.hasOwnProperty(i)) Storage(type).set(i, key[i]);
        }
      }
    },

    /**
     * Storage.getLocal 获取Storage
     * @param {String|undefined} key Storage key
     */
    get(key) {
      if (key) {
        const _val = _controller.getItem(key);

        return deserialize(_val);
      } else {
        const _obj = {};
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
    remove(key) {
      if (key) _controller.removeItem(key);
      else _controller.clear();
    },
  };
}

export default Storage;
