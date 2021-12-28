<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong> List categories </strong>
        <template v-if="auth == 1">
          <router-link to="/add-invoices"  tag="button" class="btn btn-dark">New Invoice</router-link>
        </template>
        <div class="card-header-actions">
        </div>
      </CCardHeader>
      <CCardBody>
        <CNavbar
            expandable="md"
            color="info"
        >
          <CToggler inNavbar @click="show=!show"/>
          <CCollapse :show="show" navbar>
            <!-- Right aligned nav items -->
            <CNavbarBrand >
              <CForm inline class="align-middle">
                <input
                    class="input-search"
                    placeholder="Search..."
                    v-model="searchValue"
                    @input="searchHandler"
                />

              </CForm>
            </CNavbarBrand>
          </CCollapse>
        </CNavbar>
      </CCardBody>
      <CRow>
        <CCol sm="12">
          <CTableWrapper
              :items="searchValue.length < 1 ? listInvoice : searchResults"
              hover
              striped
              border
              small
              fixed
              caption="List Invoices"
              @ToggleStatus="ToggleStatus"
          />
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import CTableWrapper from '../../components/invoice/invoice'
import axios from "axios";
import {toast} from "bulma-toast";
// import {toast} from "bulma-toast";
export default {
  name: 'InvoicesForAdmin',
  components: { CTableWrapper },
  data () {
    return {
      auth : localStorage.getItem('roleNames') === 'admin' ? 1 : 0,
      show: false,
      navbarText: false,
      navbarDropdown: false,

      searchValue:"",
      searchResults:[],
      listInvoice: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      // this.checklogin();
      axios
          .get('/invoices-list-no-page', token)
          .then(response => {
            console.log(response.data.data)
            this.listCategory = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    async ToggleStatus(id){
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.get('category-activate/' + id, token).then((response) => {
        console.log(response.data)
        toast({
          message: 'Toggle Category successfully',
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
        const newCategoryList = Object.values(this.listCategory).filter((cate) => {
          return Object.values(cate)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        this.searchResults = newCategoryList;
      } else {
        this.searchResults = this.listCategory;
      }
    },
    async deleteCategory(id) {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
      await axios.delete('categories/?id=' + id,token)
          .then(response => {
            console.log(response.data)
            toast({
              message: 'Deleted category successfully',
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
  }
}
</script>
<style>
.input-search{
  border-radius: 3%;
}
</style>














