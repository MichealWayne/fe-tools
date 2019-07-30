import Vue from 'vue'
import MaskComponent from './mask.vue'
import install from '../utils/install'

let MaskInstaller = install(MaskComponent);
let count = 0;
let instance;
let MaskConstructor = Vue.extend(MaskInstaller);

/*
 * 初始化Mask组件，并添加到DOM中
 */
const initMask = () => {
    if (instance) return false;
    instance = new MaskConstructor({
        el: document.createElement('div')
    });
    instance.show = false;

    document.body.appendChild(instance.$el);
};

/*
 * 显示配置函数
 * @param options
 * @constructor
 */

const Mask = {
    _hide() {
        instance.show = false;
    },
    _show() {
        count++;
        instance.show = true
    }
};

export default {
    watch: {
        show(newvalue) {
            if (newvalue) {
                instance.maskStyle = this.maskStyle;
                if (instance._clickEvent) instance.$off('click');
                if (this.maskClick) {
                    instance._clickEvent = true;
                    instance.$on('click', this.maskClick);
                }

                Mask._show();
            } else {
                count-- && !count && Mask._hide();
            }
        }
    },

    mounted() {
        initMask();

        if (this && this.show) Mask._show();
    }
};