<!-- 
 弹窗
 -->

<template>
    <section class="vu-alert">
        <transition name="v-alert">
            <div v-if="show" class="m-win" :class="className">
                <h4 class="m-tit">{{ title }}</h4>
                <div class="m-ctn" v-html="content" v-if="content"></div>
                <slot v-else></slot>

                <p class="f-b_1px bt_1px" v-show="!noBtn">
                    <a class="u-btn f-fl" 
                        v-if="btns.length"
                        v-for="(item, index) in btns" 
                        :key="index"
                        :class="item.className"
                        :style="{width: Math.floor(100 / btns.length) + '%'}"
                        @click="item.callback ? item.callback() : close()"
                    >{{ item.text }}</a>
                    <a class="u-btn" @click="close" v-if="!btns || !btns.length">确定</a>
                </p>
            </div>
        </transition>
    </section>
</template>

<script>
    import Mask from '../Mask'

    export default {
        name: 'alert',
        mixins: [Mask],
        methods: {
            close () {
                this.show = false;
            }
        },
        props: {
            content: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            },
            btns: Array,
            show: Boolean,
            noBtn: {
                type: Boolean,
                default: false
            }
        }
    }
</script>