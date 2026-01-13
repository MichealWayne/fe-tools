/**
 * @model rem
 * @desc 单位1rem = 75px(mobile)；1rem = 54px(pc)。（当window.norem存在时，则不设置rem单位）
 * @alias window.flexible
 * @property {Number} dpr 设备屏幕分辨率
 * @property {Number} rem rem比例
 * @Date 2020-04-11 21:55:46
 * @LastEditTime 2023-02-21 11:12:35
 */
declare global {
    interface Window {
        norem?: boolean;
        flexible: any;
    }
}
export {};
