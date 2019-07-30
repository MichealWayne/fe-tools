/**
 * Toast
 * 自动消失提示框
 * 参数：Toast({
 *  message: string '显示的信息,默认为空'
 *  duration: number '显示时长，默认为2000'，
 *  color: string '显示文字颜色，默认为#fff'
 *  type: oneOf['bottom','top','middle'] '弹框显示位置，默认为bottom'
 *  backgroundColor: string '弹框背景颜色，默认为rgba(0, 0, 0, 0.8)'
 * }）
 * 例子：
 * Toast({message:'购买成功'，duration:3000, type:'middle'})
 */

import Vue from 'vue'
import ToastComponent from './Toast.vue'
import install from '../utils/install'

let ToastInstaller = install(ToastComponent);

let instance;
const ToastConstructor = Vue.extend(ToastInstaller);

/* 初始化 toast, 并添加到document中 */
const initToast = () => {
    if (instance) return false;
    instance = new ToastConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
};

const Toast = () => {
    initToast();

    return {
        hide () {
            instance.show = false;
        },

        show (options) {
            /* 设置显示内容和属性 */

            options = typeof options === 'string' ? {
                message: options
            } : options;
            instance.message = options.message || '';
            instance.duration = options.duration || 1500;
            instance.color = options.color || '#fff';
            instance.backgroundColor = options.backgroundColor || 'rgba(0, 0, 0, 0.8)';
            instance.type = options.type || 'bottom';
            instance.icon = options.icon;
            instance.className = options.className;

            /* 显示 */
            if (instance.timer) clearTimeout(instance.timer);
            instance.show = true;
            instance.timer = setTimeout(() => {
                instance.timer = null;
                instance.show = false;
            }, instance.duration);
        }
    }
};

Toast.install = () => {
  Vue.use(ToastComponent);
};


export default Toast