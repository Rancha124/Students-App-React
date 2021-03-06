import React from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import history from "../services/history";
import apiHandler from "../services/apiHandler";

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

class EditData extends React.Component {
  state = {
    students: [],
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    apiHandler.get(`/${id}`).then((result) => {
      this.setState({ students: result.data });
      console.log(result.data);
    });
    console.log("Edit data");
  }
  render() {
    const states=["","Andhra Pradhesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
          "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
          "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
          "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
          "Uttarakhand","West Bengal"];

    return (
      <CONTAINER>
        <Formik
          enableReinitialize
          initialValues={{
            firstName: this.state.students.firstName,
            lastName: this.state.students.lastName,
            address: this.state.students.address,
            mobileNumber: this.state.students.mobileNumber,
            cityName: this.state.students.cityName,
            stateName: this.state.students.stateName,
            gpa: this.state.students.gpa,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log("just before post");
            const id = this.props.match.params.id;

            apiHandler
              .put(`/${id}`, { ...values })
              .then((res) => console.log("edited succesfully mate"));
            resetForm();
            setSubmitting(false);
            history.push("/show-data");
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
                  {
                  states.map((data) => <option>{data}</option> )
                  }
              
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
    );
  }
}
export default EditData;
