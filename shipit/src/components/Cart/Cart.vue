<template>
  <div>
    <v-container>

      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="9" sm="12" >
          <v-simple-table >
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">ITEM</th>
                <th class="text-center">PRICE</th>
                <th class="text-center">Size</th>
                <th class="text-center">Color</th>
                <th class="text-center">Gender</th>
                <th class="text-center">QUANTITY</th>
                <th class="text-center">TOTAL</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody v-if="cartTotalLength">
              <CartItem
                v-for="(item, index) in cart.items"
                :key="index"
                :initialItem="item"
                v-on:removeFromCart="removeFromCart"
              />
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">Shipping and additional costs are calculated based on values you have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Order Subtotal</td>
                <td class="text-right" style="width: 50px;">${{ (cartTotalPrice).toFixed(2) }}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td class="text-right" style="width: 50px;">Free</td>
              </tr>
              <tr v-if="giam_gia>0">
                <td>Coupon</td>
                <td class="text-right" style="width: 50px;">${{giam_gia.toFixed(2)}}</td>
              </tr>
              <tr v-if="cartTotalPrice-giam_gia>0">
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>${{ (cartTotalPrice-giam_gia).toFixed(2) }}</b></td>
              </tr>
              <tr v-else>
                <td>Total</td>
                <td class="text-right" style="width: 50px;"><b>$0.00</b></td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          <br>

          <v-simple-table>
            <template v-slot:default>
              <tbody>
              <tr>
                <td>Coupon</td>
                <td class="text-right" style="width: 200px;">
                  <v-text-field
                    label="Coupon"
                    name="Coupon"
                    type="text"
                    color="teal accent-3"
                    v-model="coupon"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <v-btn class="btn btn-primary"  type="button" dark @click="updatedCart(coupon)">Updated</v-btn>
                </td>
              </tr>

              </tbody>
            </template>
          </v-simple-table>

<!--          <div class="text-center">-->
<!--            <v-btn class="primary white&#45;&#45;text mt-5" outlined>PROCEED TO PAY</v-btn>-->
<!--          </div>-->

          <template v-if="$store.state.isAuthenticated">
            <v-btn class="primary white&#45;&#45;text mt-5" outlined @click="goCheckOut">PROCEED TO PAY</v-btn>
          </template>
          <template v-else>
            <router-link tag="span" to="/login/" ><a><i class="fas fa-sign-in-alt"></i>You must Login to Checkout </a></router-link>
          </template>
        </v-col>
      </v-row>
    </v-container>
<!--    <v-card  class="accent" >-->
<!--      <v-container>-->
<!--        <v-row no-gutters>-->
<!--          <v-col class="col-12 col-md-4 col-sm-12">-->
<!--            <v-row >-->
<!--              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">-->
<!--                <v-icon class="display-2">mdi-truck</v-icon>-->
<!--              </v-col>-->
<!--              <v-col class="col-12 col-sm-9 pr-4">-->
<!--                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>-->
<!--                <p class="font-weight-thin">Free Shipping over $300</p>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
<!--          <v-col class="col-12 col-md-4 col-sm-12">-->
<!--            <v-row >-->
<!--              <v-col class="col-12 col-sm-3 pr-4" align="right">-->
<!--                <v-icon class="display-2">mdi-cash-usd</v-icon>-->
<!--              </v-col>-->
<!--              <v-col  class="col-12 col-sm-9 pr-4">-->
<!--                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>-->
<!--                <p class="font-weight-thin">30 Days Money Back Guarantee</p>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
<!--          <v-col class="col-12 col-md-4 col-sm-12">-->
<!--            <v-row>-->
<!--              <v-col class="col-12 col-sm-3 pr-4" align="right">-->
<!--                <v-icon class="display-2">mdi-headset</v-icon>-->
<!--              </v-col>-->
<!--              <v-col  class="col-12 col-sm-9 pr-4">-->
<!--                <h3 class="font-weight-light">020-800-456-747</h3>-->
<!--                <p class="font-weight-thin">24/7 Available Support</p>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-container>-->
<!--    </v-card>-->
  </div>
</template>
<script>
import CartItem from "./CartItem";
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: 'Cart',
  components: {
    CartItem
  },
  data: () => ({
    cart: {
      items: []
    },
    coupon: "",
    list_coupon: [],
    giam_gia: 0
  }),
  created() {
    this.cart = this.$store.state.cart
  },
  methods: {
    goCheckOut(){
      if (this.cart.items.length < 1) {
        toast({
          message: 'You need add to cart, your cart is empty',
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'top-right',
        })
      }else{
        this.$router.push('/checkout')
      }
    },
    async updatedCart(coupon){
      let giam_gia = 0
      let totalPrice = this.cart.items.reduce((acc, item) => {
        return acc += item.product.price * item.quantity
      }, 0)
      await axios.get('/coupon-list-no-page').then((response)=> {
        this.list_coupon = response.data.data
        console.log(this.list_coupon)
      }).catch(() =>{
      })

      for (let i = 0; i < this.list_coupon.length; i++) {
        if (this.list_coupon[i].name_code === coupon && this.list_coupon[i].condition == 'TIEN_MAT'
          && this.list_coupon[i].time > 0 ){

          giam_gia = this.list_coupon[i].value
        }
        if (this.list_coupon[i].name_code === coupon && this.list_coupon[i].condition == 'PHAN_TRAM'
          && this.list_coupon[i].time > 0 ){
          giam_gia = this.list_coupon[i].value*this.cartTotalPrice
        }

      }
      this.giam_gia = giam_gia
      this.$store.commit('take_coupon', {
        giam_gia
      })
      console.log(this.$store.state.giam_gia)
    },
    removeFromCart(item) {
      // this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
      console.log(this.cart.items)
      console.log(item.product.product__product_link)
      this.cart.items = this.cart.items.filter(i => i.product.product__product_link !== item.product.product__product_link)
    }
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, item) => {
        return acc += item.quantity
      }, 0)
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, item) => {
        return acc += item.product.price * item.quantity
      }, 0)
    },
  }

}
</script>

