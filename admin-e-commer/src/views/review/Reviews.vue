<template>
  <div class="contaner-wrap">
    <div class="table_responsive">
      <div class="header-table">
        <div class="header-table__item">
          <strong class="title"> List Reviews </strong>
          <input
              class="input-search"
              placeholder="Search..."
              v-model="searchValue"
              @input="searchHandler"
          />
        </div>
        <div class="header-table__item">
<!--          <template v-if="auth == 1">-->
<!--            <router-link to="/add-brand"  tag="button" class="btn btn-dark">New Brand</router-link>-->
<!--          </template>-->
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>content</th>
          <th>number_of_star</th>
          <th>ProductName</th>
          <th>UserName</th>
          <th>created_at</th>
<!--          <th>Action</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in searchValue.length < 1 ? listReview : searchResults" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.content}}</td>
          <td>{{item.star}}</td>
          <td>{{item.ProductName}}--{{item.product_id}}</td>
          <td>{{item.UserName}}---{{item.customer}}</td>
          <td>{{item.created_at}}</td>
<!--          <td>-->
<!--            <span class="action_btn">-->

<!--              <button class="btn" @click="deleteReview(item.id)">Remove</button>-->
<!--            </span>-->

<!--          </td>-->
        </tr>
        </tbody>
      </table>
      <Paginate
          v-if="listReview.length > 0"
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
  name: 'Reviews',
  components: { Paginate },
  data () {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      show: false,
      navbarText: false,
      navbarDropdown: false,

      searchValue:"",
      searchResults:[],
      listReview: [],
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
          .get('/reviews', token)
          .then(response => {
            console.log(response.data.data)
            this.all = response.data
            this.listReview = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.last_page = this.all.last_page
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          })
          .catch(error => {
            console.log(error)
          })
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
        this.searchResults = Object.values(this.listReview).filter((review) => {
          return Object.values(review)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
      } else {
        this.searchResults = this.listReview;
      }
    },
    async deleteReview(id) {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.delete('reviews/?id=' + id,token)
          .then(response => {
            console.log(response.data)
            toast({
              message: 'Deleted Review successfully',
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














