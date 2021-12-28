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
          <i class="fas fa-bell"></i>
          <p style="color: red">{{ quantity_notify }}</p>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Notifications</strong>
    </CDropdownHeader>

    <div class="ScrollStyle" style="height: 400px">
      <div v-for="item in notifications" :key="item.id">
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong style="font-size:80%">{{item.notification}}</strong>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="mark(item.id)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>

    <div tag="div" class="text-center" color="light">
      <button type="button"  @click="clear" style="width: 100%;">
        clear all
      </button>
    </div>


<!--    <CDropdownItem >-->
<!--      <div v-for="item in notifications" :key="item.id">-->
<!--        <span>{{item.current_notification}}</span>-->
<!--      </div>-->
<!--    </CDropdownItem>-->
  </CDropdown>
</template>

<script>
import {mapMutations} from "vuex";
import axios from "axios";


export default {
  name: 'TheHeaderDropdownNotifications',
  data() {
    return {
      notifications: null,
      quantity_notify:0
    }
  },
  computed: {
    ...mapMutations(['LogoutDispatch'])
  },
  async created() {
    await axios
        .get('/notifications')
        .then(response => {
          console.log(response.data)
          this.notifications = response.data.data
          this.quantity_notify = this.notifications.length
        })
        .catch(error => {
          console.log(error)
        })
    console.log("Starting connection to WebSocket Server")
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/notification/")
    console.log(socket)
    socket.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    socket.onmessage = (event) => {
      this.notifications.push(JSON.parse(event.data));
      console.log(this.notifications)
      this.quantity_notify++
    }
  },
  methods: {
    clear(){
      this.notifications = []
      this.quantity_notify = 0
      axios
          .get('/clear-all-notifications')
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    mark(id) {
      this.notifications = this.notifications.filter((item) => item.id!==id)
      this.quantity_notify--
      axios
          .get('/mark/'+id)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
