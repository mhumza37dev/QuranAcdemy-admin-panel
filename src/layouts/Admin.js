import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import moment from "moment";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import { setSyntheticLeadingComments } from "typescript";

const Admin = (props) => {
  const [state, setState] = useState();
  const mainContent = useRef(null);
  const location = useLocation();

  useMemo(() => {
    // componentWillMount events
    setState(JSON.parse(localStorage.getItem("user")));
  }, []);

  // useEffect(() => {
  //   if (props.location.state !== undefined) {
  //     document.documentElement.scrollTop = 0;
  //     document.scrollingElement.scrollTop = 0;
  //     mainContent.current.scrollTop = 0;
  //   } else {
  //   }

  //   console.log(" state ====> ", state);
  // }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  const startDate = moment(parseInt(localStorage.getItem("lastCallAt")));
  const timeEnd = moment(Date.now());
  const diff = timeEnd.diff(startDate);

  // console.log(moment(startDate));

  const diffDuration = moment.duration(diff);
  // console.log("last call at :", startDate._i);
  // console.log("time rightnow :", timeEnd._i);
  console.log("Minutes since last call:", diffDuration.minutes());
  timeEnd.diff(startDate);

  if (diffDuration.minutes() >= 1440) {
    localStorage.clear();
    // props.history.push("/auth/signin");
  }

  if (!JSON.parse(localStorage.getItem("user"))) {
    props.history.push("/auth");
    return <></>;
  } else {
    const name = JSON.parse(localStorage.getItem("user"));
    return (
      <>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin",
            imgSrc: require("../assets/img/brand/quranAcademy.png"),
            imgAlt: "...",
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname)}
            name={name.account.firstName}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
};

export default Admin;
