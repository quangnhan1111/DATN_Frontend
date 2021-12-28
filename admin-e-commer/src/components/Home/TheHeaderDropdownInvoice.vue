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
          <i class="fas fa-file-invoice-dollar"></i>
          <p style="color: red">{{ quantity }}</p>
        </div>
      </CHeaderNavLink>
    </template>
  </CDropdown>
</template>

<script>
import {mapMutations} from "vuex";
import axios from "axios";


export default {
  name: 'TheHeaderDropdownInvoice',
  data() {
    return {
      quantity: 0
    }
  },
  computed: {
    ...mapMutations(['LogoutDispatch'])
  },
  async created() {
    await axios
        .get('/invoice_notify')
        .then(response => {
          console.log(response.data)
          this.quantity = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    console.log("Starting connection to WebSocket Server")
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/invoice/")
    console.log(socket)
    socket.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      this.quantity = event.data
    }
  },
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
