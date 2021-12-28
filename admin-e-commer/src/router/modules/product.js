/** When your routing table is too long, you can split it into small modules**/

import Products from "../../views/product/Products";
import EditProduct from "../../views/product/EditProduct";
import AddProduct from "../../views/product/AddProduct";
import ViewProduct from "../../views/product/ViewProduct";

const product = [
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
]

export default product
