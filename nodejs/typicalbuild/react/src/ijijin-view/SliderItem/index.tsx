import * as React from "react";
import classNames from 'classnames'
import './index.less'

interface iProps {
    className?: string
    children: any,
    style?: {
        [propsName: string]: string | number
    }
}

export default function ({className, children, style}: iProps) {
    return (
        <section style={style} className={classNames(className, 'm-slider-item')}>
            {children}
        </section>
    )
}