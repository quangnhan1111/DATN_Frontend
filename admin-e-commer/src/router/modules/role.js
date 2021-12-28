/** When your routing table is too long, you can split it into small modules**/

import Roles from "../../views/role/Roles";
import EditRole from "../../views/role/EditRole";
import AddRole from "../../views/role/AddRole";
import ViewUserOfRole from "../../views/role/ViewUserOfRole";
import ListUserOfRole from "../../views/role/ListUserOfRole";

const role = [
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
  }
]

export default role
