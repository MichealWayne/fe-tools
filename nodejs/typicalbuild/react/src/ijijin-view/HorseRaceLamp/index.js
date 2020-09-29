import React from 'react'
import './index.less'

export default class HorseRaceLamp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0// 当前滚动的距离
        }
    }

    roll() {
        const rollItemOut = () => {
            setTimeout(() => {
                const {index, maxIndex} = this.state;
                let currentIndex = index + 1; // 本次要设置的值
                // 判断是否超过最大数量
                if (currentIndex >= maxIndex) {
                    currentIndex = 0;
                    // 展示列表最后一个就是第一个 所以快速切换整体位置
                    setTimeout(() => {
                        this.setState({
                            index: 1
                        })
                    }, 100)
                }
                this.setState({
                    index: currentIndex
                }, () => {
                    rollItemOut();
                })
            }, this.props.time)
        };
        rollItemOut();
    }

    static getDerivedStateFromProps(props, state) {
        if (state.notFirst) return null;
        let list = props.list || [];
        props.list.length && list.push(props.list[0]);
        return {
            notFirst: true, // 不在是第一次初始化
            list: list, // 列表数据
            maxIndex: list.length  // 最大长度
        }
    }

    render() {
        const {animateTime} = this.props;
        const {index, list} = this.state;

        // 跑马灯每一项
        const lampItem = (item, index) => {
            return (
                <div className={'r-horse-race-lamp-item'} key={index}>
                    <p>{item.text}</p>
                </div>
            )
        };

        // 滚动动画样式
        const rollStyle = {
            transform: `translateY(${-index * 30}px)`,
            WebkitTransform: `translateY(${-index * 30}px)`,
            transition: `all ${index ? animateTime : 0}ms linear`,
            WebkitTransition: `all ${index ? animateTime : 0}ms linear`
        };

        return (
            <section className={'r-horse-race-lamp'}>
                <section style={rollStyle} className={'r-horse-race-lamp-content'}>
                    {list?.map((item, index) => {
                        return (lampItem(item, index))
                    })}
                </section>
            </section>
        )
    }

    componentDidMount() {
        this.roll();
    }
}

HorseRaceLamp.defaultProps = {
    list: [],
    time: 2000,
    animateTime: 1000
};