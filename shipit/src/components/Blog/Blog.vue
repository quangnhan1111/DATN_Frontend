<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Read About Fashion</p>
        <div class="row">
          <div class="col-md-4 col-sm-4 col-xs-12" v-for="post in posts" :key="post.id">
            <v-card
              class="mx-auto"
              max-width="400"
              outlined
              tile
              :href="`/post-detail/${post.id}`"
            >
              <v-img
                class="white--text align-end"
                height="400px"
                :src="post.image_link"
              >
                <v-card-title>{{post.title}}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{post.content}}</v-card-subtitle>

              <v-card-text class="text--primary">

                <div>
                  {{post.content}}
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="orange"
                  text
                >
                  Read More
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      <div class="text-center">
        <v-pagination
          v-model="paginate.current_page"
          :length="Math.ceil(paginate.total/paginate.per_page)"
          :total-visible="7"
          @change="onPageChange"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapState} from "vuex";
import axios from "axios";
export default {
  name: 'Blog',
  components: {

  },
  computed: {
    ...mapState(['Id']),
  },
  async created() {
    await this.getData();
  },
  data() {
    return {
      posts:{
        id:"",
        title:"",
        content:"",
        image_link: "",
        image_name:"",
        lastUpdated: ""
      },
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
    }
  },
  methods:{
    onPageChange(page){
      this.paginate.current_page = page
    },
    getData() {
      axios.get('/post-list?page='+this.paginate.current_page).then((response)=> {
        console.log(response.data)
        this.posts = response.data.data
        this.paginate.current_page = response.data.current_page
        this.paginate.last_page = response.data.last_page
        this.paginate.per_page = response.data.per_page
        this.paginate.total = response.data.total

      }).catch(() =>{
      })
    },
  },
  watch: {
    paginate: {
      handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        this.getData();
      },
      deep: true
    },
  }
}
</script>
