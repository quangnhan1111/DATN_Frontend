<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Invoice</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Invoice</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Email Customer Destination</label>
                <input class="form-control" type="text"  name="title" value="invoice.title" v-model="invoice.title" />
              </div>
              <div class="form-group">
                <label>Name Customer Destination</label>
                <input class="form-control" type="text"  name="title" value="invoice.full_name" v-model="invoice.full_name" />
              </div>
              <div class="form-group">
                <label>Phone Customer Destination</label>
                <input class="form-control" type="text"  name="title" value="invoice.phone_number" v-model="invoice.phone_number" />
              </div>
              <div class="form-group">
                <label>Address Customer Destination</label>
                <input class="form-control" type="text"  name="title" value="invoice.address" v-model="invoice.address" />
              </div>
              <div class="form-group">
                <label>Message Customer Destination</label>
                <input class="form-control" type="text"  name="title" value="invoice.message" v-model="invoice.message" />
              </div>
              <div class="form-group">
                <label>select Customer Order</label>
                <b-form-select v-model="invoice.customer_id" :options="listCustomer"></b-form-select>
              </div>
              <div class="form-group">
                <label>select Product For Order</label>
                <b-form-select v-model="invoice.listProduct" :options="listProduct"></b-form-select>
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="submit" name="example-email" class="btn btn-info" @click="handleAdd">Save </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
export default {
  name: 'AddInvoice',
  data() {
    return {
      invoice:{
        customer_id : 0,
        employee_id : JSON.parse(localStorage.getItem('id')),
        is_paid:0,
        listProduct: [],
        totalMoney: 0,
        email:"",
        address:"",
        full_name:"",
        phone_number:"",
        message:""
      },
      message:"",
      listCustomer: [],
      listProduct: [],
      token :{
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      await axios.get('/admin/user/customer/getAll', this.token).then((response)=> {
        console.log(response.data.data)
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:"full_name: "+response.data.data[i].full_name+" and email: "+response.data.data[i].email,
          }
          this.listCustomer.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
    },

    async handleAdd() {
      const items = []
      for (let i = 0; i < this.listProduct.length; i++) {
        const item = this.listProduct[i]
        const obj = {
          id: item.id,
          number: item.quantity,
          // price: item.product.price * item.quantity
        }
        items.push(obj)
      }
      const data = {
        'full_name': this.invoice.full_name,
        'email': this.invoice.email,
        'address': this.invoice.address,
        'phone_number': this.invoice.phone_number,
        'message': this.invoice.message,
        'listProduct': items,
        'customer_id': this.invoice.customer_id,
        'employee_id': this.invoice.employee_id,
        'is_paid': 0,
        'totalMoney': 0,
      }
      console.log(data)
      await axios
          .post('/invoices/', data)
          .then(response => {
            console.log(response)
            // this.$store.commit('clearCart')
            this.$router.push('/invoices')
          })
          .catch(error => {
            this.errors.push('Something went wrong. Please try again')
            console.log(error)
          })

      // this.$store.commit('setIsLoading', false)
    },
    back() {
      this.$router.push('/invoices')
    }
  }


}
</script>
