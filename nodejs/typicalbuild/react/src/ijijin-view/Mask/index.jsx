/**
 * 遮罩层
 */

import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames'


const Mask = ({
    show = false,
    timeout = 800,
    className,
    onClick = () => {}
}) => {
    let _class = classnames(
            'u-mask', 
            className,
        );

    return (
        <CSSTransition 
                in={show}
                timeout={timeout}
                classNames="example"
            >
            <div className={_class} onClick={onClick}></div>
        </CSSTransition>
        )
};

Mask.propTypes = {
    show: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Mask;
