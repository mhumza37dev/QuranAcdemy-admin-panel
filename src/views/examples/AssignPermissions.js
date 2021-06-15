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

function AssignPermissions(props) {
  const [aaa, setaaa] = useState([]);

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
                    <h3 className="mb-0">Assign Permissions</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Module</th>
                    <th scope="col">Permissions</th>

                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {aaa !== undefined &&
                    aaa.map((data) => (
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
}

export default AssignPermissions;
