// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App'
import router from './router'
import store from './store'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  vuetify,
  components: { App },
  template: '<App/>'
})
