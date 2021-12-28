import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vmodal from 'vue-js-modal';
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
import 'mdb-vue-ui-kit/css/mdb.min.css';
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:9090/api/v1/'http://quangnhan.herokuapp.com/api/v1/
// axios.defaults.baseURL = 'https://fierce-earth-88708.herokuapp.com/api/v1/'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1/'
Vue.use(vmodal, { dialog: true });
Vue.use(CoreuiVue)
new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
