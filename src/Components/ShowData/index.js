import React from "react";
import axios from "axios";
import history from "../../services/history";
import { Table, Button } from "react-bootstrap";
class ShowData extends React.Component {
  state = {
    students: [],
    dummy: false,
  };
  componentDidMount() {
    axios.get("http://localhost:3001/students").then((result) => {
      this.setState({ students: result.data });
    });
  }

  deleteData = (index) => {
    const id = this.state.students[index].id;
    axios
      .delete(`http://localhost:3001/students/${id}`)
      .then(this.setState({ dummy: false }));
    axios.get("http://localhost:3001/students").then((result) => {
      this.setState({ students: result.data });
    });
  };
  showEntireDetails = (index) => {
    const id = this.state.students[index].id;
    axios
      .get(`http://localhost:3001/students/${id}`)
      .then(history.push(`/full_details/${id}`));
  };
  editThisData = (index) => {
    const id = this.state.students[index].id;
    history.push(`/edit_data/${id}`);
  };
  render() {
    return (
      <div className="container" style={{ backgroundColor: "lightgray" }}>
        <div
          style={{
            height: "70vh",
            marginTop: "14px",
            textAlign: "center",
          }}
        >
          <Table
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: "0px",
                zIndex: "10",
              }}
            >
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Full Details</th>
                <th>Delete data</th>
                <th>Edit data</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((obj, index) => {
                return (
                  <tr>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                      {index + 1}
                    </td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                      {obj.firstName}
                    </td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                      {" "}
                      <Button
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => this.showEntireDetails(index)}
                      >
                        Full Details
                      </Button>{" "}
                    </td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                      {" "}
                      <Button
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => this.deleteData(index)}
                      >
                        Delete this Data
                      </Button>{" "}
                    </td>
                    <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                      {" "}
                      <Button
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                        onClick={() => this.editThisData(index)}
                      >
                        Edit this Data
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Button
            style={{
              margin: "25px",
              borderRadius: "5px",
              height: "2em",
              cursor: "pointer",
            }}
            onClick={() => history.push("/")}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
}

export default ShowData;
