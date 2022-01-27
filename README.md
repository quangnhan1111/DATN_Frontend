# DATN_Frontend
1)Shipping ( Client ):

-VueX: Xem cách lưu trữ data.( Xem chi tiết ở code )
-CheckValidation và xử lí thêm: xem ở folder Utils 
-Chức năng đổi current_page:
onPageChange(page){
      this.current_page = page
    },
    
    
await axios
        .get('/client/product/search/'+this.$route.params.key+'?page='+this.current_page)
        ......      
        
watch: {
    current_page: {
      handler(){
        this.callProductBySearch()
      },
      deep: true
    },
  }
  
-Chức năng Filter theo rating hoặc theo size:
 thể xem trong Shop.vue

Tham Khảo: https://codesandbox.io/s/react-filter-forked-knod0?fontsize=14&hidenavigation=1&theme=dark&view=preview&file=/src/data.js:934-953

-Add to wishlist:
+Kiểm tra xem product có trong wistlist của customer đó hay chưa
+nêu chưa có thì add vào

-Add to cart:Xem code Product.
-Update Cart: Xem code Cart.vue
-Remove Cart: Xem code Cart.vue 
==> Xem trong Vuex !!!

-Login và Register: Xem code !!

-Xem tài khoản:  axios.get('customer/'+localStorage.getItem('id'), token)
-Edit tài khoản:  axios.put("admin/customers?id="+id, data , token)
-Change-Password:   axios.put("admin/customers/change-password/"+id, data , token)

-Xem List Blog:  axios.get('/post-list?page='+this.paginate.current_page)
-Xem chi tiêt Blog:   axios.get('post/' + idPost)

-Complete Order 
+By Cash
+By Paypal: (load script)
==> Xem trong Checkout.vue 
===>Tham Khảo: 
https://www.youtube.com/watch?v=8rMfW4wO-vU&t=995s
https://www.youtube.com/watch?v=33pnWTslX2E&t=1s


2)Trang admin(admin + staff):
-Login: checkValid ==> submit data 

-MyAccount
-EditAccount: checkValid ==> submit data 
-ChangePassword: checkValid ==> submit data  

-Brand(Tương tự với các chức năng CRUD khác như cate, subcate, customer, invoice , .... ) :
+Get list:  axios.get('/brands?page='+this.paginate.current_page, token)
+Toggle status:    await axios.get('brand-activation/' + id, token).then((response) => 
+Delete Brand:   await axios.delete('brands/?id=' + id,token)
+Add: Component add ==> check data ==> submit
+Edit: Component edit ==> get data để hiển thị. check data edit ==> submit data edit.
+searchHandler: ( đối với việc filter ở dưới FE )

<tr v-for="item in searchValue.length < 1 ? listBrand : searchResults" :key="item.id">
......      

searchHandler(){
      if (this.searchValue !== "") {
        const newBrandList = Object.values(this.listBrand).filter((brand) => {
          return Object.values(brand)
              .join(" ")
              .toLowerCase()
              .includes(this.searchValue.toLowerCase());
        });
        this.searchResults = newBrandList;
      } else {
        this.searchResults = this.listBrand;
      }
    },
==> Ngoài ra có thể gọi API search:
      
      searchHandler(){
      console.log(this.token)
      axios.get('categories?search='+this.searchValue.toLowerCase()+'&page='+this.paginate.current_page, this.token)
          .then((response)=> {
            console.log(response.data.data)
            this.all = response.data
            this.listCategory = this.all.data
            this.paginate.current_page = this.all.current_page
            this.paginate.last_page = this.all.last_page
            this.paginate.per_page = this.all.per_page
            this.paginate.total = this.all.total
          }).catch((error) =>{ console.log(error)
      });
      }

 +Thay đổi Paginate khi current_page hoặc delete brand( đặt biến flag hàm delete để kiểm tra sự thay đổi ):
      
 onPageChange(page){
    this.paginate.current_page = page
 },
      
  watch: {
    paginate: {
      async handler(){
        console.log(this.paginate.current_page)
        console.log(Math.ceil(this.paginate.total/this.paginate.per_page))
        await this.getData();
      },
      deep: true
    },
    async flag() {
      await this.getData()
    }
  }

      
  <Paginate
          v-if="listBrand.length > 0"
          :pagination=paginate
          :totalPages="Math.ceil(paginate.total/paginate.per_page)"
          :total="paginate.total"
          :per-page="paginate.per_page"
          :currentPage="paginate.current_page"
          @pagechanged="onPageChange"
      />
      
      
 -Chức năng Paginate: Xem component Paginate.vue 

      
 -Chat realtime: Xem component Contacts.vue 
      
 -Product: Làm theo kiểu product_link nên xem code phần add và edit Product trong Component AddProduct.vue và EditProduct.vue  
