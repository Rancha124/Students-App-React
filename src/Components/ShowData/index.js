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
    this.setState({ dummy: !this.state.dummy });
  }
  componentDidUpdate(pP, pS) {
    if (pS.students === this.state.students) {
      axios.get("http://localhost:3001/students").then((result) => {
        this.setState({ students: result.data });
      });
    }
  }
  deleteData = async (index) => {
    const id = this.state.students[index].id;
    try {
      await axios.delete(`http://localhost:3001/students/${id}`)
      const result = await axios.get("http://localhost:3001/students")
      this.setState({ students: result.data })
    } catch (e) {
      console.error(e)
      alert(e)
    }
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
    axios
      .get(`http://localhost:3001/students/${id}`)
      .then((res) => this.setState({ students: res.data }));
  };
  render() {
    return (
      <>
        <div className="container" style={{ backgroundColor: "lightgray" }}>
          <div
            style={{
              height: "auto",
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
                  <th>Last Name</th>
                  <th>Mobile Number</th>
                  <th>City Name</th>
                  <th>State Name</th>
                  <th>Gpa</th>
                  <th>Full Details</th>
                  <th>Edit data</th>
                  <th>Delete data</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {this.state.students.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {index + 1}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.firstName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.lastName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.mobileNumber}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.cityName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.stateName}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {obj.gpa}
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
                        <i
                          className="fa fa-edit"
                          style={{
                            color: "green",
                            fontSize: "2em",
                            paddingTop: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => this.editThisData(index)}
                        ></i>{" "}
                      </td>
                      <td style={{ paddingTop: "12px", paddingBottom: "12px" }}>
                        {" "}
                        <i
                          className="fa fa-trash"
                          style={{
                            color: "red",
                            fontSize: "2em",
                            paddingTop: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => this.deleteData(index)}
                        ></i>{" "}
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
                textAlign: "center",
                paddingBottom: "20px",
                paddingTop: "2px",
              }}
              onClick={() => history.push("/")}
            >
              Go Back
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default ShowData;
