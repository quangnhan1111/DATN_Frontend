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
            <h4 class="card-title">Edit Invoice</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <table class="table-responsive">
                  <thead>
                  <tr>
                    <th scope="col">Id Order</th>
                    <th scope="col">Customer Order</th>
                    <th scope="col">Status</th>
                    <th scope="col">totalPrice</th>
                    <th scope="col">full_name_DesUser</th>
                    <th scope="col">email_DesUser</th>
                    <th scope="col">phone_number_DesUser</th>
                    <th scope="col">address_DesUser</th>
                    <th scope="col">message</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">{{ Invoice.id }}</th>
                    <td>{{ Invoice.FullNameCustomer }}</td>
                    <td>
                      <b-form-select v-model="Invoice.is_paid" :options="listStatus" style="width: 100px;"></b-form-select>
                    </td>
                    <td>{{ Invoice.TotalForPay }}</td>
                    <td>{{ Invoice.full_name }}</td>
                    <td>{{ Invoice.email }}</td>
                    <td>{{ Invoice.phone_number }}</td>
                    <td>{{ Invoice.address }}</td>
                    <td>{{ Invoice.message }}</td>
                  </tr>
                  </tbody>
                </table>

              </div>
              <div class="form-group" >
                <label>List product</label>
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th scope="col">ID Product</th>
                      <th scope="col">Name Product</th>
                      <th scope="col">price Product</th>
                      <th scope="col">Image</th>
                      <th scope="col">NameColors Product</th>
                      <th scope="col">NameGender Product</th>
                      <th scope="col">Name_size Product</th>
                      <th scope="col">numberSoldOut Product</th>
                      <th scope="col">Total NumberWareProduct</th>
                      <th scope="col">Total Price For this product</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(element, index) in listInvoiceDetails" :key="index">
                          <td>{{ element.id }}</td>
                          <td>{{ element.nameProduct }}</td>
                          <td>{{ element.priceProduct }}.00$</td>
                          <td>{{ element.nameProduct }}</td>
                          <td>{{ element.NameColors }}</td>
                          <td>{{ element.NameGender }}</td>
                          <td>{{ element.nameSizeProduct }}</td>
                          <td>{{ element.numberSoldOut }}</td>
                          <td>{{ element.TotalNumberWareProduct }}</td>
                          <td>${{ element.priceProduct * element.numberSoldOut }}</td>
                        </tr>
                        <tr>

<!--                            <td colSpan="0"></td>-->
                            <td>Total For this Invoice: ${{ totalPriceForThisInvoice }}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="button" name="example-email" class="btn btn-info" @click="back">BACK </button>
                <button type="button" name="example-email" class="btn btn-info" @click="handleEdit">Edit </button>
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
// import axios from "axios";
import {toast} from "bulma-toast";
// import paginate from "../../utils/helper";

import axios from "axios";

export default {
  name: 'EditInvoice',
  data() {
    return {
      listInvoiceDetails:[],
      Invoice:{},
      message:"",
      listStatus:[
        { value: false, text: 'UnPaid' },
        { value: true, text: 'Paid' },
      ],
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      },
      totalPriceForThisInvoice: 0
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      // checklogin();

      let id = this.$route.params.id
      await axios.get('/invoice/showOneInvoicesAndShowCustomer/'+id, this.token).then((response)=> {
        // console.log(response.data.data[0].is_paid)
        this.nameCustomerOrder = response.data.data[0].FullNameCustomer
        this.totalPriceForThisInvoice = response.data.data[0].TotalForPay
        this.is_paid = response.data.data[0].is_paid
        this.listInvoiceDetails = response.data.data
      }).catch(() =>{
      });

      await axios.get('/invoice/showOneInvoices/'+id, this.token).then((response)=> {
        console.log(response.data.data[0].is_paid)
        this.Invoice = response.data.data[0]
      }).catch(() =>{
      });
    },

    async handleEdit() {
      const data = {
        is_paid: this.Invoice.is_paid,
        employee_id: localStorage.getItem('id')
      }
      console.log(data)
      let id = this.$route.params.id
      await axios.put('invoices?id=' + id, data, this.token).then((response) => {
        console.log(response.data)
        toast({
          message: 'Edit Invoice successfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'top-right',
        })
        // success('Edit Success Post');
      }).catch((error) => {
        console.log(error)
      });
    },

    back() {
      this.$router.push('/invoices')
    },
  }
}
</script>
