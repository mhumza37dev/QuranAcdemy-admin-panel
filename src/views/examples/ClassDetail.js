import { Paper } from "@material-ui/core";
import React, { useState, useEffect, useMemo } from "react";

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Media,
  Progress,
  Table,
  Container,
  Row,
  Alert,
  Col,
  Button as BT,
} from "reactstrap";
import Page404 from "./Page404";
import Calendar from "react-material-ui-calendar";
import { Modal } from "react-bootstrap";

const ClassDetail = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [enrolledStudents, setEnrolledStudents] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState();
  const [allStudents, setAllStudents] = useState();
  const [showCalendar, setShowCalendar] = useState(false);
  const [stdToEnroll, setStdToEnroll] = useState();
  const [paidStatus, setPaidStatus] = useState({
    unPaid: "un-Paid",
    Paid: "Paid",
  });
  const [date, setDate] = useState();

  console.log("props==> ", props.location.state);

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    if (props.location.state !== undefined && props.location.state !== null) {
      fetch(`https://quran-server.herokuapp.com/admin/class`, {
        method: "GET",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (
            props.location.state !== undefined &&
            props.location.state !== null
          ) {
            var resultObject = search(props.location.state.id, res);

            setEnrolledStudents(
              resultObject.students.map((data) => ({ ...data, isPaid: false }))
            );
            console.log(
              resultObject.students.map((data) => ({ ...data, isPaid: false }))
            );

            setSelectedClass(resultObject);
            console.log("selected class ===> ", selectedClass);
          }
        });

      fetch("https://quran-server.herokuapp.com/admin/students", {
        method: "GET",
        dataType: "JSON",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAllStudents(res);
          console.log(res);
        });
    }
  }, []);

  const callBackFunction = (value) => {
    if (value.getMonth() < 10) {
      if (value.getDate() < 10) {
        props.history.push("/admin/class/attendance", {
          class: selectedClass.id,
          students: enrolledStudents.map((std) => std.id),
          date:
            value.getFullYear() +
            "-0" +
            (parseInt(value.getMonth()) + 1).toString() +
            "-0" +
            value.getDate(),
        });
      } else {
        props.history.push("/admin/class/attendance", {
          class: selectedClass.id,
          students: enrolledStudents.map((std) => std.id),
          date:
            value.getFullYear() +
            "-0" +
            (parseInt(value.getMonth()) + 1).toString() +
            "-" +
            value.getDate(),
        });
      }
    } else {
      props.history.push("/admin/class/attendance", {
        class: selectedClass.id,
        students: enrolledStudents.map((std) => std.id),
        date:
          value.getFullYear() +
          "-" +
          (parseInt(value.getMonth()) + 1).toString() +
          "-" +
          value.getDate(),
      });
    }
  };

  const addStudents = () => {
    if (stdToEnroll === undefined) {
      setAlertType("warning");
      setMessage("Select student first");
      setOpen(true);
    }
    fetch("https://quran-server.herokuapp.com/admin/class/addstudentstoclass", {
      method: "PUT",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
      body: JSON.stringify({
        id: selectedClass.id,
        students: stdToEnroll,
        fee_status: "unpaid",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === "Successfully Enrolled") {
          setAlertType("success");
          setMessage(res.message);
          setOpen(true);
        } else {
          setAlertType("danger");
          setMessage(res.message);
          setOpen(true);
        }
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (props.location.state === undefined || props.location.state === null) {
    return <Page404 />;
  } else {
    return (
      <>
        <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="xs"
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
                    <h1 className="font-weight-bold fs">
                      Enroll Students to Class
                    </h1>
                    <div
                      style={{
                        borderBottom: "5px solid #5e72e4",
                        width: "85px",
                      }}
                    />
                  </div>
                  <form className="css-prp">
                    <div className="row pb-lg-3 pb-md-3">
                      <div className="dropdown col-xl-12 col-lg-6 col-md-6">
                        <label htmlFor="Students">Select Students</label>
                        <select
                          className="form-control"
                          id="sel1"
                          value={stdToEnroll}
                          onChange={(e) => {
                            setStdToEnroll(e.target.value);
                          }}
                        >
                          <option value={undefined}>students</option>
                          {allStudents !== undefined &&
                            allStudents.map((std) => (
                              <option key={std.id} value={std.id}>
                                {std.firstName + " " + std.lastName}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="col-12 col-lg-12 col-md-6 form-group">
                        <div className="wrapper">
                          <label htmlFor="status">Status</label>
                          <input
                            type="radio"
                            name="select"
                            id="option-1"
                            defaultChecked
                          />
                          <input type="radio" name="select" id="option-2" />
                          <label htmlFor="option-1" className="option option-1">
                            <div className="dot" />
                            <span>Paid</span>
                          </label>
                          <label htmlFor="option-2" className="option option-2">
                            <div className="dot" />
                            <span>Unpaid</span>
                          </label>
                        </div>
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
                // displayStates();
                // edit();
                addStudents();
              }}
            >
              Update
            </BT>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showCalendar}
          onHide={() => setShowCalendar(false)}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header closeButton>Select Date</Modal.Header>
          <Modal.Body>
            <Calendar
              generalStyle={{
                maxWidth: "100%",
                margin: "0 auto",
                backgroundColor: "rgba(256,256,256,1)",
                height: "100%",
                overflow: "auto",
              }}
              selection={callBackFunction}
              light={true}
            />
          </Modal.Body>

          <Modal.Footer>
            <BT onClick={() => setShowCalendar(false)}>close</BT>
          </Modal.Footer>
        </Modal>

        <Container className="mt--7" fluid>
          <span></span>

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row xl="8">
                    <Col>
                      <h3 className="mb-0">Details</h3>
                    </Col>
                    <Col className="col text-right">
                      <h5
                        className="mb-0 text-muted"
                        style={{ paddingLeft: "1%" }}
                      >
                        {selectedClass !== undefined &&
                          "Class ID: " + selectedClass.id}
                      </h5>
                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Instructor : " +
                            selectedClass.teacher[0].firstName +
                            " " +
                            selectedClass.teacher[0].lastName}
                      </h5>

                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Title : " + selectedClass.course.Title}
                      </h5>

                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Subscription Type : " +
                            selectedClass.subscription_type}
                      </h5>

                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Days : " + selectedClass.days}
                      </h5>
                    </Col>
                  </Row>
                </CardHeader>

                <Row className="mt-5" style={{ margin: "2%" }}>
                  <Col className="mb-5 mb-xl-0" xl="12">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col">
                            <h3 className="mb-0">Students</h3>
                          </div>
                          <div className="col text-right">
                            <BT
                              color="primary"
                              onClick={(e) => {
                                handleShow();
                              }}
                              size="sm"
                            >
                              Enroll Student
                            </BT>
                          </div>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Student name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Unique users</th>
                            <th scope="col">Status</th>
                            <th>Attendance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enrolledStudents !== undefined &&
                            enrolledStudents.map((data) => (
                              <tr>
                                <th scope="row">
                                  {data.firstName + " " + data.lastName}
                                </th>
                                <td>{data.email}</td>
                                <td>319</td>
                                <td>
                                  {!data.isPaid ? (
                                    <i className="far fa-times-circle text-warning mr-3" />
                                  ) : (
                                    <i className="far fa-times-circle text-success mr-3" />
                                  )}

                                  {!data.isPaid ? "Unpaid" : "paid"}
                                </td>
                                <td>
                                  <BT size="sm" onClick={() => {}}>
                                    View
                                  </BT>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>

                <CardFooter className="py-4">
                  <Row>
                    <div className="col">
                      {/* <Card className="shadow"> */}

                      <Row xl="2">
                        <Col>
                          <BT onClick={(value) => setShowCalendar(true)}>
                            Manage attendance
                          </BT>
                        </Col>
                        <Col className="col text-right">
                          <h5
                            className="mb-0 text-muted"
                            style={{ paddingLeft: "1%" }}
                          >
                            {selectedClass !== undefined &&
                              "Total Fees :  " + parseInt(selectedClass.fee)}
                          </h5>
                        </Col>
                      </Row>
                      {/* </Card> */}
                    </div>
                  </Row>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
};

export default ClassDetail;
