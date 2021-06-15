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

function Permissions(props) {
  const [fetchedAdmins, setFetchedAdmins] = useState();
  const [permissiosnName, setPermissiosnName] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const add = () => {
    setLoading(true);
    // alert("sss");
    if (permissiosnName === "") {
      setAlertType("warning");
      // setLoading(false);
      setMessage("Permmission Name can not be empty");
      setOpen(true);
    }

    fetch("https://quran-server.herokuapp.com/permission/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        Name: permissiosnName,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Permission Added") {
          setPermissiosnName("");
          setAlertType("success");
          setLoading(false);
          setMessage("Permission Succesfully Added");
          setOpen(true);
        } else {
          setPermissiosnName("");
          setAlertType("danger");
          setLoading(false);
          setMessage("Permmission Name can not be empty");
          setOpen(true);
        }
      });

    // setTimeout(function () {
    //   setAlertType("warning");
    //   setLoading(false);
    //   setMessage("Permmission Name can not be empty");
    //   setOpen(true);
    // }, 1000);
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
                      Permissions
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
                        <h1 className="font-weight-bold fs">
                          Add New Permissions
                        </h1>
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
                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Permission Name</label>
                            <input
                              placeholder="enter permission name"
                              type="name"
                              className="form-control"
                              value={permissiosnName}
                              onChange={(e) => {
                                setPermissiosnName(e.target.value);
                                console.log(permissiosnName);
                              }}
                            />
                          </div>
                        </div>

                        <BT
                          size="lg"
                          style={{
                            background: "#5e72e4",
                            color: "white",
                            marginTop: "0px",
                          }}
                          onClick={() => {
                            add();
                          }}
                        >
                          {loading && (
                            <i
                              className="fa fa-refresh fa-spin"
                              style={{ marginRight: "5px", color: "white" }}
                            />
                          )}
                          {loading && <span>Please Wait</span>}
                          {!loading && <strong>Add Admin</strong>}
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

export default Permissions;
