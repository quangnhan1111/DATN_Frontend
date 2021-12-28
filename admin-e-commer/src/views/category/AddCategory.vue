<template>
  <div class="wrapper">
    <div class="title">
      Add Category
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleAdd">
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="category.name">
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Save" >
      </div>
    </form>
  </div>
</template>
<script>
import { toast } from 'bulma-toast'
import axios from "axios";
import router from "../../router";

export default {
  name: 'AddCategory',
  data() {
    return {
      category:{
        name:""
      },
      message:[]
    }
  },
  created() {

  },
  methods: {
    cancel(){
      router.push('/categories')
    },
    checkValid() {
      this.message = []
      if( !this.category.name ) {
        this.message.push('Name Category Required')
      }else if(this.category.name.length <3){
        this.message.push('Name Category min is 3 character')
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.category.name
        }
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        console.log(data)
        await axios.post('categories', data, token)
            .then(response => {
              console.log(response.data)
              toast({
                message: 'Add Category successfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: 'top-right',
              })
              this.$router.push('/categories')
              // success('Successfully added catogory');
            })
            .catch(errors => {
              console.log(errors)
            })
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
