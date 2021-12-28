<template>
  <div class="container1">
    <div class="wrapper">
      <div class="title"><span>Login Form</span></div>
      <div class="notification" v-if="message.length">
        <ul>
          <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
        </ul>
      </div>
      <form action="#" @submit.prevent="submitForm">
        <div class="row">
          <i class="fas fa-user"></i>
          <input  placeholder="Username"
                  autocomplete="username email"
                  v-model="username"
                  type="text" required>
        </div>
        <div class="row">
          <i class="fas fa-lock"></i>
          <input   placeholder="Password"
                   type="password"
                   autocomplete="curent-password"
                   v-model="password" required>
        </div>
        <div class="row button">
          <input type="submit" value="Login">
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex'
import {toast} from "bulma-toast";
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      message:[]
    }
  },
  created() {

  },
  computed: {
    ...mapMutations(['LoginDispatch'])
  },
  methods: {
    checkValid(){
      this.message = []
      if( !this.username ) {
        this.message.push('username Required')
      }else if (this.username.length <6){
        this.message.push('username min is 6 character')
      }
      if( !this.password) {
        this.message.push("Password Required");
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
    async submitForm() {
      this.checkValid()
      if(this.message.length<=0){
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        const formData = {
          username: this.username,
          password: this.password
        }
        console.log(formData);
        await axios.post("auth/staff-login", formData).then((response)=> {
          console.log(response.data)
          const {token, info} = response.data;
          console.log(info.rolesName[0])
          if(info.rolesName[0] === "admin" || info.rolesName[0] === "staff"){
            localStorage.setItem('token', token)
            localStorage.setItem('id', info.id)
            localStorage.setItem('username', info.username)
            localStorage.setItem('full_name', info.full_name)
            localStorage.setItem('roleNames', info.rolesName[0])
            axios.defaults.headers.common["Authorization"] = "Token " + token
            this.LoginDispatch();
            toast({
              message: 'Login successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
          }else{
            this.message.push("account is not exist")
          }

        }).catch((error) =>{
          if (error.response) {
            for (const property in error.response.data) {
              this.message.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            this.message.push('Something went wrong. Please try again')

            console.log(JSON.stringify(error))
          }
        });
      }

    }
  },
}
</script>
<style lang="scss" scoped>
.error{
  color: #ff001e;
  text-align: center;
  font-weight: bold;

}


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins',sans-serif;
}
::selection{
  background: #9DE1FE;
}
.container1{
  max-width: 800px;
  padding: 0 20px;
  margin: 170px auto;
}
.wrapper{
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 10px 1px rgba(0,0,0,0.1);
}
.wrapper .title{
  height: 90px;
  background: #4b4bbb;
  border-radius: 5px 5px 0 0;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper form{
  padding: 30px 25px 25px 25px;
}
.wrapper form .row{
  height: 45px;
  margin-bottom: 15px;
  position: relative;
}
.wrapper form .row input{
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 60px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  font-size: 16px;
  transition: all 0.3s ease;
}
form .row input:focus{
  border-color: #b1abab;
  box-shadow: inset 0px 0px 2px 2px rgb(255, 255, 255);
}
form .row input::placeholder{
  color: #999;
}
.wrapper form .row i{
  position: absolute;
  width: 47px;
  height: 100%;
  color: #fff;
  font-size: 18px;
  background: #b1abab;
  border: 1px solid #16a085;
  border-radius: 5px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper form .pass{
  margin: -8px 0 20px 0;
}
.wrapper form .pass a{
  color: #b1abab;
  font-size: 17px;
  text-decoration: none;
}
.wrapper form .pass a:hover{
  text-decoration: underline;
}
.wrapper form .button input{
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  padding-left: 0px;
  background: #b1abab;
  border: 1px solid #16a085;
  cursor: pointer;
}
form .button input:hover{
  background: #4b4bbb;
}
.wrapper form .signup-link{
  text-align: center;
  margin-top: 20px;
  font-size: 17px;
}
.wrapper form .signup-link a{
  color: #4b4bbb;
  text-decoration: none;
}
form .signup-link a:hover{
  text-decoration: underline;
}
</style>








