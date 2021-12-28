<template>
  <v-container>
    <h2 class="display-2">Change Password</h2>
    <v-form @submit.prevent="handleEdit" v-model="valid">
      {{valid}}
      <v-layout>
        <v-flex >
          <v-text-field
            id="new password"
            label="new Password"
            name="new password"
            type="password"
            color="teal accent-3"
            :rules="[required('password'), passwordRule(password),]"
            v-model="password"
          />

          <v-text-field
            id="password_confirmation"
            label="password_confirmation"
            name="password_confirmation"
            type="password"
            color="teal accent-3"
            :rules="[required('password_confirmation'), passwordRule(password_confirmation),]"
            v-model="password_confirmation"
          />

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
  name: "ChangePassword",
  data() {
    return {
      password: "",
      password_confirmation:"",
      valid: false,
      required(propertyType) {
        return v => v && v.length > 0 || `You must input a ${propertyType}`
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
    }
  },
  methods: {
    back(){
      this.$router.push({ path: '/account' })
    },
    handleEdit() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let id = this.$route.params.id
      let data = {
        password: this.password,
      }
      axios.put("admin/customers/change-password/"+id, data , token).then((response)=> {

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
.wrap {
  position: relative;
  display: inline-block;
}

.wrap span {
  position: absolute;
  top: 12px;
  right: 12px;
}

.avatar{
  border-radius: 50%;
}
</style>
