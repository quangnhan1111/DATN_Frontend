<template>
  <div class="wrapper">
    <div class="title">
      Edit Product
    </div>
    <div class="error-mesage" v-if="message.length">
      <ul>
        <li v-for="(error,index) in message" :key="index" class="error">{{ error }}</li>
      </ul>
    </div>
    <form class="form" @submit.prevent="handleEdit">
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="dataoutput.name" />
      </div>
      <div class="inputfield">
        <label>Description</label>
        <input type="text" class="input" v-model="dataoutput.des" />
      </div>
      <div class="inputfield">
        <label>Name Image</label>
        <input type="text" class="input" v-model="dataoutput.image_name" />
      </div>
      <div class="inputfield">
        <label>Link Image </label>
        <input type="text" class="input" readonly v-model="dataoutput.image_link"/>
      </div>
      <div class="inputfield">
        <img id="theImg" :src="dataoutput.image_link" width="700px"  height="500px" alt=""/>
      </div>
      <div class="inputfield">
        <label>File Image </label>
        <input type="file" class="" @change="handleChange" />
      </div>
      <div class="inputfield">
        <label>select brand</label>
        <b-form-select v-model="dataoutput.brand" :options="listBrand"></b-form-select>
      </div>
      <div class="inputfield">
        <label>select category</label>
        <b-form-select v-model="dataoutput.category" :options="listCategory"></b-form-select>
      </div>
      <div class="inputfield">
        <label>select Subcategory</label>
        <b-form-select v-model="dataoutput.subcategory" :options="listSubCategory"></b-form-select>
      </div>
      <div class="form-group">
        <div class="row">
          <div style="display: inline; margin-bottom: 30px">
            <label  class="idlabel" htmlFor="number" style="display: inline;">Select Colors - Sizes - Number - Price</label>
            <div class="form-group" style="display: inline; margin-left: 30px">
              <button type="button" name="example-email" class="btn btn-info" @click="addOption">Add option </button>
              <button type="button" name="example-email" class="btn btn-info" @click="decreaseOption">Decrease option </button>
            </div>
          </div>
          <div  v-for="index in parseInt(countOption)" :key="index">
            <div style="display: inline;">
              <b-form-select v-model="dataoutput.color[index-1]" :options="listColor"
                             style="width:100px; display: inline; margin-right: 20px">
              </b-form-select>
            </div>
            <div style="display: inline;">
              <b-form-select v-model="dataoutput.name_size[index-1]" :options="listSize"
                             style="width:100px; display: inline; margin-right: 20px">
              </b-form-select>
            </div>
            <div style="display: inline;">
              <input class="form-control" style="width:100px; display: inline; margin-right: 20px"
                     type="number" min="1" v-model="dataoutput.number[index-1]"/>
            </div>
            <div style="display: inline">
              <input class="form-control" style="width:100px; display: inline; margin-right: 20px"
                     type="number" min="1" v-model="dataoutput.price[index-1]" step=".1" />
            </div>
          </div>

        </div>
      </div>
      <div class="form-group">
        <label>Gender</label><br>
        <b-form-group label="Radios using options" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
              id="radio-group-1"
              v-model="dataoutput.gender"
              :options="listGender"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
      </div>
      <div class="inputfield">
        <label>Status</label>
        <b-form-select v-model="dataoutput.status" :options="Status"></b-form-select>
      </div>
      <div class="inputfield" >
        <button type="button" name="example-email" class="btn btn-info" @click="back">Back </button>
        <button type="button" name="example-email" class="btn btn-info" @click="handleEdit">Save </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import {toast} from "bulma-toast";
