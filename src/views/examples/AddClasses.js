import { GolfCourseSharp } from "@material-ui/icons";
import React, { useEffect, useState, useMemo } from "react";

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

function AddClasses(props) {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [course, setCourses] = useState();
  const [teachers, setTeachers] = useState();

  const [selectedSubscription, setSelectedSubscription] = useState();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [selectedDays, setSelectedDays] = useState();
  const [maxStudents, setMaxStudents] = useState();
  const [fees, setFees] = useState();
  const [duration, setDuration] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [classroomUrl, setClassroomUrl] = useState();

  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  useEffect(() => {
    fetch("https://quran-server.herokuapp.com/admin/course", {
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
        setCourses(res);
      });

    fetch("https://quran-server.herokuapp.com/admin/teachers", {
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
        setTeachers(res);
      });
  }, []);

  const addClass = () => {
    setLoading(true);
    fetch("https://quran-server.herokuapp.com/admin/class/add", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
      body: JSON.stringify({
        teacher: selectedTeacher,
        course: selectedCourse,
        time_slot: selectedTimeSlot,
        days: selectedDays,
        max_students: maxStudents,
        fee: fees,
        duration: duration,
        subscription_type: selectedSubscription,
        classroom_url: classroomUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        if (res.message === "Class Added") {
          setLoading(false);
          setAlertType("success");
          setOpen(true);
        } else {
          setLoading(false);
          setAlertType("danger");
          setOpen(true);
        }
        console.log(res);
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
                        <h1 className="font-weight-bold fs">Add New Class</h1>
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
                          <div className="dropdown col-xl-6 col-lg-6 col-md-6">
                            <label htmlFor="name">Select Course</label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel1"
                              onChange={(e) => {
                                setSelectedCourse(e.target.value);
                              }}
                            >
                              {course !== undefined &&
                                course.map((crs) => (
                                  <option value={crs.id}>{crs.Title}</option>
                                ))}
                            </select>
                          </div>

                          <div className="dropdown col-xl-6 col-lg-6 col-md-6 form-group">
                            <label htmlFor="name">Select Teacher</label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel1"
                              onChange={(e) => {
                                var teacher = [];
                                teacher.push(e.target.value);
                                setSelectedTeacher(teacher);
                              }}
                            >
                              {teachers !== undefined &&
                                teachers.map((teacher) => (
                                  <option value={teacher.id}>
                                    {teacher.firstName + " " + teacher.lastName}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className="dropdown col-xl-4 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">Select Time Slot</label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel1"
                              onChange={(e) => {
                                setSelectedTimeSlot(e.target.value);
                              }}
                            >
                              <option value={"08:00 - 10:00"}>
                                08:00 - 10:00
                              </option>
                              <option value="10:00 - 12:00">
                                10:00 - 12:00
                              </option>
                              <option value="12:00 - 02:00">
                                12:00 - 02:00
                              </option>
                              <option value="02:00 - 04:00">
                                02:00 - 04:00
                              </option>
                              <option value="04:00 - 06:00">
                                04:00 - 06:00
                              </option>
                            </select>
                          </div>

                          <div className="dropdown col-xl-4 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">Select Days </label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel1"
                              onChange={(e) => {
                                setSelectedDays(e.target.value);
                              }}
                            >
                              <option value={"Mon-Wed-Fri"}>Mon-Wed-Fri</option>
                              <option value="Tue-Thurs-Sat">
                                Tue-Thurs-Sat
                              </option>
                            </select>
                          </div>

                          <div className="col-12 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">Max Students Limit</label>
                            <input
                              placeholder="Student Limit"
                              type="number"
                              pattern="[0-9]+"
                              className="form-control"
                              onChange={(e) => {
                                setMaxStudents(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-12 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">Class Fee</label>
                            <input
                              placeholder="Enter Fee ($)"
                              type="number"
                              pattern="[0-9]+"
                              className="form-control"
                              onChange={(e) => {
                                setFees(e.target.value);
                              }}
                            />
                          </div>

                          <div className="col-12 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">Duration</label>
                            <input
                              placeholder="Enter Duration"
                              type="number"
                              pattern="[0-9]+"
                              className="form-control"
                              onChange={(e) => {
                                setDuration(e.target.value);
                              }}
                            />
                          </div>

                          <div className="dropdown col-xl-4 col-lg-4 col-md-4 form-group">
                            <label htmlFor="name">
                              Select Subscription type
                            </label>
                            <select
                              style={{ width: "100%" }}
                              className="form-control"
                              id="sel12"
                              onChange={(e) => {
                                setSelectedSubscription(e.target.value);
                              }}
                            >
                              <option value={"08:00 - 10:00"}>Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </select>
                          </div>

                          <div className="col-12 col-lg-12 col-md-12 form-group">
                            <label htmlFor="name">Class Link URL</label>
                            <input
                              placeholder="Class Link URL"
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setClassroomUrl(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <BT
                          size="lg"
                          disabled={loading}
                          style={{
                            background: "#5e72e4",
                            color: "white",
                            marginTop: "0px",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            addClass();
                          }}
                        >
                          {loading && (
                            <i
                              className="fa fa-refresh fa-spin"
                              style={{ marginRight: "5px", color: "white" }}
                            />
                          )}
                          {loading && <span>Please Wait</span>}
                          {!loading && <strong>Add Class</strong>}
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
}

export default AddClasses;
