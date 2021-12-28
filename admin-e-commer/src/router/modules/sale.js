/** When your routing table is too long, you can split it into small modules**/

import Sales from "../../views/Sale/Sales";

const sale = [
  {
    path: '/sales/',
    name: 'Sales',
    component: Sales
  },
]

export default sale
