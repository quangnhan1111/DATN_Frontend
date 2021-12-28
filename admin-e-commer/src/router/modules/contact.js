/** When your routing table is too long, you can split it into small modules**/

import Contacts from "../../views/contact/Contacts";

const sale = [
  {
    path: '/contacts/',
    name: 'Contacts',
    component: Contacts
  },
]

export default sale
