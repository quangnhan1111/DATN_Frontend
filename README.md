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
