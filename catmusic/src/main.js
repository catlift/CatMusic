import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './vuex/store.js'
import router from './routers'
import axios from './plugins/axios.js'
import qs from 'qs'
import VueLazyload from 'vue-lazyload' //图片懒加载

import './assets/Icon/iconfont.css'

Vue.use(VueRouter);
Vue.use(VueLazyload);
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false

new Vue({
	store,
    router,
    render: h => h(App)
}).$mount('#app')

