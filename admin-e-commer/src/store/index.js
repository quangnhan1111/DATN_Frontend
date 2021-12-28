import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarShow: 'responsive',
    sidebarMinimize: false,
    id: '',
    username: '',
    full_name: '',
    role_name: '',
    isLogin: false
  },
  mutations: {
    toggleSidebarDesktop (state) {
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
      state[variable] = value
    },
    LoginDispatch (state) {
      state.id = localStorage.getItem('id')
      state.username = localStorage.getItem('username')
      state.full_name = localStorage.getItem('full_name')
      state.role_name = localStorage.getItem('role_name')
      state.isLogin = true
      if (localStorage.getItem('role_name') === 'admin') {
        router.push('/')
      } else {
        router.push('/')
      }
    },

    LogoutDispatch (state) {
      state.id = ''
      state.username = ''
      state.full_name = ''
      state.role_name = ''
      state.isLogin = false
      localStorage.removeItem('id')
      localStorage.removeItem('username')
      localStorage.removeItem('full_name')
      localStorage.removeItem('token')
      localStorage.removeItem('role_name')
      localStorage.removeItem('user')
      router.push('/login')
    },
    change_account(state, data) {
      state.username = data.username;
      state.full_name = data.full_name;
      localStorage.setItem("username", state.username);
      localStorage.setItem("full_name", state.full_name);
      console.log(state.full_name)
    },

    checklogin (state) {
      state.id = localStorage.getItem('id')
      state.username = localStorage.getItem('username')
      state.full_name = localStorage.getItem('full_name')
      state.role_name = localStorage.getItem('role_name')
      if (localStorage.getItem('token') === null) {
        state.isLogin = false
      } else {
        state.isLogin = true
      }
    }

  },
  actions: {
  },
  modules: {
  }
})
