/*
 * token初始化（key1-key5）
 */

import {isLogin} from "@/scripts/fn.business";

let initFunc;

/*
 *  android 客户端直接调用该方法（可能原因：android 在回调的时候参数的长度会超过限制）
 *  ios 则在回调方法中调起该方法
 */
function showKeyValuesResult (info) {
    if (!info) alert('token error.');
    info = JSON.parse(info);

    if (!info.key1) {
        alert('客户端token获取失败');
        return false;
    }

    for (let i in info) {
        if (~i.indexOf('key')) {
            window[i] = info[i];
            localStorage.setItem('wallet_back_' + i, info[i]);
        }
    }

    initFunc();
}

window.showKeyValuesResult = showKeyValuesResult;

// token
const KeyValueEncrypt = {
    KeyValueTransmit: function () {
        callNativeHandler(
            'KeyValueTransmit',
            '',
            function (data) {
                showKeyValuesResult(data);
            }
        );
    },
    encryptTransmit: function () {
        callNativeHandler(
            'KeyValueTransmit',
            '',
            function () {}
        );
    }
};

/*
 * @param {Function} cb 回调函数
 */
export default function tradeInit (cb) {
    if (!cb) throw new Error('Error! No trade init callback.');

    initFunc = cb;

    isLogin(() => {
        // for test
        if (window.location.hostname === 'localhost') {
            showKeyValuesResult(`
                {
                    "key1":"WnJ6TnySlXm1Jv/pqGPdHYdpymJi/g1xCUdOB5zTchnBpbDymOS9iK/uNMsfNHthF/BFlAiJ14UR9u5qDcUmcxt6J/yKQOJL6TU9ftg1b3v7J3RNnIrs5wICsTB3KcjrRTlxXPBc5HiskJBsDE4+1kl2DLyfRta7lI5xhRLaAr0=",
                    "key2":"JdYSUdFncT8uWygkrhKQ7NVvKINZarjF6Euepi7rXbWMRKZYvQYgAEiiIgZub0I6ToBTzQUWh+yqaIhu6nDskM2Ui+lcd/YJGLHpZkQ2YeSESZDQSEmw47YnNaIOoNcrW0/trGDJX4pTjq1fjF7+op2WUZPg90hIxxcKQfNqDHU=",
                    "key3":"P7tjY+LDsQVwbDGPpQ1JoVVKv7ZE9iyo/J6nH+uc0taFTjPKgmxR7Y+rFdh/neArkJQBjnkN+87ai4DFDz0vwQrIAEVJeVaB/0e5xJun9xD44JnU9wCLuQV8jsLGAeqspzV9MpdJHtkaNI8ZcJQJnxfsUnQVjsrwvZn8LN5OV2Y=",
                    "key4":"JBOZE0kzGJrZxE2JcdzxXrCtG6ZnS7p99bUTooHNDyUwXbkiwc4x5m0ZeUd/opDIZ7voZTDs3fv7Z5fLsOmIYGN7UCRusmNHyZMGhtMaZ/vcn+ZbHW6YumEWJ1UEaHmF768+2k6igIGEG+jQ0Wus+NB1hMtXdW1dGFxrjfbDRm0=",
                    "key5":"fg9OLR+2JnFfth4Yrz0Ojadp6cUPCoBaxjuJTaM/vtnHIOap3kwLTsJcQiwX2j5+DW/3I3rTkqlmVl1J60kv39x0eiNOWxtoFRjRICA8y53UfM3y8+Wut0FSKm3zDFnx5VhLZxrBqbQPMY7aTmCAJTrihrodL8PpELN5axCGD5I="
                }`);
            return false;
        }

        if (_.platform.osInfo === 'iphone') KeyValueEncrypt.KeyValueTransmit();
        else KeyValueEncrypt.encryptTransmit();
    });
}