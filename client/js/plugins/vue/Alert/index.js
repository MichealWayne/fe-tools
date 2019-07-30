/**
 * Alert
 */

import Vue from 'vue'
import AlertComponent from './Alert.vue'
import install from '../utils/install'

let AlertInstaller = install(AlertComponent);

let instance;
let AlertConstructor = Vue.extend(AlertInstaller);

/**
 * 初始化Alter组件，并添加到DOM中
 */
const initAlert = () => {
    if (instance) return false;
    instance = new AlertConstructor({
        el: document.createElement('div')
    });
    instance.show = false;

    document.body.appendChild(instance.$el)
};

/**
 * 显示配置函数
 * @param options
 * @constructor
 */
const Alert = () => {
    initAlert();
    /**
     * 如果已经显示则不显示
     */

    return {
        hide () {
            instance.show = false;
        },
        show (options) {
            if (typeof options === 'string') options = { content: options };

            instance.title = options.title;
            instance.content = options.content;
            instance.className = options.className;
            instance.maskStyle = options.maskStyle;
            instance.maskClick = options.maskClick;
            instance.noBtn = options.noBtn;

            instance.btns = options.btns;

            instance.show = true;
        }
    }
};

Alert.install = () => {
  Vue.use(AlertComponent);
};


export default Alert