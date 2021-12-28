import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Shop from '@/components/Shop'
import Product from '@/components/Product'
import Blog from '@/components/Blog/Blog'
import Post from '@/components/Blog/Post'
import Cart from '@/components/Cart/Cart'
import Layout from '@/components/Layout'
import Login from "../components/Login/Login";
import Checkout from "../components/Checkout/Checkout";
import Account from "../components/Account/Account";
import EditAccount from "../components/Account/EditAccount";
import Orders from "../components/Order/Orders";
import OrderDetail from "../components/Order/OrderDetail";
import Success from "../components/Notification/Success";
import ProductBySearch from "../components/ProductBySearch";
import WishlistProducts from "../components/Wishlist/WishlistProducts";
import ChangePassword from "../components/Account/ChangePassword";
import PasswordReset from "../components/Account/PasswordReset";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/reset-password',
      component: PasswordReset,
      name: 'PasswordReset'
    },
    {
      path: '/',
      component: Layout,
      children:[
        {
          path:'/',
          component:Home,
          name:'Home'
        },
        {
          path:'/login',
          component:Login,
          name:'Login'
        },
        {
          path:'/shop',
          component:Shop,
          name:'Shop'
        },
        {
          path: '/search-product/:key',
          component:ProductBySearch,
          name:'ProductBySearch'
        },
        {
          path: '/product-detail/:id',
          component:Product,
          name:'Product'
        },
        {
          path:'/wishlist',
          component:WishlistProducts,
          name:'WishlistProducts'
        },
        {
          path:'/blog',
          component:Blog,
          name:'Blog'
        },
        {
          path:'/post-detail/:id',
          component:Post,
          name:'Post'
        },
        {
          path:'/cart',
          component:Cart,
          name:'Cart'
        },
        {
          path:'/checkout',
          component: localStorage.getItem("id") ? Checkout :Login,
          name:'Checkout'
        },
        {
          path: '/account',
          component: Account,
          name: 'Account'
        },
        {
          path: '/edit-account/:id',
          component: EditAccount,
          name: 'EditAccount'
        },
        {
          path: '/change-password/:id',
          component: ChangePassword,
          name: 'ChangePassword'
        },


        {
          path: '/cart/success',
          name: 'Success',
          component: Success
        },
        {
          path: '/order',
          name: 'Orders',
          component: Orders
        },
        {
          path: '/view-order/:id',
          name: 'OrderDetail',
          component: OrderDetail
        },

      ]

    }
  ],
    mode:'history'
},

  )
