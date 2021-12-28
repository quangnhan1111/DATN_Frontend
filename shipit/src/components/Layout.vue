<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-toolbar-title
        style="width: 350px"
      >
        <a href="/" class="white--text" style="text-decoration: none">&nbsp;Fashion Shop</a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        v-model="search_value"
        class="hidden-sm-and-down pl-10 ml-4"
        @keyup.native.enter = "handleSearch(search_value)"
      >
      </v-text-field>
      <v-spacer />


      <template v-if="$store.state.isAuthenticated">
        HI {{$store.state.full_name}}
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                @click="$router.push('/account')"
              >
                My Account
              </v-list-item>
              <v-list-item
                @click="Logout"
              >
               Logout
              </v-list-item>
            </v-list>
          </v-menu>
      </template>


      <template v-else>
        <router-link tag="button" to="/login/" >Login </router-link>
      </template>



      <v-btn  href="/cart" icon>
        <v-badge
          :content="cartTotalLength"
          :value="cartTotalLength"
          color="green"
          overlap
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-bottom-navigation
        :value="activeBtn"
        color="primary"
        horizontal
      >
        <a href="/" class="v-btn">
          <span>Home</span>
        </a>
        <a href="/shop" class="v-btn">
          <span>Product</span>
        </a>
        <a href="/cart" class="v-btn">
          <span>Cart</span>
        </a>
        <v-btn href="/blog">
          <span>Blog</span>
        </v-btn>
        <a href="/order" class="v-btn" v-if="$store.state.isAuthenticated">
          <span>Order</span>
        </a>
        <a href="/wishlist" class="v-btn" v-if="$store.state.isAuthenticated">
          <span>Wishlist</span>
        </a>
      </v-bottom-navigation>



    </v-content>



      <router-view/>







    <v-footer
      :padless="true"
    >
      <v-card
        flat
        tile
        width="100%"
        class="secondary white--text text-center"
      >
        <v-card-text>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-home</v-icon>
          </v-btn>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-email</v-icon>
          </v-btn>
          <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-calendar</v-icon>
          </v-btn>
           <v-btn
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">mdi-delete</v-icon>
          </v-btn>

        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>ShipIT</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios";
import {mapMutations, mapState} from 'vuex'
export default {

  data () {
    return {
      items: [
        { title: 'My Account' },
        { title: 'Logout' },
      ],
      activeBtn: 1,

      total:1,
      last_page: 1,
      current_page: 1,
      per_page: 1,
      // products: []
      search_value: "",

      cart: {
        items: []
      }
    }
  },
  created() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
    this.cart = this.$store.state.cart

    console.log(this.$store.state)
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, item) => {
        return acc += parseInt(item.quantity)
      }, 0)
    },
  },
  methods: {
    ...mapMutations(['LogoutDispatch']),
    Logout(){
      this.LogoutDispatch();
    },
    handleSearch(search_value){
      console.log(this.$route.path)
      // if(search_value === null || search_value === '') {
      //   this.$router.push({ path: '/' })
      // }
      if (this.$route.path.includes("search-product")) {
        console.log("asdasd")
        this.$router.push({ path: `/search-product/${search_value}` })
        location.reload()
      }
      if(search_value != null && search_value !== '') {
        this.$router.push({ path: `/search-product/${search_value}` })
      }
      else {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>
<style lang="css">
.wrap {
  position: relative;
  display: inline-block;
}

.wrap span {
  position: absolute;
  top: 12px;
  right: 12px;
}

.avatar{
  border-radius: 50%;
}
</style>
