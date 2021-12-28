<template>
  <div class="wrapper">
    <div class="title">
      View Product
    </div>
    <form class="form" >
      <div class="inputfield">
        <label>Name</label>
        <input type="text" class="input" v-model="dataoutput.name" readonly/>
      </div>
      <div class="inputfield">
        <label>Description</label>
        <input type="text" class="input" v-model="dataoutput.des" readonly/>
      </div>
      <div class="inputfield">
        <label>Name Image</label>
        <input type="text" class="input" v-model="dataoutput.Name_Image" readonly/>
      </div>
      <div class="inputfield">
        <label>Link Image </label>
        <input type="text" class="input" readonly v-model="dataoutput.Link_Image"/>
      </div>
      <div class="inputfield">
        <img id="theImg" :src="dataoutput.Link_Image" width="700px"  height="500px" alt=""/>
      </div>
      <div class="inputfield">
        <label>brand</label>
        <input class="" type="text"  name="brand" value="" v-model="dataoutput.Name_Brand" readonly/>
      </div>
      <div class="inputfield">
        <label>category</label>
        <input class="" type="text"  name="category" value="" v-model="dataoutput.Name_Category" readonly/>
      </div>
      <div class="inputfield">
        <label>Subcategory</label>
        <input class="" type="text"  name="Subcategory" value="" v-model="dataoutput.Name_SubCategory" readonly/>
      </div>
      <div class="form-group">
        <div class="row">
          <form >
            <label class="idlabel" htmlFor="size">Sizes - Colors - Numbers - Price:</label>
            <div v-for="element in attribute" :key="element.id">
              <div style="display: inline">
                <input class="form-control" style="width:70px; display: inline" :value="element.name_size" disabled/>
              </div>
              <div style="display: inline">
                <input class="form-control" style="width:70px; display: inline" :value="element.name_color" disabled/>
              </div>
              <div style="display: inline">
                <input class="form-control" style="width:70px; display: inline" :value="element.number" disabled/>
              </div>
              <div style="display: inline">
                <input class="form-control" style="width:70px; display: inline" :value="element.price" disabled/>
              </div>
            </div>
            <br><br>
          </form>
        </div>
      </div>
      <div class="form-group">
        <label>Gender</label><br>
        <input class="form-control" type="text"  name="brand" value="" v-model="dataoutput.gender" disabled/>
      </div>
      <div class="form-group" >
        <div class="error-mesage" v-if="message"><h3>{{ message }}</h3></div>
        <button type="button" name="example-email" class="btn btn-info" @click="back">back </button>
      </div>
    </form>
  </div>
</template>
<script>
// import usersData from '../users/UsersData'
// import axios from "axios";

// import paginate from "../../utils/helper";

import axios from "axios";

export default {
  name: 'ViewProduct',
  data() {
    return {
      dataoutput:{
        Name_Category: "",
        Name_SubCategory: "",
        Name_Brand: 0,
        gender : 0,
        name: "",
        price: "",
        sizes : [],
        number : "",
        Name_Image : 0,
        colors : [],
        des: "",
        Link_Image:"",
        avgStar:0
      },
      attribute: [],
      message:"",
      token :{
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData (){
      // checklogin();
      let id = this.$route.params.id
      await axios.get('/product/' +id , this.token).then((response)=> {
        let temp = response.data.data[0]
        // console.log(response.data.data[0])
        this.dataoutput = temp
        let sizes=''
        let colors=''
        for (let item of response.data.data){
          for (let i of item.sizes){
            sizes+=i+""
          }
          for (let i of item.colors){
            colors+=i+""
          }
          this.attribute.push({
            price: item.price,
            number : item.number,
            name_size : sizes,
            name_color : colors
          })
          sizes=''
          colors=''
        }
        console.log(this.attribute)
      }).catch(() =>{

      });

    },

    back() {
      this.$router.push('/products')
    }
  }


}
</script>
<style lang="css">
.my-class .dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}
</style>
