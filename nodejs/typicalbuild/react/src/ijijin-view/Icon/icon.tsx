import React from 'react'
import classnames from 'classnames'

interface IconProps {
	type: string;
	className?: string;
	onClick?: any
}

function Icon (props: IconProps) {
	let {
        type,
        className,
        onClick,
    } = props;

    let _class = classnames('ru-iconfont', 'icon-' + type, className);
    return (<em className={_class} onClick={onClick}></em>)
}


export default Icon