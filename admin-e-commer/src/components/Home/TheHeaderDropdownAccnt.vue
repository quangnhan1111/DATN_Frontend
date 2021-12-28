<template>
  <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
  >

    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
              src="../../assets/images/bun.jpg"
              class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
<!--    <CDropdownHeader tag="div" class="text-center" color="light">-->
<!--      <strong>Account</strong>-->
<!--    </CDropdownHeader>-->



<!--    <CDropdownItem>-->
<!--      <CIcon name="cil-bell"/> Updates-->
<!--      <CBadge color="info" class="mfs-auto">{{ itemsCount }}</CBadge>-->
<!--    </CDropdownItem>-->
<!--    <CDropdownItem>-->
<!--      <CIcon name="cil-envelope-open" /> Messages-->
<!--      <CBadge color="success" class="mfs-auto">{{ itemsCount }}</CBadge>-->
<!--    </CDropdownItem>-->
<!--    <CDropdownItem>-->
<!--      <CIcon name="cil-task" /> Tasks-->
<!--      <CBadge color="danger" class="mfs-auto">{{ itemsCount }}</CBadge>-->
<!--    </CDropdownItem>-->
<!--    <CDropdownItem>-->
<!--      <CIcon name="cil-comment-square" /> Comments-->
<!--      <CBadge color="warning" class="mfs-auto">{{ itemsCount }}</CBadge>-->
<!--    </CDropdownItem>-->
    <CDropdownHeader
        tag="div"
        class="text-center"
        color="light"
    >
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <router-link to="/myaccount" >
        <CIcon name="cil-user"></CIcon>Profile
      </router-link>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>

    <CDropdownDivider/>
<!--    <CDropdownItem>-->
<!--      <CIcon name="cil-shield-alt" /> Lock Account-->
<!--    </CDropdownItem>-->
    <CDropdownItem >
      <button
          @click="handleLogout"
      ><CIcon name="cil-lock-locked" /> Logout</button>
    </CDropdownItem>

  </CDropdown>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: 'TheHeaderDropdownAccnt',
  computed: {
    ...mapMutations(['LogoutDispatch'])
  },
  // data() {
  //   return {
  //     logout: () => this.handleLogout()
  //   }
  // },
  methods: {
    handleLogout() {
      this.$store.commit('LogoutDispatch')
    }
  }
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
