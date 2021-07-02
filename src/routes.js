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
import TeacherTimeLine from "views/examples/TeacherTimeLine";
import StudentTimeLine from "views/examples/StudentTimeLine";
import Settings from "views/examples/Settings";
import ClassAttendance from "views/examples/ClassAttendance";
import AddAttendance from "views/examples/AddAttendance";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    component: Maps,
    layout: "/admin",
  },

  {
    path: "/admins/all",
    name: "Admins",
    component: Admins,
    layout: "/admin",
  },

  {
    path: "/admins/add",
    name: "Add Admins",
    component: AddAdmins,
    layout: "/admin",
  },
  {
    path: "/admins/blacklist",
    name: "Black List",
    component: BlackList,
    layout: "/admin",
  },

  {
    path: "/class/info",
    name: "Classes Detail",
    component: ClassDetail,
    layout: "/admin",
  },

  {
    path: "/class/all",
    name: "View Classes",
    component: Classes,
    layout: "/admin",
  },
  {
    path: "/class/add",
    name: "Add Classes",
    component: AddClasses,
    layout: "/admin",
  },
  {
    path: "/class/attendance",
    name: "Class Attendance",
    component: ClassAttendance,
    layout: "/admin",
  },
  {
    path: "/class/attendance/add",
    name: "Add Attendance",
    component: AddAttendance,
    layout: "/admin",
  },
  {
    path: "/teachers/all",
    name: "ViewTeachers",
    component: Teacher,
    layout: "/admin",
  },

  {
    path: "/teachers/add",
    name: "Add Teachers",
    component: AddTeacher,
    layout: "/admin",
  },
  {
    path: "/teachers/timeline",
    name: "Teacher TimeLine",
    component: TeacherTimeLine,
    layout: "/admin",
  },

  {
    path: "/students/all",
    name: "View Students",
    component: Students,
    layout: "/admin",
  },

  {
    path: "/students/add",
    name: "Add Students",
    component: AddStudents,
    layout: "/admin",
  },
  {
    path: "/students/timeline",
    name: "Student TimeLine",
    component: StudentTimeLine,
    layout: "/admin",
  },

  {
    path: "/permissions/all",
    name: "Permissions",
    component: Permissions,
    layout: "/admin",
  },
  {
    path: "/permissions/add",
    name: "Add Permissions",
    component: AddPermissions,
    layout: "/admin",
  },

  {
    path: "/roles/add",
    name: "Add Roles",
    component: AddRoles,
    layout: "/admin",
  },
  {
    path: "/roles/all",
    name: "View Roles",
    component: Roles,
    layout: "/admin",
  },

  {
    path: "/404",
    // name: "Not Found",
    component: Page404,
    layout: "/admin",
  },

  {
    path: "/course/all",
    name: "ViewCourses",
    component: Courses,
    layout: "/admin",
  },

  {
    path: "/course/add",
    name: "Add Courses",
    component: AddCourses,
    layout: "/admin",
  },

  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    layout: "/admin",
  },
];

export default routes;
