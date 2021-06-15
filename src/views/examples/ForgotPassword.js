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
  Row,
  Col,
  Alert,
} from "reactstrap";

const Login = (props) => {
  const [email, setemail] = useState("");

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
  }, [email]);

  async function abc() {
    const body = {
      email: email,
    };
    console.log(body);

    if (email === "") {
      setOpen(true);
      setAlertType("danger");
      setMessage("Email is required");
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } else {
      const response = await fetch(
        "https://quran-server.herokuapp.com/admin/forgot-password",
        {
          method: "POST",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({ email: email }),
        }
      );
      const userr = await response.json();
      if (
        userr.message ===
        "Please check your email for password reset instructions"
      ) {
        console.log(userr);
        setOpen(true);
        setAlertType("success");
        setMessage(userr.message);
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
        <Alert color={alertType} isOpen={open}>
          {message}
        </Alert>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ textAlign: "start" }}>
                <h2 class="uiHeaderTitle" aria-hidden="true">
                  Find Your Account
                </h2>
                <hr class="solid" />
                <span
                  class="uiHeaderTitle"
                  aria-hidden="true"
                  style={{ textAlign: "start" }}
                >
                  Please enter your email address to recieve password reset
                  mail.
                </span>
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
                    autoComplete="new-email"
                    onChange={(e) => {
                      setemail(e.target.value);
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
                  Send
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
