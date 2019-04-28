/**
 * localStorage、sessionStorage control
 * @return window.Storage
 * @author: Micheal Wayne
 */


/**
 * isJSON() 是否为JSON字符串
 * @param {String} str check string
 * @return {Boolean}
 */
function isJSON(obj) {
    obj = JSON.stringify(obj);

    return /^\{[\s\S]*\}$/.test(obj);
}

/**
 * deserialize() 解析值
 * @param {String} value 
 * @return {String|Object|Array}
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

var _controll = {
    local: localStorage,
    session: sessionStorage
};


/**
 * Storage
 * @param {String} type storage type, default: 'local'
 * @example: 
 *      Storage('local').set(a, [1, 2, 3]);
 *      Storage('session').get('a');
 */
function Storage (type = 'local') {
    var _controller = _controll[type];

    return {
        /**
         * Storage.setLocal 设置Storage
         * @param {String|Object} key Storage key
         * @param {String|Object} value Storage value
         */
        set (key, value) {
            if (!isJSON(key)) {
                if (typeof value === 'object') value = JSON.stringify(value);
                _controller.setItem(key, value);
            } else {
                for (var i in key) {
                    Storage(type).set(i, key[i]);
                }
            }
        },

        /**
         * Storage.getLocal 获取Storage
         * @param {String|undefined} key Storage key
         */
        get (key) {
            if (key) {
                var _val = _controller.getItem(key);
                
                return deserialize(_val);
            } else {
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
        remove (key) {
            if (key) _controller.removeItem(key);
            else _controller.clear();
        }
    }
}


export default Storage