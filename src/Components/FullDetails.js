import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
class FullDetails extends React.Component {
  state = {
    student: [],
    dummy: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:3001/students/${id}`).then((result) => {
      this.setState({ student: result.data });
    });
  }

  render() {
    return (
      <div>
        <h2> Here are the details of the student you asked for </h2>
        <p> firstName : {this.state.student.firstName} </p>
        <p> lastName : {this.state.student.lastName} </p>
        <p> address : {this.state.student.address} </p>
        <p> cityName : {this.state.student.cityName} </p>
        <p> stateName : {this.state.student.stateName} </p>
        <p> gpa : {this.state.student.gpa} </p>
      </div>
    );
  }
}

export default FullDetails;
