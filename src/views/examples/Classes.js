import React, { useState, useEffect } from "react";

// reactstrap components
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
  UncontrolledTooltip,
  Col,
  Button as BT,
} from "reactstrap";
// core components

const Classes = () => {
  const [fetchedClasses, setFetchedClasses] = useState();
  const [currentAdmin, setCurrentAdmin] = useState();
  const [show, setShow] = useState(false);
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    console.log("sss");
    fetch("https://quran-server.herokuapp.com/class/")
      .then((res) => res.json())
      .then((res) => {
        setFetchedClasses(res);
        setCurrentAdmin(JSON.parse(localStorage.getItem("user")));
      });
  }, []);

  return (
    <>
      <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8"></div>
      {/* <Header /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row xl="2">
                  <Col>
                    <h3 className="mb-0">Classes</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Time Slot</th>
                    <th scope="col">Days</th>
                    <th scope="col">Subscription Type</th>
                    <th scope="col">Fees</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Student Limit</th>
                    <th scope="col">Enroled Students</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {fetchedClasses !== undefined &&
                    fetchedClasses.map((data) => (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            {/* <h1>hamza<h1
                             */}
                            <Media>
                              <span className="mb-0 text-sm">{data.title}</span>
                            </Media>
                          </Media>
                        </th>
                        <td>{data.teacher}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            {data.time_slot}
                          </Badge>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{data.days}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">
                              {data.subscription_type}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{data.fee}</span>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{data.duration}</span>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{data.max_students}</span>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{data.students.length}</span>
                            <div>
                              <Progress
                                max={data.max_students}
                                value={data.students.length}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default Classes;
