<template>
  <div class="wrapper">
    <div class="title">
      Add Chat Room
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleAdd">
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="chat_room.name">
      </div>
      <div class="inputfield">
        <form >
          <label for>Choose a user:</label>
          <select multiple  v-model="chat_room.user_id">
            <option v-for="element in listProfile" :key="element.id" :value="element.value"
            >{{element.text}}</option>
          </select>
          <br><br>
        </form>

      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Save" >
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import {toast} from "bulma-toast";
import router from "../../router";


export default {
  name: 'AddChatRoom',
  components: {

  },
  data() {
    return {
      chat_room:{
        id: 0,
        name: "",
        created_at: "",
        updated_at: "",
        user_id: [],
      },
      listProfile:[],
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getSelectValue(value, text) {
      console.log(value);
      console.log(text);
    },
    async getData () {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // checklogin();
      await axios.get('admin/staff/get-all', token).then((response) => {
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value: response.data.data[i].user_id,
            text: "username: "+response.data.data[i].username+", email: "+response.data.data[i].email,
          }
          this.listProfile.push(data)
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    cancel(){
      router.push('/chatroom')
    },
    checkValid(){
      this.message = []
      if( !this.chat_room.name ) {
        this.message.push('Name chat_room Required')
      }
      else if(this.chat_room.name.length <3){
        this.message.push('Name Chat Room min is 3 character')
      }
      if( !this.chat_room.user_id ) {
        this.message.push('user_id chat_room Required')
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        let data = {
          "name": this.chat_room.name,
          "user_id": this.chat_room.user_id
        }
        let token = {
          headers: {
            'Authorization': `token ${localStorage.getItem("token")}`
          },
        }
        console.log(data);
        await axios.post("chat-rooms", data , token).then((response)=> {
          console.log(response.data);
          toast({
            message: 'Add Chat Room successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'bottom-right',
          })
          this.$router.push('/chatroom')
          // success('Successfully added customer');
        }).catch((error) =>{
          console.log(error.response);
        });
      }
    }
  }


}
</script>
<style lang="scss">
.error{
  color: red;
  text-align: center;
  font-weight: bold;

}


@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
.wrapper{
  max-width: 1280px;

  background: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.125);
  padding: 30px;
}

.wrapper .title{
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: crimson;
  text-transform: uppercase;
  text-align: center;
}

.wrapper .form{
  width: 100%;
}

.wrapper .form .inputfield{
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.wrapper .form .inputfield label{
  width: 200px;
  color: #757575;
  margin-right: 10px;
  font-size: 14px;
}

.wrapper .form .inputfield .input ,
.wrapper .form .inputfield .textarea
.wrapper .form .inputfield .form{
  width: 100%;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.wrapper .form .inputfield .textarea{
  width: 100%;
  height: 125px;
  resize: none;
}

.wrapper .form .inputfield .btn{
  width: 100px;
  padding: 8px 10px;
  font-size: 15px;
  border: 0px;
  background:  #fec107;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .inputfield .btn:hover{
  background: #ffd658;
}

.wrapper .form .inputfield:last-child{
  margin-bottom: 0;
}

@media (max-width:420px) {
  .wrapper .form .inputfield{
    flex-direction: column;
    align-items: flex-start;
  }
  .wrapper .form .inputfield label{
    margin-bottom: 5px;
  }
  .wrapper .form .inputfield.terms{
    flex-direction: row;
  }
}
</style>

