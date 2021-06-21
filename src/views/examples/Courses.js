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
import { title } from "process";
// core components

// import { data } from "./Data.js";
// import Header from "components/Headers/Header.js";

const Admins = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();

  const [adminId, setAdminId] = useState("");
  const [fetchedAdmins, setFetchedAdmins] = useState();
  const [runn, setrunn] = useState();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
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
    fetch(`https://quran-server.herokuapp.com/admin/course`, {
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
    let url = `https://quran-server.herokuapp.com/admin/course/${adminId}`;
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
          Title: title,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setMessage(res.message);
          if (res.Title === title) {
            localStorage.setItem("lastCallAt", Date.now());
            setMessage("Updated");
            setAlertType("success");
            setOpen(true);
            setTimeout(() => {
              handleShow();
            }, 1000);
          } else if (res.message === "Course not found") {
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
    fetch(`https://quran-server.herokuapp.com/admin/course/${adminid}`, {
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
                  <h1 className="font-weight-bold fs">Update Student</h1>
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
                        value={title}
                        className="form-control"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                      />
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
                      Courses
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    {/* <th scope="col">Lastname</th>
                    <th scope="col">Email</th> */}
                    <th scope="col">Description</th>
                    <th scope="col" />
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {fetchedAdmins === undefined
                    ? null
                    : fetchedAdmins.map((data) =>
                        data.status !== "blocked" ? (
                          <tr key={data.id}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {data.Title}
                                  </span>
                                </Media>
                              </Media>
                            </th>

                            <td scope="row" style={{ width: "fit-content" }}>
                              <span className="mb-0 text-sm">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. <br />
                                Lorem Ipsum has been the industry's standard
                                dummy text ever since the 1500s, <br />
                                when an unknown <br />
                                printer took a galley of type and scrambled it
                                to make a type specimen book.
                                <br /> It has survived not only five centuries,{" "}
                                <br />
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged.
                              </span>
                            </td>

                            {currentAdmin !== undefined ? (
                              currentAdmin.account.account.super === true ||
                              currentAdmin.permissionss.includes(
                                "Edit Admin"
                              ) ? (
                                <td
                                  onClick={() => {
                                    setAdminId(data.id);
                                    setTitle(data.Title);
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
