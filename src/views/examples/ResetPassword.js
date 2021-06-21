/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from "reactstrap";

import queryString from "query-string";

const Login = (props) => {
  if (JSON.parse(localStorage.getItem("user"))) {
    props.history.push("/admin/index", localStorage.getItem("user"));
  } else {
  }

  const [pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [token, setToken] = useState("");
  const [alertType, setAlertType] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        // callMyFunction();
        abc();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    const value = queryString.parse(props.location.search);
    const tokenn = value.token;
    setToken(tokenn);
    console.log("token state ==> ", token); //123
  }, [token]);

  async function abc() {
    let body = {
      otp: token,
      password: pass,
      confirmPassword: ConfirmPass,
    };
    console.log(body);

    if (pass === "") {
      setOpen(true);
      setAlertType("danger");
      setMessage("password is required");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (ConfirmPass === "") {
      setOpen(true);
      setAlertType("danger");
      setMessage("password is required");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (ConfirmPass !== pass) {
      setOpen(true);
      setAlertType("danger");
      setMessage("password do not match");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      const response = await fetch(
        (body = `https://quran-server.herokuapp.com/admin/reset-password`),
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: body,
        }
      );
      const userr = await response.json();
      console.log(userr);
      if (userr.message === "Password reset successful, you can now login") {
        console.log(userr);
        setOpen(true);
        setAlertType("success");
        setMessage(userr.message);
        setTimeout(() => {
          setOpen(false);
          props.history.push("/auth/reset");
        }, 3000);
      }
    }
  }

  return (
    <>
      <Col
        lg="5"
        md="7"
        style={{
          position: "absolute",
          top: "15%",
          bottom: "20%",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <Alert color={alertType} isOpen={open}>
          {message}
        </Alert>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ textAlign: "start" }}>
                <h2 className="uiHeaderTitle" aria-hidden="true">
                  Reset your Password
                </h2>
                <hr class="solid" />
                <span
                  class="uiHeaderTitle"
                  aria-hidden="true"
                  style={{ textAlign: "start" }}
                >
                  Please enter your new password.
                </span>
              </small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type="password"
                    autoComplete="new-email"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-email"
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button
                  typeof="submit"
                  className="my-3"
                  color="primary"
                  type="button"
                  onClick={() => {
                    abc();
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
