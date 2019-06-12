// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//iview
import iview from 'iview'
// iview css
import 'iview/dist/styles/iview.css'
//axios  vue-axios
import axios from 'axios'
import vueAxios from 'vue-axios'
//vuex
import vuex from 'vuex'
//自定义函数库
import fn from '@/utils/common'
//拦截器
import http from '@/http/interceptors'
//echarts.js
import echarts from 'echarts'
Vue.config.productionTip = false
//使用iview
Vue.use(iview)
// vue-axios axios
Vue.use(vueAxios,axios)
//vuex
Vue.use(vuex)
Vue.prototype.$fn = fn
Vue.prototype.$Http = http
Vue.use(echarts)
console.log(echarts,8999)
console.log(Vue.prototype,777)
console.log(fn,666)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
