<template>
  <div class="wrapper">
    <div class="title">
      Add Customer
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleAdd">
      <div class="inputfield">
        <label>Last Name</label>
        <input type="text" class="input" v-model="user.last_name">
      </div>
      <div class="inputfield">
        <label>First Name</label>
        <input type="text" class="input" v-model="user.first_name">
      </div>
      <div class="inputfield">
        <label>User Name</label>
        <input type="text" class="input" v-model="user.username">
      </div>
      <div class="inputfield">
        <label>Email</label>
        <input type="text" class="input" v-model="user.email">
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
        <label>Password</label>
        <input type="password" class="input" v-model="user.password">
      </div>
      <div class="inputfield">
        <label>Retype Password</label>
        <input type="password" class="input" v-model="user.password_confirmation">
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
import {validateEmail, validatePhone} from "../../utils/checkValidation";
import router from "../../router";

export default {
  name: 'AddCustomer',
  data() {
    return {
      user:{
        address: "",
        last_name: "",
        first_name: "",
        username: "",
        password: "",
        email: "",
        phone_number: "",
        // roles: "customer",
        password_confirmation: ""
      },
      message:[]
    }
  },
  created() {

  },
  methods: {
    cancel(){
      router.push('/customers')
    },
    checkValid(){
      this.message = []
      if( !this.user.username ) {
        this.message.push('username Required')
      }else if (this.user.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.user.last_name ) {
        this.message.push('last_name Required')
      }else if(this.user.last_name.length <6){
        this.message.push('last_name min is 6 character')
      }
      if( !this.user.first_name ) {
        this.message.push('first_name Required')
      }else if(this.user.last_name.length <6){
        this.message.push('first_name min is 6 character')
      }
      if( !this.user.address ) {
        this.message.push('address Required')
      }


      if( !this.user.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.user.email)){
        this.message.push('email is not valid')
      }

      if( !this.user.phone_number ) {
        this.message.push('phone_number Required')
      }else if(!validatePhone(this.user.phone_number)){
        this.message.push('phone_number is not valid')
      }

      if( this.user.password === "" || this.user.password_confirmation === "" ) {
        this.message.push("You need to enter your password");
      }else if(this.user.password !== this.user.password_confirmation){
        this.message.push("Retype password is not correct");
      }

      if(this.user.password.length > 0) {
        // const upper_case = /(?=.*?[A-Z])/
        const lower_case = /(?=.*?[a-z])/
        const one_digit = /(?=.*?[0-9])/
        const one_special_character = /(?=.*?[#?!@$%^&*-])/
        const Minimum_eight = /.{8,}/
        // if (!upper_case.test(String(password))) {
        //   error += 'password have at least one upper case English letter.\n'
        //   flag = false
        // }
        if (!lower_case.test(String(this.user.password))) {
          this.message.push("password have at least one lower case English letter.");
        }
        if (!one_digit.test(String(this.user.password))) {
          this.message.push("password have at least one digit.");
        }
        if (!one_special_character.test(String(this.user.password))) {
          this.message.push("password have At least one special character.");
        }
        if (!Minimum_eight.test(String(this.user.password))) {
          this.message.push("password have minimum eight in length.");
        }
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        console.log(this.user);
        await axios.post("admin/customers", this.user , token).then((response)=> {
          console.log(response.data)
          toast({
            message: 'Add Customer successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/customers')
        }).catch((error) =>{
          alert(error.response.data.message);
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
