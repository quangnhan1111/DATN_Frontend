<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Change Password</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">Change Account</h4>
            <form class="form-horizontal m-t-30">
              <div class="col-md-12">
                <label>Password</label>
                <input class="form-control" type="password" value="" v-model="password" />
              </div>
              <div class="col-md-12">
                <label>Retype Password</label>
                <input class="form-control" type="password" value="" v-model="password_confirmation" />
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { toast } from 'bulma-toast'
import axios from "axios";
import router from "../../router";
export default {
  name: 'ChangePassword',
  data() {
    return {
      password: "",
      password_confirmation:"",
      roles: localStorage.getItem("roleNames"),
      message:[]
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
      await axios.get('staff/'+localStorage.getItem('id'), token).then((response)=> {
        console.log(response.data.data)
        this.userUpdate = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },

    checkValid(){
      this.message = []
      if( this.password === "" || this.password_confirmation === "" ) {
        this.message.push("You need to enter your password");
      }else if(this.password !== this.password_confirmation){
        this.message.push("Retype password is not correct");
      }

      if(this.password.length > 0) {
        // const upper_case = /(?=.*?[A-Z])/
        const lower_case = /(?=.*?[a-z])/
        const one_digit = /(?=.*?[0-9])/
        const one_special_character = /(?=.*?[#?!@$%^&*-])/
        const Minimum_eight = /.{8,}/
        // if (!upper_case.test(String(password))) {
        //   error += 'password have at least one upper case English letter.\n'
        //   flag = false
        // }
        if (!lower_case.test(String(this.password))) {
          this.message.push("password have at least one lower case English letter.");
        }
        if (!one_digit.test(String(this.password))) {
          this.message.push("password have at least one digit.");
        }
        if (!one_special_character.test(String(this.password))) {
          this.message.push("password have At least one special character.");
        }
        if (!Minimum_eight.test(String(this.password))) {
          this.message.push("password have minimum eight in length.");
        }
      }
    },

    async handleEdit() {
      this.checkValid();
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // let id = this.$route.params.id
      if(this.message.length<=0){
        let data= {
          password : this.password,
        }
        console.log(data)
        await axios.post('admin/staff/change-password/'+localStorage.getItem('id'), data , token).then((response)=> {
          console.log(response.data);
          toast({
            message: 'Change Password successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          router.push('/myaccount')

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
