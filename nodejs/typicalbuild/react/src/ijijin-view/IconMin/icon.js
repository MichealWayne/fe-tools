import React, { Component } from 'react'
import classnames from 'classnames'


class Icon extends Component {
    constructor () {
        super();
    }

    defaultProps = {
        type: '',
        className: '',
    };

    render () {
        let {
            type,
            className,
            onClick,
        } = this.props;

        let _class = classnames('ru-iconfont', 'icon-' + type, className);
        return (<em class={_class} onClick={onClick}></em>)
    }
}

export default Icon