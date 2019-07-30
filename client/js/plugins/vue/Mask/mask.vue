<!-- 
 遮罩层
 -->

<template>
    <transition name="v-fade">
        <div class="m-win_bg"
            v-show="show"
            :class="className"
            :style="style"
            @touchmove.prevent.stop
            @click="$emit('click', $event)"
        ></div>
    </transition>
</template>

<script>
    export default {
        name: 'mask',

        props: {
            show: {
                type: Boolean,
                default: false
            },
            maskStyle: Object,
	    className: String,
        },

        computed: {
            style () {
                if (!this) return {}
                return {
                    ...this.maskStyle
                }
            }
        }
    };
</script>