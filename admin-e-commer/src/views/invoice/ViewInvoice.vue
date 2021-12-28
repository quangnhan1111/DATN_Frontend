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
            <h4 class="card-title">View Invoice</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>Name Customer Order</label>
                <input class="form-control" type="text"  name="title" value="" v-model="nameCustomerOrder" readOnly/>

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
                      <td>${{ element.priceProduct }}</td>
                      <td>{{ element.nameProduct }}</td>
                      <td>{{ element.NameColors }}</td>
                      <td>{{ element.NameGender }}</td>
                      <td>{{ element.nameSizeProduct }}</td>
                      <td>{{ element.numberSoldOut }}</td>
                      <td>{{ element.TotalNumberWareProduct }}</td>
                      <td>{{ element.priceProduct * element.numberSoldOut }}.00$</td>
                    </tr>
                    <tr>

                      <td colSpan="8"></td>
                      <td>Status For this Invoice:
                        <input
                            class="form-control"
                            type="text"
                            name="title"
                            v-if="is_paid == 0"
                            value="unpaid"
                            disabled/>
                        <input
                            class="form-control"
                            type="text"
                            name="title"
                            v-else
                            value="paid"
                            disabled/>
                      </td>
                      <td>Total For this Invoice: ${{ totalPriceForThisInvoice }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="button" name="example-email" class="btn btn-info" @click="back">BACK </button>
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

// import paginate from "../../utils/helper";

import axios from "axios";

export default {
  name: 'ViewInvoice',
  data() {
    return {
      listInvoiceDetails:[],
      totalPriceForThisInvoice:1,
      nameCustomerOrder:"",
      is_paid:0,
      message:"",
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
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
        console.log(response.data.data[0].is_paid)
        this.nameCustomerOrder = response.data.data[0].FullNameCustomer
        this.totalPriceForThisInvoice = response.data.data[0].TotalForPay
        this.is_paid = response.data.data[0].is_paid
        this.listInvoiceDetails = response.data.data
      }).catch(() =>{
      });
    },

    back() {
      this.$router.push('/invoices')
    },
  }
}
</script>
