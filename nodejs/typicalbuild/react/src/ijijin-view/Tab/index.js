import React from 'react';
import TabPane from '../TabPane'
import TabBar from '../TabBar'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './index.less'
import touch from "../utils/touch";

const touchMove = touch.touchMove;
const touchStart = touch.touchStart;


/**
 * 计算移动距离（）
 */
function calcMove(index, max, unit) {
    let padding = 0;
    // 初始化留白和移动距离
    if (unit < 100) {
        padding = (100 - unit) / 2
    } else if (unit > 100) {
        unit = 100
    }
    // 根据位置计算
    if (index === 0) {
        return 0
    } else if (index === max) {
        return index * unit - padding * 2
    } else {
        return index * (unit - padding) + (index - 1) * padding
    }

}

// TODO
// - 循环
// - tab栏样式统一
export default class Tab extends React.PureComponent {
    static TabPane = TabPane;

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0, // 当前活动的tab
            barNames: [], // 标题名字
            tabLength: null, // tab个数
        };

        this.touchMove = this.touchMove.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.widthUnit = 100 // 每一tab页宽度
    }

    static getDerivedStateFromProps(props, state) {
        let result = {
            tabLength: props.children.length  // 每次变更时更新长度
        };
        if (props.activeTab !== state.activeTab) { // 如果外部改变activeTab内部同步
            result.activeTab = props.activeTab;
        }
        return result;
    }


    init() {
        const barNames = []; // 头部tab导航

        const {
            hideBar,
            children,
            activeTab,
            widthUnit
        } = this.props;
        // 遍历子元素生成信息
        if (!hideBar) { // 是否隐藏顶部导航
            React.Children.forEach(children, (tabPane, index) => {
                if (tabPane.type !== TabPane) {
                    throw new Error('Tab only accept TabPane as children')
                }
                barNames.push({
                    tabName: tabPane.props.tabName,
                    index: index
                })
            });
        }

        // 每一tab宽度
        this.widthUnit = widthUnit || this.widthUnit;

        this.setState({
            activeTab: activeTab || 0,
            barNames,
            tabLength: children.length,
        })
    }


    /**
     * 改变Index统一处理函数
     */
    handleChange(activeTab) {
        const {
            change,
            max,
            min
        } = this.props;

        if (max && activeTab > max) {
            return;
        } else if (min && activeTab < min) {
            return
        }

        this.setState({
            activeTab,
        }, () => {
            change && change(activeTab);
        })
    }

    touchMove(e) {
        touchMove.apply(this, e.targetTouches)
    }

    touchStart(e) {
        touchStart.apply(this, e.targetTouches);
    }

    touchEnd() {
        const {
            activeTab,
            tabLength
        } = this.state;
        if (this[`offsetX`] < 50) { // 滑动距离过小，则不切换
            return;
        }
        if (this.deltaX < 0 && activeTab < tabLength - 1) {
            this.handleChange(activeTab + 1)
        } else if (this.deltaX > 0 && activeTab > 0) {
            this.handleChange(activeTab - 1)
        }
    }

    render() {

        const {
            activeTab,
            barNames,
            tabLength
        } = this.state;

        const {
            hideBar,
            children,
            className
        } = this.props;

        let style = {
            transform: `translateX(${-calcMove(activeTab, tabLength, this.widthUnit)}vw)`,
            WebkitTransform: `translateX(${-calcMove(activeTab, tabLength, this.widthUnit)}vw)`
        };

        let cls = classNames(className, 'm-tab');
        return (
            <section className={cls}
                     onTouchMove={this.touchMove}
                     onTouchStart={this.touchStart}
                     onTouchEnd={this.touchEnd}>

                {!hideBar && barNames.length &&
                <TabBar classNam={'f-b_1px bb_1px'} activeTab={activeTab} handleChange={this.handleChange} barNames={barNames}/>}
                <div className={'m-tab-container'} style={style}>
                    {
                        React.Children.map(children, (item, index) => {
                            if(item){
                                return React.cloneElement(item, {
                                    activeTab: activeTab,
                                    index: index,
                                    width: this.widthUnit
                                })
                            }
                        })
                    }
                </div>
            </section>
        )
    }


    componentDidMount() {
        this.init()
    }
}

Tab.propTypes = {
    widthUnit: PropTypes.number, // 每一tab宽度
    activeTab: PropTypes.number, // 当前活动项
    interval: PropTypes.number, // 当前活动项
    hideBar: PropTypes.bool,// 是否隐藏头部
    change: PropTypes.func// 没改变之后的回调函数
};