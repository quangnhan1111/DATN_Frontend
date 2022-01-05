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
        <div v-for="group in listGroup" :key="group.id">
          <div class="room-sidebar-groups" @click="change_room(group.groups_participated.id)">
            <div class="room-sidebar-groups-g-img">
              <img src="../../assets/images/admin.png" alt="Default Profile">
            </div>
            <div class="room-sidebar-groups-g-msg">
              <span class="room-sidebar-groups-g-msg1">{{group.groups_participated.name}}</span>
            </div>
          </div>
        </div>

        <!-- room side bar groups -->

      </div>

      <div id='room-message'>
        <div class="room-container__msg">
<!--          msg chat header-->
          <div class="msg-header mat-elevation-z6">
            <div class="h-avatar"><img src="../../assets/images/bun.jpg"></div>
            <div class="h-users">
              <div class="h-user-group">{{current_group}}</div>
              <div class="h-user-member">{{participants}}</div>
            </div>
            <div class="h-search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></div>
            <div class="h-attach"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></div>
            <div class="h-menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></div>
          </div>
<!--          msg chat header-->

          <!-- msg box  -->
          <div class="msg-box msg-box--background" >
            <div id="new-message-chat"></div>
            <div class="list-group list-group-flush border-bottom scrollarea">
              <div class="list-group-item list-group-item-action py-3 lh-tight"
                   v-for="message in messages" :key="message.id"
              >
                <div class="right-msg-container" v-if="message.username == username">
                  <div class="s-message">
                    <div class="s-msg">{{ message.message }}</div>
                    <div class="s-time">{{validateDateTime(Date.parse(message.created_at))}}-{{new Date().getFullYear()}}</div>
                  </div>
                  <div class="s-tail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" preserveAspectRatio="none" width="8" height="13"><path opacity=".5" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path><path fill="#dcf8c6ff" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"></path></svg></div>
                </div>
                <div class="left-msg-container" v-else>
                  <div class="r-tail"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".5" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="white" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></div>
                  <div class="r-message" >
                    <div class="r-user"><a href="#">{{ message.username }}</a></div>
                    <div class="r-msg">{{ message.message }}</div>
                    <div class="r-time">{{validateDateTime(Date.parse(message.created_at))}}-{{new Date().getFullYear()}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- msg box -->

          <!-- msg input -->
          <div class="msg-input" >
            <div class="emoji">
              <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" id="smiley" x="3147" y="3209"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489"/></svg>
            </div>
            <div class="type-a-message">
              <form @submit.prevent="submit">
                <input class="form-control" placeholder="Write a message" v-model="message" v-if="listGroup.length > 0"/>
                <input class="form-control" placeholder="Write a message" v-model="message" disabled v-else/>
              </form>
            </div>
            <div class="mic">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill-rule="evenodd" clip-rule="evenodd"  d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>
            </div>
          </div>
          <!--  msg input -->

        </div>
      </div>

<!--      <div  id='room-preview-img' style='display:none' >-->
<!--        <div class="room-container__preview-img" >-->
<!--          &lt;!&ndash; msg chat header &ndash;&gt;-->
<!--          <div class="msg-header mat-elevation-z6">-->
<!--            <div class="h-avatar"><img src="../../assets/images/bun.jpg"></div>-->
<!--            <div class="h-users">-->
<!--              <div class="h-user-group">{{}}</div>-->
<!--              <div class="h-user-member">{{}}</div>-->
<!--            </div>-->
<!--            <div class="h-search"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"></path></svg></div>-->
<!--            <div class="h-attach"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path></svg></div>-->
<!--            <div class="h-menu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg></div>-->
<!--          </div>-->
<!--          &lt;!&ndash; msg chat header &ndash;&gt;-->

<!--          <div id='room-preview-img-div' class="preview-img-box preview-img">-->

<!--            <div class="preview-img__header">-->
<!--              <div class="preview-img__header__close"><svg xmlns="http://www.w3.org/2000/svg" id="btnClosePreviewImg" viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="none" ><path fill="#b0ebe2ff" d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"></path></svg></div>-->
<!--              <div class="preview-img__header__label">Preview</div>-->
<!--            </div>-->

<!--            <div class="preview-img__snipped-big">-->
<!--              <div class='preview-img__snipped-big__border'><img id='snipped-big-img' ></div>-->
<!--            </div>-->

<!--            <div class="preview-img__caption">-->
<!--              <span class='preview-img__caption__add'><input id='add-caption-input' type="text" placeholder="Add a caption..."></span>-->
<!--              <span class='preview-img__caption__emoji'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" d="M9.5 1.7C4.8 1.7 1 5.5 1 10.2s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5zm0 15.9c-4.1 0-7.4-3.3-7.4-7.4s3.3-7.4 7.4-7.4 7.4 3.3 7.4 7.4-3.3 7.4-7.4 7.4z"></path><path fill="currentColor" d="M6.8 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4 0 .6.5 1 1.1 1.1zM13.9 11.6c-1.4.2-2.9.3-4.4.4-1.5 0-2.9-.1-4.4-.4-.2 0-.4.1-.4.3v.2c.9 1.8 2.7 2.9 4.7 3 2-.1 3.8-1.2 4.8-3 .1-.2 0-.4-.1-.5h-.2zm-4.1 2c-2.3 0-3.5-.8-3.7-1.4 2.3.4 4.6.4 6.9 0 0 .1-.4 1.4-3.2 1.4zM12.2 9.8c.7-.1 1.2-.7 1.1-1.4-.1-.6-.5-1.1-1.1-1.1-.7 0-1.2.7-1.1 1.4.1.6.5 1 1.1 1.1z"></path></svg></span>-->
<!--            </div>-->

<!--            <div class='preview-img__footer'>-->

<!--              <div class="preview-img__footer__img-small">-->
<!--                <img id='snipped-small-img'>-->
<!--              </div>-->

<!--              <div class="preview-img__footer__addfile">-->
<!--                <div class="preview-img__footer__addfile__img">-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" preserveAspectRatio="none"><path fill="#00A5F4" d="M20 13.5h-6.5V20h-2.9v-6.5H4v-2.9h6.5V4h2.9v6.5H20v3z"></path></svg>-->
<!--                </div>-->
<!--                <div class="preview-img__footer__addfile__label">-->
<!--                  ADD FILE-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="preview-img__footer__button">-->
<!--                <div class="preview-img__footer__button-arrow">-->
<!--                  <svg id='btnSendImg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" preserveAspectRatio="none" width="24" height="24"><path fill="white" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import axios from "axios";
import {toast} from "bulma-toast";
import {validateTime} from "../../utils/checkValidation";
export default {
  name: 'Contacts',
  components:{

  },
  data() {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      listGroup: [],
      all: {},
      username: localStorage.getItem('username'),
      messages: [],
      message: '',
      chat_room : 0,
      current_group : "",
      participants: ""
    }
  },
  async created() {
    await this.getData()
    await this.get_history(this.chat_room)
  },
  async mounted() {
    // await this.getData()
    Pusher.logToConsole = true;

    var pusher = new Pusher('2b83fbf50425328c4fc0', {
      cluster: 'ap1'
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {
      // console.log(data)
      this.messages.push(data);
    });
  },
  methods: {
    validateDateTime(date){
      return validateTime(date)
    },
    change_room(id_room){
      this.chat_room = id_room
      this.get_history(id_room)
      // eslint-disable-next-line no-unused-vars
      let room;
      for (let i in this.listGroup) {
        console.log(i)
        if (this.listGroup[i].groups_participated.id == id_room){
          console.log(this.listGroup[i])
          room = this.listGroup[i]
        }
      }
      this.current_group = room.groups_participated.name
      this.participants = room.groups_participated.users
    },
    submit () {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      console.log(this.username)
      let data = {
        'username': this.username,
        'message': this.message,
        'chat_room': this.chat_room
      }
      console.log(data)
      axios.post('/chat', data, token)
          .then(response => {
            console.log(response)
            toast({
              message: 'Sent Message successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'bottom-right',
            })
          })
          .catch(errors => {
            console.log(errors)
          })
      this.message = '';
    },

    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      axios
          .get('/room', token)
          .then(response => {
            console.log(response.data.data)
            this.all = response.data
            this.listGroup = this.all.data
            this.chat_room = this.listGroup[0].groups_participated.id
            this.current_group = this.listGroup[0].groups_participated.name
            this.participants = this.listGroup[0].groups_participated.users
            // console.log(this.chat_room)
          })
          .catch(error => {
            console.log(error)
          })
    },

    get_history(id_room){
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      axios
          .get('/history/'+id_room, token)
          .then(response => {
            // console.log(response.data.data)
            this.messages = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  }
}
</script>

<style>
.scrollarea {
  min-height: 500px;
}
</style>
