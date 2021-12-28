<template>
  <div class="page-wrapper">
    <div class="main-container">
      <div class="room-sidebar">
        <!-- room side bar header-->
        <div class="room-sidebar-header">
          <div class="sb-avatar">
            <img src="../../assets/images/bun.jpg" alt="Default Profile">
          </div>
          <div class="sb-status">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path  d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
          </div>
          <div class="sb-new-chat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path></svg>
          </div>
          <div class="sb-menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
          </div>
        </div>
        <!-- room side bar header-->

        <!-- room side bar get notified -->
        <div class="room-sidebar-get-notified">
          <div class="room-sidebar-get-notified-alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><path fill="white" d="M24.154 2C11.919 2 2 11.924 2 24.165S11.919 46.33 24.154 46.33s22.154-9.924 22.154-22.165S36.389 2 24.154 2zm-.744 15.428v-.618c0-.706.618-1.324 1.324-1.324s1.323.618 1.323 1.324v.618c2.559.618 4.412 2.823 4.412 5.559v3.176l-8.294-8.294a5.056 5.056 0 0 1 1.235-.441zm1.323 15.706a1.77 1.77 0 0 1-1.765-1.765h3.529a1.768 1.768 0 0 1-1.764 1.765zm7.236-.883l-1.765-1.765H17.233v-.882l1.765-1.765v-4.853a5.56 5.56 0 0 1 .794-2.912l-2.559-2.559 1.147-1.147 14.735 14.736-1.146 1.147z"></path></svg>
          </div>
          <div class="room-sidebar-get-notified-msg">
            <span class="room-sidebar-get-notified-msg1">Get notified of  new messages</span>
            <span class="room-sidebar-get-notified-msg2"><a href="javascript:void(0);alert('Coming Soon!')">Turn on desktop notifications</a>
                            <span class="room-sidebar-get-notified-arrow">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12"><path fill="currentColor" d="M2.173 1l4.584 4.725-4.615 4.615-1.103-1.103 3.512-3.512L1 2.173 2.173 1z"></path></svg>
                            </span>
                        </span>
          </div>
        </div>
        <!-- room side bar get notified -->

        <!-- room side bar search or new chat -->
        <div class="room-sidebar-search-new-chat">
          <div class="room-sidebar-search-new-chat2">
            <div class="room-sidebar-search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path></svg>
            </div>
            <div class="room-sidebar-new-chat">
              <input type="text" placeholder="Search or start new chat"><br>
            </div>
          </div>
        </div>
        <!-- room side bar search or new chat -->

        <!-- room side bar groups -->
        <div v-for="(thread, index) in Threads" :key="thread.id">
          <div class="room-sidebar-groups" >
            <li :class="index == 0 ? active : contact-li" chat-id="`chat_${thread.id}`" style="cursor: pointer" >
              <div class="d-flex bd-highlight">
                <div class="img_cont">
                  <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">
                  <span class="online_icon"></span>
                </div>
                <div class="user_info">
                  <div v-if="thread.first_person__username == username">
                    <span>{{ thread.second_person__username }}</span>
                    <p>{{ thread.second_person__username}}</p>
                  </div>
                  <div v-else>
                    <span>{{ thread.first_person__username }}</span>
                    <p>{{ thread.first_person__username }}</p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>

        <!-- room side bar groups -->

      </div>

      <div id='room-message'>
        <div class="room-container__msg">
          <!-- msg chat header -->
          <div class="msg-header mat-elevation-z6">
            <div class="h-avatar"><img src="../../assets/images/bun.jpg"></div>
            <div class="h-users">
              <div class="h-user-group">group_name</div>
              <div class="h-user-member">participants</div>
            </div>
            <div class="h-search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></div>
            <div class="h-attach"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></div>
            <div class="h-menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></div>
          </div>
          <!-- msg chat header -->

          <!-- msg box  -->
          <div class="msg-box msg-box--background" ref="msg_card_body">
            <!------- messages ------->
            <div v-for="chat in thread_chatmessage_thread" :key="chat.id">
              <div class="d-flex mb-4 replied" v-if="chat.user == user">
                <div class="msg_cotainer_send">
                  {{  }}
                  <span class="msg_time_send">{{  }}, {{  }}</span>
                </div>
                <div class="img_cont_msg">
                  <img src="" class="rounded-circle user_img_msg">
                </div>
              </div>
              <div class="d-flex mb-4 received" v-else>
                <div class="img_cont_msg">
                  <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
                </div>
                <div class="msg_cotainer">
                  {{  }}
                  <span class="msg_time">{{  }}, {{  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- msg box -->

          <!-- msg input -->
          <div class="msg-input">
            <div class="emoji">
              <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" id="smiley" x="3147" y="3209"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489"/></svg>
            </div>
            <div class="type-a-message">
              <form ref="send-message-form">
                <input ref="input-message" type="text" placeholder="Type a message"><br>
                <button class="btn btn-secondary" type="submit">
                                                <span class="input-group-text send_btn">
                                                    <i class="fas fa-location-arrow"></i>
                                                </span>
                </button>
              </form>
            </div>
            <div class="mic">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill-rule="evenodd" clip-rule="evenodd"  d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>
            </div>
          </div>
          <!--  msg input -->

        </div>
      </div>



    </div>
  </div>
</template>
<script>
import axios from "axios";
// import {trim} from "core-js/internals/string-trim";

export default {
  name: "Contacts",
  components: {
  },
  data() {
    return {
      username: localStorage.getItem('username'),
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      Threads: [],
      all: {},
      input_message: this.$refs["input-message"],
      message_body: this.$refs.msg_card_body,
      sendform : this.$refs["send-message-form"]
    };
  },
  async created() {
    // await this.getData()
    const socket = new WebSocket(
        `ws://${window.location.host}/ws/chat/`
    );
    console.log(socket)
    socket.onopen =  function(e){
      console.log('open', e)
      this.$refs["send-message-form"].$on('submit', function (e){
        e.preventDefault()
        // let message = this.$refs["input-message"].values()
        // let send_to = this.get_active_other_user_id()
        // let thread_id = this.get_active_thread_id()
        //
        // let data = {
        //   'message': message,
        //   'sent_by': localStorage.getItem('Id'),
        //   'send_to': send_to,
        //   'thread_id': thread_id
        // }
        // data = JSON.stringify(data)
        // socket.send(data)
        // $(this)[0].reset()
      })
    }

    socket.onmessage = (event)=> {
      console.log("got to onmessage", event);
    }

    socket.onerror = function(e){
      console.log(e)
    }

    socket.onclose = function(e){
      console.log(e)
    }
    this.connect()
  },

  methods: {
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      await axios
          .get('chat', token)
          .then(response => {
            // console.log(response.data.data)
            this.all = response.data
            this.Threads = this.all.data.Threads
            // console.log(this.Threads)
          })
          .catch(error => {
            console.log(error)
          })
    },
    connect(){

      const socket = new WebSocket(
          `ws://${window.location.host}/ws/chat-group/`
      );

      socket.onopen = async function(e){
        console.log('open', e)
        this.$refs["send-message-form"].$on('submit', function (e){
          e.preventDefault()
          let message = this.$refs["input-message"].values()
          let send_to = this.get_active_other_user_id()
          let thread_id = this.get_active_thread_id()

          let data = {
            'message': message,
            'sent_by': localStorage.getItem('Id'),
            'send_to': send_to,
            'thread_id': thread_id
          }
          data = JSON.stringify(data)
          socket.send(data)
          // $(this)[0].reset()
        })
      }


      socket.onmessage = async function(e){
        console.log('message', e)
        let data = JSON.parse(e.data)
        let message = data['message']
        let sent_by_id = data['sent_by']
        let thread_id = data['thread_id']
        this.newMessage(message, sent_by_id, thread_id)
      }

      socket.onerror = async function(e){
        console.log('error', e)
      }

      socket.onclose = async function(e){
        console.log('close', e)
      }

    },
    // get_active_other_user_id(){
    //   let other_user_id = $('.messages-wrapper.is_active').attr('other-user-id')
    //   other_user_id = $.trim(other_user_id)
    //   return other_user_id
    // },
    // get_active_thread_id(){
    //   let chat_id = $('.messages-wrapper.is_active').attr('chat-id')
    //   let thread_id = chat_id.replace('chat_', '')
    //   return thread_id
    // },
    // eslint-disable-next-line no-unused-vars
    newMessage(message, sent_by_id, thread_id) {
      //   if (trim(message) === '') {
      //     return false;
      //   }
      //   let message_element;
      //   let chat_id = 'chat_' + thread_id
      //   if(sent_by_id == localStorage.getItem('Id')){
      //     message_element = `
      // 	<div class="d-flex mb-4 replied">
      // 		<div class="msg_cotainer_send">
      // 			${message}
      // 			<span class="msg_time_send">8:55 AM, Today</span>
      // 		</div>
      // 		<div class="img_cont_msg">
      // 			<img src="" class="rounded-circle user_img_msg">
      // 		</div>
      // 	</div>
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      //   `
      //   }
      //   else{
      //     message_element = `
      //        <div class="d-flex mb-4 received">
      //           <div class="img_cont_msg">
      //              <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
      //           </div>
      //           <div class="msg_cotainer">
      //              ${message}
      //           <span class="msg_time">8:40 AM, Today</span>
      //           </div>
      //        </div>
      //     `
      //
      //   }

      // let message_body = $('.messages-wrapper[chat-id="' + chat_id + '"] .msg_card_body')
      // message_body.append($(message_element))
      // message_body.animate({
      //   scrollTop: $(document).height()
      // }, 100);
      // this.$refs["input-message"].val(null);
    }


  },
};
</script>
