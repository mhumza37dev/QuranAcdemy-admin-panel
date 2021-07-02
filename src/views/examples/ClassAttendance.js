import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

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

const ClassAttendance = (props) => {
  // console.log("props.location.state===>", props.location.state["class"]);
  // console.log(
  //   "props.location.state student===>",
  //   props.location.state["students"]
  // );
  console.log(props.location.state["date"]);
  const [currentAdmin, setCurrentAdmin] = useState();
  const [allAttendance, setAllAttendance] = useState();
  const [masterAttendance, setMasterAttendance] = useState();
  const [temp, setTemp] = useState();
  // const [stdKeys, setStdKeys] = useState();

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    fetch(
      `https://quran-server.herokuapp.com/admin/attendance/${props.location.state["class"]}`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
        },
      }
    )
      .then((res) => res.json())

      .then((res) => {
        // console.log(JSON.stringify(res));
        var some = props.location.state["students"]
          .map((std) => {
            if (res.attendance[std] !== undefined) {
              return res.attendance[std];
            }
          })
          .filter(function (el) {
            return el != null;
          });

        var tempp = [];

        for (var i = 0; i < some.length; i++) {
          tempp.push(some[i]);
        }

        setAllAttendance(tempp);
      });
  }, [allAttendance]);

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
                      Attendance Record
                    </h3>
                  </Col>
                  <Col>
                    <h4 className="mb-0 text-right text-muted">
                      <br />
                      DATE: {props.location.state["date"]}
                    </h4>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Student</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allAttendance !== undefined &&
                    allAttendance.map((dataa) =>
                      dataa
                        .filter(
                          (o) => o["date"] === props.location.state["date"]
                        )
                        .map((i) =>
                          i === undefined ? (
                            <span>No Attendance Found</span>
                          ) : (
                            <tr>
                              <td>{props.location.state["date"]}</td>
                              <td>{i.student}</td>
                              <td>{i.status}</td>
                            </tr>
                          )
                        )
                    )}
                </tbody>
              </Table>
              <CardFooter>
                <BT
                  onClick={() =>
                    props.history.push(
                      "/admin/class/attendance/add",
                      props.location.state["class"]
                    )
                  }
                >
                  Add Attendance
                </BT>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

ClassAttendance.propTypes = {};

export default ClassAttendance;
