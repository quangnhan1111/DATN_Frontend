<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="row">
        <div class="col-5 align-self-center">
          <h4 class="page-title">Role</h4>
        </div>

      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card card-body">
            <h4 class="card-title">New Role</h4>
            <form class="form-horizontal m-t-30">
              <div class="form-group">
                <label>NAME</label>
                <input class="form-control" type="text"  name="title"  v-model="role.name" />
              </div>
              <div class="form-group" >
                <div class="error-mesage" v-if="message.length">
                  <ul>
                    <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
                  </ul>
                </div>
                <input type="reset" class="btn btn-secondary" value="Cancel" />
                <button type="button" name="example-email" class="btn btn-info" @click="back">Back </button>
                <button type="button" name="example-email" class="btn btn-info" @click="handleAdd">Save </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {toast} from "bulma-toast";

export default {
  name: 'AddRole',
  data() {
    return {
      role:{
        id: "",
        name:"",
      },
      message:[],
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  methods: {
    checkValid() {
      this.message = []
      if( !this.role.name ) {
        this.message.push('Name role Required')
      }else if(this.role.name.length <2){
        this.message.push('Name role min is 2 character')
      }
    },
    async handleAdd() {
      this.checkValid()
      if(this.message.length<=0){
        const data = {
          name: this.role.name,
        }
        await axios.post('/roles', data, this.token)
            .then(response => {
              console.log(response.data)
              this.$router.push('/roles')
              toast({
                message: 'Add Role successfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
                duration: 3000,
                position: 'top-right',
              })
              // success('Add Success Post');
            })
            .catch(errors => {
              console.log(errors)
            })
      }

    },

    back() {
      this.$router.push('/roles')
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
