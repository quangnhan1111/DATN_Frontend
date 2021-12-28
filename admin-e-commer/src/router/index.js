import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from "../views/category/Categories";
import EditCategory from "../views/category/EditCategory";
import AddCategory from "../views/category/AddCategory";
import Login from '../views/Login/Login'
import Sales from '../views/Sale/Sales'
import Brands from "../views/brand/Brands";
import EditBrand from "../views/brand/EditBrand";
import AddBrand from "../views/brand/AddBrand";
import Customers from "../views/customer/Customers";
import AddCustomer from "../views/customer/AddCustomer";
import EditCustomer from "../views/customer/EditCustomer";
import Employees from "../views/employee/Employees";
import EditEmployee from "../views/employee/EditEmployee";
import AddEmployee from "../views/employee/AddEmployee";
import Colors from "../views/color/Colors";
import EditColor from "../views/color/EditColor";
import AddColor from "../views/color/AddColor";
import Images from "../views/image/Images";
import MyAccount from "../views/account/MyAccount";
import EditAccount from "../views/account/EditAccount";
import Posts from "../views/post/Posts";
import AddPost from "../views/post/AddPost";
import EditPost from "../views/post/EditPost";
import ViewPost from "../views/post/ViewPost";
import Reviews from "../views/review/Reviews";
import Products from "../views/product/Products";
import AddProduct from "../views/product/AddProduct";
import ViewProduct from "../views/product/ViewProduct";
import EditProduct from "../views/product/EditProduct";
// import AddInvoice from "../views/invoice/AddInvoice";
import EditChatRoom from "../views/ChatRoom/EditChatRoom";
import Invoices from "../views/invoice/Invoices";
import ViewInvoice from "../views/invoice/ViewInvoice";
import EditInvoice from "../views/invoice/EditInvoice";
import ListUserOfRole from "../views/role/ListUserOfRole";
import Roles from "../views/role/Roles";
import AddImage from "../views/image/AddImage";
import EditImage from "../views/image/EditImage";
import ViewUserOfRole from "../views/role/ViewUserOfRole";
import AddRole from "../views/role/AddRole";
import EditRole from "../views/role/EditRole";
import InvoicesForAdmin from "../views/invoice/InvoicesForAdmin";
import Contacts from "../views/contact/Contacts";
import ChatRooms from "../views/ChatRoom/ChatRooms";
import AddChatRoom from "../views/ChatRoom/AddChatRoom";
import SubCategories from "../views/subcategory/SubCategories";
import AddSubCategory from "../views/subcategory/AddSubCategory";
import EditSubcategory from "../views/subcategory/EditSubcategory";
import Coupons from "../views/coupon/Coupons";
import EditCoupon from "../views/coupon/EditCoupon";
import AddCoupon from "../views/coupon/AddCoupon";
import ChangePassword from "../views/account/ChangePassword";
import AddInvoice from "../views/invoice/AddInvoice";
Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Dash',
    component: localStorage.getItem("roleNames") ? Home :Login,
    children: [
      {
        path: '/roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: '/edit-role/:id',
        name: 'EditRole',
        component: EditRole
      },
      {
        path: '/add-role',
        name: 'AddRole',
        component: AddRole
      },
      {
        path: '/user-of-role/:id',
        name: 'ListUserOfRole',
        component: ListUserOfRole
      },
      {
        path: '/view-user-of-role/:id/role/:idRole',
        name: 'ViewUserOfRole',
        component: ViewUserOfRole
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: '/edit-category/:id',
        name: 'EditCategory',
        component: EditCategory
      },
      {
        path: '/add-category/',
        name: 'AddCategory',
        component: AddCategory
      },
      {
        path: '/subcategories',
        name: 'Categories',
        component: SubCategories
      },
      {
        path: '/edit-subcategory/:id',
        name: 'EditSubcategory',
        component: EditSubcategory
      },
      {
        path: '/add-subcategory/',
        name: 'AddSubCategory',
        component: AddSubCategory
      },
      {
        path: '/brands',
        name: 'Brands',
        component: Brands
      },
      {
        path: '/edit-brand/:id',
        name: 'EditBrand',
        component: EditBrand
      },
      {
        path: '/add-brand/',
        name: 'AddBrand',
        component: AddBrand
      },
      {
        path: '/coupons',
        name: 'Coupons',
        component: Coupons
      },
      {
        path: '/edit-coupon/:id',
        name: 'EditCoupon',
        component: EditCoupon
      },
      {
        path: '/add-coupon/',
        name: 'AddCoupon',
        component: AddCoupon
      },
      {
        path: '/customers',
        name: 'Customers',
        component: Customers
      },
      {
        path: '/edit-customer/:id',
        name: 'EditCustomer',
        component: EditCustomer
      },
      {
        path: '/add-customer/',
        name: 'AddCustomer',
        component: AddCustomer
      },
      {
        path: '/employees',
        name: 'Employees',
        component: Employees
      },
      {
        path: '/edit-employee/:id',
        name: 'EditEmployee',
        component: EditEmployee
      },
      {
        path: '/add-employee/',
        name: 'AddEmployee',
        component: AddEmployee
      },
      {
        path: '/colors',
        name: 'Colors',
        component: Colors
      },
      {
        path: '/edit-color/:id',
        name: 'EditColor',
        component: EditColor
      },
      {
        path: '/add-color/',
        name: 'AddColor',
        component: AddColor
      },
      {
        path: '/images',
        name: 'Images',
        component: Images
      },
      {
        path: '/edit-image/:id',
        name: 'EditImage',
        component: EditImage
      },
      {
        path: '/add-image/',
        name: 'AddImage',
        component: AddImage
      },
      {
        path: '/myaccount',
        name: 'Account',
        component: MyAccount
      },
      {
        path: '/change-password/:id',
        name: 'ChangePassword',
        component: ChangePassword
      },
      {
        path: '/edit-account/:id',
        name: 'EditAccount',
        component: EditAccount
      },
      {
        path: '/posts',
        name: 'Posts',
        component: Posts
      },
      {
        path: '/edit-post/:id',
        name: 'EditPost',
        component: EditPost
      },
      {
        path: '/add-post/',
        name: 'AddPost',
        component: AddPost
      },
      {
        path: '/view-post/:id',
        name: 'ViewPost',
        component: ViewPost
      },
      {
        path: '/reviews',
        name: 'Reviews',
        component: Reviews
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/edit-product/:id',
        name: 'EditProduct',
        component: EditProduct
      },
      {
        path: '/add-product/',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: '/view-product/:id',
        name: 'ViewProduct',
        component: ViewProduct
      },
      {
        path: '/invoices',
        name: 'Invoices',
        component: Invoices
      },
      {
        path: '/invoices-for-admin',
        name: 'InvoicesForAdmin',
        component: InvoicesForAdmin
      },
      {
        path: '/edit-invoice/:id',
        name: 'EditInvoice',
        component: EditInvoice
      },
      {
        path: '/add-invoices/',
        name: 'AddInvoice',
        component: AddInvoice
      },
      {
        path: '/view-invoice/:id',
        name: 'ViewInvoice',
        component: ViewInvoice
      },

      {
        path: '/sales/',
        name: 'Sales',
        component: Sales
      },
      {
        path: '/contacts/',
        name: 'Contacts',
        component: Contacts
      },

      {
        path: '/chatroom/',
        name: 'ChatRooms',
        component: ChatRooms
      },
      {
        path: '/add-chat-room/',
        name: 'AddChatRoom',
        component: AddChatRoom
      },
      {
        path: '/edit-chat-room/:id',
        name: 'EditChatroom',
        component: EditChatRoom
      },
    ]
  }

  // {
  //   path: '/addcategory',
  //   name: 'AddCategory',
  //   component: AddCategory
  // },
]

const router = new VueRouter({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

export default router
