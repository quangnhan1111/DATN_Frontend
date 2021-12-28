/** When your routing table is too long, you can split it into small modules**/

import Brands from "../../views/brand/Brands";
import EditBrand from "../../views/brand/EditBrand";
import AddBrand from "../../views/brand/AddBrand";

const brand = [
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
  }
]

export default brand
