<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">Detail Order</p>
      <v-row>
        <v-col :cols="12" md="12" sm="8" >
          <v-simple-table >
            <template v-slot:default>
              <thead>
              <tr>
                <th scope="col">Id Order</th>
                <th scope="col">Image Product</th>
                <th scope="col">Customer Order</th>
                <th scope="col">Status</th>
                <th scope="col">name_product</th>
                <th scope="col">number_sold_out</th>
                <th scope="col">NameColors</th>
                <th scope="col">NameGender</th>
                <th scope="col">name_size</th>
                <th scope="col">price</th>
                <th scope="col">TotalNumberWareProduct</th>
                <th scope="col">TotalPrice</th>
              </tr>
              </thead>
              <tbody >
              <tr v-for="invoiceDetail in list = invoiceDetail " :key="invoiceDetail.id">
                  <th scope="row">{{ invoiceDetail.id }}</th>
                  <img :src="invoiceDetail.link" width="500px"  height="400px" alt="">
                  <td>{{ invoiceDetail.FullNameCustomer }}</td>
                  <td>{{ (invoiceDetail.is_paid) ? "Paid" : "Unpaid" }} </td>
                  <td>{{ invoiceDetail.nameProduct }}</td>
                  <td>{{ invoiceDetail.numberSoldOut }}</td>
                  <td>{{ invoiceDetail.NameColors }}</td>
                  <td>{{ invoiceDetail.NameGender }}</td>
                  <td>{{ invoiceDetail.nameSizeProduct }}</td>
                  <td>{{ invoiceDetail.priceProduct }}</td>
                  <td>{{ invoiceDetail.TotalNumberWareProduct }}</td>
                  <td>{{ invoiceDetail.priceProduct * invoiceDetail.numberSoldOut}}</td>
                </tr>
              <tr>
                <td colspan="4">&nbsp;</td>
                <td colspan="2">
                  <table class="table table-condensed total-result">
                    <tr>
                      <td >Total Price For THis Invoice</td>
                      <td><span>${{ parseFloat(TotalForPay).toFixed(2) }}$</span></td>
                    </tr>
                  </table>
                </td>
              </tr>
              </tbody>

            </template>
          </v-simple-table>
        </v-col>
        <div class="text-center">
          <v-pagination
            v-model="paginate.current_page"
            :length="Math.ceil(paginate.total/paginate.per_page)"
            :total-visible="7"
            @change="onPageChange"
          ></v-pagination>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderDetail",
  data() {
    return {
      TotalForPay: "",
      invoiceDetail:{
        id: "",
        is_paid:"",
        numberSoldOut: "",
        name:"",
        name_size:"",
        price:"",
        TotalNumberWareProduct:"",
        NameColors:"",
        NameGender: "",
        FullNameCustomer: "",
        link : "",
      },
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      id: this.$route.params.id,
      message:"",
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData (){
      // checklogin();
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.get('/invoice/showOneInvoicesAndShowCustomer/' + this.id, token).then((response)=> {
        console.log(response.data.data)
        this.all = response.data
        this.invoiceDetail = this.all.data
        this.TotalForPay = this.all.data[0].TotalForPay
        this.paginate.current_page = this.all.current_page
        this.paginate.last_page = this.all.last_page
        this.paginate.per_page = this.all.per_page
        this.paginate.total = this.all.total
      }).catch((error) =>{console.log(error) });
    },

    back() {
      this.$router.push('/order')
    }
  },
  watch: {
    paginate: {
      async handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        await this.getData();
      },
      deep: true
    },
  }
}
</script>

<style scoped>

</style>
