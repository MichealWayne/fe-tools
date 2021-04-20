/*
 * alert
 */

import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import classnames from 'classnames'

import Mask from '../Mask'

interface AlertState {
    show: boolean;
    title?: string | undefined;
    content: string;
    noBtn?: boolean;
    btns: Array<object> | null;
    className?: any;
	maskClassName?: any;
	maskClick: any;
}

class AlertComponent extends Component<null, AlertState> {
    constructor (props: any) {
        super(props);

        this.state = {
            show: false,
            title: '',
            content: '',
            noBtn: false,
            btns: null,
            className: '',
            maskClassName: '',
            maskClick: null,
        };
    }

    /**
     * get button
     */
    getBtns = (btns: any) => {
        let _hidefunc = this.addNotice.bind(this, { show: false });
        if (!btns || !btns.length) return <a className="u-btn" onClick={_hidefunc}>确定</a>

        return btns.map((item: any) => (
            <a
                className={classnames('u-btn f-fl', item.className)}
                style={{ width: Math.floor(100 / btns.length) + '%' }}
                onClick={ item.callback || _hidefunc }
            >{ item.text }</a>
            ))
    };


    // notice
    addNotice(options: any) {
        if (!options) return false;

        this.setState(options);
    }

    render () {
        let {
            show,
            title,
            content,
            noBtn,
            btns,
            className,

            maskClassName,
            maskClick,
        } = this.state;

        return (
            <div className="ru-alert">
                <CSSTransition 
                    in={show}
                    timeout={300}
                    classNames="r-alert"
                >
                    <div className={classnames('u-win', className)}>
                        <h4 className="m-tit">{ title }</h4>
                        <div className="m-ctn" dangerouslySetInnerHTML={{ __html: content }}></div>

                        <p className={classnames('f-b_1px bt_1px', { 'z-hide': noBtn })}>
                            {
                                this.getBtns(btns)
                            }
                        </p>
                    </div>
                </CSSTransition>
                <Mask show={show} className={maskClassName} onClick={maskClick}/>
            </div>
            )
    }
}

export default AlertComponent