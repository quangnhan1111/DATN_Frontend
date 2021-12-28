<template>
  <div class="container">
    <!-- edit form column -->
    <div class="col-lg-12 text-lg-center">
      <h2>Edit Role</h2>
      <br>
      <br>
    </div>
    <div class="col-lg-8 push-lg-4 personal-info">
      <form role="form" >
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Id</label>
          <div class="col-lg-9">
            <input disabled class="form-control" type="text"  v-model="role.id"/>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-lg-3 col-form-label form-control-label">Name</label>
          <div class="col-lg-9">
            <input class="form-control" type="text"  v-model="role.name" />
          </div>
        </div>

        <div class="form-group row">
          <div class="error-mesage" v-if="message.length">
            <ul>
              <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
            </ul>
          </div>
          <div class="col-lg-9">
            <input type="reset" class="btn btn-secondary" value="Cancel" />
            <button type="button" name="example-email" class="btn btn-info" @click="back">BACK </button>
            <input type="button" class="btn btn-primary" value="Save Changes" @click="handleEdit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
import axios from "axios";
import {toast} from "bulma-toast";

// import paginate from "../../utils/helper";

export default {
  name: 'EditRole',
  data() {
    return {
      role:{
        id:"",
        name:""
      },
      message:[]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    back() {
      this.$router.push('/roles')
    },
    checkValid() {
      this.message = []
      if( !this.role.name ) {
        this.message.push('Name role Required')
      }else if(this.role.name.length <2){
        this.message.push('Name role min is 2 character')
      }
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      let id = this.$route.params.id
      console.log(id)
      await axios.get('role/' + id, token).then((response)=> {
        console.log(response.data.data)
        this.role = response.data.data
      }).catch((error) =>{ console.log(error)
      });
    },


    async handleEdit() {
      console.log("SAD")
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          "name": this.role.name
        }
        let token = {
          headers: {'Authorization': `token ${localStorage.getItem("token")}`}
        }
        let id = this.$route.params.id
        console.log(data)
        console.log(data)
        await axios.put('roles/?id=' + id, data, token).then((response) => {
          console.log(response.data.data)
          toast({
            message: 'Edit Role successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/roles')
          // success('Edit Success color');

        }).catch((error) => {
          console.log(error)
        });
      }
    }
  }
}
</script>
<style lang="scss">
.error{
  color: red;
  text-align: center;
  font-weight: bold;

}
</style>
