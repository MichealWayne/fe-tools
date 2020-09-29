import React from 'react';
import classNames from 'classnames'
import './index.less'

export default function TabBar(props) {
    const {
        barNames, // tab列表
        activeTab, // 当前激活tab
        handleChange // 点击处理函数
    } = props;
    return (
        <section className={'m-tab-bar'}>
            {
                barNames.map((item) => {
                    let className = classNames({active: activeTab === item.index});
                    return (
                        <button className={className} key={item.index} onClick={() => {
                            handleChange(item.index)
                        }}>
                            {item.tabName}
                        </button>
                    )
                })
            }
        </section>
    )
}