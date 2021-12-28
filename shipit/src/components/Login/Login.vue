<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >Sign in to my fashion shop</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your username for registration</h4>
                        <v-form @submit.prevent="submitLogin" v-model="valid">
                          {{valid}}
                          <v-text-field
                            label="Username"
                            name="Username"
                            type="text"
                            color="teal accent-3"
                            :rules="[required('Username'),
                            minLength('Username', 6),
                            maxLength('Username', 50)]"
                            v-model="userInput.username"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="teal accent-3"
                            :rules="[required('Password'), passwordRule(userInput.password),]"
                            v-model="userInput.password"
                          />
                          <div class="text-center mt-3">
                            <v-btn rounded color="teal accent-3" type="submit"  :disabled="!valid">SIGN IN</v-btn>
                          </div>
                        </v-form>
                        <div class="text-center">
                          <a  href="" class="text-center mt-4">Forgot your password ?</a>
                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++" >SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--" >Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>

                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form @submit.prevent="submitRegister" v-model="valid">
                          <v-text-field
                            label="Last Name"
                            name="Last Name"
                            type="text"
                            color="teal accent-3"
                            v-model="userRegister.last_name"
                            :rules="[required('Last Name'),
                            minLength('Last Name', 6),
                            maxLength('Last Name', 50)]"
                          />
                          <v-text-field
                            label="First Name"
                            name="First Name"
                            type="text"
                            color="teal accent-3"
                            v-model="userRegister.first_name"
                            :rules="[required('First Name'),
                            minLength('First Name', 6),
                            maxLength('First Name', 50)]"
                          />
                          <v-text-field
                            label="Username"
                            name="Username"

                            type="text"
                            color="teal accent-3"
                            v-model="userRegister.username"

                            :rules="[required('Username'),
                            minLength('Username', 6),
                            maxLength('Username', 50)]"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            type="email"
                            color="teal accent-3"
                            v-model="userRegister.email"
                            :rules="[required('Email'),
                            email(userRegister.email)]"
                          />

                          <v-text-field
                            label="Address"
                            name="Address"

                            type="text"
                            color="teal accent-3"
                            v-model="userRegister.address"
                            :rules="[required('Address'),
                            minLength('Address', 6),
                            maxLength('Address', 50)]"
                          />

                          <v-text-field
                            label="Phone"
                            name="Phone"

                            type="text"
                            color="teal accent-3"
                            v-model="userRegister.phone_number"

                            :rules="[required('Phone'),
                             phoneRule(userRegister.phone_number)]"
                          />

                          <v-text-field
                            id="password1"
                            label="Password"
                            name="password"

                            type="password"
                            color="teal accent-3"
                            v-model="userRegister.password"
                            :rules="[required('password'),
                            minLength('password', 6),
                            maxLength('password', 50)]"
                          />

                          <v-text-field
                            id="password2"
                            label="confirm password"
                            name="confirm password"

                            type="password"
                            color="teal accent-3"
                            v-model="password_confirmation"

                          />
                          <div class="text-center mt-n5">
                            <v-btn rounded color="teal accent-3" type="submit" :disabled="!valid">SIGN UP</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import validateEmail from "../../utils/checkValidation";
import axios from "axios";
import {toast} from "bulma-toast";
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    step: 1,
    userInput: {
      username:"",
      password:""
    },
    userRegister: {
      username:"",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      // roles: "customer"
    },
    password_confirmation: "",
    message:[],

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
    passwordRule: password => {
      if(password.length > 0) {
        let error = ''
        let flag = true
        // const upper_case = /(?=.*?[A-Z])/
        const lower_case = /(?=.*?[a-z])/
        const one_digit = /(?=.*?[0-9])/
        const one_special_character = /(?=.*?[#?!@$%^&*-])/
        const Minimum_eight = /.{8,}/
        // if (!upper_case.test(String(password))) {
        //   error += 'password have at least one upper case English letter.\n'
        //   flag = false
        // }
        if (!lower_case.test(String(password))) {
          error += 'password have at least one lower case English letter.\n'
          flag = false
        }
        if (!one_digit.test(String(password))) {
          error += 'password have at least one digit \n'
          flag = false
        }
        if (!one_special_character.test(String(password))) {
          error += 'password have At least one special character.\n'
          flag = false
        }
        if (!Minimum_eight.test(String(password))) {
          error += '\n password have minimum eight in length.\n'
          flag = false
        }
        return flag || error
      }
      return false
    }
  }),
  props: {
    source: String
  },
  methods:{
    ...mapMutations(['LoginDispatch']),
    submitLogin() {
      if(this.message.length<=0){
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        axios.post("auth/login", this.userInput).then((response)=> {
          if(response.data.user == null) {
            this.message.push(response.data)
            return false
          }
          if(response.data.user.rolesName === "customer "){
            console.log(response.data.user)
            const token = response.data.token
            this.$store.commit('setToken', token)
            axios.defaults.headers.common["Authorization"] = "token " + token
            localStorage.setItem("token", token)
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("full_name", response.data.user.full_name);
            toast({
              message: 'Login successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
            this.LoginDispatch();
            // this.$router.push(toPath)

          }else{
            this.message.push("Account is not correct")
          }
        }).catch(error => {
          if (error.response) {
            for (const property in error.response.data) {
              this.message.push(`${property}: ${error.response.data[property]}`)
            }
          } else {
            // console.log(error)
            this.message.push('Something went wrong. Please try again')
          }
        })



      }
    },
    submitRegister(){
      console.log("SAd")
      console.log(this.message.length)
      if(this.message.length<=0){
        let data = {
          username:this.userRegister.username,
          password: this.userRegister.password,
          first_name: this.userRegister.first_name,
          last_name: this.userRegister.last_name,
          email: this.userRegister.email,
          address: this.userRegister.address,
          phone_number: this.userRegister.phone_number,
          // roles: "customer"
        }
        console.log(data)
        axios.post("auth/register", data).then((response)=> {
          console.log(response.data)
          this.userRegister.username = ""
          this.userRegister.password = ""
          this.password_confirmation = ""
          this.userRegister.address = ""
          this.userRegister.phone_number = ""
          this.userRegister.first_name = ""
          this.userRegister.last_name = ""
          this.userRegister.email = ""
          toast({
            message: 'Register successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
        }).catch((error) =>{
          this.message.push(error.response.data.message);
        });
      }
    }
  }
};
</script>
