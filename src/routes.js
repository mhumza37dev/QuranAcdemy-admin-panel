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
import AddAdmins from "views/examples/AddAdmins";
import BlackList from "views/examples/BlackList";

import Icons from "views/examples/Icons.js";
import Classes from "views/examples/Classes";
import AddClasses from "views/examples/AddClasses";
import Page404 from "views/examples/Page404";

import Permissions from "views/examples/Permissions";
import AddPermissions from "views/examples/AddPermissions";

import AddRoles from "views/examples/AddRoles";
import Roles from "views/examples/Roles";

import Teacher from "views/examples/Teacher.js";
import AddTeacher from "views/examples/AddTeachers";

import Students from "views/examples/Students";
import AddStudents from "views/examples/AddStudents";

import Courses from "views/examples/Courses";
import AddCourses from "views/examples/AddCourses";
import ClassDetail from "views/examples/ClassDetail";

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
    path: "/admins/all",
    name: "Admins",
    icon: "ni ni-bullet-list-67 text-red",
    component: Admins,
    layout: "/admin",
  },

  {
    path: "/admins/add",
    name: "Add Admins",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddAdmins,
    layout: "/admin",
  },
  {
    path: "/admins/blacklist",
    name: "Black List",
    icon: "ni ni-bullet-list-67 text-red",
    component: BlackList,
    layout: "/admin",
  },

  {
    path: "/class/info",
    name: "Classes Detail",
    icon: "ni ni-single-02 text-yellow",
    component: ClassDetail,
    layout: "/admin",
  },

  {
    path: "/class/all",
    name: "View Classes",
    icon: "ni ni-single-02 text-yellow",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/class/add",
    name: "Add Classes",
    icon: "ni ni-single-02 text-yellow",
    component: AddClasses,
    layout: "/admin",
  },
  {
    path: "/teachers/all",
    name: "ViewTeachers",
    icon: "ni ni-bullet-list-67 text-red",
    component: Teacher,
    layout: "/admin",
  },

  {
    path: "/teachers/add",
    name: "Add Teachers",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddTeacher,
    layout: "/admin",
  },

  {
    path: "/students/all",
    name: "View Students",
    icon: "ni ni-bullet-list-67 text-red",
    component: Students,
    layout: "/admin",
  },

  {
    path: "/students/add",
    name: "Add Students",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddStudents,
    layout: "/admin",
  },

  {
    path: "/permissions/all",
    name: "Permissions",
    icon: "ni ni-bullet-list-67 text-red",
    component: Permissions,
    layout: "/admin",
  },
  {
    path: "/permissions/add",
    name: "Add Permissions",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddPermissions,
    layout: "/admin",
  },
  {
    path: "/roles/add",
    name: "Add Roles",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddRoles,
    layout: "/admin",
  },
  {
    path: "/roles/all",
    name: "View Roles",
    icon: "ni ni-bullet-list-67 text-red",
    component: Roles,
    layout: "/admin",
  },

  {
    path: "/404",
    // name: "Not Found",
    icon: "ni ni-bullet-list-67 text-red",
    component: Page404,
    layout: "/admin",
  },

  {
    path: "/course/all",
    name: "ViewCourses",
    icon: "ni ni-bullet-list-67 text-red",
    component: Courses,
    layout: "/admin",
  },

  {
    path: "/course/add",
    name: "Add Courses",
    icon: "ni ni-bullet-list-67 text-red",
    component: AddCourses,
    layout: "/admin",
  },
];

export default routes;
