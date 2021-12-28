<template>
  <tr>
    <td >
      <v-list-item
        key="1"
        @click=""
      >
        <v-list-item-avatar>
          <v-img :src="item.product.Link_Image"></v-img>
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
        <a class="cart_quantity_up" @click="incrementQuantity(item)"> + </a>
        <input class="cart_quantity_input" type="text" name="quantity" autocomplete="off" size="2" v-model="item.quantity">
        <a class="cart_quantity_down" @click="decrementQuantity(item)"> - </a>
      </div>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td>
      <a @click="removeFromCart(item)"><i class="fa fa-times"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem
    }
  },
  created() {
    console.log(this.item)
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price
    },
    decrementQuantity(item) {
      item.quantity = parseInt(item.quantity) - 1
      if (item.quantity === 0) {
        this.$emit('removeFromCart', item)
      }

      this.updateCart()
    },
    incrementQuantity(item) {
      item.quantity = parseInt(item.quantity) + 1

      this.updateCart()
    },
    updateCart() {
      localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
    },
    removeFromCart(item) {
      this.$emit('removeFromCart', item)
      this.updateCart()
    },
  },
}
</script>

<style scoped>

</style>
