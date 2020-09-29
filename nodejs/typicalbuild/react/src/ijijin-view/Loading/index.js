import React from 'react'
import './index.less'
import classNames from 'classnames'

export default function Loading({className}) {
    return (
        <div className={classNames('m-refresh-loading',className)}>
            <img src="//s.thsi.cn/ijijin/image/fundloading.png" alt=""/>
        </div>
    )
}