<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light	text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="12" sm="8" >
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">Id Order</th>
                <th class="text-center">Customer Order</th>
                <th class="text-center">Status</th>
                <th class="text-center">totalPrice</th>
                <th class="text-center">full_name_DesUser</th>
                <th class="text-center">email_DesUser</th>
                <th class="text-center">phone_number_DesUser</th>
                <th class="text-center">address_DesUser</th>
                <th class="text-center">message</th>
                <th class="text-center">Action</th>
              </tr>
              </thead>
              <tbody v-if="listInvoice.length > 0">
                <tr v-for="Invoice in list = listInvoice " :key="Invoice.id">
                  <th scope="row">{{ Invoice.id }}</th>
                  <td>{{ Invoice.FullNameCustomer }}</td>
                  <td>{{ (Invoice.is_paid) ? "Paid" : "Unpaid" }} </td>
                  <td>{{ Invoice.TotalForPay }}</td>
                  <td>{{ Invoice.full_name }}</td>
                  <td>{{ Invoice.email }}</td>
                  <td>{{ Invoice.phone_number }}</td>
                  <td>{{ Invoice.address }}</td>
                  <td>{{ Invoice.message }}</td>
                  <td>
                    <router-link :to="`/view-order/${Invoice.id}`"  tag="button">View</router-link>
                  </td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>
        </v-col>
        <div class="text-center" v-if="listInvoice.length > 0">
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
  name: "Orders",
  data() {
    return {
      listInvoice: [],
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      searchValue: "",
      searchResults: [],

    }
  },
  created() {
    this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      console.log(this.$store.state.Id)
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      console.log(token)
      // this.checklogin();
      await axios
        .get('/invoice/getInvoicesForOneCustomerStatus/'+localStorage.getItem('id')+'?page='+this.paginate.current_page, token)
        .then(response => {
          console.log(response.data.data)
          this.listInvoice = response.data.data
          this.paginate.current_page = response.data.current_page
          this.paginate.last_page = response.data.last_page
          this.paginate.per_page = response.data.per_page
          this.paginate.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },

    // async searchHandler()  {
    //   if (this.searchValue !== "") {
    //     let token = {
    //       headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
    //     }
    //     await  axios.get('category?search='+this.searchValue, token).then((response)=> {
    //       // console.log(response.data)
    //       this.listCategory(response.data.content);
    //     }).catch((error) =>{ console.log(error)
    //     });
    //     const newCategoryList = this.listCategory.filter((category) => {
    //       return Object.values(category)
    //           .join(" ")
    //           .toLowerCase()
    //           .includes(this.searchValue.toLowerCase());
    //     });
    //     this.searchResults = newCategoryList;
    //   } else {
    //     this.searchResults = this.listCategory;
    //   }
    //   // showAlert(true, 'success', 'search value');
    // },

  },
  watch: {
    paginate: {
      handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        this.getData();
      },
      deep: true
    },
  }
}
</script>

<style scoped>

</style>
