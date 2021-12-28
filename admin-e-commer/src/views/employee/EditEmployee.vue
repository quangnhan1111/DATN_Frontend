<template>
  <div class="wrapper">
    <div class="title">
      Edit Employee
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>last Name</label>
        <input type="text" class="input" v-model="user.user.last_name">
      </div>

      <div class="inputfield">
        <label>first Name</label>
        <input type="text" class="input" v-model="user.user.first_name">
      </div>

      <div class="inputfield">
        <label>User Name</label>
        <input type="text" class="input" v-model="user.user.username">
      </div>

      <div class="inputfield">
        <label>Email</label>
        <input type="text" class="input" v-model="user.user.email">
      </div>
      <div class="inputfield">
        <label>Address</label>
        <input type="text" class="input" v-model="user.address">
      </div>
      <div class="inputfield">
        <label>Phone Number</label>
        <input type="text" class="input" v-model="user.phone_number">
      </div>
      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="user.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="back"/>
        <input type="submit" class="btn btn-primary" value="Edit"/>
      </div>
    </form>
  </div>
</template>
<script>
import {toast} from "bulma-toast";
import axios from "axios";
import {validateEmail, validatePhone} from "../../utils/checkValidation";

export default {
  name: 'EditEmployee',
  data() {
    return {
      user:{
        user:{
          username: "",
          password: "",
          last_name: "",
          first_name:"",
          email: ""
        },
        address: "",
        phone_number: "",
        roles : "staff,",
        status: true
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
    back() {
      this.$router.push('/employees')
    },
    checkValid(){
      this.message = []
      if( !this.user.user.first_name ) {
        this.message.push('first_name Required')
      }else if (this.user.user.first_name.length <6){
        this.message.push('first_name min is 6 character')
      }
      if( !this.user.user.last_name ) {
        this.message.push('last_name Required')
      }else if (this.user.user.last_name.length <6){
        this.message.push('last_name min is 6 character')
      }
      if( !this.user.user.username ) {
        this.message.push('username Required')
      }else if(this.user.user.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.user.address ) {
        this.message.push('address Required')
      }
      if( !this.user.user.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.user.user.email)){
        this.message.push('email is not valid')
      }

      if( !this.user.phone_number ) {
        this.message.push('phone_number Required')
      }else if(!validatePhone(this.user.phone_number)){
        this.message.push('phone_number is not valid')
      }
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('/staff/' + id, token).then((response)=> {
        console.log(response.data)
        this.user = {
          user:{
            username: response.data.data.user.username,
            // password: "none@",
            last_name: response.data.data.user.last_name,
            first_name:response.data.data.user.first_name,
            email: response.data.data.user.email
          },
          address: response.data.data.address,
          phone_number: response.data.data.phone_number,
          roles : "staff,",
          status: response.data.data.status
        }
        console.log(this.user)
      }).catch((error) =>{ console.log(error)
      });
    },


    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        let employee = {
          username: this.user.user.username,
          first_name: this.user.user.first_name,
          last_name: this.user.user.last_name,
          address: this.user.address,
          email: this.user.user.email,
          phone_number: this.user.phone_number,
          roles : "staff,",
          status: this.user.status
          // password: "none@"
        }
        await axios.put('admin/staffs?id=' + id, employee, token).then((response) => {
          console.log(response.data)
          toast({
            message: 'Edit Employee successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/employees')
          // success('Edit Success Category');

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
</style>
