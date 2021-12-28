<template>
  <v-container>
    <h2 class="display-2">Checkout</h2>
    <v-form action="" v-model="valid">
      <v-layout>
        <v-flex x6>
          <strong>Payment address</strong>
          <v-text-field
            label="Full Name"
            name="Full_Name"
            type="text"
            color="teal accent-3"
            :rules="[required('Full_Name'),
                     minLength('Full_Name', 6),
                     maxLength('Full_Name', 50)]"
            v-model="DestinativeUser.full_name"
          ></v-text-field>
          <v-text-field
            label="Email"
            name="Email"
            type="email"
            color="teal accent-3"
            v-model="DestinativeUser.email"
            :rules="[required('Email'),
                     email(DestinativeUser.email)]"
          />
          <v-text-field
            label="Address"
            name="Address"
            type="text"
            color="teal accent-3"
            v-model="DestinativeUser.address"
            :rules="[required('Address'),
                     minLength('Address', 6),
                     maxLength('Address', 50)]"
          />

          <v-text-field
            label="Phone"
            name="Phone"
            type="text"
            color="teal accent-3"
            v-model="DestinativeUser.phone_number"
            :rules="[required('Phone'),
                     phoneRule(DestinativeUser.phone_number)]"
          />
        </v-flex>
        <v-flex x6>
          <strong>Notes</strong>
          <v-textarea
            filled
            auto-grow
            label="Four rows"
            rows="4"
            row-height="80"
            shaped
            v-model="DestinativeUser.message"
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-form>
    <strong>Review & Payment</strong>
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
        <tr v-for="(item, index) in cart.items"  :key="index">
          <td >
            <v-list-item
              key="1"
              @click=""
            >
              <v-list-item-avatar>
                <v-img :src="item.product.Link_Image">

                </v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title >{{item.product.name}}</v-list-item-title>
                <v-list-item-subtitle>{{item.product.id}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item></td>
          <td>{{item.product.price}}$</td>
          <td>{{item.product.name_size}}</td>
          <td>{{item.product.name_color}}</td>
          <td>{{item.product.name_gender}}</td>
          <td>
            <div class="cart_quantity_button">
              <input class="cart_quantity_input" type="text"
                     name="quantity" autocomplete="off"
                     size="2" v-model="item.quantity"
                     disabled
              >
            </div>
          </td>
          <td>${{ getItemTotal(item).toFixed(2) }}</td>
        </tr>
        <br><br>
        <tr>
          <td>Order Subtotal</td>
          <td class="text-right" style="width: 50px;">${{ (cartTotalPrice).toFixed(2) }}</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td class="text-right" style="width: 50px;">Free</td>
        </tr>
        <tr v-if="giam_gia">
          <td>Coupon</td>
          <td class="text-right" style="width: 50px;">${{giam_gia}}</td>
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
    <hr />

    <div class="payment">
					<span>
						<label><input type="checkbox"> Direct Bank Transfer</label>
					</span>
          <span>
						<label><input type="checkbox"> Check Payment</label>
					</span>
          <span>
						<label><input type="checkbox"> Paypal</label>
            <div id="paypal-button"></div>
					</span>
    </div>
    <v-btn color="success" lager style="float: right; margin-top: 100px" @click="submitForm()" :disabled="!valid">
      Complete order
    </v-btn>

    <div class="notification is-danger" v-if="listMessage.length" style="margin-top: 200px">
      <ul>
        <li v-for="(error,index) in listMessage" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>

  </v-container>
</template>
<script src="https://www.paypal.com/sdk/js?client-id=AcfIgtefBq7pZdmfuuSCSsZreH8Wlaf4viJK7h3S8K_H0A_fFaQel64_72RyHoShsksUPwTnfpQGhcfc
&currency=USD" data-namespace="paypal_sdk"></script>
<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: "Checkout",
  components: {},
  data () {
    return {
      cart: {
        items: []
      },
      DestinativeUser: {
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        message:''
      },
      listMessage: [],
      giam_gia: localStorage.getItem('coupon'),
      valid: false,
      required(propertyType) {
        return v => v && v.length > 0 || `You must input a ${propertyType}`
      },
      minLength(propertyType, minLength) {
        return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters`
      },
      maxLength(propertyType, maxLength) {
        return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters`
      },
      email: propertyType => {
        if(propertyType.length > 0) {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(propertyType).toLowerCase()) || 'Invalid e-mail.';
        }
        else{
          return false
        }
      },
      phoneRule: propertyType => {
        if(propertyType.length > 0) {
          const pattern=/^\+?84?\d{9,15}$/
          return pattern.test(propertyType) || 'Invalid phone number.';
        }
        else{
          return false
        }
      },
    }
  },
  created() {
    console.log(this.giam_gia)
    this.cart = this.$store.state.cart
  },
  mounted() {
    let state = this.$store.state
    console.log(state.cart)
    // let src="https://www.paypal.com/sdk/js?client-id=AcfIgtefBq7pZdmfuuSCSsZreH8Wlaf4viJK7h3S8K_H0A_fFaQel64_72RyHoShsksUPwTnfpQGhcfc&currency=USD"
    const infoDestinativeUser = this.DestinativeUser
    const total = this.cartTotalPrice -  localStorage.getItem('coupon')
    const items = []
    console.log(this.cart.items)
    for (let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i]
      const obj = {
        id: item.product.id,
        number: item.quantity,
        name_color: item.product.name_color,
        name_size: item.product.name_size,
        product__product_link: item.product.product__product_link,
        price: item.product.price
      }
      items.push(obj)
    }
    async function completeOrder(data, token){
      await axios
        .post('/invoices', data, token)
        .then(response => {
          console.log(response)
          state.cart = { items: [] }
          localStorage.setItem('cart', JSON.stringify(state.cart))
          router.push('/cart/success')
        })
        .catch(error => {
          console.log(error)
          // this.listMessage.push(error)
        })
    }
    function loadScript(url, callback) {
      const el = document.querySelector(`script[src="${url}"]`);
      if (!el) {
        const s = document.createElement('script');
        s.setAttribute('src', url);
        s.setAttribute('data-namespace', "paypal_sdk");
        s.onload = callback;
        document.head.insertBefore(s, document.head.firstElementChild);
      }
    }
    loadScript("https://www.paypal.com/sdk/js?client-id=AcfIgtefBq7pZdmfuuSCSsZreH8Wlaf4viJK7h3S8K_H0A_fFaQel64_" +
      "72RyHoShsksUPwTnfpQGhcfc&currency=USD"
      , () => {
        paypal_sdk.Buttons({
          onClick: () => {
            this.checkValidLogin()
            if (this.listMessage.length > 0) {
              return false;
            }
          },
          // Set up the transaction
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: total
                }
              }]
            });
          },

          // Finalize the transaction
          onApprove: function (data, actions) {
            return actions.order.capture().then(async function (details) {
              // Show a success message to the buyer
              const data = {
                'full_name': infoDestinativeUser.full_name,
                'message': infoDestinativeUser.message,
                'email': infoDestinativeUser.email,
                'address': infoDestinativeUser.address,
                'phone_number': infoDestinativeUser.phone_number,
                'listProduct': items,
                'customer_id': Number(localStorage.getItem('id')),
                'employee_id': null,
                'is_paid': 0,
                'gateway': 'paypal',
                'coupon': localStorage.getItem('coupon')
              }
              console.log(data)
              let token = {
                headers: {'Authorization': `token ${localStorage.getItem("token")}`}
              }
              if (token) {
                await completeOrder(data, token)
                toast({
                  message: 'Transaction completed by ' + details.payer.name.given_name + '!',
                  type: 'is-success',
                  dismissible: true,
                  pauseOnHover: true,
                  duration: 3000,
                  position: 'top-right',
                })
              }
            });
          }
        }).render('#paypal-button');
      })
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    submitForm() {
      if (this.listMessage.length<=0) {
        this.$store.commit('setIsLoading', true)

        this.handle(this.DestinativeUser)
        this.$store.commit('setIsLoading', false)
        // this.listMessage.push('Something went wrong with Stripe. Please try again')
      }
    },
    async handle(infoDestinativeUser) {
      const items = []
      console.log(this.cart.items)
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i]
        const obj = {
          id: item.product.id,
          number: item.quantity,
          name_color: item.product.name_color,
          name_size: item.product.name_size,
          product__product_link: item.product.product__product_link,
          price: item.product.price
        }
        items.push(obj)
      }

      const data = {
        'full_name': infoDestinativeUser.full_name,
        'message': infoDestinativeUser.message,
        'email': infoDestinativeUser.email,
        'address': infoDestinativeUser.address,
        'phone_number': infoDestinativeUser.phone_number,
        'listProduct': items,
        'customer_id': Number(localStorage.getItem('id')),
        'employee_id': null,
        'is_paid': 0,
        'gateway': 'cash',
        'coupon': localStorage.getItem('coupon')
      }
      console.log(data)
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      if (token){
        await axios
          .post('/invoices', data, token)
          .then(response => {
            console.log(response)
            this.$store.commit('clearCart')
            this.$router.push('/cart/success')
            location.reload()
          })
          .catch(error => {
            this.listMessage.push(error)
            // console.log(error)
          })

        this.$store.commit('setIsLoading', false)
      }
      // this.listMessage.push('You need login to checkout')
    }
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.product.price * curVal.quantity
      }, 0)
    },
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return acc += curVal.quantity
      }, 0)
    }
  }
}
</script>

<style scoped>
</style>
