import React, { useState, useEffect, useMemo } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Alert,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button as BT,
} from "reactstrap";

function AssignPermissions(props) {
  const [permissions, setPermissions] = useState();
  const [adminPermissions, setAdminPermissions] = useState();
  const [adminModule, setAdminModule] = useState();
  const [permissionModule, setPermissionModule] = useState();
  const [rolesModule, setRolesModule] = useState();
  const [classModule, setClassModule] = useState();
  const [teacherModule, setTeacherModule] = useState();
  const [studentsModule, setStudentsModule] = useState();
  const [coursesModule, setCoursesModule] = useState();
  const [cmsModule, setCmsModule] = useState();
  const [otherModules, SetOtherModules] = useState();
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState();
  const [assignedPermissios, setAssignedPermissios] = useState({ perms: [] });
  const [roleName, setRoleName] = useState();

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    fetch(`https://quran-server.herokuapp.com/admin/permission/`, {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        let arr = res.data.map((item) => {
          return item;
        });
        console.log("arr", arr);
        let adminPermissions = [];
        let permissionPermissions = [];
        let rolePermissions = [];
        let classPermissions = [];
        let coursePermissions = [];
        let studentPermissions = [];
        let teacherPermissions = [];
        let cmsPermissions = [];
        let others = [];

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].Name.includes("Admin")) {
            adminPermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Permission")) {
            permissionPermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Role")) {
            rolePermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Class")) {
            classPermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Student")) {
            studentPermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Teacher")) {
            teacherPermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Course")) {
            coursePermissions.push(arr[i]);
          } else if (arr[i].Name.includes("Cms")) {
            cmsPermissions.push(arr[i]);
          } else {
            others.push(arr[i]);
          }
        }
        console.log("adminPermissions", adminPermissions);
        // arr.forEach((element) => {
        //   if (element.includes({Name: "Admin"})) {
        //     adminPermissions.push(element);
        //   } else if (element.includes("Permission")) {
        //     permissionPermissions.push(element);
        //   } else if (element.includes("Role")) {
        //     rolePermissions.push(element);
        //   } else if (element.includes("Class")) {
        //     classPermissions.push(element);
        //   } else if (element.includes("Student")) {
        //     studentPermissions.push(element);
        //   } else if (element.includes("Teacher")) {
        //     teacherPermissions.push(element);
        //   } else if (element.includes("Course")) {
        //     coursePermissions.push(element);
        //   } else if (element.includes("Cms")) {
        //     cmsPermissions.push(element);
        //   } else {
        //     others.push(element);
        //   }
        // });
        setAdminModule(adminPermissions);
        setPermissionModule(permissionPermissions);
        setClassModule(classPermissions);
        setCoursesModule(coursePermissions);
        setCmsModule(cmsPermissions);
        setStudentsModule(studentPermissions);
        setTeacherModule(teacherPermissions);
        SetOtherModules(others);
        setRolesModule(rolePermissions);
        // console.log(res[0].Name);
        setPermissions(
          res.data.map((perms) => {
            return perms.Name;
          })
        );
      });
    console.log(permissions);
  }, []);

  useEffect(() => {
    console.log(assignedPermissios, assignedPermissios.perms.length);
  }, [assignedPermissios]);

  const add = () => {
    setLoading(true);
    // alert("sss");
    if (roleName === "") {
      setAlertType("warning");
      setMessage("Role Name can not be empty");
      setOpen(true);
    } else {
      fetch(`https://quran-server.herokuapp.com/admin/roles/add`, {
        method: "POST",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
        },
        body: JSON.stringify({
          Name: roleName,
          permissions: assignedPermissios.perms,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.message === "Role Added") {
            setRoleName("");
            setAlertType("success");
            setLoading(false);
            setMessage("Role Succesfully Added");
            setOpen(true);
          } else {
            setRoleName("");
            setAlertType("danger");
            setLoading(false);
            setMessage("Role Name can not be empty");
            setOpen(true);
          }
        });
    }
  };

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row xl="2">
                  <Col>
                    <h3 className="mb-0"></h3>
                  </Col>
                </Row>
              </CardHeader>

              <div>
                <div>
                  <div className="container justify-content-center">
                    <div className="pb-5">
                      <h1 className="font-weight-bold fs">Add Roles</h1>
                      <div
                        style={{
                          borderBottom: "5px solid #5e72e4",
                          width: "60px",
                        }}
                      />
                    </div>
                    <Alert
                      color={alertType}
                      isOpen={open}
                      closeAriaLabel=""
                      onClick={() => setOpen(false)}
                      toggle={() => setOpen(false)}
                    >
                      {message}
                    </Alert>
                    <form
                      className="css-prp"
                      //   style={{ textAlign: "center" }}
                    >
                      <div className="row pb-lg-3 pb-md-3">
                        <div className="col-12  col-lg-6 col-md-6 form-group">
                          <label htmlFor="Name">Enter Role Name</label>
                          <input
                            style={{ width: "100%" }}
                            className="form-control"
                            id="sel1"
                            value={roleName}
                            placeholder="Role Name"
                            onChange={(e) => setRoleName(e.target.value)}
                          ></input>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr alignItems="center">
                    <th scope="col">Module</th>
                    <th scope="col" colSpan="3">
                      Permissions
                    </th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Admin"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {adminModule !== undefined &&
                      adminModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Permisssions"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {permissionModule !== undefined &&
                      permissionModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Roles"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {rolesModule !== undefined &&
                      rolesModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Classes"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {classModule !== undefined &&
                      classModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Teachers"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {teacherModule !== undefined &&
                      teacherModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Students"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {studentsModule !== undefined &&
                      studentsModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"Courses"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {coursesModule !== undefined &&
                      coursesModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      // style={{ borderRight: "1px solid #dddddd" }}
                    >
                      <Media className="align-items-center">
                        {/* <h1>hamza<h1
                         */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <>{"CMS"}</>
                          </span>
                        </Media>
                      </Media>
                    </th>
                    {cmsModule !== undefined &&
                      cmsModule.map((item) => (
                        <td>
                          <input
                            className="custom-control-input"
                            id={item.id}
                            type="checkbox"
                            onClick={() => {
                              var checkedValue = document.getElementById(
                                item.id
                              );
                              if (checkedValue.checked) {
                                if (
                                  !assignedPermissios.perms.includes(item.id)
                                ) {
                                  setAssignedPermissios((prevState) => ({
                                    perms: [...prevState.perms, item.id],
                                  }));
                                }
                              } else if (!checkedValue.checked) {
                                setAssignedPermissios((prevState) => ({
                                  perms: [
                                    ...prevState.perms.filter(
                                      (i) => i !== item.id
                                    ),
                                  ],
                                }));
                              }
                            }}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={item.id}
                            style={{ marginLeft: "40px" }}
                          >
                            <span className="text">{item.Name}</span>
                          </label>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <BT
                  size="lg"
                  style={{
                    background: "#5e72e4",
                    color: "white",
                    marginTop: "0px",
                  }}
                  onClick={() => {
                    add();
                  }}
                >
                  Add
                </BT>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default AssignPermissions;
