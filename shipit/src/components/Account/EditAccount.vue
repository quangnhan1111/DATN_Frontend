<template>
  <v-container>
    <h2 class="display-2">Info Customer</h2>
    <v-form @submit.prevent="handleEdit" v-model="valid">
      <v-layout>
        <v-flex x6>
          <strong>Payment address</strong>
          <v-text-field label="Last Name" v-model="user.user.last_name"
                        :rules="[required('Last Name'),
                         minLength('Last Name', 6),
                         maxLength('Last Name', 50)]"
          ></v-text-field>
          <v-text-field label="First Name" v-model="user.user.first_name"
                        :rules="[required('First Name'),
                        minLength('First Name', 6),
                        maxLength('First Name', 50)]"
          ></v-text-field>
          <v-text-field label="Address" v-model="user.address"
                        :rules="[required('Address'),
                        minLength('Address', 6),
                        maxLength('Address', 50)]"

          ></v-text-field>
          <v-text-field label="Phone" v-model="user.phone_number"
                        :rules="[required('Phone'),
                             phoneRule(user.phone_number)]"
          ></v-text-field>
          <v-text-field label="Username" v-model="user.user.username"
                        :rules="[required('Username'),
                            minLength('Username', 6),
                            maxLength('Username', 50)]"
          ></v-text-field>
          <v-text-field label="E-mail" v-model="user.user.email"
                        :rules="[required('Email'),
                            email(user.user.email)]"
          ></v-text-field>

        </v-flex>
      </v-layout>
      <v-btn color="success" lager style="float: left; margin: 20px " @click="back">
        Back
      </v-btn>
      <v-btn color="success" lager style="float: left; margin: 20px " type="submit" :disabled="!valid">
        SAVE
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import validateEmail from "../../utils/checkValidation";
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "EditAccount",
  data() {
    return {
      user:{
        id:"",
        user: {
          username:"",
          email:"",
          last_name:"",
          first_name:"",
        },
        phone_number: "",
        address:"",
        created: ""
      },
      valid: false,
      required(propertyType) {
        return v => v && v.length > 0 || `You must input a ${propertyType}`
      },
      minLength(propertyType, minLength) {
        return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
      },
      maxLength(propertyType, maxLength) {
        return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
      },
      email: propertyType => {
        if(propertyType.length > 0) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(propertyType).toLowerCase()) || 'Invalid e-mail.';
        }
        else{
          return false
        }
      },
      phoneRule: propertyType => {
        if(propertyType.length > 0) {
          const pattern=/^\+?84?\d{9,15}$/
          return pattern.test(propertyType) || 'Invalid phone number.';
        }
        else{
          return false
        }
      },
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
       axios.get('customer/'+id, token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
      }).catch(() =>{
      })
    },

    back(){
      this.$router.push({ path: '/account' })
    },
    handleEdit() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let id = this.$route.params.id
      let data = {
        username: this.user.user.username,
        email: this.user.user.email,
        last_name: this.user.user.last_name,
        first_name: this.user.user.first_name,
        phone_number: this.user.phone_number,
        address: this.user.address,
        status: true
      }
      // console.log(data)
      axios.put("admin/customers?id="+id, data , token).then((response)=> {
        console.log(response.data.message);
        localStorage.setItem("username", this.user.user.username);
        localStorage.setItem("full_name", this.user.user.last_name + this.user.user.last_name);
        this.$store.state.Username = localStorage.getItem('username');
        this.$store.state.full_name = localStorage.getItem('full_name');
        toast({
          message: 'Edit successfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'top-right',
        })
        this.$router.push({ path: '/account' })
        location.reload()
      }).catch((error) =>{
        console.log(error.response.data);
      });
    }
  }
}
</script>

<style lang="css">
.error {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
