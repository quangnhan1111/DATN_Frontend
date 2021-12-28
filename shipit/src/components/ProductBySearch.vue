<template>
  <div>
    <v-container>
      <div class="row">

        <div
          class="col-md-12 col-sm-12 col-xs-12"
        >
          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-{{per_page}} of {{total}} products</small>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div class="row text-center">
            <div class="col-md-3 col-sm-6 col-xs-12" :key="pro.id"
                 v-for="pro in (products) "
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16/9"
                    height="200px"
                    :src="pro.image_link"
                  >
                    <v-card-title style="color: #2a6496">{{pro.Name_Brand}} </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%;"
                      >
                        <v-btn v-if="hover" :href="`/product-detail/${pro.id}`" class="" outlined>VIEW</v-btn>
                      </div>

                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>Category: {{pro.Name_Category}}</div>
                    <div>Sub: {{pro.Name_SubCategory}}</div>
                    <div><a href="/product" style="text-decoration: none">{{pro.name.substring(0,20)}}...</a></div>
                    <div>${{pro.price.toFixed(2)}}</div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div class="text-center mt-12">
            <v-pagination
              v-model="current_page"
              :length="Math.ceil(total/per_page)"
              :total-visible="7"
              @change="onPageChange"
            ></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import Checkboxes from "./Checkboxes";

export default {
  name: 'ProductBySearch',
  components: {
    Checkboxes
  },
  data: () => ({

    total:1,
    last_page: 1,
    current_page: 1,
    per_page: 1,
    products: [],

    selected: {
      rating: [],
      size: []
    }
  }),
  created() {
    this.getData()
  },
  methods: {
    onPageChange(page){
      this.current_page = page
    },
    async callProductBySearch(){
      await axios
        .get('/client/product/search/'+this.$route.params.key+'?page='+this.current_page)
        .then(response => {
          console.log(response.data)
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.per_page = response.data.per_page
          this.total = response.data.total
          this.products = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData() {
      this.callProductBySearch()
    },
  },
  watch: {
    current_page: {
      handler(){
        this.callProductBySearch()
      },
      deep: true
    },
  }
}
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}
</style>
