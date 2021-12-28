<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-justify-center"/>
        <strong> List Roles </strong>
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
              :items="searchValue.length < 1 ? listRole : searchResults"
              hover
              striped
              border
              small
              fixed
              caption="List Roles"
          />
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
import CTableWrapper from '../../components/role/role'
import axios from "axios";
// import {toast} from "bulma-toast";
export default {
  name: 'Roles',
  components: { CTableWrapper },
  data () {
    return {
      navbarText: false,
      navbarDropdown: false,
      show: false,

      searchValue:"",
      searchResults:[],
      listRole: [],
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
          .get('/roles', token)
          .then(response => {
            console.log(response.data.data)
            this.listRole = response.data.data
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
        this.searchResults = Object.values(this.listRole).filter((role) => {
          return Object.values(role)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
      } else {
        this.searchResults = this.listRole;
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














