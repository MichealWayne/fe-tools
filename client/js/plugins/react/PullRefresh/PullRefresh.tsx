import React, { Component } from 'react'
import classnames from 'classnames'
import Touch from '../utils/touch'
import Scroll from '../utils/scroll'
import '../less/PullRefresh.less'
import { mixin } from 'core-decorators'

@mixin(Touch)
export default class PullRefresh extends Component {
    private state = {
        headText: '',
        style: null,
        logo: '//s.thsi.cn/ijijin/image/fundloading.png',
        pullingText: '下拉刷新',
        loadingText: '加载中...',
        loosingText: '释放刷新',
    }

    private headHeight = 50;
    private animationDuration = 400;
    private status = 'normal';
    private disabled;
    private ceiling;
    private startX = 0;
    private startY = 0;
    private deltaY = 0;
    private moveDistance = 0;
    private duration = 0;
    private direction = 0;

    /**
     * 是否在滚动条顶部
     * @return {Boolean} 在/不在顶部
     */
    getCeiling() {
      this.ceiling = Scroll.getScrollTop(this.el) === 0;
      return this.ceiling;
    }

    // 展示文案
    headText () {
        return this.status === 'loading' ? this.state.loadingText : this.status === 'loosing' ? this.state.loosingText : this.state.pullingText;
    }

    /**
     * touch start control
     */
    _touchStart = e => {
        this.touchStart(e);
    }

    /**
     * touch move control
     */
    _touchMove = e => {
        this.touchMove(e);

        if (!this.ceiling && this.getCeiling()) {
          this.duration = this.animationDuration;
          this.startY = e.touches[0].clientY;
          this.deltaY = 0;
        }

        if (this.ceiling && this.deltaY >= 0) {
          if (this.direction === 'vertical') {
            this.getStatus(this.ease(this.deltaY));
            e.stopPropagation();
          }
          
        }

        if (this.refs.logoImg) {
            this.refs.logoImg.classList.remove('a-loading_imgrotate');
            this.refs.logoImg.style.transform = 'rotate(' + this.deltaY + 'deg)';
            this.refs.logoImg.style.webkitTransform = 'rotate(' + this.deltaY + 'deg)';
        }
    }

    /**
     * touch end control
     */
    _touchEnd () {
        if (this.status === 'loading' || this.disabled) return;

        if (this.ceiling && this.deltaY) {
          //this.duration = this.animationDuration;
          if (this.status === 'loosing') {
            this.getStatus(this.headHeight, true);
            if (this.props.refresh) this.props.refresh();
            //this.$emit('refresh');

            if (this.refs.logoImg) {
                this.refs.logoImg.classList.add('a-loading_imgrotate');
            }
          } else {
            this.getStatus(0);
          }
        }
    }

    /**
     * 获取高度状态
     * @params {Number} height Y轴触控距离
     * @return {Number} 高度
     */
    ease (height) {
      const { headHeight } = this;
      return height < headHeight
        ? height
        : height < headHeight * 2
          ? Math.round(headHeight + (height - headHeight) / 2)
          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
    }

    /**
     * 判断当前状态
     * @params {Number} height 高度
     * @params {Boolean} isLoading 是否加载中
     */
    getStatus(height, isLoading) {
      this.moveDistance = Math.round(height);

      const status = isLoading
        ? 'loading' : height === 0
          ? 'normal' : height < this.headHeight
            ? 'pulling' : 'loosing';

      if (status !== this.status) {
        this.status = status;
        this.setState({
            headText: this.headText(),
            style: {
              webkitTransition: `${this.duration}ms`,
              transition: `${this.duration}ms`,
              webkitTransform: `translate3d(0,${this.moveDistance}px, 0)`,
              transform: `translate3d(0,${this.moveDistance}px, 0)`
            }
        })
      }
    }

    componentDidMount () {
        this.el = Scroll.getScrollEventTarget(this.refs.el);
    }

    componentWillReceiveProps(nextProps) {
        let {
            //logoImg,
            pullingText,
            loadingText,
            loosingText,
            value,
        } = nextProps;

        let _obj: any = {};
//        if (logoImg || logoImg === false) _obj.logoImg = logoImg;
        if (pullingText) _obj.pullingText = pullingText;
        if (loadingText) _obj.loadingText = loadingText;
        if (loosingText) _obj.loosingText = loosingText;
        this.duration = this.animationDuration;
        this.getStatus(value ? this.headHeight : 0, value);
        this.setState(_obj)
    }

    render () {
        let  {
            className,
            children,
            logoImg,
        } = this.props;

        let {
            headText,
            style,
            logo,
        } = this.state;

        if (!logoImg && logoImg !== false) logoImg = logo;

        return (<div className={classnames('ru-pull-refresh', className)}>
            <div className="u-p_ctn"
                onTouchStart={this._touchStart.bind(this)}
                onTouchMove={this._touchMove.bind(this)}
                onTouchEnd={this._touchEnd.bind(this)}
                onTouchCancel={this._touchEnd.bind(this)}
                ref="el"
                style={style}
            >
                <section class="u-p_refresh">
                    <div>
                        { logoImg && <img v-if="logoImg" ref="logoImg" class="u-loading_img" src={logoImg}/> }
                        <span>{ headText }</span>
                    </div>
                </section>

                <section class="u-p_slot">
                    { children }
                </section>
            </div>
        </div>)
    }
}