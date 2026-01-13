/**
 * @model Stroage
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:20:04
 */
var DEFAULT_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds
/**
 * @function deserialize
 * @description 尝试将字符串转换为JSON对象，进行反序列化。Attempts to convert a string to a JSON object, performing deserialization
 * @param {unknown} value - 需要反序列化的值。The value to deserialize
 * @return {JSON | undefined} 反序列化后的JSON对象或undefined。The deserialized JSON object or undefined
 */
function deserialize(value) {
    if (typeof value !== 'string') {
        return undefined;
    }
    try {
        return JSON.parse(value);
    }
    catch (e) {
        return value;
    }
}
var STORAGE_CONST_ROLER = {
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
function Storage(type) {
    if (type === void 0) { type = 'local'; }
    var _controller = STORAGE_CONST_ROLER[type];
    return {
        /**
         * Storage.setLocal 设置Storage
         * @param {String} key Storage key
         * @param {String|Object} value Storage value
         * @param {number} expiration 过期时间(毫秒), 0表示永不过期
         */
        set: function (key, value, expiration) {
            if (expiration === void 0) { expiration = DEFAULT_EXPIRATION; }
            var item = {
                value: typeof value === 'object' ? JSON.stringify(value) : value,
                expiration: expiration === 0 ? 0 : Date.now() + expiration,
            };
            _controller.setItem(key, JSON.stringify(item));
        },
        /**
         * Storage.getLocal 获取Storage
         * @param {String|undefined} key Storage key
         */
        get: function (key) {
            if (key) {
                var itemStr = _controller.getItem(key);
                if (!itemStr)
                    return null;
                var item = JSON.parse(itemStr);
                if (item.expiration !== 0 && Date.now() > item.expiration) {
                    _controller.removeItem(key);
                    return null;
                }
                return deserialize(item.value);
            }
            else {
                var _obj = {};
                for (var i = 0; i < _controller.length; i++) {
                    var keyName = _controller.key(i);
                    if (!keyName)
                        continue;
                    var itemStr = _controller.getItem(keyName);
                    if (!itemStr)
                        continue;
                    var item = JSON.parse(itemStr);
                    if (item.expiration !== 0 && Date.now() > item.expiration) {
                        _controller.removeItem(keyName);
                        continue;
                    }
                    _obj[keyName] = deserialize(item.value);
                }
                return _obj;
            }
        },
        /**
         * Storage.removeLocal 删除Storage
         * @param {String|undefined} key Storage key
         */
        remove: function (key) {
            if (key)
                _controller.removeItem(key);
            else
                _controller.clear();
        },
    };
}
export default Storage;
