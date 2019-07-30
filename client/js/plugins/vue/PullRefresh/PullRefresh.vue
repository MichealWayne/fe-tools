<!-- 
 下拉刷新
 -->

<template>
    <div class="vu-pull-refresh">
        <div class="u-p_ctn"
            @touchstart="_touchStart"
            @touchmove="_touchMove"
            @touchend="_touchEnd"
            @touchcancel="_touchEnd"
            :style="style"
        >
            <section class="u-p_refresh">
                <div>
                    <img v-if="logoImg" ref="logoImg" class="u-loading_img" :src="logoImg">
                    <span>{{ headText }}</span>
                </div>
            </section>

            <section class="u-p_slot">
                <slot></slot>
            </section>
        </div>
    </div>
</template>

<script>
    import Touch from '../utils/touch'
    import Scroll from '../utils/scroll'
    import '../less/PullRefresh.less'

    export default {
        name: 'pull-refresh',

        mixins: [Touch],

        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            pullingText: {
                type: String,
                default: '下拉刷新'
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
            loosingText: {
                type: String,
                default: '释放刷新'
            },
            logoImg: {
                type: [String, Boolean],
                default: '//s.thsi.cn/ijijin/image/fundloading.png'
            },
            value : {
                type: Boolean,
                default: false
            }
        },

        data () {
            return {
                status: 'normal',
                headHeight: 50,
                duration: 0,
                animationDuration: 400,
                moveDistance: 0
            }
        },

        watch: {
            value (newval) {
                this.duration = this.animationDuration;
                this.getStatus(newval ? this.headHeight : 0, newval);
            }
        },

        computed: {
            // 偏移样式
            style () {
                return {
                    webkitTransition: `${this.duration}ms`,
                    transition: `${this.duration}ms`,
                    webkitTransform: `translate3d(0,${this.moveDistance}px, 0)`,
                    transform: `translate3d(0,${this.moveDistance}px, 0)`
                };
            },

            // 是否可触发
            untouchable() {
                return this.status === 'loading' || this.disabled;
            },

            // 展示文案
            headText () {
                return this.status === 'loading' ? this.loadingText : this.status === 'loosing' ? this.loosingText : this.pullingText;
            }
        },

        methods: {
            /**
             * 是否在滚动条顶部
             * @return {Boolean} 在/不在顶部
             */
            getCeiling() {
              this.ceiling = Scroll.getScrollTop(this.el) === 0;
              return this.ceiling;
            },

            /**
             * touch start control
             */
            _touchStart (e) {
                if (this.untouchable) return;

                if (this.getCeiling()) {
                    this.duration = 0;
                    this.touchStart(e);
                }
            },

            /**
             * touch move control
             */
            _touchMove (e) {
                if (this.untouchable || this.el.offsetTop + this.headHeight < Scroll.getScrollTop(window)) return;

                this.touchMove(e);

                if (!this.ceiling && this.getCeiling()) {
                  this.duration = 0;
                  this.startY = e.touches[0].clientY;
                  this.deltaY = 0;
                }

                if (this.ceiling && this.deltaY >= 0) {
                  if (this.direction === 'vertical') {
                    this.getStatus(this.ease(this.deltaY));
                    e.preventDefault();
                  }
                }

                if (this.logoImg) {
                    this.$refs.logoImg.classList.remove('a-loading_imgrotate');
                    this.$refs.logoImg.style.transform = 'rotate(' + this.deltaY + 'deg)';
                    this.$refs.logoImg.style.webkitTransform = 'rotate(' + this.deltaY + 'deg)';
                }
            },

            /**
             * touch end control
             */
            _touchEnd () {
                if (this.untouchable) return;

                if (this.ceiling && this.deltaY) {
                  this.duration = this.animationDuration;
                  if (this.status === 'loosing') {
                    this.getStatus(this.headHeight, true);
                    this.$emit('input', true);
                    this.$emit('refresh');

                    if (this.logoImg) {
                        this.$refs.logoImg.classList.add('a-loading_imgrotate');
                    }
                  } else {
                    this.getStatus(0);
                  }
                }
            },

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
            },

            /**
             * 判断当前状态
             * @params {Number} height 高度
             * @params {Boolean} isLoading 是否加载中
             */
            getStatus(height, isLoading) {
              this.moveDistance = height;

              const status = isLoading
                ? 'loading' : height === 0
                  ? 'normal' : height < this.headHeight
                    ? 'pulling' : 'loosing';

              if (status !== this.status) {
                this.status = status;
              }
            }
        },

        mounted () {
            this.el = Scroll.getScrollEventTarget(this.$el);
        }
    }
</script>