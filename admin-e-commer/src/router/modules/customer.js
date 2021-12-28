/** When your routing table is too long, you can split it into small modules**/

import Customers from "../../views/customer/Customers";
import EditCustomer from "../../views/customer/EditCustomer";
import AddCustomer from "../../views/customer/AddCustomer";

const customer = [
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
]

export default customer
