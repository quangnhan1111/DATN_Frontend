<template>
  <div class="wrapper">
    <div class="title">
      Edit Brand
    </div>
    <form class="form" @submit.prevent=''>
      <div class="inputfield">
        <label>Title</label>
        <input type="text" class="input" v-model="post.title" disabled/>
      </div>
      <div class="inputfield">
        <label>Content</label>
        <textarea type="text" class="input" v-model="post.content" disabled/>
      </div>

      <div class="inputfield">
        <label>Link Image </label>
        <input type="text" class="input" v-model="post.image_link" readonly/>
      </div>
      <div class="inputfield">
        <label>Link Image </label>
        <br><br>
        <img :src="post.image_link" width="700px"  height="600px" alt="" disabled="">
      </div>

      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="back"/>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: 'ViewPost',
  data() {
    return {
      post:{
        id: 0,
        title: 0,
        content : 0,
        image_name: "",
        image_link:"",
      },
      message:"",
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      // checklogin();
      let idPost = this.$route.params.id
      await axios.get('post/' + idPost, this.token).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data.data[0])
        this.post = temp
      }).catch((error) =>{console.log(error) });
    },

    back() {
      this.$router.push('/posts')
    }
  }


}
</script>
