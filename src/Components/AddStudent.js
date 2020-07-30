import React from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import history from "../services/history";

// Styled-components styles
const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }
  .error {
    border: 2px solid #ff6565;
  }
  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
  .error-asterisk {
    color: red;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  }
`;
const mobileNumberRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const gpaRegExp = /^[0-9]{1,3}(?:\.[0-9]{1,3})?$/;
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "*First Name must have at least 2 characters")
    .max(100, "*First Name can't be longer than 100 characters")
    .required("*First Name is required"),
  lastName: Yup.string()
    .min(2, "*Last Name must have at least 2 characters")
    .max(100, "*Last Name can't be longer than 100 characters")
    .required("*Last Name is required"),
  mobileNumber: Yup.string()
    .matches(mobileNumberRegExp, "*Phone number is not valid")
    .required("*Phone number is required"),
  address: Yup.string()
    .min(2, "*Address must have at least 2 characters")
    .max(100, "*Address can't be longer than 100 characters")
    .required("*Address is required"),
  cityName: Yup.string()
    .min(2, "*City name must have at least 2 characters")
    .max(100, "*City Name can't be longer than 100 characters")
    .required("*City is required"),
  stateName: Yup.string()
    .min(2, "*State Name must have at least 2 characters")
    .max(100, "*State Name can't be longer than 100 characters")
    .required("*State is required"),
  gpa: Yup.string()
    .matches(gpaRegExp, "*Gpa is invalid")
    .required("*Gpa is required"),
});

function AddStudent() {
  return (
    <>
      <div
        style={{
          width: "60%",
          margin: "25px auto 25px auto",
          backgroundColor: "lightgray",
          height: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <h2>Hello there mate, go on and enter your details</h2>
      </div>
      <CONTAINER>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            address: "",
            mobileNumber: "",
            cityName: "",
            stateName: "",
            gpa: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log("just before post");
            axios
              .post("http://localhost:3001/students", { ...values })
              .then((res) => {
                console.log("posted Succesfully");
                resetForm();
                setSubmitting(false);
                history.push("/show-data");
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <MYFORM onSubmit={handleSubmit} className="mx-auto">
              <Form.Group controlId="formFName">
                <Form.Label>
                  First Name
                  <span
                    className={
                      touched.firstName && errors.firstName
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  className={
                    touched.firstName && errors.firstName ? "error" : null
                  }
                />
                {touched.firstName && errors.firstName ? (
                  <div className="error-message">{errors.firstName}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formLName">
                <Form.Label>
                  Last Name
                  <span
                    className={
                      touched.lastName && errors.lastName
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  className={
                    touched.lastName && errors.lastName ? "error" : null
                  }
                />
                {touched.lastName && errors.lastName ? (
                  <div className="error-message">{errors.lastName}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formMNumber">
                <Form.Label>
                  Mobile Number
                  <span
                    className={
                      touched.mobileNumber && errors.mobileNumber
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.mobileNumber}
                  className={
                    touched.mobileNumber && errors.mobileNumber ? "error" : null
                  }
                />
                {touched.mobileNumber && errors.mobileNumber ? (
                  <div className="error-message">{errors.mobileNumber}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>
                  Address
                  <span
                    className={
                      touched.address && errors.address
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={touched.address && errors.address ? "error" : null}
                />
                {touched.address && errors.address ? (
                  <div className="error-message">{errors.address}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>
                  City Name
                  <span
                    className={
                      touched.cityName && errors.cityName
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="cityName"
                  placeholder="City Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cityName}
                  className={
                    touched.cityName && errors.cityName ? "error" : null
                  }
                />
                {touched.cityName && errors.cityName ? (
                  <div className="error-message">{errors.cityName}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formState">
                <Form.Label>
                  State Name
                  <span
                    className={
                      touched.stateName && errors.stateName
                        ? "error-asterisk"
                        : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  as="select"
                  type="text"
                  name="stateName"
                  placeholder="State Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.stateName}
                  className={
                    touched.stateName && errors.stateName ? "error" : null
                  }
                >
                  <option></option>
                  <option>Andhra Pradhesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Goa</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>West Bengal</option>
                </Form.Control>
                {touched.stateName && errors.stateName ? (
                  <div className="error-message">{errors.stateName}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formGpa">
                <Form.Label>
                  Gpa
                  <span
                    className={
                      touched.gpa && errors.gpa ? "error-asterisk" : null
                    }
                  >
                    &nbsp; *
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="gpa"
                  placeholder="Gpa"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gpa}
                  className={touched.gpa && errors.gpa ? "error" : null}
                />
                {touched.gpa && errors.gpa ? (
                  <div className="error-message">{errors.gpa}</div>
                ) : null}
              </Form.Group>
              <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </BUTTON>
            </MYFORM>
          )}
        </Formik>
      </CONTAINER>
    </>
  );
}

export default AddStudent;
