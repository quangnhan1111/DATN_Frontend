<template>
  <div class="wrapper">
    <div class="title">
      Add Post
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleAdd">
      <div class="inputfield">
        <label>Title</label>
        <input type="text" class="input" v-model="post.title">
      </div>
      <div class="inputfield">
        <label>Description</label>
        <b-form-textarea class="form-control" type="text"  name="title" value="" v-model="post.content" />
      </div>
      <div class="inputfield">
        <label>Image_name</label>
        <input type="text" class="input" v-model="post.image_name">
      </div>
      <div class="inputfield">
        <label>Link Image </label>
        <input type="text" class="input" disabled v-model="post.image_link"/>
      </div>
      <div class="inputfield">
        <label>File Image </label>
        <input type="file" class="" @change="handleChange" />
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Save" >
      </div>
    </form>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";

import axios from "axios";
import {toast} from "bulma-toast";
import router from "../../router";
import {storage} from "../../components/firebase";

export default {
  name: 'AddPost',
  data() {
    return {
      post:{
        id: "",
        title: "",
        content: "",
        image_name: "",
        image_link: ""
      },
      listImage: "",
      message: "",
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  created() {

  },
  methods: {
    cancel(){
      router.push('/posts')
    },
    checkValid() {
      this.message = []
      if( !this.post.title ) {
        this.message.push('Title Post Required')
      }else if(this.post.title.length <6){
        this.message.push('Title Post min is 6 character')
      }
      if( !this.post.content ) {
        this.message.push('Content Post Required')
      }else if(this.post.content.length <10){
        this.message.push('Content Post min is 10 character')
      }
    },
    handleChange(e) {
      console.log("abc")
      if(e.target.files[0]){
        const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            // eslint-disable-next-line no-unused-vars
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
              storage
                  .ref("images")
                  .child(e.target.files[0].name)
                  .getDownloadURL()
                  .then(url =>{
                    this.post.image_link = url
                  });
            }
        )
      }
    },
    // change(listImage){
    //   var selectBox = document.getElementById('selectBox');
    //   var theImg = document.getElementById('theImg');
    //   console.log(listImage[selectBox.selectedIndex])
    //   theImg.src = listImage[selectBox.selectedIndex].src
    //   console.log(theImg.src)
    //   this.post.id_image = listImage[selectBox.selectedIndex].value
    // },

     async handleAdd() {
       this.checkValid()
       if(this.message.length<=0){
         const data = {
           image_name: this.post.image_name,
           content: this.post.content,
           image_link: this.post.image_link,
           title: this.post.title
         }
         await axios.post('/posts', data, this.token)
             .then(response => {
               console.log(response.data)
               toast({
                 message: 'Add Post successfully',
                 type: 'is-success',
                 dismissible: true,
                 pauseOnHover: true,
                 duration: 3000,
                 position: 'top-right',
               })
               this.$router.push('/posts')
               // success('Add Success Post');
             })
             .catch(errors => {
               console.log(errors)
             })
       }
    },

    back() {
      this.$router.push('/posts')
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