import {storage} from "../../components/firebase";
export default {
  name: 'EditProduct',
  data() {
    return {
      countOption: 0,
      dataoutput:{
        name: "",
        des: "",
        category:0,
        subcategory: 0,
        brand: 0,
        gender : 0,
        image_name : "",
        image_link: "",
        status: true,

        price: [],
        name_size : [],
        number : [],
        color : [],
      },
      Status:[
        { value: true, text: 'Active' },
        { value: false, text: 'Un-Active' },
      ],
      listCategory:[],
      listSubCategory: [],
      listBrand:[],
      listColor:[],
      message:[],
      listSize:[
        { value: 'M', text: 'M' },
        { value: 'L', text: 'L' },
        { value: 'XL', text: 'XL' },
        { value: 'XXL', text: 'XXL' },
      ],
      listGender:[
        { value: 'NAM', text: 'NAM' },
        { value: 'NU', text: 'NU' },
        { value: 'KHAC', text: 'KHAC' },
      ],
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  created() {
    console.log("Asd")
    this.getData()
  },
  methods: {
    checkValid() {
      this.message = []
      if( !this.dataoutput.image_link ) {
        this.message.push('image_link Required')
      }

      if( !this.dataoutput.image_name ) {
        this.message.push('image_name Required')
      }


      if( !this.dataoutput.name ) {
        this.message.push('Name Product Required')
      }else if(this.dataoutput.name.length <6){
        this.message.push('Name Product min is 6 character')
      }
      if( this.dataoutput.name_size.length === 0 ) {
        this.message.push('name_size Product Required')
      }


      if( !this.dataoutput.des ) {
        this.message.push('DES Product Required')
      }else if(this.dataoutput.des.length <10){
        this.message.push('DES Product min is 10 character')
      }
      if( !this.dataoutput.subcategory ) {
        this.message.push('subcategory Product Required')
      }
      if( !this.dataoutput.brand ) {
        this.message.push('brand Product Required')
      }
      if( this.dataoutput.color.length===0 ) {
        this.message.push('color_id Product Required')
      }
      if( !this.dataoutput.gender ) {
        this.message.push('gender Product Required')
      }

      if( this.dataoutput.price.length===0 ) {
        this.message.push('Price Product Required')
      }

      if( this.dataoutput.number.length===0 ) {
        this.message.push('Number Product Required')
      }

      let flag = 0
      let n = this.dataoutput.color.length
      for (let i = 0; i < n-1; i++) {
        for (let j = i+1; j < n; j++) {
          if(this.dataoutput.color[i] === this.dataoutput.color[j] &&
              this.dataoutput.name_size[i] === this.dataoutput.name_size[j]) {
            flag ++
          }
        }
      }
      if (flag !== 0){
        this.message.push('Cant put Color and Name Size with the same')
      }
    },
    decreaseOption(){
      this.countOption --
      if(this.countOption < 1){
        this.countOption = 1
      }
      this.dataoutput.name_size.splice(this.countOption, 1);
      this.dataoutput.color.splice(this.countOption, 1);
      this.dataoutput.price.splice(this.countOption, 1);
      this.dataoutput.number.splice(this.countOption, 1);

    },
    addOption(){
      this.countOption ++
    },
    back() {
      this.$router.push('/products')
    },
    handleChange(e) {
      console.log("abc")
      if(e.target.files[0]){
        const uploadTask = storage.ref(`images/${e.target.files[0].name}`).put(e.target.files[0]);
        uploadTask.on(
            "state_changed",
            // eslint-disable-next-line no-unused-vars
            snapshot => {},
            error => {
              console.log(error);
            },
            () => {
              storage
                  .ref("images")
                  .child(e.target.files[0].name)
                  .getDownloadURL()
                  .then(url =>{
                    this.dataoutput.image_link = url
                  });
            }
        )
      }
    },
    async getData (){
      // checklogin();
      let id = this.$route.params.id
      await axios.get('/product/' +id , this.token).then((response)=> {
        let temp = response.data.data[0]
        this.dataoutput = { ...this.dataoutput,
          name: temp.name,
          des: temp.des,
          category: temp.subcategory__category_id,
          subcategory: temp.subcategory_id,
          brand: temp.brand_id,
          gender : temp.gender,
          image_name : temp.Name_Image,
          image_link: temp.Link_Image,
          status: temp.status
        }
        console.log(response.data.data)
        let sizes=''
        let colors=''
        for (let item of response.data.data){
          for (let i of item.sizes){
            sizes+=i+""
          }
          for (let i of item.colors){
            colors+=i+""
          }
          this.dataoutput.name_size.push(sizes)
          this.dataoutput.color.push(colors)
          this.dataoutput.price.push(item.price)
          this.dataoutput.number.push(item.number)
          sizes=''
          colors=''
        }
        this.countOption = response.data.data.length
      }).catch(() =>{

      });

      await axios.get('categories-list-no-page', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listCategory.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
      await axios.get('brand-list-no-page', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listBrand.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
      await axios.get('color-list-no-page', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].name,
            text:response.data.data[i].name,
          }
          this.listColor.push(data)
          // this.color = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });

    },
    async handleEdit() {
      this.checkValid()
      if(this.message.length<=0){
        let id = this.$route.params.id
        let list_item = []
        for(let i = 0; i < this.dataoutput.name_size.length; i++) {
          list_item.push({
            'size': this.dataoutput.name_size[i],
            'color': this.dataoutput.color[i],
            'price': parseFloat(this.dataoutput.price[i]),
            'number': parseInt(this.dataoutput.number[i])
          })
        }
        const data = {
          name: this.dataoutput.name,
          des: this.dataoutput.des,
          gender: this.dataoutput.gender,
          subcategory: this.dataoutput.subcategory,
          brand: this.dataoutput.brand,
          image_name: this.dataoutput.image_name,
          image_link: this.dataoutput.image_link,
          status: this.dataoutput.status,
          list_item: list_item
        }
        console.log(data)
        await axios.put('/products?id='+id, data,this.token).then((response)=> {
          console.log(response.data)
          toast({
            message: 'Edit Product successfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
            duration: 3000,
            position: 'top-right',
          })
          this.$router.push('/products')
          // success('Edit Success Category');
        }).catch((error) =>{
          console.log(error.response)
        });
      }
    }
  },
  computed: {
    category_for_sub() {
      return this.dataoutput.category
    }
  },
  watch: {
    category_for_sub() {
      this.listSubCategory = []
      axios.get('category/' + this.dataoutput.category +'/subcate', this.token).then((response)=> {
        for (let i = 0; i < response.data.data.length; i++) {
          let data = {
            value:response.data.data[i].id,
            text:response.data.data[i].name,
          }
          this.listSubCategory.push(data)
          // this.listImage = {...this.listImage, data}
        }
      }).catch((error) =>{
        console.log(error)
      });
    }
  }


}
</script>
<style lang="css">
.my-class .dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}

.error{
  color: red;
  text-align: center;
  font-weight: bold;

}


.btn-primary {
  display: inline-block;
  font-weight: 400;
  color: #00A5F4;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}
</style>
