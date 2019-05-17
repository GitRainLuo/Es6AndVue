// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//iview
import iview from 'iview'
//axios  vue-axios
import axios from 'axios'
import vueAxios from 'vue-axios'
//vuex
import vuex from 'vuex'

Vue.config.productionTip = false


Vue.use(iview)
Vue.use(vueAxios,axios)
Vue.use(vuex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
