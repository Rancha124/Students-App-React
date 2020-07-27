import React from "react";
import { Form, Row} from "react-bootstrap";
import "./AddStudent.css";
import history from "../services/history";
import axios from "axios";
import PropTypes from 'prop-types';
class AddStudent extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    cityName: "",
    stateName: "",
    gpa: "",
    validated: false,
    loading: true,
  };
 

  handleChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  };
  handleChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  };
  handleChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  handleChangeMobileNumber = (event) => {
    this.setState({ mobileNumber: event.target.value });
  };

  handleChangeGpa = (event) => {
    this.setState({ gpa: event.target.value });
  };

  handleChangeCityName = (event) => {
    this.setState({ cityName: event.target.value });
  };

  handleChangeStateName = (event) => {
    this.setState({ stateName: event.target.value });
  };

  handleSubmit = (e) => {
    console.log('at start');
    const form = e.currentTarget;
    console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({validated: true});
      alert('Submit all details');
      console.log('form not filled completely');
     
    } else {
      console.log("filled Success")
      axios
      .post("http://localhost:3001/students", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        mobileNumber: this.state.mobileNumber,
        cityName: this.state.cityName,
        stateName: this.state.stateName,
        gpa: this.state.gpa,
      })
      .then((res) => 
      {console.log('posted Succesfully');
      })
      history.push("/show-data");
  
    }
   
  };
  render() {
   
    return (
      <>
        <p>Hello there!</p>
        <h2>Go ahead and enter your details</h2>
        <div className="wrapper">
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Group controlId="firstName">
              <Form.Label> First Name </Form.Label>{" "}
              <Form.Control
                required
                type="text"
                placeholder="Enter First Name"
                value={this.state.firstName}
                onChange={this.handleChangeFirstName}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                Please enter First Name  
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="LastName">
              <Form.Label> Last Name </Form.Label>{" "}
              <Form.Control
                required
                type="text"
                placeholder="Enter Last Name"
                value={this.state.lastName}
                onChange={this.handleChangeLastName}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter Last Name */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label> Enter Your Address </Form.Label>{" "}
              <Form.Control
                required
                type="text"
                placeholder="Enter Your Address here"
                value={this.state.address}
                onChange={this.handleChangeAddress}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter your address  */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formMobileNumber">
              <Form.Label> Enter Mobile Number </Form.Label>{" "}
              <Form.Control
                required
                type="number"
                placeholder="Mobile Number here"
                value={this.state.mobileNumber}
                onChange={this.handleChangeMobileNumber}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter Mobile Number  */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formGpa">
              <Form.Label> Your Gpa </Form.Label>{" "}
              <Form.Control
                required
                type="number"
                placeholder="Enter your Gpa "
                value={this.state.Gpa}
                onChange={this.handleChangeGpa}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter Gpa  */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label> Enter CityName </Form.Label>{" "}
              <Form.Control
                required
                type="text"
                placeholder="City Name"
                value={this.state.cityName}
                onChange={this.handleChangeCityName}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter City Name  */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formStateName">
              <Form.Label> Enter State </Form.Label>{" "}
              <Form.Control
                required
                type="text"
                placeholder="State Name here"
                value={this.state.stateName}
                onChange={this.handleChangeStateName}
                style={{ borderRadius: "5px", margin: "5px" }}
              />
              <Form.Control.Feedback type="invalid">
                {/* Please enter you State Name  */}
              </Form.Control.Feedback>
            </Form.Group>{" "}
            <Row> <button style={{cursor: 'pointer'}}>Submit</button> </Row>{' '}
          </Form>{" "}
        </div>
      </>
    );
  }
}

AddStudent.propTypes = {
  changePin: PropTypes.func,
  showSpinner: PropTypes.bool,
};
export default AddStudent;
