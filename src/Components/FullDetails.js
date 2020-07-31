import React from "react";
import { Table, Button } from "react-bootstrap";
import history from "../../src/services/history";
import apiHandler from "../services/apiHandler";
class FullDetails extends React.Component {
  state = {
    student: [],
    dummy: false,
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    apiHandler.get(`/${id}`).then((result) => {
      this.setState({ student: result.data });
    });
  }

  render() {
    return (
      <div className="container" style={{ backgroundColor: "powderblue" }}>
        <div
          style={{
            height: "auto",
            marginTop: "14px",
            textAlign: "center",
          }}
        >
          <Table style={{ marginLeft: "auto", marginRight: "auto" }}>
            <thead
              style={{
                position: "sticky",
                top: "0px",
                zIndex: "10",
              }}
            >
              <tr>
                <th>#</th>
                <th>Variable</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>1</td>
                <td>firstName </td>
                <td> {this.state.student.firstName}</td>
              </tr>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>2</td>
                <td>lastName </td>
                <td>{this.state.student.lastName}</td>
              </tr>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>3</td>
                <td>address </td>
                <td>{this.state.student.address}</td>
              </tr>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>4</td>
                <td>cityName </td>
                <td> {this.state.student.cityName}</td>
              </tr>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>5</td>
                <td>stateName</td>
                <td>{this.state.student.stateName}</td>
              </tr>
              <tr>
                <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>6</td>
                <td>gpa</td>
                <td>{this.state.student.gpa}</td>
              </tr>
            </tbody>
          </Table>
          <Button
            style={{
              margin: "25px",
              borderRadius: "5px",
              height: "2.5em",
              cursor: "pointer",
            }}
            onClick={() => history.push("/show-data")}
          >
            Go back
          </Button>
        </div>
      </div>
    );
  }
}

export default FullDetails;
