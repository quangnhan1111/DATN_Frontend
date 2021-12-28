<template>
  <div class="wrapper">
    <div class="title">
      Edit Color
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>Id</label>
        <input type="text" class="input" v-model="color.id" disabled>
      </div>
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="color.name">
      </div>
      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="color.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Edit"/>
      </div>
    </form>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import { toast } from 'bulma-toast'
import router from "../../router";
// import paginate from "../../utils/helper";

export default {
  name: 'EditColor',
  data() {
    return {
      color:{
        id:"",
        name:"",
        status: ""
      },
      Status:[
        { value: true, text: 'Active' },
        { value: false, text: 'Un-Active' },
      ],
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    cancel(){
      router.push('/colors')
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('color/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.color = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },
    checkValid() {
      this.message = []
      if( !this.color.name ) {
        this.message.push('Name Color Required')
      }else if(this.color.name.length <3){
        this.message.push('Name Color min is 3 character')
      }
    },

    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.color.name,
          "status": this.color.status
        }
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        await axios.put('colors/?id=' + id, data, token).then((response) => {
          console.log(response.data)
          toast({
            message: 'Edit Color successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/colors')
          // success('Edit Success color');

        }).catch((error) => {
          console.log(error)
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

.wrapper .form .inputfield .input,
.wrapper .form .inputfield .textarea{
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
