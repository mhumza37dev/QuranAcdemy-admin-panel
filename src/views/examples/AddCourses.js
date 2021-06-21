import React, { useState, useEffect, useMemo } from "react";

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
  Container,
  Row,
  Col,
  Alert,
  Button as BT,
} from "reactstrap";

const AddAdmins = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [runn, setrunn] = useState();
  const [show, setShow] = useState(false);
  const [title, setTile] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobile, setmobile] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [role, setRole] = useState("");

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [fetchRoles, setFetchedRoles] = useState();

  let admin = JSON.parse(localStorage.getItem("user"));
  if (admin.account.super === false) {
    if (!admin.permissionss.includes("Add Admins")) {
      props.history.push("/admin/404");
    }
  }

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    console.log("selected role===> ", role);
  }, [role]);

  useEffect(() => {
    fetch(`https://quran-server.herokuapp.com/admin/roles`, {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFetchedRoles(res);
      });
  }, []);

  const register = () => {
    setLoading(true);
    fetch(`https://quran-server.herokuapp.com/admin/course/add`, {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
      body: JSON.stringify({
        Title: title,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessage(res.message);
        if (res.message === "Course Added") {
          setLoading(false);
          setAlertType("success");
          setOpen(true);
        } else if (res.message === "Email is already in use") {
          setLoading(false);
          setAlertType("warning");
          setOpen(true);
        } else if (res.message === "Phone Number is already in use") {
          setLoading(false);
          setAlertType("warning");
          setOpen(true);
        } else {
          setLoading(false);
          setAlertType("danger");
          setOpen(true);
        }
      });
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
                    <h3 className="mb-0">
                      <br />
                      Course
                    </h3>
                  </Col>
                  <Col>
                    <h3 className="mb-0" style={{ textAlign: "end" }}></h3>
                  </Col>
                </Row>
              </CardHeader>

              <CardFooter className="py-4">
                <div>
                  <Alert
                    color={alertType}
                    isOpen={open}
                    closeAriaLabel=""
                    onClick={() => setOpen(false)}
                  >
                    {message}
                  </Alert>
                  <div>
                    <div className="container justify-content-center">
                      <div className="pb-5">
                        <h1 className="font-weight-bold fs">Add New Course</h1>
                        <div
                          style={{
                            borderBottom: "5px solid #5e72e4",
                            width: "60px",
                          }}
                        />
                      </div>
                      <form
                        className="css-prp"
                        //   style={{ textAlign: "center" }}
                      >
                        <div className="row pb-lg-3 pb-md-3">
                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Title</label>
                            <input
                              placeholder="enter course title"
                              type="name"
                              className="form-control"
                              onChange={(e) => {
                                setTile(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <BT
                          size="lg"
                          style={{
                            background: "#5e72e4",
                            color: "white",
                            marginTop: "0px",
                          }}
                          onClick={() => {
                            register();
                          }}
                        >
                          {loading && (
                            <i
                              className="fa fa-refresh fa-spin"
                              style={{ marginRight: "5px", color: "white" }}
                            />
                          )}
                          {loading && <span>Please Wait</span>}
                          {!loading && <strong>Add Course</strong>}
                        </BT>
                      </form>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddAdmins;
