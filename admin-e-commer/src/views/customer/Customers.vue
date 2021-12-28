<template>
  <div class="contaner-wrap">
    <div class="table_responsive">
      <div class="header-table">
        <div class="header-table__item">
          <strong class="title"> List Customer </strong>
          <input
              class="input-search"
              placeholder="Search..."
              v-model="searchValue"
              @input="searchHandler"
          />
        </div>
        <div class="header-table__item">
          <template >
            <router-link to="/add-customer"  tag="button" class="btn btn-dark">New Customer</router-link>
          </template>
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>full_name</th>
          <th>email</th>
          <th>address</th>
          <th>phone_number</th>
          <th>created_at</th>
          <th>updated_at</th>
          <th>status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in searchValue.length < 1 ? listCustomer : searchResults" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
          <td>{{item.full_name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.address}}</td>
          <td>{{item.phone_number}}</td>
          <td>{{item.created_at}}</td>
          <td>{{item.updated_at}}</td>
          <td>
            <label class="switch">
              <input type="checkbox" :checked="item.status" @change="ToggleStatus(item.id)">
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <span class="action_btn">
               <router-link :to="`/edit-customer/${item.id}`"
                            tag="button" class="btn"
               >Edit
              </router-link>
              <button class="btn" @click="deleteCustomer(item.id)">Remove</button>
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
import axios from "axios";
import {toast} from "bulma-toast";
import Paginate from "../../components/paginate/Paginate";
// import {toast} from "bulma-toast";
export default {
  name: 'Customers',
  components: { Paginate },
  data () {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      show: false,
      navbarText: false,
      navbarDropdown: false,

      searchValue:"",
      searchResults:[],
      listCustomer: [],
      all: {},
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      flag: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      console.log(token)
      axios
          .get('admin/customers?page='+this.paginate.current_page, token)
          .then(response => {
            console.log(response.data.data)
            this.all = response.data
            this.listCustomer = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.last_page = this.all.last_page
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          })
          .catch(error => {
            console.log(error)
          })
    },

    async ToggleStatus(id){
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.get('customer-activate/' + id, token).then((response) => {
        console.log(response.data)
        toast({
          message: 'Toggle status Customer successfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
          duration: 3000,
          position: 'top-right',
        })
        // success('Edit Success Category');

      }).catch((error) => {
        console.log(error)
      });

      await this.getData()
    },
    searchHandler(){
      if (this.searchValue !== "") {
        // let token = {
        //   headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
        // }
        // await  axios.get('categories?search='+this.searchValue, token).then((response)=> {
        //   // console.log(response.data)
        //   this.listCategory = response.data.data.data;
        // }).catch((error) =>{ console.log(error)
        // });
        const newCustomerList = Object.values(this.listCustomer).filter((customer) => {
          return Object.values(customer)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        this.searchResults = newCustomerList;
      } else {
        this.searchResults = this.listCustomer;
      }
    },
    async deleteCustomer(id) {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.delete('admin/customers?id=' + id,token)
          .then(response => {
            this.flag = id
            console.log(response.data)
            toast({
              message: 'Deleted Customer successfully',
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
      await this.getData()
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
<!--<style scoped="">-->
<!--.input-search{-->
<!--  border-radius: 3%;-->
<!--  align-items: center;-->
<!--  margin: 0 0 5px 0;-->
<!--}-->

<!--@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;500&display=swap');-->

<!--* {-->
<!--  box-sizing: border-box;-->
<!--}-->

<!--/*body {*/-->
<!--/*  min-height: 100vh;*/-->
<!--/*  display: flex;*/-->
<!--/*  font-family: 'Roboto', sans-serif;*/-->
<!--/*}*/-->

<!--.contaner-wrap{-->
<!--  margin: 20px 0 20px 0;-->
<!--}-->
<!--.table_responsive {-->
<!--  width: 1300px;-->
<!--  border: 1px solid #00bcd4;-->
<!--  background-color: #efefef33;-->
<!--  padding: 15px;-->
<!--  overflow: auto;-->
<!--  margin: auto;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.header-table{-->
<!--  margin: 10px 10px 10px 10px;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--}-->

<!--.header-table__item{-->

<!--}-->

<!--table {-->
<!--  width: 100%;-->
<!--  font-size: 13px;-->
<!--  color: #444;-->
<!--  white-space: nowrap;-->
<!--  border-collapse: collapse;-->
<!--  height: 100%;-->
<!--}-->

<!--table>thead {-->
<!--  background-color: #00bcd4;-->
<!--  color: #fff;-->
<!--}-->

<!--table>thead th {-->
<!--  padding: 15px;-->
<!--}-->

<!--table th,-->
<!--table td {-->
<!--  border: 1px solid #00000017;-->
<!--  padding: 10px 15px;-->
<!--}-->

<!--table>tbody>tr>td>img {-->
<!--  display: inline-block;-->
<!--  width: 60px;-->
<!--  height: 60px;-->
<!--  object-fit: cover;-->
<!--  border-radius: 50%;-->
<!--  border: 4px solid #fff;-->
<!--  box-shadow: 0 2px 6px #0003;-->
<!--}-->


<!--.action_btn {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  gap: 10px;-->
<!--}-->

<!--.action_btn>btn {-->
<!--  text-decoration: none;-->
<!--  color: #444;-->
<!--  background: #fff;-->
<!--  border: 1px solid;-->
<!--  display: inline-block;-->
<!--  padding: 7px 20px;-->
<!--  font-weight: bold;-->
<!--  border-radius: 3px;-->
<!--  transition: 0.3s ease-in-out;-->
<!--}-->

<!--.action_btn>btn:nth-child(1) {-->
<!--  border-color: #26a69a;-->
<!--}-->

<!--.action_btn>btn:nth-child(2) {-->
<!--  border-color: orange;-->
<!--}-->

<!--.action_btn>btn:hover {-->
<!--  box-shadow: 0 3px 8px #0003;-->
<!--}-->


<!--table>tbody>tr {-->
<!--  background-color: #fff;-->
<!--  transition: 0.3s ease-in-out;-->
<!--}-->


<!--table>tbody>tr:nth-child(even) {-->
<!--  background-color: rgb(238, 238, 238);-->
<!--}-->

<!--table>tbody>tr:hover{-->
<!--  filter: drop-shadow(0px 2px 6px #0002);-->
<!--}-->
<!--</style>-->





























