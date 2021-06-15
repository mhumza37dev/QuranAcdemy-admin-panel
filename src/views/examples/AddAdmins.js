import React, { useState } from "react";

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
  const [runn, setrunn] = useState();
  const [show, setShow] = useState(false);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobile, setmobile] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [acceptTerms, setacceptTerms] = useState();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  let admin = JSON.parse(localStorage.getItem("user"));
  if (admin.account.super === false) {
    if (!admin.permissionss.includes("Add Admins")) {
      props.history.push("/admin/404");
    }
  }

  const register = () => {
    setLoading(true);
    fetch("https://quran-server.herokuapp.com/admin/register", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
        dob: dob,
        gender: gender,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMessage(res.message);
        if (res.message === "Registration successful.") {
          localStorage.setItem("lastCallAt", Date.now());
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
                      Admins
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
                        <h1 className="font-weight-bold fs">Add New Admin</h1>
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
                            <label htmlFor="Name">First Name</label>
                            <input
                              placeholder="enter first name"
                              type="name"
                              className="form-control"
                              onChange={(e) => {
                                setfirstname(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-12 col-lg-6 col-md-6 form-group">
                            <label htmlFor="name">Last Name</label>
                            <input
                              placeholder="enter last name"
                              type="name"
                              className="form-control"
                              onChange={(e) => {
                                setlastname(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="address">Mobile</label>
                            <input
                              placeholder="enter mobile number"
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setmobile(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-12 col-lg-6 col-md-6 form-group">
                            <label htmlFor="birthday">Birthday</label>
                            <input
                              placeholder="enter birthday"
                              type="Date"
                              className="form-control"
                              onChange={(e) => {
                                setdob(e.target.value);
                              }}
                            />
                          </div>
                          <div className="col-12 col-lg-12 col-md-12 form-group">
                            <label htmlFor="birthday">Email</label>
                            <input
                              placeholder="Enter Email"
                              type="email"
                              className="form-control"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-12 col-lg-6 col-md-6 form-group">
                            <label htmlFor="name">Password</label>
                            <input
                              placeholder="Enter Password"
                              type="password"
                              className="form-control"
                              onChange={(e) => {
                                setpassword(e.target.value);
                              }}
                            />
                          </div>

                          <div className="dropdown col-xl-4 col-lg-4 col-md-4">
                            <label htmlFor="name">Gender</label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel1"
                              onChange={(e) => {
                                setgender(e.target.value);
                              }}
                            >
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>

                        <label></label>
                        <BT
                          size="lg"
                          style={{
                            background: "#5e72e4",
                            color: "white",
                            marginTop: "20px",
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
                          {!loading && <strong>Add Admin</strong>}
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
