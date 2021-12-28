<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">My Wishlist Product</p>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12" v-for="pro in products" :key="pro.id">
          <v-card
            class="mx-auto"
            max-width="400"
            outlined
            tile
            :href="`/product-detail/${pro.product_id}`"
          >
            <v-img
              class="white--text align-end"
              :aspect-ratio="16/9"
              height="100%"
              width="100%"
              :src="pro.Link_Image"
            >
              <v-card-title style="color: #2a6496">{{pro.Name_Brand}} </v-card-title>
            </v-img>

            <v-card-text class="text--primary">
              <div>Category: {{pro.Name_Category}}</div>
              <div>Sub: {{pro.Name_SubCategory}}</div>
              <div><a   :href="`/product-detail/${pro.product_id}`" style="text-decoration: none">{{String(pro.name).substring(0,20)}}...</a></div>
              <div>${{parseFloat(pro.price).toFixed(2)}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
              >
                VIEW
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
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: "WishlistProducts",
  computed: {
    ...mapState(['Id']),
  },
  async created() {
    await this.getData();
  },
  data() {
    return {
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      products: [],
      idCustomer:  localStorage.getItem("id")
    }
  },
  methods:{
    onPageChange(page){
      this.paginate.current_page = page
    },
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      axios.get('/client/product/wishlist/customer/'+ this.idCustomer +'?page='+this.paginate.current_page, token).then((response)=> {
        console.log(response.data)
        this.products = response.data.data
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

<style scoped>

</style>
