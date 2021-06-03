import React from "react";

function Register2(props) {
  return (
    <div style={{ background: "", height: "1100px" }}>
      <div>
        <div
          className="container justify-content-center"
          style={{ paddingTop: "6vh" }}
        >
          <div className="pb-5">
            <h1 className="font-weight-bold fs">Tell us about yourself</h1>
            <div style={{ borderBottom: "5px solid #17cbf2", width: "60px" }} />
          </div>
          <form className="css-prp" action="investorask.html">
            <div className="row pb-lg-3 pb-md-3">
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="Name">First Name</label>
                <input
                  placeholder="enter first name"
                  type="name"
                  className="form-control"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  placeholder="enter last name"
                  type="name"
                  className="form-control"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="address">Mobile</label>
                <input
                  placeholder="enter mobile number"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row pb-lg-3 pb-md-3">
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="birthday">Birthday</label>
                <input
                  placeholder="enter birthday"
                  type="Date"
                  className="form-control"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="name">Street Adress</label>
                <input
                  placeholder="enter apt, suite, unit, floor etc"
                  type="name"
                  className="form-control"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="occupation">State</label>
                <input
                  placeholder="enter state"
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row pb-lg-3 pb-md-3">
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="zip">Zip</label>
                <input
                  placeholder="enter zip"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-12 col-lg-4 col-md-4 form-group">
                <label htmlFor="name">Street Adress</label>
                <input
                  placeholder="enter street and number"
                  type="name"
                  className="form-control"
                />
              </div>
              <div className="dropdown col-xl-4 col-lg-4 col-md-4">
                <label htmlFor="name">Gender</label>
                <select
                  className="form-control"
                  id="sel1"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="text-center mt-3 mb-xl-0 mb-lg-0 mb-md-0 mb-sm-3 mb-2 qwes">
          <a href="investorask.html">
            <button
              type="submit"
              className="btn-lg btn-primary mr-lg-5 mr-md-5"
              style={{
                minWidth: "200px",
                backgroundColor: "#17cbf2",
                border: "none",
              }}
            >
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register2;
