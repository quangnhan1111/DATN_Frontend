/** When your routing table is too long, you can split it into small modules**/

import Invoices from "../../views/invoice/Invoices";
import InvoicesForAdmin from "../../views/invoice/InvoicesForAdmin";
import EditInvoice from "../../views/invoice/EditInvoice";
import ViewInvoice from "../../views/invoice/ViewInvoice";

const invoice = [
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
  // {
  //   path: '/add-invoices/',
  //   name: 'AddInvoice',
  //   component: AddInvoice
  // },
  {
    path: '/view-invoice/:id',
    name: 'ViewInvoice',
    component: ViewInvoice
  },
]

export default invoice
