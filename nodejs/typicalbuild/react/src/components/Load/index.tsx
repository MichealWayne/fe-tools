import * as React from "react";
import classNames from 'classnames';
import styles from './index.less';

interface iProps {
    className?: string
}

export default function ({className}: iProps) {
    return (
        <section className={classNames(className, styles['m-load'], 'u-pt10 u-pb40')}>
                <img src="//s.thsi.cn/ijijin/image/fundloading.png" alt=""/>
        </section>
    )
}