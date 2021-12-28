<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-5 col-sm-5 col-xs-12">
          <v-carousel>
            <v-carousel-item
              :src="details.Link_Image"
            >
            </v-carousel-item>
          </v-carousel>
        </div>
        <div class="col-md-7 col-sm-7 col-xs-12">
          <div class="pl-6">
            <p class="display-1 mb-0">{{details.name}}</p>
            <v-card-actions class="pa-0">
              <p class="headline font-weight-light pt-3" v-if="show_price>0">${{show_price}}</p>
              <v-spacer></v-spacer>
              <v-rating v-model="avg_star" class="" background-color="warning lighten-3"
                        color="warning" dense></v-rating>
              <span class="body-2	font-weight-thin"> {{totalReview}} REVIEWS</span>
            </v-card-actions>
            <p class="subtitle-1 font-weight-thin">
              {{details.des}}
            </p>
            <p class="title">SIZE</p>
<!--            <div v-if="attribute_size!== []">-->
<!--              <v-radio-group v-model="row_size" row v-for="item in attribute_size" :key="item.id">-->
<!--                <v-radio :label="item" :value="item" @click="setSize(item)"></v-radio>-->
<!--              </v-radio-group>-->
<!--            </div>-->
            <div v-if="attribute_size!== []">
              <v-radio-group v-model="select.row_size" row >
                <div v-for="item in attribute_size" :key="item.id">
                  <v-radio :label="item" :value="item" @click="setSize(item)"></v-radio>
                </div>
              </v-radio-group>
            </div>
            <p class="title">Color</p>
            <div v-if="attribute_color!== []">
              <v-radio-group v-model="select.row_color" row >
                <div v-for="item in attribute_color" :key="item.id">
                  <v-radio :label="item" :value="item" @click="setColor(item)"></v-radio>
                </div>
              </v-radio-group>
            </div>
            <p class="title">ITEMS</p>
            <div style="display: flex;  flex-direction: row;">
              <v-text-field
                outlined
                style="width:100px; flex-grow: 4"
                v-model="quantity"
                value="1"
                dense
                type="number"
                min="1"
                :max="show_number"
              ></v-text-field>
              <p style="flex-grow: 1; text-align: left; align-items:center; padding: 5px 0 0 5px">( {{show_number}} sản phẩm có sẵn )</p>
            </div>
            <v-btn class="primary white--text" outlined tile dense @click="addToCart" :disabled="quantity>show_number">
              <v-icon>mdi-cart</v-icon> ADD TO CART
            </v-btn>
            <v-btn class="ml-4" outlined tile @click="addToWishList(details.id)">ADD TO WISHLIST</v-btn>
          </div>

         </div>
      </div>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab >Description</v-tab>
            <v-tab>REVIEWS</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{details.des}}.
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-list
                :three-line=true
                avatar="true"
              >
                <v-list-item-group  color="primary">
                  <v-list-item
                    v-for="(item, i) in listReview"
                    :key="i"
                    :inactive=true
                  >
                    <v-list-item-avatar>
                      <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="item.UserName"></v-list-item-title>
                      <v-list-item-subtitle v-html="item.created_at.substring(0,10)"></v-list-item-subtitle>
                      <v-rating v-model="item.star" class="" background-color="warning lighten-3"
                                                                                           color="warning" dense>

                      </v-rating>
                      <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <template v-if="$store.state.isAuthenticated">
                  <v-form @submit.prevent="submit" >
                    <v-textarea
                      auto-grow
                      outlined

                      row-height="35"
                      shaped
                      v-model="review.content"
                    ></v-textarea>
                    <b>Rating:
                      <div>
                        <v-rating v-model="star" class="" background-color="warning lighten-3"
                                  color="warning" dense>

                        </v-rating>
                        <v-btn rounded color="teal accent-3" type="button"  @click="star = null">Clear</v-btn>
                      </div>
                    </b>
                    <img src="images/product-details/rating.png" alt="" />
                    <div class="text-center mt-3">
                      <v-btn rounded color="teal accent-3" type="submit"  >Submit</v-btn>
                    </div>
                  </v-form>
                </template>
                <template v-else>
                  <router-link tag="span" to="/login/" ><a><i class="fas fa-sign-in-alt"></i>You must Login to Submit your review </a></router-link>
                </template>





              </v-list>
            </v-tab-item>
          </v-tabs>


          <v-card-text
            class="pa-0 pt-4"
            tile
            outlined
          >
            <p class="subtitle-1 font-weight-light pt-3 text-center">YOU MIGHT ALSO LIKE</p>
            <v-divider></v-divider>
            <div class="row text-center" v-for="product in products_might_like" :key="product.id">
              <div class="col-md-2 col-sm-4 col-xs-12 text-center" v-if="product.id != $route.params.id">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="200"
                >
                  <v-card
                    :elevation="hover ? 16 : 2"
                  >
                    <v-img
                      class="white--text align-end"
                      height="200px"
                      :src="product.image_link"
                    >
                      <v-card-title style="color:#2b542c;">{{product.Name_Brand}}</v-card-title>
                    </v-img>

                    <v-card-text class="text--primary text-center">
                      <div>Cate: {{product.Name_Category}}</div>
                      <div>Sub: {{product.Name_SubCategory}}</div>
                      <div style="color: #ac2925">{{product.name}}</div>
                    </v-card-text>

                    <div class="text-center">
                      <v-btn
                        class="ma-2"
                        outlined
                        color="info"
                        :href="`/product-detail/${product.id}`"
                      >
                        Explore
                      </v-btn>
                    </div>
                  </v-card>
                </v-hover>
              </div>

            </div>
          </v-card-text>
        </div>
      </div>
    </v-container>
    <v-card  class="accent" >
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row >
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col  class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from 'bulma-toast'
import {mapState} from "vuex";
export default {
  name: "Product",
  data: () => ({
    details: [],
    avg_price: 0,
    quantity: 1,

    show_number:0,
    show_price :0,
    select: {
      row_size:"XS",
      row_color:"Green",
    },
    avg_star:4.5,
    attribute:[],
    attribute_size: [],
    attribute_color: [],
    listReview:[],
    totalReview:0,
    star: 2,
    review: {
      // content: "",
      // user_id: localStorage.getItem('id'),
      // product_id: this.$route.params.id,
      // number_of_star:2
    },

    brand_id: 0,

    total:1,
    last_page: 1,
    current_page: 1,
    per_page: 1,
    products_might_like: [],


    // item: 5,
    // items: [
    //   {
    //     avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    //     title: 'Lorem ipsum dolor?',
    //     subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
    //       "\n",
    //   }
    // ],
  }),
  created() {
    console.log(this.$route.params)
    this.getData()
  },
  methods: {
    async getData() {
      await axios.get('/reviews/product/' + this.$route.params.id).then((response) => {
        console.log(response.data.data)
        let dem =0
        for( let item of response.data.data){
          dem++
          this.avg_star = this.avg_star + item.number_of_star
        }
        this.avg_star /=dem
        this.listReview = response.data.data
        this.totalReview = response.data.total
        console.log(this.listReview)
        console.log(this.totalReview)
        console.log(this.avg_star)
      }).catch(() => {
      })

      await axios.get('/product/' + this.$route.params.id).then((response) => {
        let temp = response.data.data[0]
        this.brand_id = temp.brand_id
        this.details = {
          id: temp.id,
          name: temp.name,
          des: temp.des,
          Name_Category: temp.Name_Category,
          Name_SubCategory: temp.Name_SubCategory,
          Name_Brand: temp.Name_Brand,
          gender : temp.gender,
          Name_Image : temp.Name_Image,
          Link_Image: temp.Link_Image,
          avgStar: this.avg_star,
        }
        let sizes=''
        let colors=''
        let count = 0
        for (let item of response.data.data){
          for (let i of item.sizes){
            sizes+=i+""
          }
          for (let i of item.colors){
            colors+=i+""
          }
          count ++
          this.avg_price = (this.avg_price+item.price)/count
          this.totalNumber += item.number
          this.attribute.push({
            price: item.price,
            number : item.number,
            name_size : sizes,
            name_color : colors,
            product__product_link: item.product__product_link
          })
          sizes=''
          colors=''
        }
        this.attribute_color.push(this.attribute[0].name_color)
        this.attribute_size.push(this.attribute[0].name_size)
        this.select.row_size = this.attribute[0].name_size
        this.select.row_color = this.attribute[0].name_color
        for (let i = 1; i < this.attribute.length; i++){
          if( this.attribute[i].name_size != this.attribute[0].name_size){
            this.attribute_size.push(this.attribute[i].name_size)
          }
          if( this.attribute[i].name_color != this.attribute[0].name_color){
            this.attribute_color.push(this.attribute[i].name_color)
          }
        }
        this.show_number = this.totalNumber
        this.show_price = this.avg_price
      }).catch(() => {
      })

      await axios
        .get('/client/brand/relateProduct/'+this.brand_id)
        .then(response => {
          console.log(response.data.data)
          this.current_page = response.data.current_page
          this.last_page = response.data.last_page
          this.per_page = response.data.per_page
          this.total = response.data.total
          this.products_might_like = response.data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    async submit() {
      let data = {
        content: this.review.content,
        user_id: localStorage.getItem('id'),
        product_id: this.$route.params.id,
        star: this.star
      }
      console.log(data)
      await axios.post('/reviews', data).then((response) => {
        // this.listReview = response.data.data
        console.log(response.data.data)
      }).catch(() => {
      })
      toast({
        message: 'Add review success',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 3000,
        position: 'bottom-right',
      })
      await axios.get('reviews/product/' + this.$route.params.id).then((response) => {
        console.log(response.data)
        let dem =0
        for( let item of response.data.data){
          dem++
          this.avg_star = this.avg_star + item.number_of_star
        }
        this.avg_star /=dem
        this.listReview = response.data.data
        this.totalReview = response.data.total
        console.log(this.avg_star)
      }).catch(() => {
      })
    },
    setColor(row_color) {
      this.select.row_color = row_color
    },

    setSize(row_size) {
      this.select.row_size = row_size
    },
    async addToWishList(product_id){
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let check = 0
      let idCustomer = localStorage.getItem('id')
      await axios.get('/client/product/wishlist/customer/'+idCustomer+'/check/'+this.$route.params.id, token).then((response)=> {
        check = response.data.data

      }).catch(() =>{
      })
      console.log(check)
      if(check === 0) {
        const data = {
          'product_id': product_id,
        }
        console.log(data)
        axios
          .post('/client/product/wishlist/customer/'+ idCustomer, data, token)
          .then(response => {
            console.log(response)
            toast({
              message: 'Add WishList successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
          })
          .catch(error => {
            // this.listMessage.push(error)
            console.log(error)
          })

        // this.$store.commit('setIsLoading', false)
      }else {
        toast({
          message: 'This product is in your WishList Collection',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'top-right',
        })
      }

    },
    addToCart() {
      let product__product_link = 0
      if (this.select.row_color !== "" && this.select.row_size !== "") {
        if (isNaN(this.quantity) || this.quantity < 1) {
          this.quantity = 1
        }
        for (let i of this.attribute){
          if(i.name_size === this.select.row_size && i.name_color === this.select.row_color){
            product__product_link = i.product__product_link
          }
        }
        const item = {
          product: {
            ...this.details,
            avgStar: this.avg_star,
            id: this.$route.params.id,
            name_color: this.select.row_size,
            name_gender: this.details.gender,
            name_size: this.select.row_color,
            price: this.show_price,
            product__product_link: product__product_link

          },
          quantity: this.quantity
        }
        console.log(item);
        this.$store.commit('addToCart', item)
        // console.log(localStorage.getItem('cart'));
        toast({
          message: 'The product was added to the cart',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'bottom-right',
        })
      } else {
        toast({
          message: 'Please select color and size of this product',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'bottom-right',
        })
      }
    },
    getPrice(){
      for (let item of this.attribute){
        if( item['name_size'] === this.select.row_size && item['name_color'] === this.select.row_color ){
          this.show_price = item['price']
          this.show_number = item['number']
          console.log(this.show_price)
          return ;
        }
        this.show_price = 0
        this.show_number = 0
      }
    },

  },
  watch: {
    select: {
      handler(){
        this.getPrice();
      },
      deep: true
    },
  }
}
</script>
