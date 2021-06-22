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

import Avatar from "../../assets/img/theme/team-1-800x800.jpg";

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

const Sidebar = (props) => {
  const [admin, setAdmin] = useState();
  const [collapseOpen, setCollapseOpen] = useState();
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);

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

  function handleCoursesDrop() {
    setOpen6(!open6);
  }

  function handleTeacherDrop() {
    setOpen7(!open7);
  }
  function handleStudentsDrop() {
    setOpen8(!open8);
  }

  // <i class=""></i>

  var rout = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "fas fa-th-large text-primary",
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
                {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAABg0lEQVQ4jc2SOy8EURiGn+/MzrCUCteNKAg/aCvXiEoiblHpJDQiRCVxiaCyv8JvkJBQCMui0LKZNedTrF0zszusirea5H3nOe/5vgP/XVL5mFi66dDAG1GsE0u8HG1k9gDGFvNTKG1R2wTi+CeH631PAKmKYa07CboaOqMshYml/BmADWQ33khR1LoesBYBourVwCrWu/XKdZy6fvnfskz9RK2sujbJUzVVL5UUiqv40HnVnClsG7QzchDiO0ZOfw3M5SQAZn/KNQzMZtVJZwqbgnbEG2Jl9Xir67JhYJNnTLr/eei1qDMa8wRFhStgBUJLCQ82rtZWlyavlLhAEVv1Qs9GcioMGL6ewOeVHu/P2y9aeu4GE59NSFXg5wxGkoLj87c/wiLA0bnCEEaX6zUs5rsW4O53QESzgg7XG3pz9+NOQzRCSwkPtiYkyQv5pqH4xOtVrJTxATRIoIj4NUBjSgc28FwgHcmit4frmWuA8YX7aUV6Y7i30ntqv9Eb/L0+AKFrg/ymTyoLAAAAAElFTkSuQmCC" /> */}
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
          {/* <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
     
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
          </UncontrolledDropdown> */}
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/theme/team-1-800x800.jpg")
                        .default
                    }
                    src={Avatar}
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
              admin.permissionss.includes("View Admin") ||
              admin.permissionss.includes("Add Admin") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleAdminDrop}>
                      <ListItemIcon>
                        <i className="fas fa-user-shield text-primary"></i>
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
                    admin.permissionss.includes("View Admin") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/admins/all"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Admin" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Admin") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/admins/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Admin" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Admin") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/admins/blacklist"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Black List" />
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
              admin.permissionss.includes("Vew Permission") ||
              admin.permissionss.includes("Add Permission") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handlePermDrop}>
                      <ListItemIcon>
                        <i class="fas fa-universal-access text-primary"></i>
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
                    admin.permissionss.includes("Vew Permission") ? (
                      <List>
                        <NavLink
                          to={"/admin/permissions/all"}
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
                    admin.permissionss.includes("Add Permission") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/permissions/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Permissions" />
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
              admin.permissionss.includes("view Role") ||
              admin.permissionss.includes("add Role") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleRolesDrop}>
                      <ListItemIcon>
                        <i class="fas fa-anchor text-primary"></i>
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
                    admin.account.account.role_ids === true ||
                    admin.permissionsss.includes("View Role") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/roles/all"}
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
                    admin.permissions.includes("Add Role") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/roles/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Roles" />
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
              admin.permissionss.includes("View Class") ||
              admin.permissionss.includes("Add Class") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleClassDrop}>
                      <ListItemIcon>
                        <i class="fas fa-university text-primary"></i>
                        {/* <i class="fas fa-chalkboard-teacher text-primary"></i> */}
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
                    admin.permissionss.includes("View Class") ? (
                      <List>
                        <NavLink
                          to={"/admin/class/all"}
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
                    admin.permissionss.includes("Add Class") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/class/add"}
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
            {admin !== undefined ? (
              admin.account.account.super === true ||
              admin.permissionss.includes("View Course") ||
              admin.permissionss.includes("Add Course") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleCoursesDrop}>
                      <ListItemIcon>
                        <i class="fas fa-book-open text-primary"></i>
                      </ListItemIcon>

                      <ListItemText primary="Courses" />
                      {open6 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>
                  <CL in={open6} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Course") ? (
                      <List>
                        <NavLink
                          to={"/admin/course/all"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Courses" />
                          </ListItem>
                        </NavLink>
                      </List>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Course") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/course/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Courses" />
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
              admin.permissionss.includes("View Teacher") ||
              admin.permissionss.includes("Add Teacher") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleTeacherDrop}>
                      <ListItemIcon>
                        <i class="fas fa-chalkboard-teacher text-primary"></i>
                      </ListItemIcon>

                      <ListItemText primary="Teachers" />
                      {open7 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>
                  <CL in={open7} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Teacher") ? (
                      <List>
                        <NavLink
                          to={"/admin/teachers/all"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Teacher" />
                          </ListItem>
                        </NavLink>
                      </List>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Teacher") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/teachers/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Teachers" />
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
              admin.permissionss.includes("View Student") ||
              admin.permissionss.includes("Add Student") ? (
                <NavItem>
                  <NavLink>
                    <ListItem button onClick={handleStudentsDrop}>
                      <ListItemIcon>
                        <i class="fas fa-user-graduate text-primary"></i>
                      </ListItemIcon>

                      <ListItemText primary="Student" />
                      {open8 ? (
                        <RemoveIcon style={{ paddingLeft: "10px" }} />
                      ) : (
                        <AddIcon style={{ paddingLeft: "10px" }} />
                      )}
                    </ListItem>
                  </NavLink>
                  <CL in={open8} timeout="auto" unmountOnExit>
                    {admin.account.account.super === true ||
                    admin.permissionss.includes("View Student") ? (
                      <List>
                        <NavLink
                          to={"/admin/students/all"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="View Students" />
                          </ListItem>
                        </NavLink>
                      </List>
                    ) : null}

                    {admin.account.account.super === true ||
                    admin.permissionss.includes("Add Student") ? (
                      <NavItem>
                        <NavLink
                          to={"/admin/students/add"}
                          tag={NavLinkRRD}
                          onClick={closeCollapse}
                          activeClassName="active"
                        >
                          <ListItem button>
                            <ListItemText primary="Add Students" />
                          </ListItem>
                        </NavLink>
                      </NavItem>
                    ) : null}
                  </CL>
                </NavItem>
              ) : null
            ) : null}

            {/*parent condion close*/}
            <Divider />
            <NavItem>
              <NavLink
                to={"/admin/settings"}
                tag={NavLinkRRD}
                onClick={closeCollapse}
                // activeClassName="active"
              >
                <ListItem button>
                  <ListItemIcon>
                    <i class="fas fa-cogs text-primary"></i>
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </NavLink>
            </NavItem>
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
