<template>

  <div class="contaner-wrap">
    <div class="table_responsive">
      <div class="header-table">
        <div class="header-table__item">
          <strong class="title"> List user of role </strong>
          <input
              class="input-search"
              placeholder="Search..."
              v-model="searchValue"
              @input="searchHandler"
          />
        </div>
        <div class="header-table__item">
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>username</th>
<!--          <th>full_name</th>-->
          <th>email</th>
          <th>address</th>
          <th>phone_number</th>
          <th>created_at</th>
          <th>updated_at</th>
          <th v-if="$route.params.id != 1">status</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in searchValue.length < 1 ? data_to_pass : searchResults" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.username}}</td>
<!--          <td>{{item.full_name }}</td>-->
          <td>{{item.email}}</td>
          <td>{{item.address}}</td>
          <td>{{item.phone_number}}</td>
          <td>{{validateDateTime(Date.parse(item.created_at))}}</td>
          <td>{{validateDateTime(Date.parse(item.updated_at))}}</td>
          <td v-if="$route.params.id != 1">
            <label class="switch" >
              <input type="checkbox" :checked="item.status" @change="ToggleStatus(item.user_id, item.id)">
              <span class="slider round"></span>
            </label>
          </td>

        </tr>
        </tbody>
      </table>
      <Paginate
          v-if="listUserOfRole.length > 0"
          :pagination=paginate
          :totalPages="Math.ceil(paginate.total/paginate.per_page)"
          :total="paginate.total"
          :per-page="paginate.per_page"
          :currentPage="paginate.current_page"
          @pagechanged="onPageChange"
      />
      <button type="button" name="example-email" class="btn btn-danger" @click="back">Back </button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import {toast} from "bulma-toast";
import {validateTime} from "../../utils/checkValidation"
import Paginate from "../../components/paginate/Paginate";
export default {
  name: 'ListUserOfRole',
  components: { Paginate },
  data () {
    return {
      show: false,
      navbarText: false,
      navbarDropdown: false,

      searchValue:"",
      searchResults:[],
      listUserOfRole: [],
      data_to_pass: [],
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
    }
  },
  created() {
    this.getData()
  },
  methods: {
    validateDateTime(date){
      return validateTime(date)
    },
    back() {
      this.$router.push('/roles')
    },
    onPageChange(page){
      this.paginate.current_page = page
    },
    async ToggleStatus(user_id, id){
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let nameRole = '';
      await axios.get('role/get-role-by-user/' + user_id, token).then((response) => {
        nameRole = response.data.data
      }).catch((error) => {
        console.log(error)
      });
      let url = ''
      if(nameRole === 'staff' || nameRole === 'admin') {
        url = 'staff-activate/' + id
      }
      else if(nameRole === 'customer') {
        url = 'customer-activate/' + id
      }
      await axios.get(url, token).then((response) => {
        console.log(response.data)
        toast({
          message: 'Toggle status Staff successfully',
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
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      let id = this.$route.params.id
      // this.checklogin();
      this.data_to_pass = []
      axios
          .get('/role/get-users-by-role/' + id, token)
          .then(response => {
            console.log(response.data)
            this.paginate.current_page = response.data.current_page
            this.paginate.last_page = response.data.last_page
            this.paginate.per_page = response.data.per_page
            this.paginate.total = response.data.total
            this.listUserOfRole = response.data.data
            for (let user of this.listUserOfRole){
              this.data_to_pass.push({
                address: user.address,
                created_at: user.created_at,
                deleted_at: user.deleted_at,
                id: user.id,
                user_id: user.user.id,
                phone_number: user.phone_number,
                status: user.status,
                updated_at: user.updated_at,
                email: user.user.email,
                full_name: user.user.last_name + " " + user.user.first_name,
                username: user.user.username
              });
            }
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
        this.searchResults = Object.values(this.data_to_pass).filter((user) => {
          return Object.values(user)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
      } else {
        this.searchResults = this.data_to_pass;
      }
    },
  }
}
</script>
<style>
.input-search{
  border-radius: 3%;
}
</style>














