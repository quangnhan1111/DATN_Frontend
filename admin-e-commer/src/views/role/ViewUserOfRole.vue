<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">User</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">View User</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>ID User</label>
                <input class="form-control" type="text" value="" v-model="user.id" />
              </div>
              <div class="form-group">
                <label>last Name</label>
                <input class="form-control" type="text" value="" v-model="user.user.last_name" />
              </div>
              <div class="form-group">
                <label>First Name</label>
                <input class="form-control" type="text" value="" v-model="user.user.first_name" />
              </div>
              <div class="form-group">
                <label>User Name</label>
                <input class="form-control" type="text" value="" v-model="user.user.username" />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input class="form-control" type="text" value="" v-model="user.user.email" />
              </div>
              <div class="form-group">
                <label>Address</label>
                <input class="form-control" type="text" value="" v-model="user.address" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input class="form-control" type="text" value="" v-model="user.phone_number" />
              </div>

              <div class="form-group" >
                <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
                <button type="submit" name="example-email" class="btn btn-info" @click="back">Back </button>
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
  name: 'ViewUserOfRole',
  data() {
    return {
      user:{
        user: {
          username: "",
          first_name:"",
          last_name:"",
          email: "",
        },
        address: "",
        phone_number: "",
      },
      message:""
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      let role_id = this.$route.params.idRole
      let name_role=""
      console.log(id)
      console.log(role_id)
      await axios.get('role/' + role_id,token)
          .then(response => {
            name_role = response.data.data.name
            console.log(name_role)
          })
          .catch(errors => {
            console.log(errors)
          })
      if(name_role == 'admin' || name_role == 'employee'){
        await axios.get('employee/' + id,token)
            .then(response => {
              console.log(response.data)
              this.user = response.data
            })
            .catch(errors => {
              console.log(errors)
            })
      }
      else if(name_role=='customer') {
        await axios.get('customer/' + id, token)
            .then(response => {
              // setFilters({...filters, category_edit_id: id})
              console.log(response.data.data)
              this.user = response.data.data
            })
            .catch(errors => {
              console.log(errors)
            })
      }

    },

    back() {
      let idRole = this.$route.params.idRole
      this.$router.push('/user-of-role/'+idRole)
    }
  }



}
</script>
