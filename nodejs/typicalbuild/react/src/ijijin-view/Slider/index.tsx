import * as React from "react";
import classNames from 'classnames'
import './index.less'
import touch from "../utils/touch";

const touchMove = touch.touchMove;
const touchStart = touch.touchStart;

export default class Slider extends React.PureComponent {
    props: {
        width?: number // 宽度 单位vw
        children: any, //
        change?: (index: number) => void // 改变回掉函数
        distance?: number // 每次移动距离
        duration?: number // 过度时间
        intervalTime?: number//  自动轮播间隔时间
        auto?: boolean // 是否自动轮播
        style?: any
    };
    state: {
        activeIndex: number
        durationTransition: boolean
        style: {
            [propsName: string]: string
        }
    };
    deltaX: number;
    length: number;
    duration: number;
    distance: number; // vw单位
    firstChildStyle: any;
    lastChildStyle: any;
    timeout: any;
    intervalTime: number;

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            durationTransition: true,
            style: {
                width: `${this.props.width || 100}vw`
            }
        };

        this.duration = this.props.duration || 500;
        this.distance = this.props.distance || this.props.width || 100;
        this.length = this.props.children.length;
        this.intervalTime = this.props.intervalTime || 5000;
        this.firstChildStyle = null;
        this.lastChildStyle = null;

        this.touchMove = this.touchMove.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    touchStart(e) {
        clearTimeout(this.timeout);
        touchStart.apply(this, e.targetTouches);
    }

    touchMove(e) {
        touchMove.apply(this, e.targetTouches)
    }

    touchEnd() {
        let {
            activeIndex
        } = this.state;


        if (this[`offsetX`] < 50) { // 滑动距离过小，则不切换
            return this._autoPlay();
        }

        this[`deltaX`] > 0 ? activeIndex-- : activeIndex++;

        if (activeIndex < 0) {
            this._first()
        } else if (activeIndex > this.props.children.length - 1) {
            this._last()
        }

        this._handleChange(activeIndex).then(() => {
            this._autoPlay();
        })
    }

    /**
     * 改变Index统一处理函数
     */
    _handleChange(activeIndex: number) {

        return new Promise(resolve => {
            if (this.length <= 1) {
                return resolve();
            }
            const {
                change
            } = this.props;
            this.setState({
                durationTransition: true,
                activeIndex,
            }, () => {
                resolve();
                change && change(activeIndex);
            })
        })
    }

    /**
     * 移动到第一个的情况
     */
    _first() {
        if (this.length < 2) return;
        this.lastChildStyle = {
            transform: `translateX(-${this.length * this.distance}vw)`
        };
        setTimeout(() => {
            this.lastChildStyle = null;
            this.setState({
                durationTransition: false,
                activeIndex: this.length - 1
            });
        }, this.duration)
    }

    /**
     * 移动到最后一个的情况
     */
    _last() {
        if (this.length < 2) return false;
        this.firstChildStyle = {
            transform: `translateX(${this.length * this.distance}vw)`
        };
        setTimeout(() => {
            this.firstChildStyle = null;
            this.setState({
                durationTransition: false,
                activeIndex: 0
            });
        }, this.duration)
    }

    /**
     * 点击控制按钮
     * @private
     */
    _clickControl(index) {
        this._handleChange(index)
    }

    /**
     * 自动播放
     * @private
     */
    _autoPlay() {
        const {auto} = this.props;
        if (auto === false) return;
        this.timeout = setTimeout(() => {
            if (!document.hidden) {
                let {
                    activeIndex
                } = this.state;
                if (activeIndex + 1 >= this.length) {
                    this._last()
                }
                this._handleChange(activeIndex + 1);
            }
            this._autoPlay()
        }, this.intervalTime);
    }


    componentDidMount(): void {
        if (this.length > 1) {
            this._autoPlay();
        }
    }

    render() {
        const {style, activeIndex, durationTransition} = this.state;
        const {children} = this.props;
        const containerStyle = {
            transition: `all ${durationTransition ? this.duration : 0}ms`,
            transform: `translateX(${-activeIndex * this.distance}vw)`
        };
        return (
            <section style={Object.assign(style, this.props.style)} className={'m-slider'}
                     onTouchStart={this.touchStart} onTouchMove={this.touchMove}
                     onTouchEnd={this.touchEnd}>
                <section className={'m-slider-container'} style={containerStyle}>
                    {
                        React.Children.map(children, (element: any, index: number) => {
                            let style;
                            if (index === 0) style = this.firstChildStyle;
                            else if (index === this.length - 1) style = this.lastChildStyle;
                            return React.cloneElement(element, {
                                isActive: activeIndex === index,
                                style: style || {}
                            })
                        })
                    }
                </section>
                {
                    this.length > 1 && <div className="m-slider-control-list">
                        {
                            React.Children.map(children, (ele: any, index: any) => {
                                return <em className={classNames('u-icon_il',
                                    {'active': index === activeIndex})}
                                           onClick={() => {
                                               this._clickControl(index)
                                           }} key={index}/>
                            })
                        }
                    </div>
                }

            </section>
        )
    }
}