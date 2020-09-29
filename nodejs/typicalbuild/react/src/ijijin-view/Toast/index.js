
import React from 'react'
import ReactDOM from 'react-dom';
import ToastComponent from './toast.tsx'
import {cloneObj} from '../utils/util'
import '../less/Toast.less'


/* 初始化 toast, 并添加到document中 */
const initToast = () => {
    let _div = document.createElement('div');
    document.body.appendChild(_div);
    const instance = ReactDOM.render(<ToastComponent/>, _div);

    return {
        addNotice (options) {
            return instance.addNotice(options);
        },

        destory () {
            ReactDOM.unmountComponentAtNode(_div);
            document.body.removeChild(_div);
        }
    }
};

let instance;
const Toast = () => {

    return {
        hide () {
            instance.addNotice({ show: false });
        },

        show (options) {
            if (!instance) instance = initToast();
            
            /* 设置显示内容和属性 */
            options = typeof options === 'string' ? {
                message: options
            } : options;


            options = cloneObj({
                type: 'bottom',
                duration: 2000,
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, .7)',
                show: true
            }, options);

            instance.addNotice(options);
        },

        destory () {
            instance.destory();
        }
    }
}


export default Toast()