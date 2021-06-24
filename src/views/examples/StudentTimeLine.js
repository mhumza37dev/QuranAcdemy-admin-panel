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
import Rating from "@material-ui/lab/Rating";

import Page404 from "./Page404";
import Timeline from "components/TimeLine/Student/Timeline";

const StudentTimeLine = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [selectedClass, setSelectedClass] = useState();

  const [enrolledStudents, setEnrolledStudents] = useState();

  console.log("props==> ", props.location.state);

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }

  useMemo(() => {
    setCurrentAdmin(JSON.parse(localStorage.getItem("user")));
    console.log("useMemo");
  }, []);

  useEffect(() => {
    fetch(`https://quran-server.herokuapp.com/admin/students`, {
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
        if (
          props.location.state !== undefined &&
          props.location.state !== null
        ) {
          var resultObject = search(props.location.state.id, res);
          setEnrolledStudents(
            resultObject.class_ids.map((data) => ({ ...data }))
          );
          //   console.log(
          //     resultObject.students.map((data) => ({ ...data, isPaid: false }))
          //   );
          console.log("cclass_ids", resultObject.class_ids);
          setSelectedClass(resultObject);
          console.log("selected class ===> ", selectedClass);
        }
      });
  }, []);

  if (props.location.state === undefined || props.location.state === null) {
    return <Page404 />;
  } else {
    return (
      <>
        <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
        <Container className="mt--7" fluid>
          <span></span>

          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row xl="8">
                    <Col>
                      <h3 className="mb-0 ">Student Timeline</h3>
                    </Col>
                    <Col className="col text-right">
                      <h5
                        className="mb-0 text-muted"
                        style={{ paddingLeft: "1%" }}
                      >
                        {selectedClass !== undefined &&
                          "ID: " + selectedClass.id}
                      </h5>
                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Instructor : " +
                            selectedClass.firstName +
                            " " +
                            selectedClass.lastName}
                      </h5>

                      {/* <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Title : " + selectedClass.course.Title}
                      </h5> */}

                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Mobile # : " + selectedClass.mobile}
                      </h5>

                      <h5 className="mb-0 " style={{ padding: "1%" }}>
                        {selectedClass !== undefined &&
                          "Email : " + selectedClass.email}
                      </h5>
                    </Col>
                  </Row>
                </CardHeader>

                <Row className="mt-5" style={{ margin: "2%" }}>
                  <Col className="mb-5 mb-xl-0" xl="10">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col ">
                            <h3 className="mb-0 ">All Classes</h3>
                          </div>
                          <div className="col text-right"></div>
                        </Row>
                      </CardHeader>
                      {/* {selectedClass !== undefined && (
                      <Timeline
                        name={
                          selectedClass.firstName + " " + selectedClass.lastName
                        }
                        students={selectedClass.class_ids}
                      />
                    )} */}
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            {/* <th scope="col">Student name</th> */}
                            <th scope="col">courses</th>
                            <th scope="col">subscription_type</th>
                            <th scope="col">days</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enrolledStudents !== undefined &&
                            enrolledStudents.map((data) => (
                              <tr>
                                {/* <th scope="row">
                                  {data.firstName + " " + data.lastName}
                                </th> */}
                                <td>{data.course.Title}</td>
                                <td>{data.subscription_type}</td>
                                <td>{data.days}</td>
                                <td>
                                  {!data ? (
                                    <i className="far fa-times-circle text-warning mr-3" />
                                  ) : (
                                    <i className="far fa-check-circle text-success mr-3" />
                                  )}

                                  {!data ? "expired" : "ongoing"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>

                  <Col className="mb-5 mb-xl-0" xl="2">
                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <div className="col ">
                            <h3 className="mb-0 ">Certifications</h3>
                          </div>
                          <div className="col text-right"></div>
                        </Row>
                      </CardHeader>
                      <Table
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            {/* <th scope="col">Student name</th> */}
                            <th scope="col">courses</th>
                            {/* <th scope="col">Ratings</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {enrolledStudents !== undefined &&
                            enrolledStudents.map((data) => (
                              <tr>
                                <td>{data.course.Title}</td>
                                {/* <td>
                                  <Rating name="hover-feedback" value={5} />
                                </td> */}
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
                      <Row xl="2">
                        <Col></Col>
                        <Col className="col text-right">
                          <h5
                            className="mb-0 text-muted"
                            style={{ paddingLeft: "1%" }}
                          >
                            {selectedClass !== undefined &&
                              "Status :  " + selectedClass.status}
                          </h5>
                        </Col>
                      </Row>
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

export default StudentTimeLine;
