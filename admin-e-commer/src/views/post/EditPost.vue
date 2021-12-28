<template>
  <div class="wrapper">
    <div class="title">
      Edit Brand
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>Title</label>
        <input type="text" class="input" v-model="dataoutput.title" />
      </div>
      <div class="inputfield">
        <label>Content</label>
        <textarea type="text" class="input" v-model="dataoutput.content"/>
      </div>

      <div class="inputfield">
        <label>Link Image </label>
        <input type="text" class="input" v-model="dataoutput.image_link" disabled/>
      </div>
      <div class="inputfield">
        <label>File Image </label>
        <input type="file" class="" @change="handleChange" />
      </div>
      <div class="inputfield">
        <label>Link Image </label>
        <br><br>
        <img :src="dataoutput.image_link" width="700px"  height="600px" alt="">
      </div>

      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="dataoutput.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="back"/>
        <input type="submit" class="btn btn-primary" value="Edit"/>
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
import {storage} from "../../components/firebase";

export default {
  name: 'EditPost',
  data() {
    return {
      dataoutput:{
        id: 0,
        title: "",
        content : "",
        image_link: "",
        image_name:"",
        status: true
      },
      Status:[
        { value: true, text: 'Active' },
        { value: false, text: 'Un-Active' },
      ],
      listImage:[],
      message:[],
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
                    this.dataoutput.image_link = url
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
    //   this.dataoutput.id_image = listImage[selectBox.selectedIndex].value
    // },
    getData (){
      let idPost = this.$route.params.id
      axios.get('post/' + idPost, this.token).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data.data[0])
        this.dataoutput = temp
      }).catch((error) =>{console.log(error) });

    },
    checkValid() {
      this.message = []
      if( !this.dataoutput.title ) {
        this.message.push('Title Post Required')
      }else if(this.dataoutput.title.length <6){
        this.message.push('Title Post min is 6 character')
      }
      if( !this.dataoutput.content ) {
        this.message.push('Content Post Required')
      }else if(this.dataoutput.content.length <10){
        this.message.push('Content Post min is 10 character')
      }
    },
    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          content: this.dataoutput.content,
          image_link: this.dataoutput.image_link,
          image_name:this.dataoutput.image_name,
          title: this.dataoutput.title,
          status: this.dataoutput.status
        }
        let idPost = this.$route.params.id
        await axios.put('posts?id=' + idPost, data, this.token).then((response) => {
          console.log(response.data)
          toast({
            message: 'Edit Post successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/posts')
          // success('Edit Success Post');
        }).catch((error) => {
          console.log(error)
        });
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
