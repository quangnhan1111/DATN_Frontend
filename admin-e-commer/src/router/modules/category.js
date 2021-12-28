/** When your routing table is too long, you can split it into small modules**/

import Categories from "../../views/category/Categories";
import EditCategory from "../../views/category/EditCategory";
import AddCategory from "../../views/category/AddCategory";

const category = [
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
]

export default category
