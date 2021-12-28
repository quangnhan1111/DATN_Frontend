<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">{{post.title}}</p>
      <p class="overline text-center"> {{post.lastUpdated}} </p>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <v-img
            class="white--text align-end"
            height="400px"
            :src="post.image_link"
          ></v-img>
          <p class="display-1 mb-0 pt-5">{{post.content}}</p>
          <p class="pt-5 subtitle-1 font-weight-light"> {{post.content}}
          </p>

        </div>
      </div>
      <v-btn
        color="orange"
        text
        @click="back"
      >
        Back
      </v-btn>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Post",
  data: () => ({
    post:{
      id: "",
      title:"",
      content: "",
      image_link:"",
      image_name:"",
      lastUpdated: ""
    },
    listImage:[],
    message:"",


  }),
  created() {
    this.getData()
  },
  methods: {
    getData (){
      // checklogin();

      let idPost = this.$route.params.id
      axios.get('post/' + idPost).then((response)=> {
        let temp = response.data.data[0]
        console.log(response.data.data[0])
        this.post = temp
      }).catch((error) =>{console.log(error) });
    },

    back() {
      this.$router.push('/blog')
    }
  }
}
</script>
