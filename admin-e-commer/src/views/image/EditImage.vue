<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">image</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">Edit image</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Full Name</label>
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
                <button type="button" class="btn btn-danger" @click="cancel">Cancel </button>
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
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";

import axios from "axios";
import {toast} from "bulma-toast";
import {storage} from "../../components/firebase";
import router from "../../router";

export default {
  name: 'EditImage',
  data() {
    return {
      image:{
        name: "",
        link: ""
      },
      message:[]
    }
  },
  created() {
    this.getData()
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
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('/image/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.image = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },


    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        let imageData = {
          "name": this.image.name,
          "link": this.image.link
        }
        await axios.put('images/?id=' + id, imageData, token).then((response) => {
          console.log(response.data.data)
          toast({
            message: 'Edit Image successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/images')
          // success('Edit Success Category');

        }).catch((error) => {
          console.log(error)
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
