/**
 * @model Stroage
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2024-08-25 10:20:04
 */
/**
 * Storage
 * @param {string} type storage type, default: 'local'
 * @example:
 *      Storage('local').set(a, [1, 2, 3]);
 *      Storage('session').get('a');
 */
declare function Storage(type?: string): {
    /**
     * Storage.setLocal 设置Storage
     * @param {String} key Storage key
     * @param {String|Object} value Storage value
     * @param {number} expiration 过期时间(毫秒), 0表示永不过期
     */
    set(key: string, value: string | {
        [key: string]: unknown;
    }, expiration?: number): void;
    /**
     * Storage.getLocal 获取Storage
     * @param {String|undefined} key Storage key
     */
    get(key?: string): any;
    /**
     * Storage.removeLocal 删除Storage
     * @param {String|undefined} key Storage key
     */
    remove(key: string): void;
};
export default Storage;
