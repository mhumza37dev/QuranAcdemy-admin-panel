import React, { useState, useEffect, useMemo } from "react";

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

import ImageUploader from "react-images-upload";

const Settings = (props) => {
  const [currentAdmin, setCurrentAdmin] = useState();
  const [logo, setLogo] = useState();
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [companyEmail, setCompanyEmail] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setComapanyAddress] = useState();
  const [companyPhone, setCompanyPhone] = useState();
  const [twitterUrl, setTwitterUrl] = useState();
  const [facebookUrl, setFacebookUrl] = useState();
  const [linkedinUrl, setLinkedinUrl] = useState();
  const [youtubeUrl, setYouTubeUrl] = useState();

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setLogo(pictureFiles);
    console.log(pictureFiles);
  };
  useMemo(() => setCurrentAdmin(JSON.parse(localStorage.getItem("user"))), []);

  const addSettings = () => {
    const formData = new FormData();

    formData.append("company_name", companyName);
    formData.append("company_email", companyEmail);
    formData.append("company_phone", companyPhone);
    formData.append("company_address", companyAddress);
    formData.append("facebook_url", facebookUrl);
    formData.append("twitter_url", twitterUrl);
    formData.append("youtube_url", youtubeUrl);
    formData.append("linkedin_url", linkedinUrl);
    formData.append("logo", logo);

    // for (var data of formData) {
    //   console.log(data);
    // }
    // console.log(formData.values);

    fetch("", {
      method: "GET",
      dataType: "JSON",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${currentAdmin.account.jwtToken}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
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
                      Settings
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
                          Add - Edit Settings
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
                            <label htmlFor="Name">Company Name</label>
                            <input
                              placeholder="Enter Company Name"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company Email</label>
                            <input
                              placeholder="enter Company Email"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company Phone</label>
                            <input
                              placeholder="Enter Company Phone #"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company Address</label>
                            <input
                              placeholder="Enter Company Address"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company Facebook</label>
                            <input
                              placeholder="Enter Company Facebook"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company Twitter</label>
                            <input
                              placeholder="Enter Company Twitter"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company YouTube</label>
                            <input
                              placeholder="Enter Company YouTube"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-6 col-md-6 form-group">
                            <label htmlFor="Name">Company LinkedIn</label>
                            <input
                              placeholder="Enter Company LinkedIn"
                              type="name"
                              className="form-control"
                              onChange={(e) => {}}
                            />
                          </div>

                          <div className="col-12  col-lg-12 col-md-12 form-group">
                            <label htmlFor="Name">Company Logo</label>
                            <ImageUploader
                              className="shadow-lg"
                              withIcon={true}
                              buttonText="Choose image"
                              onChange={onDrop}
                              imgExtension={[".jpg", ".png"]}
                              maxFileSize={5242880}
                              label="Only .jpg | .png are accepted"
                              singleImage={true}
                              withPreview={true}
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
                            addSettings();
                          }}
                        >
                          {loading && (
                            <i
                              className="fa fa-refresh fa-spin"
                              style={{ marginRight: "5px", color: "white" }}
                            />
                          )}
                          {loading && <span>Please Wait</span>}
                          {!loading && <strong>Add/Update</strong>}
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
};

export default Settings;
