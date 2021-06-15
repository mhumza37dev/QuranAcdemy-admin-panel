import React, { useState, useEffect } from "react";

import { useLoading, Audio } from "@agney/react-loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import Skeleton from "@material-ui/lab/Skeleton";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

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
  Col,
  Alert,
  Button as BT,
} from "reactstrap";

import { Modal } from "react-bootstrap";
import { useScrollTrigger } from "@material-ui/core";

function Permissions(props) {
  const [permissions, setPermissions] = useState();
  const [currentAdmin, setCurrentAdmin] = useState();
  const [show, setShow] = useState(false);
  const [adminId, setAdminId] = useState("");

  let admin = JSON.parse(localStorage.getItem("user"));
  if (admin.account.super === false) {
    if (!admin.permissionss.includes("Vew Permissions")) {
      props.history.push("/admin/404");
    }
  }

  useEffect(() => {
    console.log("sss");
    fetch("https://quran-server.herokuapp.com/permission/")
      .then((res) => res.json())
      .then((res) => {
        setPermissions(res);
        setCurrentAdmin(JSON.parse(localStorage.getItem("user")));
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                      Permissions
                    </h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" colSpan>
                      Name
                    </th>

                    <th scope="col" colSpan="2" align="center">
                      Actions
                    </th>
                    {/* <th scope="col" /> */}
                  </tr>
                </thead>
                <tbody>
                  {permissions === undefined
                    ? null
                    : permissions.map((data) =>
                        data.status !== "blocked" ? (
                          <tr key={data.id}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {data.Name}
                                  </span>
                                </Media>
                              </Media>
                            </th>

                            {currentAdmin !== undefined ? (
                              currentAdmin.account.super === true ||
                              currentAdmin.permissionss.includes(
                                "edit admins"
                              ) ? (
                                <td
                                  onClick={() => {
                                    setAdminId(data.id);

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
                              currentAdmin.account.super === true ||
                              !currentAdmin.permissionss.includes(
                                "delete admins"
                              ) ? (
                                <td
                                  className="icon-btn"
                                  onClick={() => {
                                    alert(data.id);
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
}

export default Permissions;
