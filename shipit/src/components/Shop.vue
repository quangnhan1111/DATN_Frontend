<template>
  <div>
    <v-container>
      <div class="row">
        <div
         class="col-md-3 col-sm-3 col-xs-12"
        >
          <v-card outlined>
            <v-card-title>Category</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="categories" :open="[1]" :active="[5]" :selected-color="'#fff'"
                          activatable open-on-click dense
              >
                <template slot="label" slot-scope="{ item }">
                  <a @click="changeCate(item.id)">{{ item.name }}</a>
                </template>
              </v-treeview>
            </template>
            <v-divider></v-divider>


            <v-card-title>Brand</v-card-title>
            <v-divider></v-divider>
            <template>
              <v-treeview :items="brands" :open="[1]" :active="[5]" :selected-color="'#fff'"
                          activatable open-on-click dense
              >
                <template slot="label" slot-scope="{ item }">
                  <a @click="changeBrand(item.id)">{{ item.name }}</a>
                </template>
              </v-treeview>
            </template>
            <v-divider></v-divider>



            <v-card-title>Price</v-card-title>
<!--            <v-range-slider-->
<!--              v-model="range"-->
<!--              :max="max"-->
<!--              :min="min"-->
<!--              @change="search_base_price(min, max)"-->
<!--              :height="10"-->
<!--              class="align-center"-->
<!--              dense-->
<!--            ></v-range-slider>-->


            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[0]"
                  label="Min"
                  outlined
                  dense
                  v-model="min"
                  @change="search_base_price(min, max)"
                ></v-text-field>
              </v-col>


              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>


              <v-col cols="12" sm="5">
                <v-text-field
                  :value="range[1]"
                  label="Max"
                  outlined
                  dense

                  v-model="max"
                  @change="search_base_price(min, max)"
                ></v-text-field>
              </v-col>


            </v-row>


            <v-divider></v-divider>
            <v-card-title class="pb-0">Customer Rating</v-card-title>
            <Checkboxes
              :list="listCheckboxesRating"
              @handleFilters="handleFilters"
            />
<!--              <v-checkbox @change="search_base_review(4)" append-icon="mdi-star" label="4 & above" hide-details dense></v-checkbox>-->
<!--              <v-checkbox @change="search_base_review(3)" append-icon="mdi-star" label="3 & above" hide-details dense></v-checkbox>-->
<!--              <v-checkbox @change="search_base_review(2)" append-icon="mdi-star" label="2 & above" hide-details dense></v-checkbox>-->
<!--              <v-checkbox @change="search_base_review(1)" append-icon="mdi-star" label="1 & above" hide-details dense></v-checkbox>-->
            <v-divider></v-divider>
<!--            <v-card-title class="pb-0">Size</v-card-title>-->

          </v-card>
        </div>
        <div
          class="col-md-9 col-sm-9 col-xs-12"
        >
