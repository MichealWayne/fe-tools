<!-- 
 toast
 -->
<template>
    <transition name="v-toast">
        <div v-if="show" class="vu-toast" :class="['z-' + type, className]"
            :style="{
                color,
                backgroundColor
            }"
        >

            <v-icon v-if="icon" :type="icon"></v-icon>

            {{ message }}
        </div>
    </transition>
</template>

<script>
    export default {
        name: "toast",
        props: {
            type: {
                type: String,
                default: 'bottom'
            },
            icon: String,
            message: {
                type: String,
                default: ''
            },
            duration: {
                type: Number,
                default: 2000
            },
            color: {
                type: String,
                default: '#fff'
            },
            backgroundColor: {
                type: String,
                default: 'rgba(0, 0, 0, 0.7)'
            },
            className: String,
            show: {
                type: Boolean,
                default: false
            }
        }
    }
</script>