import React, { FC, memo } from 'react'
import classnames from 'classnames'

interface ButtonProps {
    link?: string;
    inline: boolean;
    type: string;
    disabled: boolean;
    className: string|string[];
    onClick?: any;
    children?: any;
}

const Button: FC = (props: ButtonProps) => {
    let {
        link,
        inline = true,
        type = 'default',
        disabled = false,
        className,

        onClick,

        children,
    } = props;

    let _class = classnames('ru-btn', inline ? 'u-btn_il' : 'u-btn', 'btn-' + (type || 'default'), { 'z-disabled': disabled }, className);
    if (!link) return <button
            className={_class}
            onClick={onClick}
        >{ children }</button>
    else return <a
            className={_class}
            href={link}
            onClick={onClick}
        >{ children }</a>
}

export default memo(Button)