<!--          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>-->



          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small>Showing 1-{{per_page}} of {{total}} products</small>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select class="pa-0" v-model="select" :items="options"
                        style="margin-bottom: -20px;"
                        outlined dense
                        @change="selectOptions(select)"
              >
              </v-select>
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
  name: 'Shop',
  components: {
    Checkboxes
  },
  data: () => ({
    listCheckboxesRating: [
      {
        id: 0,
        name: 'rating',
        label: 'Any Rating',
        value: 0
      },
      {
        id: 1,
        name: '1 & above',
        label: '1 & above',
        value: 1
      },
      {
        id: 2,
        name: '2 & above',
        label: '2 & above',
        value: 2
      },
      {
        id: 3,
        name: '3 & above',
        label: '3 & above',
        value: 3
      },
      {
        id: 4,
        name: '4 & above',
        label: '4 & above',
        value: 4
      },
    ],
    // listCheckboxesGenre: [
    //   {
    //     id: 0,
    //     name: 'Size',
    //     label: 'Any Size',
    //     value: 'Any Size',
    //   },
    //   {
    //     id: 1,
    //     name: 'M',
    //     label: 'M',
    //     value: 'M',
    //   },
    //   {
    //     id: 2,
    //     name: 'L',
    //     label: 'L',
    //     value: 'L',
    //   },
    //   {
    //     id: 3,
    //     name: 'XL',
    //     label: 'XL',
    //     value: 'XL',
    //   },
    //   {
    //     id: 4,
    //     name: 'XXL',
    //     label: 'XXL',
    //     value: 'XXL',
    //   },
    // ],
    range: [0, 10000],
    min:0,
    max:10000,

    select:'Popularity',
    options: [
      'Default',
      'Popularity',
      'Newest',
      'Price: Low to High',
      'Price: High to Low',
    ],

    categories: [],
    brands: [],

    total:1,
    last_page: 1,
    current_page: 1,
    per_page: 1,
    products: [],
    select_option : "",

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
    callBrand(){
      axios
        .get('brand-list-no-page')
        .then(response => {
          console.log(response.data.data)
          this.brands = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    callCate(){
      axios
        .get('category-and-subcate-detail')
        .then(response => {
          console.log(response.data.data)
          this.categories = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    callProductBaseBrand(id){
      axios
        .get('/client/brand/relateProduct/'+id+'?page='+this.current_page)
        .then(response => {
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
    async callProductBaseCate(id){
      await axios
        .get('/client/category/relateProduct/'+id+'?page='+this.current_page)
        .then(response => {
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.per_page = response.data.per_page
          this.total = response.data.total
          this.products = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
      if(this.products.length === 0)
      {
        await axios
          .get('/client/subcategory/relateProduct/'+id+'?page='+this.current_page)
          .then(response => {
            this.current_page = response.data.current_page
            this.last_page = response.data.last_page
            this.per_page = response.data.per_page
            this.total = response.data.total
            this.products = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    callProductBasePrice(min,max){
      axios
        .get('/client/product/search-base-price/' + min + '/' + max+'?page='+this.current_page)
        .then(response => {
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
    async callProduct(){
      await axios
        .get('product-list?page='+this.current_page)
        .then(response => {
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.per_page = response.data.per_page
          this.total = response.data.total
          this.products = response.data.data
          console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    },
    callProductBest(){
      axios
        .get('client/product/best?page=' + this.current_page)
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
    callProductNewest(){
      axios
        .get('client/product/new?page=' + this.current_page)
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
    callProductLowToHigh(){
      axios
        .get('client/product/sorted-Low-to-High?page=' + this.current_page)
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
    callProductHighToLow(){
      axios
        .get('client/product/sorted-Hight-to-Low?page=' + this.current_page)
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
    async handleFilters(checkboxState, key){
      await this.callProduct()
      key = 'rating'
      const logic = 'OR';
      console.log(checkboxState)
      const newFilters = { ...this.selected };

      newFilters[key] = checkboxState;

      const hasRatings = newFilters.rating.length > 0;
      const hasFilters = hasRatings
      // const hasSizes = newFilters.size.length > 0;
      // const hasFilters = hasRatings || hasSizes;
      const filterRating = (product) => {
        let flag = 0
        for (let i = 0; i < newFilters.rating.length; i++) {
          if(newFilters.rating[i] < product.avgStar) {
            flag ++
          }
        }
        if (flag == newFilters.rating.length) return true
        return false
        // newFilters.rating.includes(0) ||
        // newFilters.rating.includes(product.avgStar);
      }
      const filterSize = (product) =>
        newFilters.size.includes('') || newFilters.size.includes(product.size);
      this.products = this.products.filter(
        logic === 'OR'
          ? (product) => {
            return !hasFilters || filterRating(product)  // OR
          }
          : (product) =>
            !hasFilters ||
            ((!hasRatings || filterRating(product)) && (!hasSizes || filterSize(product))) // AND
      )
      console.log(this.products)
      this.selected = newFilters
    },
    getData() {
      this.callCate()
      this.callBrand()
      this.select_option = "Product"
      this.callProduct()
    },
    changeCate(id){
      this.select_option = "Category"
      this.callProductBaseCate(id)
    },
    changeBrand(id){
      this.select_option = "Brand"
      this.callProductBaseBrand(id)
    },
    search_base_price(min, max){
      this.select_option = "Price"
      this.callProductBasePrice(min,max)
    },
    selectOptions(select){
      if (select === "Popularity" || select === "Default") {
        this.select_option = "Popularity"
        this.callProductBest()
      }
      if (select === "Newest") {
        this.select_option = "Newest"
        this.callProductNewest()
      }

      if (select === "Price: Low to High") {
        this.select_option = "Low to High"
        this.callProductLowToHigh()
      }

      if (select === "Price: High to Low") {
        this.select_option = "High to Low"
        this.callProductHighToLow()
      }
    },

  },
  watch: {
    current_page: {
      handler(){
        if(this.select_option == 'Product'){
          this.callProduct()
        }
        else if(this.select_option == 'Brand'){
          this.callProductBaseBrand()
        }
        else if(this.select_option == 'Category'){
          this.callProductBaseCate()
        }
        else if(this.select_option == 'Price'){
          this.callProductBasePrice(this.min, this.max)
        }
        else if(this.select_option == 'Popularity'){
          this.callProductBest()
        }
        else if(this.select_option == 'Newest'){
          this.callProductNewest()
        }
        else if(this.select_option == 'Low to High"'){
          this.callProductLowToHigh()
        }
        else if(this.select_option == 'High to Low'){
          this.callProductHighToLow()
        }
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
