
import React from 'react'
import ReactDOM from 'react-dom'
import AlertComponent from './alert.tsx'
import {cloneObj} from '../utils/util'
import '../less/Alert.less'


const initAlert = () => {
    let _div = document.createElement('div');
    document.body.appendChild(_div);
    const instance = ReactDOM.render(<AlertComponent/>, _div);

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
const Alert = () => {

    return {
        hide () {
            instance.addNotice({ show: false });
        },

        show (options) {
            if (!instance) instance = initAlert();

            options = typeof options === 'string' ? {
                content: options
            } : options;

            options = cloneObj({
                show: true,
                title: '',
                noBtn: false,
                btns: null,
                className: '',
                maskClassName: '',
                maskClick: null,
            }, options);

            instance.addNotice(options);
        }
    }
};


export default Alert();