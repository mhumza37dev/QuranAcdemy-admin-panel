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
import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import Favicon from "react-favicon";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "./assets/index.css";

import AdminLayout from "layouts/Admin.js";
import Login from "views/examples/Login";
import ResetPassword from "views/examples/ResetPassword";
import Profile from "views/examples/Profile";

function Faviconn() {
  const [favicon, setFavicon] = useState("");

  useMemo(
    () => setFavicon("http://oflisback.github.io/react-favicon/img/github.ico"),
    []
  );
  return <Favicon url={favicon} />;
}

ReactDOM.render(
  <BrowserRouter>
    <Faviconn />

    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/auth/signin" component={Login} />
      <Route path="/auth/reset" component={ResetPassword} />
      {/* <Route component={Profile} /> */}
      <Redirect
        exact
        from={["/", "/QuranAcdemy-admin-panel"]}
        to="/auth/signin"
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
