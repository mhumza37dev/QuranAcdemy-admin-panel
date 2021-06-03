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
import React, { useState, useEffect, useStateCallback } from "react";

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
  Row,
  Col,
  Alert,
} from "reactstrap";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [user, setUser] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = React.useState(false);

  if (JSON.parse(localStorage.getItem("user"))) {
    props.history.push("/admin/index", localStorage.getItem("user"));
  } else {
  }

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
  }, [email, pass]);

  useEffect(() => {}, []);

  async function abc() {
    const body = {
      email: email,
      password: pass,
    };
    console.log(body);

    if (email === "") {
      setOpen(true);
      setErrorMessage("Email is required");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else if (pass === "") {
      setOpen(true);
      setErrorMessage("Password is required");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      const response = await fetch(
        "http://192.168.18.5:3005/admin/authenticate",
        {
          method: "POST",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "all",
          },
          body: JSON.stringify({ email: email, password: pass }),
        }
      );
      const userr = await response.json();
      console.log(userr);
      // setUser(userr);

      localStorage.setItem("user", JSON.stringify(userr.account));

      if (userr.account) {
        console.log(userr.account);
        props.history.push("/admin", JSON.parse(localStorage.getItem("user")));
      } else if (userr.message === "Email or password is incorrect") {
        console.log(userr);
        setOpen(true);
        setErrorMessage(userr.message);
        setTimeout(() => {
          setOpen(false);
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
        <Alert color="danger" isOpen={open}>
          {errorMessage}
        </Alert>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>
                <h1 className="uiHeaderTitle" aria-hidden="true">
                  Sign In
                </h1>
              </small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setpass(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  typeof="submit"
                  className="my-3"
                  color="primary"
                  type="button"
                  // onClick=
                  onClick={() => {
                    abc();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              onClick={(e) => props.history.push("/auth/forgot")}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          {/* <Col className="text-right" xs="6">
            <a
              className="text-light"
              onClick={() => props.history.push("/auth/signup")}
            >
              <small>Create new account</small>
            </a>
          </Col> */}
        </Row>
      </Col>
    </>
  );
};

export default Login;
