import Vue from 'vue'
import App from './views/App.vue'
import Router from 'vue-router'
import routes from '@/router/index'
import '@/assets/styles/base.less'

new Vue({
    router: new Router(routes),
    render: h => h(App),
}).$mount('#app');

