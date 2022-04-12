"use strict";
/**
 * @model Stroage
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
    }
    catch (e) {
        return value;
    }
}
var STORAGE_CONSTROLER = {
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
    var _controller = STORAGE_CONSTROLER[type];
    return {
        /**
         * Storage.setLocal 设置Storage
         * @param {String} key Storage key
         * @param {String|Object} value Storage value
         */
        set: function (key, value) {
            if (typeof value === 'object')
                value = JSON.stringify(value);
            _controller.setItem(key, value);
        },
        /**
         * Storage.getLocal 获取Storage
         * @param {String|undefined} key Storage key
         */
        get: function (key) {
            if (key) {
                var _val = _controller.getItem(key);
                return deserialize(_val);
            }
            else {
                var _obj = {};
                for (var i in _controller) {
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
        remove: function (key) {
            if (key)
                _controller.removeItem(key);
            else
                _controller.clear();
        },
    };
}
exports.default = Storage;
