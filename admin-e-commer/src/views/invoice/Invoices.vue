<template>
  <div class="contaner-wrap">
    <div class="table_responsive">
      <div class="header-table">
        <div class="header-table__item">
          <strong class="title"> List Invoice </strong>
          <input
              class="input-search"
              placeholder="Search..."
              v-model="searchValue"
              @input="searchHandler"
          />
        </div>
        <div class="header-table__item">
<!--          <router-link to="/add-invoices"  tag="button" class="btn btn-dark">New Invoice</router-link>-->
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th scope="col">Id Order</th>
          <th scope="col">Customer Order</th>
          <th scope="col">Employee Confirm</th>
          <th scope="col">Status</th>
          <th scope="col">totalPrice</th>
          <th scope="col">full_name_DesUser</th>
          <th scope="col">email_DesUser</th>
          <th scope="col">phone_number_DesUser</th>
          <th scope="col">address_DesUser</th>
          <th scope="col">message</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="Invoice in searchValue.length < 1 ? listInvoice : searchResults" :key="Invoice.id">
          <th scope="row">{{ Invoice.id }}</th>
          <td>{{ Invoice.FullNameCustomer }}</td>
          <td v-if="Invoice.FullNameEmployee">{{ Invoice.FullNameEmployee }}</td>
          <td v-else>None</td>
          <td>{{ (Invoice.is_paid) ? "Paid" : "Unpaid" }} </td>
          <td>{{ Invoice.TotalForPay }}</td>
          <td>{{ Invoice.full_name }}</td>
          <td>{{ Invoice.email }}</td>
          <td>{{ Invoice.phone_number }}</td>
          <td>{{ Invoice.address }}</td>
          <td>{{ Invoice.message }}</td>
          <td>
            <span class="action_btn">
                <router-link :to="`/view-invoice/${Invoice.id}`"  tag="button"  class="btn btn-primary">View</router-link>
                <router-link :to="`/edit-invoice/${Invoice.id}`"  tag="button"  class="btn btn-success" >Edit</router-link>
                <template v-if="Invoice.is_paid == 1">
                                  <button
                                      v-if="Invoice.is_paid == true"
                                      class="btn btn-danger"
                                      :id = "Invoice.id"
                                      @click="deleteInvoice(Invoice.id)"
                                  >Delete
                                  </button>
                </template>
            </span>

          </td>
        </tr>
        </tbody>
      </table>
      <Paginate
          :pagination=paginate
          :totalPages="Math.ceil(paginate.total/paginate.per_page)"
          :total="paginate.total"
          :per-page="paginate.per_page"
          :currentPage="paginate.current_page"
          @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import Paginate from "../../components/paginate/Paginate";
import {toast} from "bulma-toast";


export default {
  name: 'Invoices',
  components:{
    Paginate
  },
  data() {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      listInvoice: [],
      all: {},
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
      flag: 0
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      await axios
          .get('invoice/getInvoicesForEmployeeStatus?page='+this.paginate.current_page, token)
          .then(response => {
            console.log(response.data)
            this.all = response.data
            this.listInvoice = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.last_page = this.all.last_page
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          })
          .catch(error => {
            console.log(error)
          })
    },

    async deleteInvoice(e) {
      e.preventDefault()
      let id = e.target.id.toString()
      console.log(e.target.id.toString())
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.delete('invoices/?id=' + id,token)
          .then(response => {
            // setFilters({...filters, listInvoice: id})
            this.flag = id
            console.log(response.data)
            toast({
              message: 'Deleted Invoice successfully',
              type: 'is-success',
              dismissible: true,
              pauseOnHover: true,
              duration: 3000,
              position: 'top-right',
            })
          })
          .catch(errors => {
            console.log(errors)
          })
    },

    async searchHandler()  {
      if (this.searchValue !== "") {
        // let token = {
        //   headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        // }
        // await  axios.get('image?search='+this.searchValue, token).then((response)=> {
        //   // console.log(response.data)
        //   this.listImage = response.data.content;
        // }).catch((error) =>{ console.log(error)
        // });
        const newInvoiceList = Object.values(this.listInvoice).filter((invoice) => {
          return Object.values(invoice)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        this.searchResults = newInvoiceList;
      } else {
        this.searchResults = this.listInvoice;
      }
      // showAlert(true, 'success', 'search value');
    },
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
    async flag() {
      await this.getData()
    }
  }
}
</script>

<style lang="sass">
body
  font-family: "Roboto"
  font-size: 16px
  color: #505050

#app
  background-color: #fafafa
  max-width: 30%
  height: 21rem
  margin: 0 auto
  margin-top: 3rem
  border-radius: 1rem
  padding: 1rem
  hr
    border: 1px solid silver
    width: 100%
  h2
    font-size: 1.5rem
    text-align: center
    margin-top: 0
  .transactions
    display: flex
    height: calc(100% - 1.25rem)
    flex-direction: column
    .row
      display: flex
      align-items: center
      padding: 0
      margin: .75rem 0
      .col
        justify-content: center
        flex-basis: 25%
        display: inline-flex
    .pagination
      display: flex
      justify-content: center
      padding: 0
      margin: auto 0 0 0
      list-style-type: none
      .pagination-item
        button
          margin: 0!important
          padding: .25rem .5rem
          font-size: 1.1rem
          border: none
          border-radius: .25rem
          background: none
          &:hover
            cursor: pointer
            background-color: silver
          &[disabled="disabled"]
            color: silver
            cursor: default
            &:hover
              cursor: default
              background-color: transparent
          &.active
            color: red

</style>
