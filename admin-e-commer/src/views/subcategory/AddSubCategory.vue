<template>
  <div class="wrapper">
    <div class="title">
      Add SubCategory
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleAdd">
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="subcategory.name">
      </div>
      <div class="inputfield">
        <label>select parent category</label>
        <b-form-select v-model="subcategory.category" :options="listCategory"></b-form-select>
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
  name: 'AddSubCategory',
  data() {
    return {
      subcategory:{
        id:"",
        name:"",
        category: 1
      },
      listCategory: [],
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    checkValid() {
      this.message = []
      if( !this.subcategory.name ) {
        this.message.push('Name Brand Required')
      }else if(this.subcategory.name.length <3){
        this.message.push('NameBrand min is 3 character')
      }
    },
    getData () {
      // checklogin();
      axios.get('categories-list-no-page', this.token).then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value: response.data.data[i].id,
            text: response.data.data[i].name,
          }
          this.listCategory.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.subcategory.name,
          "category": this.subcategory.category
        }
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        console.log(data)
        await axios.post('subcates', data, token)
            .then(response => {
              console.log(response.data)
              toast({
                message: 'Add Subcategories successfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: 'top-right',
              })
              this.$router.push('/subcategories')
            })
            .catch(errors => {
              console.log(errors)
            })
      }
    },

    cancel(){
      router.push('/subcategories')
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


