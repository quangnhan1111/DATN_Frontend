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
-Remove Cart: Xem code Cart.
==> Xem trong Vuex !!!

-Login và Register: Xem code !!

-Xem tài khoản:  axios.get('customer/'+localStorage.getItem('id'), token)
-Edit tài khoản:  axios.put("admin/customers?id="+id, data , token)
-Change-Password:   axios.put("admin/customers/change-password/"+id, data , token)

-Xem List Blog:  axios.get('/post-list?page='+this.paginate.current_page)
-Xem chi tiêt Blog:   axios.get('post/' + idPost)
