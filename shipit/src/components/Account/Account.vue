<template>
  <v-container>
    <h2 class="display-2">Info Customer</h2>
    <form action="">
      <v-layout>
        <v-flex x6>
          <strong>Payment address</strong>
          <v-text-field label="Last Name" v-model="user.user.last_name" readonly></v-text-field>
          <v-text-field label="First Name" v-model="user.user.first_name" readonly></v-text-field>
          <v-text-field label="Address" v-model="user.address" readonly></v-text-field>
          <v-text-field label="Phone" v-model="user.phone_number" readonly></v-text-field>
          <v-text-field label="Username" v-model="user.user.username" readonly></v-text-field>
          <v-text-field label="E-mail" v-model="user.user.email" readonly></v-text-field>

        </v-flex>
      </v-layout>
      <v-btn color="success" lager style="float: left; margin: 20px " @click="back">
        Back
      </v-btn>
      <v-btn color="success" lager style="float: left; margin: 20px ">
        <router-link :to="`/edit-account/${user.id}`" tag="button">Edit</router-link>
      </v-btn>
      <v-btn color="success" lager style="float: left; margin: 20px ">
        <router-link :to="`/change-password/${user.id}`" tag="button">Change Password</router-link>
      </v-btn>
    </form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Account",
  created() {
    this.getData();
  },
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
      }
    }
  },
  methods:{
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      axios.get('customer/'+localStorage.getItem('id'), token).then((response)=> {
        console.log(response.data.data)
        this.user = response.data.data
      }).catch(() =>{
      })
    },
    back(){
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>

</style>
