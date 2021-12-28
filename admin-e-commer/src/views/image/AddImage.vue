<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Image</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Image</h4>
            <form class="form-horizontal m-t-30" enctype="multipart/form-data" @submit.prevent="handleAdd">
              <div class="form-group">
                <label>Name</label>
                <input class="form-control" type="text" value="" v-model="image.name" />
              </div>
              <div class="form-group">
                <label>Link Image </label>
                <input type="text" class="form-control" disabled v-model="image.link"/>
              </div>
              <div class="form-group">
                <label>File Image </label>
                <input type="file" class="form-control" @change="handleChange" />
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <button type="submit" name="example-email" class="btn btn-info">Save </button>
                <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
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
import {storage} from "../../components/firebase";
import axios from "axios";
import {toast} from "bulma-toast";
import router from "../../router";

export default {
  name: 'AddImage',
  data() {
    return {
      image:{
        name: "",
        link: "",
      },
      message:[]
    }
  },
  created() {

  },
  methods: {
    cancel(){
      router.push('/images')
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
                    this.image.link = url
                  });
            }
        )
      }
    },
    checkValid(){
      this.message = []
      if( !this.image.name ) {
        this.message.push('Name Image Required')
      }
      if( !this.image.link ) {
        this.message.push('Link Image Required')
      }
    },
     async handleAdd() {
       this.checkValid()
       if(this.message.length<=0){
         let imageData = {
           "name": this.image.name,
           "link": this.image.link
         }
         let token = {
           headers: {
             'Authorization': `token ${localStorage.getItem("token")}`
           },
         }
         console.log(imageData)
         await axios.post("images/", imageData , token).then((response)=> {
           console.log(response.data);
           toast({
             message: 'Add Image successfully',
             type: 'is-success',
             dismissible: true,
             pauseOnHover: true,
             duration: 3000,
             position: 'bottom-right',
           })
           this.$router.push('/images')
           // success('Successfully added customer');
         }).catch((error) =>{
           console.log(error.response);
         });
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
