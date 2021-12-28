<template>
  <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
  >

    <template #toggler>
      <div class="c-avatar" style="cursor: pointer;">
        <i class="far fa-comment-alt"></i>
        <p style="color: red">{{ quantity_message }}</p>
      </div>
    </template>
    <div class="text-center">
      <strong>Message</strong>
    </div>

    <div class="ScrollStyle" style="height: 400px">
      <div v-for="item in messages" :key="item.id">
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

  </CDropdown>
</template>

<script>
import {mapMutations} from "vuex";
import axios from "axios";


export default {
  name: 'TheHeaderDropdownMessage',
  data() {
    return {
      messages: null,
      quantity_message:0
    }
  },
  computed: {
    ...mapMutations(['LogoutDispatch'])
  },
  async created() {
    await axios
        .get('/message')
        .then(response => {
          console.log(response.data)
          this.messages = response.data.data
          this.quantity_message = this.messages.length
        })
        .catch(error => {
          console.log(error)
        })
    console.log("Starting connection to WebSocket Server")
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/message/")
    console.log(socket)
    socket.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }
    socket.onmessage = (event) => {
      this.messages.push(JSON.parse(event.data));
      this.quantity_message++
    }
  },
  methods: {
    clear(){
      this.messages = []
      this.quantity_message = 0
      axios
          .get('/clear-all-messages')
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    mark(id) {
      this.messages = this.messages.filter((item) => item.id!==id)
      this.quantity_message--
      axios
          .get('/mark_message/'+id)
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
