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
  Col,
  Button as BT,
} from "reactstrap";
import Page404 from "./Page404";

const ClassDetail = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [selectedClass, setSelectedClass] = useState();

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
            console.log(resultObject);
            setSelectedClass(resultObject);
            console.log("selected class ===> ", selectedClass);
          }
        });
    }
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
                    <Col xl="4">
                      <h3 className="mb-0">Details</h3>
                    </Col>
                    {/* <Col className="col text-left">
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
                    </Col> */}
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
                              onClick={(e) => e.preventDefault()}
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Muhammad Humza</th>
                            <td>mhumza37@gmail.com</td>
                            <td>340</td>
                            <td>
                              <i className="far fa-check-circle text-success mr-3" />{" "}
                              Paid
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Muhammad Affan</th>
                            <td>affan@gmail.com</td>
                            <td>319</td>
                            <td>
                              <i className="far fa-times-circle text-warning mr-3" />{" "}
                              Un-Paid
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Muneeb Ahmed</th>
                            <td>muneeb@gmail.com</td>
                            <td>294</td>
                            <td>
                              <i className="far fa-check-circle text-success mr-3" />{" "}
                              Paid
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Yasir Khan</th>
                            <td>yasir@gmail.com</td>
                            <td>147</td>
                            <td>
                              <i className="far fa-times-circle text-warning mr-3" />{" "}
                              un-Paid
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Jamil Phullani</th>
                            <td>jamil@gmail.com</td>
                            <td>190</td>
                            <td>
                              <i className="far fa-check-circle text-success mr-3" />{" "}
                              Paid
                            </td>
                          </tr>
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
                        <Col></Col>
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
