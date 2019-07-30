/**
 * toast
 */

import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'
import Icon from '../IconMin'

interface ToastProps {}
interface ToastState {
  type: string;
  duration: number;
  color: string;
  backgroundColor: string;
  show: boolean;
}

class ToastComponent extends Component<ToastProps, ToastState> {
    constructor() {
        super();

        this.timer = null;
        this.state = {
            type: 'bottom',
            duration: 2000,
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, .7)',
            show: false,
            className: ''
        }
    }

    // notice
    addNotice(options) {
        if (!options) return false;
        
        let duration = options.duration;

        this.setState(options);

        if (duration > 0) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.setState({
                    show: false
                });
            }, duration)
        }
    }

    render () {
        const {
            show,
            className,
            icon,
            type,
            message,

            color,
            backgroundColor,

            children,
            duration,
        } = this.state;

        let _class = classnames('ru-toast', 'z-' + type, className);
        
        return (
            <CSSTransition
                classNames="r-toast"
                timeout={duration}
                in={show}
            >
                <div className={_class} style={{ color, backgroundColor }}>
                    {
                        icon && <Icon type={icon}/>
                    }
                    { message || children }
                </div>
            </CSSTransition>
        )
    }
}

export default ToastComponent