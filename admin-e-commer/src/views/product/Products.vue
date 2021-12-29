<template>
  <div class="contaner-wrap">
    <div class="table_responsive">
      <div class="header-table">
        <div class="header-table__item">
          <strong class="title"> List products </strong>
          <input
              class="input-search"
              placeholder="Search..."
              v-model="searchValue"
              @input="searchHandler"
          />
        </div>
        <div class="header-table__item">
          <template >
            <router-link to="/add-product"  tag="button" class="btn btn-dark">New products</router-link>
          </template>
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>image</th>
          <th>number</th>
          <th>price</th>
          <th>updated_at</th>
          <th>status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in searchValue.length < 1 ? listProduct : searchResults" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <img :src="item.image_link" width="200px"  height="200px" alt="">
          <td>{{item.number}}</td>
          <td>${{item.price.toFixed(2)}}</td>
          <td>{{item.updated_at}}</td>
          <td>
            <label class="switch">
              <input type="checkbox" :checked="item.status" @change="ToggleStatus(item.id)">
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <span class="action_btn">
               <router-link :to="`/edit-product/${item.id}`"
                            tag="button" class="btn"
               >Edit
              </router-link>
               <router-link :to="`/view-product/${item.id}`"
                            tag="button" class="btn"
               >View
              </router-link>
              <button class="btn" @click="deleteProduct(item.id)">Remove</button>
            </span>

          </td>
        </tr>
        </tbody>
      </table>
      <Paginate
          v-if="listProduct.length > 0"
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

export default {
  name: 'Products',
  components: { Paginate },
  data () {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      // show: false,
      // navbarText: false,
      // navbarDropdown: false,

      searchValue:"",
      searchResults:[],
      listProduct: [],
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
      axios
          .get('/product-list?page='+this.paginate.current_page, token)
          .then(response => {
            // console.log(response.data.data)
            this.all = response.data
            this.listProduct = this.all.data
            // console.log(this.listProduct)
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
      await axios.get('product-activate/' + id, token).then((response) => {
        console.log(response.data)
        toast({
          message: 'Toggle status Product successfully',
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
        this.searchResults = Object.values(this.listProduct).filter((product) => {
          return Object.values(product)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
      } else {
        this.searchResults = this.listProduct;
      }
    },
    async deleteProduct(id) {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.delete('products?id=' + id,token)
          .then(response => {
            this.flag = id
            console.log(response.data)
            toast({
              message: 'Deleted Product successfully',
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
<style>
.input-search{
  border-radius: 3%;
}
</style>














