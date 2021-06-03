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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";
import Register2 from "views/examples/Register2";
import Register from "views/examples/Register";
import Login from "views/examples/Login";
import ForgotPassword from "views/examples/ForgotPassword";
import ResetPassword from "views/examples/ResetPassword";
import Maps from "views/examples/Maps";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} /> */}
      <Route path="/admin" component={AdminLayout} />
      <Route path="/auth/signin" component={Login} />
      {/* <Route path="/auth/signup2" component={Register2} />
      <Route path="/auth/signup" component={Register} /> */}
      <Route path="/auth/forgot" component={ForgotPassword} />
      <Route path="/auth/reset" component={ResetPassword} />

      <Redirect from="/" to="/auth/signin" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
