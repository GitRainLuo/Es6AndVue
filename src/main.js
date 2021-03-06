// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//iview
import ViewUi from 'view-design'
// iview css
import 'view-design/dist/styles/iview.css'
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
//使用自定义指令
import * as validate from '@/utils/inputValidate'
console.log(validate,"directive")
//store
import store from '@/store/store'
//国际化 引入i18n
import i18n from '@/language'

//引入vue-video-player
import VideoPlayer from 'vue-video-player'

import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
//import 'vue-video-player/src/customer-theme.css'
Vue.config.productionTip = false
//使用iview 设置iview全局配置
Vue.use(ViewUi,{
  capture:false,
  size:"large",
  select: {
    arrow: 'md-arrow-dropdown',
    arrowSize: 20
  }
})
// vue-axios axios
Vue.use(vueAxios,axios)
//vuex
Vue.use(vuex)
Vue.prototype.$fn = fn
Vue.prototype.$Http = http
Vue.use(echarts)
Vue.use(VideoPlayer)
console.log(echarts,8999)
console.log(Vue.prototype,777)
console.log(fn,666)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
