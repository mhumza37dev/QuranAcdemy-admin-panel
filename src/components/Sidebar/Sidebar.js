import React, { useState, useEffect } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
import Index from "views/Index.js";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Collapse as CL } from "@material-ui/core";

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

import Divider from "@material-ui/core/Divider";

var ps;

const Sidebar = (props) => {
  const [admin, setAdmin] = useState();
  const [collapseOpen, setCollapseOpen] = useState();
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  // verifies if routeName is the one active (in browser input)

  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("user")));
    console.log("zzzzzz", admin);
  }, []);

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  function handleClick() {
    setOpen(!open);
  }

  function handleAdminDrop() {
    setOpen2(!open2);
  }

  function handleClassDrop() {
    setOpen3(!open3);
  }

  function handleRolesDrop() {
    setOpen4(!open4);
  }

  function handlePermDrop() {
    setOpen5(!open5);
  }

  var rout = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      layout: "/admin",
    },
  ];
  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
            activeClassName="active"
          >
            <ListItem button>
              <ListItemIcon>
                <i className={prop.icon} />
              </ListItemIcon>
              <ListItemText primary={prop.name} />
            </ListItem>
          </NavLink>
        </NavItem>
      );
    });
  };

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="lg"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        <Divider />
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-4-800x800.jpg")
                        .default
                    }
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                <i className="ni ni-user-run" />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {createLinks(rout)}
            {/* <ListItem button onClick={handleClick}>
              <ListItemText primary="Manage Settings" />
              {open ? <IconExpandLess /> : <IconExpandMore />}
            </ListItem> */}
            {/*parent condion start*/}
            {admin !== undefined ? (
              admin.account.account.super === true ||
              admin.permissionss.includes("View Admins") ||
              admin.permissionss.includes("Add Admins") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleAdminDrop}>
                      <ListItemIcon>
                        <i class="fas fa-user-shield text-primary"></i>
                      </ListItemIcon>
                      <ListItemText primary="Admins" />
                      {open2 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>

                  <CL in={open2} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Admins") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/View Admins"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Admins" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Admins") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/Add Admins"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Admins" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}
                  </CL>
                </NavItem>
              ) : null
            ) : null}

            {admin !== undefined ? (
              admin.account.account.super === true ||
              admin.permissionss.includes("Vew Permissions") ||
              admin.permissionss.includes("add permissions") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handlePermDrop}>
                      <ListItemIcon>
                        <i class="fas fa-cogs text-primary"></i>
                      </ListItemIcon>
                      <ListItemText primary="Permissions" />
                      {open5 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>

                  <CL in={open5} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Vew Permissions") ? (
                      <List>
                        <NavLink
                          to={"/admin/Vew Permissions"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Vew Permissions" />
                          </ListItem>
                        </NavLink>
                      </List>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("ADD Permissions") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/Add Permissions"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add permissions" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Assign Permissions") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/Assign Permissions"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Assign permissions" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}
                  </CL>
                </NavItem>
              ) : null
            ) : null}

            {admin !== undefined ? (
              admin.account.account.super === true ||
              admin.permissionss.includes("view roles") ||
              admin.permissionss.includes("add roles") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleRolesDrop}>
                      <ListItemIcon>
                        <i class="fas fa-user-tag text-primary"></i>
                      </ListItemIcon>
                      <ListItemText primary="Roles" />
                      {open4 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>

                  <CL in={open4} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionsss.includes("view roles") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/view roles"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View roles" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissions.includes("add roles") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/add roles"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add roles" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}
                  </CL>
                </NavItem>
              ) : null
            ) : null}

            {admin !== undefined ? (
              admin.account.account.super === true ||
              admin.permissionss.includes("View Classes") ||
              admin.permissionss.includes("Add Classes") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleClassDrop}>
                      <ListItemIcon>
                        <i class="fas fa-chalkboard-teacher text-primary"></i>
                      </ListItemIcon>

                      <ListItemText primary="Classes" />
                      {open3 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>
                  <CL in={open3} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Classes") ? (
                      <List>
                        <NavLink
                          to={"/admin/View Classes"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Classes" />
                          </ListItem>
                        </NavLink>
                      </List>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Classes") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/Add Classes"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Classes" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}
                  </CL>
                </NavItem>
              ) : null
            ) : null}

            {/*parent condion close*/}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
