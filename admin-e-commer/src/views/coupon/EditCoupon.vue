<template>
  <div class="wrapper">
    <div class="title">
      Edit Brand
    </div>
    <div class="notification" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>Id</label>
        <input type="text" class="input" v-model="coupon.id" disabled>
      </div>
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="coupon.name">
      </div>
      <div class="inputfield">
        <label>Time</label>
        <input type="text" class="input" v-model="coupon.time">
      </div>
      <div class="inputfield">
        <label>Condition</label>
        <b-form-select v-model="coupon.condition" :options="Condition"></b-form-select>
      </div>
      <div class="inputfield">
        <label>value</label>
        <input type="text" class="input" v-model="coupon.value">
      </div>
      <div class="inputfield">
        <label>name_code</label>
        <input type="text" class="input" v-model="coupon.name_code">
      </div>
      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="coupon.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield">
        <input type="reset" class="btn btn-secondary" value="Cancel" @click="cancel"/>
        <input type="submit" class="btn btn-primary" value="Edit"/>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import {toast} from "bulma-toast";
import router from "../../router";

export default {
  name: 'EditCoupon',
  data() {
    return {
      coupon:{
        id:"",
        name: "",
        time: "",
        condition: "",
        value: "",
        name_code: "",
        status: true
      },
      Status:[
        { value: true, text: 'Active' },
        { value: false, text: 'Un-Active' },
      ],
      Condition:[
        { value: 'PHAN_TRAM', text: 'PHAN_TRAM' },
        { value: 'TIEN_MAT', text: 'TIEN_MAT' },
      ],
      message:[],
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    cancel(){
      router.push('/coupons')
    },
    getData (){
      let idCoupon = this.$route.params.id
      axios.get('coupon/' + idCoupon, this.token).then((response)=> {
        console.log(response.data.data)
        this.coupon = response.data.data
      }).catch((error) =>{console.log(error) });

    },
    checkValid() {
      this.message = []
      if( !this.coupon.name ) {
        this.message.push('Name Coupon Required')
      }else if(this.coupon.name.length <3){
        this.message.push('Name Coupon min is 3 character')
      }

      if( !this.coupon.time ) {
        this.message.push('time Coupon Required')
      }

      if( !this.coupon.condition ) {
        this.message.push('condition Coupon Required')
      }

      if( !this.coupon.value ) {
        this.message.push('value Coupon Required')
      }

      if( !this.coupon.name_code ) {
        this.message.push('name_code Coupon Required')
      }
    },
    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let idCoupon = this.$route.params.id
        await axios.put('coupons?id=' + idCoupon, this.coupon, this.token).then((response) => {
          console.log(response.data)
          toast({
            message: 'Edit Coupon successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/coupons')
          // success('Edit Success coupons');
        }).catch((error) => {
          console.log(error)
        });
      }
    },
    back() {
      this.$router.push('/coupons')
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

@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
.wrapper{
  max-width: 1280px;

  background: #fff;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.125);
  padding: 30px;
}

.wrapper .title{
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 25px;
  color: crimson;
  text-transform: uppercase;
  text-align: center;
}

.wrapper .form{
  width: 100%;
}

.wrapper .form .inputfield{
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.wrapper .form .inputfield label{
  width: 200px;
  color: #757575;
  margin-right: 10px;
  font-size: 14px;
}

.wrapper .form .inputfield .input,
.wrapper .form .inputfield .textarea{
  width: 100%;
  outline: none;
  border: 1px solid #d5dbd9;
  font-size: 15px;
  padding: 8px 10px;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.wrapper .form .inputfield .textarea{
  width: 100%;
  height: 125px;
  resize: none;
}

.wrapper .form .inputfield .btn{
  width: 100px;
  padding: 8px 10px;
  font-size: 15px;
  border: 0px;
  background:  #fec107;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
  outline: none;
}

.wrapper .form .inputfield .btn:hover{
  background: #ffd658;
}

.wrapper .form .inputfield:last-child{
  margin-bottom: 0;
}

@media (max-width:420px) {
  .wrapper .form .inputfield{
    flex-direction: column;
    align-items: flex-start;
  }
  .wrapper .form .inputfield label{
    margin-bottom: 5px;
  }
  .wrapper .form .inputfield.terms{
    flex-direction: row;
  }
}
</style>
