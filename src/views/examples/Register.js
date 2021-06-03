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
import React, { useState } from "react";

// reactstrap components
import {
  Label,
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
} from "reactstrap";

const Register = (props) => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobile, setmobile] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [acceptTerms, setacceptTerms] = useState();
  const [message, setMessage] = useState("");

  const [formState, setFormState] = useState();

  const register = () => {
    fetch("http://192.168.18.5:3005/admin/register", {
      method: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        mobile: mobile,
        dob: dob,
        gender: gender,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms,
      }),
    })
      .then((res) => res.json())
      .then((res) => setMessage(res.message));
  };

  const displayStates = () => {
    console.log({
      firstname: firstname,
      lastname: lastname,
      mobile: mobile,
      gender: gender,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      acceptTerms: acceptTerms,
    });
  };

  return (
    <>
      <Col
        lg="6"
        md="8"
        style={{
          position: "absolute",
          top: "5%",
          bottom: "20%",
          left: "0",
          right: "0",
          margin: "auto",
        }}
      >
        <Card className="bg-secondary shadow border-0">
          <CardBody
            className="px-lg-5 py-lg-5"
            style={{ boxShadow: "5px 10px #5e72e4" }}
          >
            <div className="text-center text-muted mb-4">
              <h1 class="uiHeaderTitle" aria-hidden="true">
                Sign Up
              </h1>
            </div>
            <hr class="solid" />

            <Form role="form">
              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="First Name"
                      type="text"
                      onChange={(e) => {
                        setfirstname(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      autoComplete="lastname"
                      onChange={(e) => {
                        setlastname(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="E-mail"
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Mobile"
                      type="text"
                      autoComplete="mobile"
                      onChange={(e) => {
                        setmobile(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-calendar-grid-58" />
                      </InputGroupText>
                    </InputGroupAddon>

                    <Input
                      placeholder="Date"
                      type="date"
                      onChange={(e) => {
                        setdob(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              {/* <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Age" type="text" onChange={(e) => {setag(e.target.value)}} />
                  </InputGroup>
                </FormGroup>
              </Col> */}

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Col>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      onChange={(e) => {
                        setconfirmPassword(e.target.value);
                      }}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.value === "on") setacceptTerms(true);
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={() => {
                    displayStates();
                    // props.history.push("/auth/signin");
                  }}
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
