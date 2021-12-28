<template>
  <CSidebar
      fixed
      :minimize="minimize"
      :show="show"
      @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
    </CSidebarBrand>

    <CRenderFunction v-if="role == 1" flat :content-to-render="$options.nav_admin"/>
    <CRenderFunction v-if="role == 0" flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
        class="d-md-down-none"
        @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
import nav_admin from './_nav-admin'
export default {
  name: 'Sidebar',
  nav,
  nav_admin,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  },
  data() {
    return {
      role : localStorage.getItem('roleNames') === 'admin' ? 1 : 0
    }
  }
}
</script>
