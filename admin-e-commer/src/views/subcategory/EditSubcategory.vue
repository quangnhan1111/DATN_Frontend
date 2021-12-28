<template>
  <div class="wrapper">
    <div class="title">
      Edit Subcategory
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>Id</label>
        <input type="text" class="input" v-model="subcategory.id" disabled/>
      </div>
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="subcategory.name">
      </div>
      <div class="inputfield">
        <label>select parent category</label>
        <b-form-select v-model="subcategory.category" :options="listCategory"></b-form-select>
      </div>
      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="subcategory.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Edit"/>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from 'bulma-toast'
import router from "../../router";

export default {
  name: 'EditSubcategory',
  data() {
    return {
      subcategory:{
        id:"",
        name:"",
        category: 1
      },
      listCategory: [],
      Status:[
        { value: true, text: 'Active' },
        { value: false, text: 'Un-Active' },
      ],
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    cancel(){
      router.push('/subcategories')
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id

      await axios.get('categories-list-no-page', this.token).then((response) => {
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

      await axios.get('subcate/' + id, token).then((response)=> {
        console.log(response)
        this.subcategory = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },
    checkValid() {
      this.message = []
      if( !this.subcategory.name ) {
        this.message.push('Name Brand Required')
      }else if(this.subcategory.name.length <3){
        this.message.push('NameBrand min is 3 character')
      }
    },

    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0) {
        const data = {
          "name": this.subcategory.name,
          "status": this.subcategory.status,
          "category": this.subcategory.category
        }
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        await axios.put('subcates/?id=' + id, data, token).then((response) => {
          console.log(response.data)
          toast({
            message: 'Edit Brand successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/subcategories')
          // success('Edit Success Category');

        }).catch((error) => {
          console.log(error)
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


