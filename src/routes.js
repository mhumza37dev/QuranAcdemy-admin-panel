/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Classes.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Admins from "views/examples/Admins.js";
import Teacher from "views/examples/Teacher.js";
import Icons from "views/examples/Icons.js";
import AddAdmins from "views/examples/AddAdmins";
import Classes from "views/examples/Classes";
import Page404 from "views/examples/Page404";
import AddPermissions from "views/examples/AddPermissions";
import Permissions from "views/examples/Permissions";
import AddClasses from "views/examples/AddClasses";

import AssignPermissions from "views/examples/AssignPermissions";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/View Classes",
    name: "View Classes",
    icon: "ni ni-single-02 text-yellow",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/Add Classes",
    name: "Add Classes",
    icon: "ni ni-single-02 text-yellow",
    component: AddClasses,
    layout: "/admin",
  },
  {
    path: "/teachers",
    name: "Teachers",
    icon: "ni ni-bullet-list-67 text-red",
    component: Teacher,
    layout: "/admin",
  },
  {
    path: "/View Admins",
    name: "Admins",
    icon: "ni ni-bullet-list-67 text-red",
    component: Admins,
    layout: "/admin",
  },
  {
    path: "/Vew Permissions",
    name: "Permissions",
    icon: "ni ni-bullet-list-67 text-red",
    component: Permissions,
    layout: "/admin",
  },
  {
    path: "/Add Permissions",
    name: "Add Permissions",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddPermissions,
    layout: "/admin",
  },
  {
    path: "/Assign Permissions",
    name: "Assign Permissions",
    icon: "ni ni-bullet-list-67 text-red",
    component: AssignPermissions,
    layout: "/admin",
  },
  {
    path: "/Add Admins",
    name: "Add Admins",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddAdmins,
    layout: "/admin",
  },

  {
    path: "/404",
    // name: "Not Found",
    icon: "ni ni-bullet-list-67 text-red",
    component: Page404,
    layout: "/admin",
  },
];

export default routes;
