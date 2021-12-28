<template>
  <div class="page-wrapper">
    <div class="page-breadcrumb">
      <div class="col-5 align-self-center">
        <h4 class="page-title">Dashboard</h4>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card ">
            <div class="card-body cardinvoice">
              <AreaChart />
              <div class="sales ct-charts mt-3"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-5">Products sold</h4>
              <h2 class="font-8 text-success font-medium">{{totalProductSoldOut}}</h2>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-0"> Total Customer</h4>
              <h2 class="font-8 text-success font-medium">{{ totalCustomer }}</h2>

            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-0"> Total Employee</h4>
              <h2 class="font-8 text-success font-medium">{{ totalEmployee }}</h2>

            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title m-b-5">Top 5 best selling products</h4>
              <h3 class="text-success font-medium" v-for="p in productBestSelling" :key="p.id">
                ID:{{ String(p.id)}}-{{ String(p.name).substring(0,15) }}...
              </h3>
              <div class="m-t-20 text-center">
                <div id="earnings"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">All Enployee Sale in Month {{month}} Year {{year}}</h4>
            </div>
            <div class="table-responsive">
              <table class="">
                <thead>
                  <tr>
<!--                    <th >ID</th>-->
                    <th >FullNAME Employee</th>
                    <th >Email Employee</th>
                    <th >Address Employee</th>
                    <th >phone Employee</th>
                    <th >DATE</th>
                    <th >TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                <tr v-for="SALE in employeeSale" :key="SALE.id">
<!--                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{ SALE.IdStaff }}</td>-->
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{ SALE.FullNameStaff }}</td>
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{ SALE.EmailStaff }}</td>
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{ SALE.address }}</td>
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{ SALE.phone_number }}</td>
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)">{{SALE.Month}}/{{SALE.Year}}</td>
                  <td v-if="String(SALE.Month) == String(month) && String(SALE.Year) == String(year)"><span >{{ SALE.total_sale }}</span></td>
                </tr>
                </tbody>
                <Paginate
                    :pagination=paginate
                    :totalPages="Math.ceil(paginate.total/paginate.per_page)"
                    :total="paginate.total"
                    :per-page="paginate.per_page"
                    :currentPage="paginate.current_page"
                    @pagechanged="onPageChange"
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Paginate from "../../components/paginate/Paginate";
import AreaChart from "../../components/chart/AreaChart";
export default {
  name: "Sales",
  components: {
    AreaChart,
    Paginate
  },
  data() {
    return {
      all: {},
      paginate: {
        current_page:1,
        first_page_url:"",
        last_page:1,
        last_page_url:"",
        per_page:1,
        total: 1,
      },
      employeeSale:[],
      totalProductSoldOut:0,
      totalCustomer:0,
      totalEmployee:0,
      productBestSelling: 0,
      // sale: [0, 0, 174, 15, 66, 0, 15, 0, 0, 0, 0, 14,0],
      flag:0,
      month: new Date().getUTCMonth() + 1,
      year: new Date().getUTCFullYear()
    };
  },
  created() {
    this.getData()
  },
  methods: {
    onPageChange(page){
      this.paginate.current_page = page
    },
    async getData() {
      let token = {
        headers: {'Authorization': `token ${localStorage.getItem("token")}`}
      }
       await axios
          .get('saleFigure/get-total-product-sold-out', token)
          .then(response => {
              this.totalProductSoldOut = response.data.data['total_product_sold_out']
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('saleFigure/get-total-user', token)
          .then(response => {
            this.totalCustomer = response.data.data['totalCustomer']
            this.totalEmployee  = response.data.data['totalEmployee']
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('client/product/best', token)
          .then(response => {
            this.productBestSelling = response.data.data
          })
          .catch(error => {
            console.log(error)
          })

      await axios
          .get('saleFigure/get-sale-figure-by-staff?page='+this.paginate.current_page, token)
          .then(response => {
            console.log(response.data)
            this.all = response.data
            this.employeeSale = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.last_page = this.all.last_page
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  watch: {
    paginate: {
      async handler(){
        await this.getData();
      },
      deep: true
    },
    async flag() {
      await this.getData()
    }
  }
};
</script>
