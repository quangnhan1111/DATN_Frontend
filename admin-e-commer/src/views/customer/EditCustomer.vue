<template>
  <div class="wrapper">
    <div class="title">
      Edit Customer
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>last Name</label>
        <input type="text" class="input" v-model="user.user.last_name" />
      </div>
      <div class="inputfield">
        <label>first Name</label>
        <input type="text" class="input"  v-model="user.user.first_name" />
      </div>
      <div class="inputfield">
        <label>User Name</label>
        <input type="text" class="input"   v-model="user.user.username" />
      </div>
      <div class="inputfield">
        <label>Email</label>
        <input type="text" class="input"   v-model="user.user.email" />
      </div>
      <div class="inputfield">
        <label>Address</label>
        <input type="text" class="input"  v-model="user.address" />
      </div>
      <div class="inputfield">
        <label>Phone Number</label>
        <input type="text" class="input"  v-model="user.phone_number" />
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
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";

import axios from "axios";
import {toast} from "bulma-toast";
import { validateEmail, validatePhone } from "../../utils/checkValidation";
export default {
  name: 'EditCustomer',
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
        status: true
        // roles : "customer",
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
      this.$router.push('/customers')
    },
    checkValid(){
      this.message = []
      if( !this.user.user.username ) {
        this.message.push('username Required')
      }else if (this.user.user.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.user.user.first_name ) {
        this.message.push('first_name Required')
      }else if(this.user.user.first_name.length <6){
        this.message.push('first_name min is 6 character')
      }
      if( !this.user.user.last_name ) {
        this.message.push('last_name Required')
      }else if(this.user.user.last_name.length <6){
        this.message.push('last_name min is 6 character')
      }
      if( !this.user.address ) {
        this.message.push('address Required')
      }
      if( !this.user.user.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.user.user.email)){
        this.message.push('email is not valid')
      }

      if( !this.userUpdate.phone_number ) {
        this.message.push('phone_number Required')
      }else if(!validatePhone(this.userUpdate.phone_number)){
        this.message.push('phone_number is not valid')
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
      await axios.get('/customer/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
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
        let customer = {
          username: this.user.user.username,
          first_name: this.user.user.first_name,
          last_name: this.user.user.last_name,
          address: this.user.address,
          email: this.user.user.email,
          phone_number: this.user.phone_number,
          // roles : "customer",
          // password: "none@",
          status: this.user.status
        }
        console.log(customer)
        await axios.put('admin/customers?id=' + id, customer, token).then((response) => {
          console.log(response.data.data)
          this.$router.push('/customers')
          toast({
            message: 'Edit Customer successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
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
