<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Edit Account</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">Edit Account</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>first Name</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.user.first_name" />
              </div>
              <div class="form-group">
                <label>last Name</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.user.last_name" />
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.user.username" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.user.email" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.address" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="form-control" type="text" value="" v-model="userUpdate.phone_number" />
              </div>
              <div class="col-md-12">
                <label>Roles</label>
                <input class="form-control" type="text" value="" v-model="roles" disabled />
              </div>

              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <br>
                <button type="button" name="example-email" class="btn btn-dark" @click="back">Back </button>
                <button type="button" name="example-email" class="btn btn-info" @click="handleEdit">Save </button>
                <router-link :to="`/change-password/${id}`"  tag="button" class="btn btn-success">Change Password</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";
import { toast } from 'bulma-toast'
import axios from "axios";
import { validateEmail, validatePhone } from "../../utils/checkValidation";
import router from "../../router";
export default {
  name: 'EditAccount',
  data() {
    return {
      userUpdate:{
        user:{
          username: "",
          last_name: "",
          first_name: "",
          email: "",
        },
        address: "",
        phone_number: "",
      },
      roles: localStorage.getItem("roleNames"),
      message:[],
      id: this.$route.params.id
    }
  },
  created() {
    this.getData()
  },
  methods: {
    back(){
      router.push('/myaccount')
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('staff/'+ id, token).then((response)=> {
        console.log(response.data.data)
        this.userUpdate = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },

    checkValid(){
      this.message = []
      if( !this.userUpdate.user.username ) {
        this.message.push('username Required')
      }else if (this.userUpdate.user.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.userUpdate.user.first_name ) {
        this.message.push('first_name Required')
      }else if(this.userUpdate.user.first_name.length <6){
        this.message.push('first_name min is 6 character')
      }
      if( !this.userUpdate.user.last_name ) {
        this.message.push('last_name Required')
      }else if(this.userUpdate.user.last_name.length <6){
        this.message.push('last_name min is 6 character')
      }
      if( !this.userUpdate.address ) {
        this.message.push('address Required')
      }
      if( !this.userUpdate.user.email ) {
        this.message.push('email Required')
      }else if(!validateEmail(this.userUpdate.user.email)){
        this.message.push('email is not valid')
      }

      if( !this.userUpdate.phone_number ) {
        this.message.push('phone_number Required')
      }else if(!validatePhone(this.userUpdate.phone_number)){
        this.message.push('phone_number is not valid')
      }
    },

    async handleEdit() {
      this.checkValid();
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let id = this.$route.params.id
      if(this.message.length<=0){
        let data= {
          username : this.userUpdate.user.username,
          last_name: this.userUpdate.user.last_name,
          first_name: this.userUpdate.user.first_name,
          address :this.userUpdate.address ,
          email: this.userUpdate.user.email,
          phone_number: this.userUpdate.phone_number ,
          status: true,
          roles :  this.roles
        }
        console.log(data)
        await axios.put('admin/staffs?id='+id, data , token).then((response)=> {
          console.log(response.data);
          toast({
            message: 'Edit Account successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          let data = {
            username: this.userUpdate.user.username,
            full_name: this.userUpdate.user.last_name + " " + this.userUpdate.user.first_name
          }
          this.$store.commit('change_account', data)
          router.push('/myaccount')
          location.reload()

        }).catch((error) =>{
          console.log(error.response.data);
        });
      }
    }
  },




}
</script>
<style lang="scss">
.error{
  color: red;
  text-align: center;
  font-weight: bold;

}


</style>
