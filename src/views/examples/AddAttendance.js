import React, { useState, useEffect, useMemo } from "react";
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

import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const AddAttendance = (props) => {
  const [date, setDate] = useState();
  const [value, setValue] = React.useState("female");
  const [currentAdmin, setCurrentAdmin] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [enrolledStudents, setEnrolledStudents] = useState();

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id === nameKey) {
        return myArray[i];
      }
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //   console.log(props.location.state);
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
            var resultObject = search(props.location.state, res);

            setEnrolledStudents(
              resultObject.students.map((data) => ({ ...data }))
            );
            // console.log(resultObject.students.map((data) => ({ ...data })));

            setSelectedClass(resultObject);
            // console.log("selected class ===> ", selectedClass);
          }
        });
    } else {
      console.log("props undefined");
    }
  }, [selectedClass]);

  const addAttendacne = (status, std) => {
    fetch("https://quran-server.herokuapp.com/admin/attendance/add", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
      body: JSON.stringify({
        date: date,
        class_id: props.location.state,
        std_id: std,
        status: status,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
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
                      ADD Attendance
                    </h3>
                  </Col>
                  <Col>
                    <div
                      className="col-12 col-lg-6 col-md-6 form-group"
                      style={{ float: "right" }}
                    >
                      <label htmlFor="birthday">Select Date</label>
                      <input
                        placeholder="Select Date"
                        type="Date"
                        className="form-control"
                        onChange={(e) => {
                          setDate(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents !== undefined &&
                    enrolledStudents.map((std) => (
                      <tr>
                        <th scope="row">
                          <h4>{std.firstName + " " + std.lastName}</h4>
                        </th>
                        <td>
                          <FormControl component="fieldset">
                            <RadioGroup
                              onChange={(e) =>
                                addAttendacne(e.target.value, std.id)
                              }
                              style={{ display: "block" }}
                            >
                              <FormControlLabel
                                value={`present`}
                                control={<Radio style={{ color: "green" }} />}
                                label="Present"
                              />
                              <FormControlLabel
                                value={`absent`}
                                control={<Radio style={{ color: "red" }} />}
                                label="Absent"
                              />
                            </RadioGroup>
                          </FormControl>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddAttendance;
