import React, { useState, useEffect, useMemo } from "react";

import { useLoading, Audio } from "@agney/react-loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { makeStyles } from "@material-ui/core/styles";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
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

import { Modal } from "react-bootstrap";
// core components

// import { data } from "./Data.js";
// import Header from "components/Headers/Header.js";

const Admins = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();

  const [adminId, setAdminId] = useState("");
  const [fetchedAdmins, setFetchedAdmins] = useState();
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
  const [formState, setFormState] = useState();
  const [mounted, setMounted] = useState(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="50" />,
  });

  let admin = JSON.parse(localStorage.getItem("user"));
  if (
    !admin.permissionss.includes("View Admins") &&
    admin.account.super === false
  ) {
    props.history.push("/admin/404");
  }

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    fetch(`https://quran-server.herokuapp.com/admin/teachers`, {
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setFetchedAdmins(res);
      });
  }, [fetchedAdmins]);

  const edit = () => {
    console.log(currentAdmin.account.jwtToken);
    // setAdminId(a);
    let url = `https://quran-server.herokuapp.com/admin/teacher/${adminId}`;
    if (adminId !== "") {
      console.log(url);

      fetch(url, {
        method: "PUt",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
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
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessage(res.message);
          if (res.message === "Successfully Updated") {
            localStorage.setItem("lastCallAt", Date.now());
            setAlertType("success");
            setOpen(true);
            setTimeout(() => {
              handleShow();
            }, 1000);
          } else if (res.message === "Email is already in use") {
            setAlertType("warning");
            setOpen(true);
            // setTimeout(() => {
            //   setOpen(false);
            // }, 5000);
          } else if (res.message === "Phone Number is already in use") {
            setAlertType("warning");
            setOpen(true);
            // setTimeout(() => {
            //   setOpen(false);
            // }, 5000);
          } else {
            setAlertType("danger");
            setOpen(true);
            // setTimeout(() => {
            //   setOpen(false);
            // }, 5000);
          }
        });
    } else {
      setMessage("Wait a minute !!!! who are you ?????");
      setAlertType("danger");
      setOpen(true);
      // setTimeout(() => {
      //   setOpen(false);
      // }, 5000);
    }
  };

  const deleteAdmin = (adminid) => {
    console.log("delete function start");
    fetch(`https://quran-server.herokuapp.com/admin/teachers/${adminid}`, {
      method: "DELETE",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("response===> ", res);
      });
  };

  const displayStates = () => {
    // console.log({
    //   firstname: firstname,
    //   lastname: lastname,
    //   mobile: mobile,
    //   dob: dob,
    //   gender: gender,
    //   email: email,
    //   password: password,
    //   confirmPassword: confirmPassword,
    //   acceptTerms: acceptTerms,
    // });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = useStyles();

  function getFormattedDate(date) {
    var date = new Date(date);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;

    return year + "-" + month + "-" + day;
  }

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Add New Admin</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div>
            <Alert
              color={alertType}
              isOpen={open}
              onClick={() => setOpen(false)}
              toggle={() => setOpen(false)}
            >
              {message}
            </Alert>
            <div>
              <div className="container justify-content-center">
                {/* <Alert
                  color={alertType}
                  isOpen={open}
                  onClick={() => setOpen(false)}
                >
                  {message}
                </Alert> */}
                <div className="pb-5">
                  <h1 className="font-weight-bold fs">Update Teacher</h1>
                  <div
                    style={{
                      borderBottom: "5px solid #5e72e4",
                      width: "95px",
                    }}
                  />
                </div>
                <form className="css-prp">
                  <div className="row pb-lg-3 pb-md-3">
                    <div className="col-12  col-lg-6 col-md-6 form-group">
                      <label htmlFor="Name">First Name</label>
                      <input
                        placeholder="enter first name"
                        type="name"
                        value={firstname}
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
                        value={lastname}
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
                        value={mobile}
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
                        value={getFormattedDate(dob)}
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
                        value={email}
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
                        value={password}
                        className="form-control"
                        onChange={(e) => {
                          setpassword(e.target.value);
                        }}
                      />
                    </div>

                    <div className="dropdown col-xl-6 col-lg-6 col-md-6">
                      <label htmlFor="name">Gender</label>
                      <select
                        className="form-control"
                        id="sel1"
                        value={gender}
                        onChange={(e) => {
                          setgender(e.target.value);
                        }}
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BT variant="secondary" onClick={handleClose}>
            Close
          </BT>
          <BT
            style={{ background: "#5e72e4", color: "white" }}
            // onClick={displayStates}
            onClick={() => {
              displayStates();
              edit();
            }}
          >
            Update
          </BT>
        </Modal.Footer>
      </Modal>

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
                      Teachers
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {fetchedAdmins === undefined
                    ? null
                    : fetchedAdmins.map((data) =>
                        data.status !== "" ? (
                          <tr
                            key={data.id}
                            onClick={() =>
                              props.history.push(
                                "/admin/teachers/timeline",
                                data
                              )
                            }
                          >
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {data.firstName}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td>
                              <span className="mb-0 text-sm">
                                {data.lastName}
                              </span>
                            </td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {data.email}
                              </Badge>
                            </td>

                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                {data.status === "active" ? (
                                  <i className="bg-success" />
                                ) : null}

                                {data.status === "Inactive" ? (
                                  <i className="bg-warning" />
                                ) : null}

                                {data.status === "blocked" ? (
                                  <i className="bg-dark" />
                                ) : null}
                                {data.status}
                              </Badge>
                            </td>

                            {currentAdmin !== undefined ? (
                              currentAdmin.account.account.super === true ||
                              currentAdmin.permissionss.includes(
                                "Edit Admin"
                              ) ? (
                                <td
                                  onClick={() => {
                                    setAdminId(data.id);
                                    setAdminId(data.id);
                                    setfirstname(data.firstName);
                                    setlastname(data.lastName);
                                    console.log(getFormattedDate(data.dob));
                                    setEmail(data.email);
                                    setdob(data.dob);
                                    setmobile(data.mobile);
                                    setgender(data.gender);
                                    handleShow();
                                    handleShow();
                                  }}
                                  className="icon-btn"
                                >
                                  <FontAwesomeIcon
                                    className="btn-icon-only"
                                    icon={faEdit}
                                  />
                                </td>
                              ) : (
                                <td></td>
                              )
                            ) : null}

                            {currentAdmin !== undefined ? (
                              currentAdmin.account.account.super === true ||
                              currentAdmin.permissionss.includes(
                                "Delete Admin"
                              ) ? (
                                <td
                                  className="icon-btn"
                                  onClick={() => {
                                    // setAdminId(data.id);
                                    // alert(data.id);
                                    deleteAdmin(data.id);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </td>
                              ) : (
                                <td></td>
                              )
                            ) : null}
                          </tr>
                        ) : null
                      )}
                </tbody>
              </Table>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});
export default Admins;
