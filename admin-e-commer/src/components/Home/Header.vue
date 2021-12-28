<template>
  <CHeader fixed with-subheader light>
<!--    <CToggler-->
<!--        in-header-->
<!--        class="ml-3 d-lg-none"-->
<!--        @click="$store.commit('toggleSidebarMobile')"-->
<!--    />-->
<!--    <CToggler-->
<!--        in-header-->
<!--        class="ml-3 d-md-down-none"-->
<!--        @click="$store.commit('toggleSidebarDesktop')"-->
<!--    />-->
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo"/>
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">


    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownInvoice/>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownMessage/>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownNotifications/>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <span>{{show_full_name}}</span>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import TheHeaderDropdownNotifications from "./TheHeaderDropdownNotifications";
import TheHeaderDropdownMessage from "./TheHeaderDropdownMessage";
import TheHeaderDropdownInvoice from "./TheHeaderDropdownInvoice";

export default {
  name: 'Header',
  components: {
    TheHeaderDropdownInvoice,
    TheHeaderDropdownNotifications,
    TheHeaderDropdownAccnt,
    TheHeaderDropdownMessage
  },
  data() {
    return {
      full_name: ""
    }
  },
  mounted() {
    this.full_name = localStorage.getItem('full_name')
  },
  computed: {
    show_full_name() {
      return localStorage.getItem('full_name')
    },
  },
}
</script>
